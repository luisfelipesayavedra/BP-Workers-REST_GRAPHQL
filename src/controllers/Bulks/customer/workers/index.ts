import { parentPort, workerData } from "worker_threads";
import {
  BulkinEvents,
  PrismaClient,
  TYPE_DNI,
} from "../../../../generated/client";
import { customerExcel } from "../functions";

const prisma: PrismaClient = new PrismaClient();

export const Customer = async () => {
  console.log("Entrando al worker");
  const event = workerData.params.data.newEvent as BulkinEvents;
  const data = workerData.params.data.dataParsed as customerExcel[];
  console.log(event);
  for (let index = 0; index < data.length - 1; index++) {
    // if (index <= 3499) {
    //     continue
    // }
    try {
      const customerData = data[index];
      console.log(customerData);
      const admin = await prisma.internalUser.findFirst({
        where: {
          organizationUuid: event.organization_uuid,
          email: "agudelocjuan@gmail.com",
          //email: "a@a.a",
          user_role: {
            type: {
              equals: "SUPERUSER",
            },
          },
        },
      });

      const vendedor = customerData?.Vendedor

      const minuscula = vendedor.toLowerCase()

      const namesArray = minuscula.split(" ")

      const sellers = await prisma.internalUser.findMany({
        where: {
          organizationUuid: event.organization_uuid,
          first_name: {
            contains: namesArray[0] ?? namesArray[1],
            mode: "insensitive",
          },
          last_name: {
            contains: namesArray[1] ?? namesArray[2] ?? namesArray[3],
            mode: "insensitive",
          }
        },
        select: {
          uuid: true,
          first_name: true,
          last_name: true,
        }
      });

      /* const [{uuid}] = sellers
      const uuidCreated = uuid === undefined ? admin?.uuid : uuid */
     /*  const newObjSeller = sellers.find((seller) => {
        const sellerName = {name:`${seller.first_name} ${seller.last_name}`, uuid: seller.uuid};
        return sellerName.name.toLowerCase() === customerData.Vendedor.toLowerCase()
      });
   */
   // console.log("newObjSeller", newObjSeller?.uuid);
      /*  const parseTypeDoc = (type: string) => {
        if(type === "Número de identificación tributaria"){
            return TYPE_DNI.NIT
        }
        if(type === "Cédula de ciudadanía"){
            return TYPE_DNI.CC
        }
        if(type === "Documento de identificación extranjero"){
            return TYPE_DNI.DIE
        }
        if(type === "Cédula de extranjería"){
            return TYPE_DNI.CE
        }
        if(type === "Pasaporte"){
            return TYPE_DNI.PP
        }
      }
 */
     /*  const parsePhone = () => {
        if (String(customerData?.Teléfono_1) !== "") {
          return String(customerData?.Teléfono_1);
        } else if (String(customerData?.Teléfono_2) !== "") {
          return String(customerData?.Teléfono_2);
        } else if (String(customerData?.Celular) !== "") {
          return String(customerData?.Celular);
        }
      }; */

      //console.log("parsePhone", parsePhone());
      const parseTypeDoc: {
        [id: string]: TYPE_DNI;
      } = {
        ["Número de identificación tributaria"]: TYPE_DNI.NIT,
        ["Cédula de ciudadanía"]: TYPE_DNI.CC,
        ["Documento de identificación extranjero"]: TYPE_DNI.DIE,
        ["Cédula de extranjería"]: TYPE_DNI.CE,
        ["Pasaporte"]: TYPE_DNI.PP,
      };

      const customerDataBase = await prisma.customer.findFirst({
        where: {
          organizationUuid: event.organization_uuid,
          DNI: String(customerData.Identificación),
        },
        include: {
          CustomerDetails: true,
        }
      });
   //console.log("customerDataBase",customerDataBase)
      const customer = await prisma.customer.update({
        where: {
          uuid: customerDataBase?.uuid ?? "",
        },
        data: {
          //DNI: String(customerData.Identificación),
          //email: String(customerData.Correo) ?? "",
          //firstName: customerData.Nombre ?? "",
          //LastName: customerData.Primer_apellido ?? "",
          //birthDate: new Date(),
          //TypeDOC: parseTypeDoc[customerData.Tipo_de_identificación],
          //organizationUuid: event.organization_uuid,
          createdByInternalUser: {
            connect: {
              uuid: sellers[0]?.uuid ?? admin?.uuid,
            },
          },
          //createdAt: new Date(),
          //status: "ACTIVE",
          //NIT: String(customerData.Identificación),
          //DV: customerData.Dígito_de_verificación ?? "",
          //name: customerData.Nombre,
          //profileImg: "",
          /* typePerson:
            customerData.Tipo_de_identificación ===
            "Número de identificación tributaria"
              ? "JURIDICAL"
              : "NATURAL", */
          CustomerDetails: {
            update: {
              //address: customerData.Dirección ?? "",
              //city: customerData.Municipio ?? "",
              //country: customerData.País ?? "",
              phone: customerData?.Teléfono_1 ?? customerData?.Teléfono_2 ?? customerData?.Celular ?? "",
              //state: customerData.Departamento ?? "",
              //birthDate: new Date(),
              //organizationUuid: event.organization_uuid,
            },
          },
        },
      });

      console.log("Customer created", customer);

      const eventData = await prisma.bulkinEvents.update({
        where: {
          uuid: event.uuid,
        },
        data: {
          percentage: (index / data.length) * 100,
        },
      });
      console.log(eventData.percentage, customer.uuid);
    } catch (error) {
      console.log(error);
      await prisma.bulkingEventsFailures.create({
        data: {
          log: `Error creating invoice with the next id: ${data[index].Identificación}`,
          position: index,
          bulkingEventUuid: event.uuid,
        },
      });
    }
  }
  parentPort?.close();
  prisma.$disconnect();
};

Customer();
