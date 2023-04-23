import { parentPort, workerData } from "worker_threads";
import {
  BulkinEvents,
  BuyBaseInvoice,
  PrismaClient,
} from "../../../../generated/client";
import { invoicePurchaseExcel } from "../functions";

const prisma: PrismaClient = new PrismaClient();

export const InvoicePurchase = async () => {
  console.log("Entrando al worker");
  const event = workerData.params.data.newEvent as BulkinEvents;
  const data = workerData.params.data.dataParsed as invoicePurchaseExcel[];
  console.log(event);

  const invoicePastCode = [];
 
  for (let index = 0; index < data.length - 1; index++) {
    // if (index <= 3499) {
    //     continue
    // }
    //console.log("invoicePastCode",invoicePastCode[invoicePastCode.length - 1])
    try {
      const invoicePurchaseData = data[index];
      console.log(invoicePurchaseData)
      const invoiceCodigo = invoicePurchaseData.codigo
      //console.log("invoiceCodigo",invoiceCodigo)
      invoicePastCode.push(invoiceCodigo);

      const bodega = await prisma.warehouse.findFirst({
        where: {
          name: invoicePurchaseData.bodega,
        },
        select: {
          uuid: true,
        },
      });
      
     

      const proveedor = await prisma.supplier.findFirst({
        where: {
          DNI: invoicePurchaseData.identificacion_proveedor.toString(),
        },
        select: {
          uuid: true,
        },
      });

    

      const producto = await prisma.product.findFirst({
        where: {
          SKU: invoicePurchaseData.producto_referencia.toString()
        },
        select:{
          uuid: true
        }
      })

     

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

      const uuidPurchase: string[] = [];

      if (invoicePurchaseData.codigo !== invoicePastCode[invoicePastCode.length - 1]) {
        const purchase = await prisma.purchase.create({
          data: {
            createdAt: invoicePurchaseData.fecha_de_emision,
            subtotal: BigInt(invoicePurchaseData.factura_subtotal),
            total: BigInt(invoicePurchaseData.factura_total),
            organizationUuid: event.organization_uuid ?? "",
            totalTax:
              BigInt(invoicePurchaseData.factura_total_retencion_1) +
              BigInt(invoicePurchaseData.factura_total_retencion_2),
            SupplierPurcahse: {
              create: {
                supplierUuid: proveedor?.uuid ?? "",
              },
            },
            SubproductPurchase: {
              create: {
                organizationUuid: event.organization_uuid ?? "",
                quantity: parseInt(invoicePurchaseData.producto_cantidad) ?? 0,
                productUuid: producto?.uuid,
                UpcomingPurchase: {
                  create: {
                    organizationUuid: event.organization_uuid ?? "",
                    subQuantity:
                      parseInt(invoicePurchaseData.producto_cantidad) ?? 0,
                    warehouse_uuid: bodega?.uuid ?? "",
                  },
                },
              },
            },
          },
          select: {
            uuid: true,
          },
        });

        const baseinvoice = await prisma.baseInvoice.create({
          data: {
            address: invoicePurchaseData.direccion_proveedor,
            dateExpedition: invoicePurchaseData.fecha_de_emision,
            dateExpiration: invoicePurchaseData.vencimiento,
            description: invoicePurchaseData.description,
            organizationUuid: event.organization_uuid ?? "",
            title: "Factura Compra",
            footer: "Gracias por su compra",
            createdAt: invoicePurchaseData.fecha_de_emision,
            total: BigInt(invoicePurchaseData.factura_total),
            subtotal: BigInt(invoicePurchaseData.factura_subtotal),
            type_document: "FACTURA",
            type_invoice: "COMPRA",
            totalTax:
              BigInt(invoicePurchaseData.factura_total_retencion_1) +
              BigInt(invoicePurchaseData.factura_total_retencion_2),
            saldoPorPagar:
              (invoicePurchaseData.estado === "Por pagar"
                ? BigInt(invoicePurchaseData.factura_total)
                : 0) ?? 0,
            nit: invoicePurchaseData.identificacion_proveedor,
            key: invoicePurchaseData.codigo,
            styles: "",
            discount: 0,
            email: "",
            resolution: "",
            web: "",
            tax:
              BigInt(invoicePurchaseData.factura_total_retencion_1) +
              BigInt(invoicePurchaseData.factura_total_retencion_2),
            taxporcentage: 0,
          },
          select: {
            uuid: true,
          },
        });

        const buyInvoicePurchase = await prisma.buyBaseInvoice.create({
          data: {
            uuid: "",
            createdAt: new Date(invoicePurchaseData?.fecha_de_emision),
            organizationUuid: event.organization_uuid ?? "",
            isExternal: true,
            PurchaseUuid: purchase?.uuid ?? "",
            baseInvoiceUuid: baseinvoice?.uuid ?? "",
            data: invoicePurchaseData?.description ?? "",
            SupplierUuid: proveedor?.uuid ?? "",
            fechaDeVencimiento: new Date(invoicePurchaseData?.vencimiento),
            description: invoicePurchaseData?.description ?? "",
            pref: "",
            number: invoicePurchaseData?.codigo ?? "",
            Supplier: {
              connect:
                {
                  uuid: proveedor?.uuid ?? "",
                } ?? "",
            },
            pagado:
              (invoicePurchaseData.estado === "Pagado"
                ? BigInt(invoicePurchaseData.factura_total)
                : 0) ?? 0,
            PorPagar:
              (invoicePurchaseData.estado === "Por pagar"
                ? BigInt(invoicePurchaseData.factura_total)
                : 0) ?? 0,
          } as BuyBaseInvoice,
        });

        uuidPurchase.push(purchase.uuid);
       
      } else {
        const uuidSearch = await prisma.purchase.findFirst({
          where: {
            uuid: uuidPurchase[uuidPurchase.length - 1],
          },
        });
        await prisma.purchase.upsert({
          where: {
            uuid: uuidSearch?.uuid,
          },
          create: {
            SubproductPurchase: {
              create: {
                organizationUuid: event.organization_uuid ?? "",
                quantity: parseInt(invoicePurchaseData.producto_cantidad) ?? 0,
                productUuid: producto?.uuid,
                UpcomingPurchase: {
                  create: {
                    organizationUuid: event.organization_uuid ?? "",
                    subQuantity:
                      parseInt(invoicePurchaseData.producto_cantidad) ?? 0,
                    warehouse_uuid: bodega?.uuid ?? "",
                  },
                },
              },
            },
          },
          update: {
            SubproductPurchase: {
              create: {
                organizationUuid: event.organization_uuid ?? "",
              },
            },
          },
        });
      }

      const eventData = await prisma.bulkinEvents.update({
        where: {
          uuid: event.uuid,
        },
        data: {
          percentage: (index / data.length) * 100,
        },
      });
      console.log(eventData.percentage, invoicePurchaseData.codigo);
    } catch (error) {
      console.log(error);
      await prisma.bulkingEventsFailures.create({
        data: {
          log: `Error creating invoice with the next id: ${data[index].codigo}`,
          position: index,
          bulkingEventUuid: event.uuid,
        },
      });
    }
  }
  parentPort?.close();
  prisma.$disconnect();
};

InvoicePurchase();
