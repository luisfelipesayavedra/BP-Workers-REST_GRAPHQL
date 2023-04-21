import { parentPort, workerData } from "worker_threads";
import { BulkinEvents, PrismaClient } from "../../../../generated/client";
import { providerExcel } from "../functions";
import { TYPE_DNI } from "../../../../generated/client";

const prisma: PrismaClient = new PrismaClient();

export const Supplier = async () => {
    console.log("Entrando al worker")
    const event = workerData.params.data.newEvent as BulkinEvents
    const data = workerData.params.data.dataParsed as providerExcel[];
    console.log(event)
    for (let index = 0; index < data.length; index++) {
        // if (index <= 3499) {
        //     continue
        // }
        try {
            const parseTypeDoc: {
                [id: string]: TYPE_DNI
            } = {
                ["Número de identificación tributaria"]: TYPE_DNI.NIT,
                ["Cédula de ciudadanía"]: TYPE_DNI.CC,
                ["Documento de identificación extranjero"]: TYPE_DNI.DIE
            } 
            const supplierData = data[index]
            const admin = await prisma.internalUser.findFirst({
                where: {
                    organizationUuid: event.organization_uuid,
                    email: "agudelocjuan@gmail.com",
                    user_role: {
                        type: {
                            equals: "SUPERUSER"
                        }
                    }
                }
            })
            console.log(parseTypeDoc?.[supplierData.TypeDoc]);
           const name = `${supplierData.name ?? ''} ${supplierData.name2 ?? ''} ${supplierData.lastName ?? ''} ${supplierData.lastName2 ?? ''}`
            const phone =
              supplierData.phone != undefined ? String(supplierData.phone) : null ??
              supplierData.phone2 != undefined ? String(supplierData.phone2) : null ??
              supplierData.phone3 != undefined ? String(supplierData.phone3) : null;
              console.log('phone: ',phone);
           const provider = await prisma.supplier.create({
             data: {
               name,
               organizationUuid: admin!.organizationUuid,
               TypeDOC: parseTypeDoc?.[supplierData.TypeDoc],
               DNI: String(
                 supplierData.DNI != undefined ? supplierData.DNI : ''
               ),
               phone: phone ?? '',
               country: String(
                 supplierData.country != undefined ? supplierData.country : ''
               ),
               state: String(
                 supplierData.state != undefined ? supplierData.state : ''
               ),
               city: String(
                 supplierData.city != undefined ? supplierData.city : ''
               ),
               address: String(
                 supplierData.address != undefined ? supplierData.address : ''
               ),
               email: String(
                 supplierData.email != undefined ? supplierData.email : ''
               ),
               firstNameContact: '',
               LastNameContact: '',
               emailContact: '',
               phoneContact: '',
               instagram: '',
               createdBy: admin!.uuid,
             },
           });

           const eventData = await prisma.bulkinEvents.update({
            where: {
                uuid: event.uuid
            },
            data: {
                percentage: (index / data.length)  * 100
            }
           })
           console.log(eventData.percentage, provider.uuid)
        }catch(error) {
            console.log(error)
            await prisma.bulkingEventsFailures.create({
                data: {
                    log: `Error creating invoice with the next id: ${data[index].DNI}`,
                    position: index,
                    bulkingEventUuid: event.uuid
                }
            })
        }
    }
    parentPort?.close()
    prisma.$disconnect()
}

Supplier()