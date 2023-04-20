import { parentPort, workerData } from "worker_threads";
import {
  Prisma,
  BulkinEvents,
  PrismaClient,
  SubproductPurchase,
} from "../../../../generated/client";
import { PurchaseInvoice } from "../functions/index";
import fs from "fs";

const prisma: PrismaClient = new PrismaClient();

function parseDatetime(value: string) {
  let valueSplit = value.split("/")
  let valueParse = String(valueSplit[2] + '-' + valueSplit[1] + '-' + valueSplit[0])
  return valueParse
}


export const purchaseInvoice = async () => {
  console.log("Entrando al worker");
  const event = workerData.params.data.newEvent as BulkinEvents;
  const data = workerData.params.data.dataParsed as PurchaseInvoice[];
  const notfoundItems = [];
  const notfoundWarehouses = [];
  console.log(event);
  for (let index = 0; index < data.length - 1; index++) {
    // console.log([...data[index].items.map((i: any) =>i.concepto)])
    try {
      const listItems = [
        ...data[index].items.map((i: any) => {
          return { product: i.concepto, warehouse: i.Bodega };
        }),
      ];
      const products = await prisma.product.findMany({
        where: {
          organizationUuid: event.organization_uuid,
          name: {
            in: [...listItems.map((i) => i.product)],
          },
        },
      });

      if (products.length === 0) {
        notfoundItems.push(...listItems.map((i) => i.product));
        continue
      }
      data[index].items.forEach((p) => {
        const match = products.find((prod) => (prod.name = p.concepto));
        p["uuid"] = match?.uuid;
        return p;
      });

      const warehouses = await prisma.warehouse.findMany({
        where: {
          name: {
            in: [...listItems.map((i) => i.warehouse)],
          },
        },
      });

      if (warehouses.length === 0) {
        notfoundWarehouses.push(listItems.map((i) => i.warehouse));
        continue
      }


      data[index].items.forEach((p) => {
        const match = warehouses.find((warehouse) => (warehouse.name = p.Bodega));
        p["BodegaUuid"] = match?.uuid;
        return p;
      });
      
      const createPurchaseInvoice = await prisma.purchase.create({
        data: {
          organizationUuid: event.organization_uuid,
          purchaseStatus: "COMPLETED",
          total: parseInt(String(parseFloat(data[index].Total.replace(/[^0-9.-]+/g,"")) * 100)),
          subtotal: parseInt(String(parseFloat(data[index].Primer_Subtotal.replace(/[^0-9.-]+/g,"")) * 100)),
          totalDiscount: parseInt(String(parseFloat(data[index].Descuento_Total.replace(/[^0-9.-]+/g,"")) * 100)),
          totalTax: parseInt(String(parseFloat(data[index].Impuestos.replace(/[^0-9.-]+/g,"")) * 100)),
          PurchaseLegalInvoice: {
            create: {
                basePendingPay: parseInt(String(parseFloat(data[index].Por_Pagar.replace(/[^0-9.-]+/g,"")) * 100)),
                baseTotalValue: parseInt(String(parseFloat(data[index].Total.replace(/[^0-9.-]+/g,"")) * 100)),
                baseValueReceip: parseInt(String(parseFloat(data[index].Valor_recibido.replace(/[^0-9.-]+/g,"")) * 100)),
                expiresIn: new Date(parseDatetime(data[index].Vencimiento)),
                description: "",
                firstSubTotal: parseInt(String(parseFloat(data[index].Primer_Subtotal.replace(/[^0-9.-]+/g,"")) * 100)),
                internalConsecutivce: parseInt(data[index].Consecutivo_Interno),
                InvoiceSerial: data[index].Número_de_Factura,
                organizationUuid: event.organization_uuid!,
                secondSubTotoal: parseInt(String(parseFloat(data[index].Segundo_Subtotal.replace(/[^0-9.-]+/g,"")) * 100)),
                isExternal: true,
                legalStatus: "BASE",
                data: data[index].Adjunto_1 || "",
                data2: data[index].Adjunto_2 || ""
            }
          },
          SubproductPurchase: {
            createMany: {
              data: data[index].items.map((item) => {
                return {
                  productUuid: item.uuid,
                  organizationUuid: event.organization_uuid,
                  quantity: parseInt(String(item.cantidad)),
                } as SubproductPurchase;
              }),
            },
          },
        },
        include: {
          SubproductPurchase: true,
          PurchaseLegalInvoice: true,
        }
      });

      for (const i in createPurchaseInvoice.SubproductPurchase) {
        let upcommingPurchase = await prisma.upcomingPurchase.create({
          data: {
            subQuantity: data[index].items.map(item => item.cantidad).reduce((a, b) => a + b),
            warehouse_uuid: data[index].items[i].BodegaUuid!,
            organizationUuid: event.organization_uuid!,
            subProductPurchaseUuid: createPurchaseInvoice.SubproductPurchase[i].uuid!,
          }  
        })
      }
      await prisma.bulkinEvents.update({
        where: {
          uuid: event.uuid,
        },
        data: {
          percentage: (index * 100) / data.length,
        },
      });
      parentPort?.postMessage("created");
    } catch (error) {
      await prisma.bulkingEventsFailures.create({
        data: {
          log: `Error creating invoice with the next id: ${data[index]["Número_de_Factura"]}`,
          position: index,
          bulkingEventUuid: event.uuid,
        },
      });
      console.log(error)
      parentPort?.postMessage("error");
    }
  }
  fs.writeFile(
    "./src/Api/controllers/Bulks/purchaseInvoice/logger/notfoundItems.json",
    JSON.stringify(notfoundItems),
    "utf-8",
    () => {
      console.log("data saved with errors: " + notfoundItems.length);
    }
  );
  fs.writeFile(
    "./src/Api/controllers/Bulks/purchaseInvoice/logger/notfoundItems.json",
    JSON.stringify(notfoundItems),
    "utf-8",
    () => {
      console.log("data saved with errors: " + notfoundWarehouses.length);
    }
  );
  parentPort?.close();
  prisma.$disconnect();
};

purchaseInvoice();
