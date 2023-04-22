import { parentPort, workerData } from "worker_threads";
import { BulkinEvents, PrismaClient } from "../../../../generated/client";
import { Products } from "../functions";

const prisma: PrismaClient = new PrismaClient();

export const Customer = async () => {
  console.log("Entrando al worker");
  const event = workerData.params.data.newEvent as BulkinEvents;
  const data = workerData.params.data.dataParsed as Products[];
  console.log(event);
  for (let index = 0; index < data.length - 1; index++) {
    // if (index <= 3499) {
    //     continue
    // }
    try {

        if(data[index].Nombre.includes("prueba")) {
            continue
        }
      const admin = await prisma.internalUser.findFirst({
        where: {
          organizationUuid: event.organization_uuid,
          email: "agudelocjuan@gmail.com",
          user_role: {
            type: {
              equals: "SUPERUSER",
            },
          },
        },
      });

      const marca = await prisma.brand.findFirstOrThrow({
        where: {
          name: data[index].Marca,
          organizationUuid: event.organization_uuid,
        },
      });

      const categorias = await prisma.categories.findFirstOrThrow({
        where: {
          name: data[index].Categoría,
          organizationUuid: event.organization_uuid,
        },
      });

      const product = await prisma.product.create({
        data: {
          name: data[index].Nombre,
          description: data[index].Nombre,
          organizationUuid: event.organization_uuid,
          minimalPrice: parseInt(
            String(parseFloat(data[index].Costo_inicial) * 100)
          ),
          price: parseInt(String(parseFloat(data[index].Precio_General) * 100)),
          SKU: String(data[index].Referencia),
          principalImage: data[index].Img,
          BrandProduct: {
            create: {
              brandUuid: marca.uuid,
            },
          },
          categories_products: {
            create: {
              categoryUuid: categorias.uuid,
            },
          },
        },
        include: {
          categories_products: {
            include: {
              category: true,
            },
          },
          BrandProduct: {
            include: {
              brand: true,
            },
          },
        },
      });

      const eventData = await prisma.bulkinEvents.update({
        where: {
          uuid: event.uuid,
        },
        data: {
          percentage: (index / data.length) * 100,
        },
      });
      console.log(eventData.percentage, {
        uuid: product.uuid,
        category: product.categories_products[0].category,
        brand: product.BrandProduct[0].brand,
      });
    } catch (error) {
      console.log(error);
      await prisma.bulkingEventsFailures.create({
        data: {
          log: `Error creating invoice with the next id: ${data[index].Referencia}`,
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
