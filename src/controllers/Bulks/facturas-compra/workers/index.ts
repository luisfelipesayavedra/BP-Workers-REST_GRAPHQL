import { parentPort, workerData } from "worker_threads";
import {
  BulkinEvents,
  BuyBaseInvoice,
  PrismaClient,
  Purchase,
} from "../../../../generated/client";
import { invoicePurchaseExcel } from "../functions";

const prisma: PrismaClient = new PrismaClient();

export const InvoicePurchase = async () => {
  console.log("Entrando al worker");
  const event = workerData.params.data.newEvent as BulkinEvents;
  const data = workerData.params.data.dataParsed as invoicePurchaseExcel[];
  console.log(event);

  let invoicePastCode = ["0"];
  let uuidPurchase: any[] = [];
  console.log("uuidPurchase", uuidPurchase);
  for (let index = 0; index < data.length - 1; index++) {
    // if (index <= 3499) {
    //     continue
    // }
    //console.log("invoicePastCode",invoicePastCode[invoicePastCode.length - 1])
    try {
      const invoicePurchaseData = data[index];
      //console.log(invoicePurchaseData)
      const invoiceCodigo = invoicePurchaseData.codigo;
      //console.log("invoiceCodigo",invoiceCodigo)
      //invoicePastCode.push(invoiceCodigo);

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
          OR: [
            {
              SKU: String(invoicePurchaseData.producto_referencia),
            },
            {
              name: invoicePurchaseData.producto_nombre,
            },
          ],
        },
        select: {
          uuid: true,
        },
      });

      let fechaEmisionISO8601 = "";
     if(String(invoicePurchaseData.fecha_de_emision).includes("/") ){

      const fechaEmision = invoicePurchaseData.fecha_de_emision;
      const partesFecha = fechaEmision.split("/"); // Divide la cadena por "/"
      const dia = partesFecha[0]; // Obtiene el día
      const mes = partesFecha[1]; // Obtiene el mes
      const anio = partesFecha[2]; // Obtiene el año

      // Paso 2: Crear un objeto Date con los valores de día, mes y año en formato ISO 8601
      fechaEmisionISO8601 = `${anio}-${mes}-${dia}T00:00:00Z`; // Formato ISO 8601
     }else{
      fechaEmisionISO8601 = invoicePurchaseData.fecha_de_emision;
     }
      

      if (
        invoicePurchaseData.codigo !==
        invoicePastCode[invoicePastCode.length - 1]
      ) {
        const purchase = await prisma.purchase.create({
          data: {
            createdAt: new Date(fechaEmisionISO8601),
            subtotal: BigInt(
              invoicePurchaseData.factura_subtotal.replace(",", "")
            ),
            total: BigInt(invoicePurchaseData.factura_total.replace(",", "")),
            purchaseStatus: "COMPLETED",
            organizationUuid: event.organization_uuid ?? "",
            totalTax:
              BigInt(invoicePurchaseData.factura_total_retencion_1 ?? 0) +
              BigInt(invoicePurchaseData.factura_total_retencion_2 ?? 0),
            SupplierPurcahse: {
              create: {
                supplierUuid: proveedor?.uuid ?? "",
              },
            },
            SubproductPurchase: {
              create: {
                organizationUuid: event.organization_uuid ?? "",
                quantity:
                  parseFloat(
                    invoicePurchaseData.producto_cantidad.replace(",", ".")
                  ) ?? 0,
                productUuid: producto?.uuid,
                /* UpcomingPurchase: {
                  create: {
                    organizationUuid: event.organization_uuid ?? "",
                    subQuantity:
                      parseFloat(
                        invoicePurchaseData.producto_cantidad.replace(",", ".")
                      ) ?? 0,
                    warehouse_uuid: bodega?.uuid ?? "",
                    createdAt: new Date(fechaEmisionISO8601),
                  },
                }, */
              },
            },
          },
          include: {
            SubproductPurchase: {
              include: {
                UpcomingPurchase: true,
              },
            },
          },
        });

        uuidPurchase.push(purchase.uuid);

        await prisma.upcomingPurchase.create({
          data: {
            organizationUuid: event.organization_uuid ?? "",
            subQuantity:
              parseFloat(
                invoicePurchaseData.producto_cantidad.replace(",", ".")
              ) ?? 0,
            warehouse_uuid: bodega?.uuid ?? "",
            purchaseUuid: purchase.uuid,
            createdAt: new Date(fechaEmisionISO8601),
            subProductPurchaseUuid: purchase.SubproductPurchase[0].uuid,
          },
        });

        const baseinvoice = await prisma.baseInvoice.create({
          data: {
            address: invoicePurchaseData.direccion_proveedor ?? "",
            dateExpedition: new Date(fechaEmisionISO8601),
            dateExpiration: invoicePurchaseData.vencimiento,
            description: invoicePurchaseData.description ?? "",
            organizationUuid: event.organization_uuid ?? "",
            title: "Factura Compra",
            footer: "Gracias por su compra",
            createdAt: new Date(fechaEmisionISO8601),
            total: BigInt(invoicePurchaseData.factura_total.replace(",", "")),
            subtotal: BigInt(
              invoicePurchaseData.factura_subtotal.replace(",", "")
            ),
            type_document: "FACTURA",
            type_invoice: "COMPRA",
            totalTax:
              BigInt(invoicePurchaseData.factura_total_retencion_1) +
              BigInt(invoicePurchaseData.factura_total_retencion_2 ?? 0),
            saldoPorPagar:
              (invoicePurchaseData.estado === "Por pagar"
                ? BigInt(invoicePurchaseData.factura_total.replace(",", "."))
                : 0) ?? 0,
            nit: String(invoicePurchaseData.identificacion_proveedor),
            key: invoicePurchaseData.codigo,
            styles: "",
            discount: 0,
            email: "",
            resolution: "",
            web: "",
            tax:
              BigInt(invoicePurchaseData.factura_total_retencion_1) +
              BigInt(invoicePurchaseData.factura_total_retencion_2 ?? 0),
            taxporcentage: 0,
          },
          select: {
            uuid: true,
          },
        });

        await prisma.buyBaseInvoice.create({
          data: {
            createdAt: new Date(fechaEmisionISO8601),
            organizationUuid: event.organization_uuid ?? "",
            isExternal: true,
            PurchaseUuid: purchase?.uuid,
            baseInvoiceUuid: baseinvoice?.uuid,
            data: invoicePurchaseData?.description ?? "",
            SupplierUuid: proveedor?.uuid ?? "",
            fechaDeVencimiento: new Date(invoicePurchaseData?.vencimiento),
            description: invoicePurchaseData?.description ?? "",
            pref: "",
            number: invoicePurchaseData?.codigo ?? "",
            pagado:
              (invoicePurchaseData.estado === "Pagado"
                ? BigInt(invoicePurchaseData.factura_total.replace(",", ""))
                : 0) ?? 0,
            PorPagar:
              (invoicePurchaseData.estado === "Por pagar"
                ? BigInt(invoicePurchaseData.factura_total.replace(",", ""))
                : 0) ?? 0,
          } as BuyBaseInvoice,
        });
      } else {
        console.log("uuidPurchase", uuidPurchase[uuidPurchase.length - 1]);
        const purchaseUpsert = await prisma.purchase.upsert({
          where: {
            uuid: uuidPurchase[uuidPurchase.length - 1],
          },
          create: {
            SubproductPurchase: {
              create: {
                organizationUuid: event.organization_uuid ?? "",
                quantity:
                  parseFloat(
                    invoicePurchaseData.producto_cantidad.replace(",", ".")
                  ) ?? 0,
                productUuid: producto?.uuid,
                UpcomingPurchase: {
                  create: {
                    organizationUuid: event?.organization_uuid ?? "",
                    purchaseUuid: uuidPurchase[uuidPurchase.length - 1],
                    createdAt: new Date(fechaEmisionISO8601),
                    subQuantity:
                      parseInt(invoicePurchaseData?.producto_cantidad) ?? 0,
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
                quantity:
                  parseFloat(
                    invoicePurchaseData.producto_cantidad.replace(",", ".")
                  ) ?? 0,
                productUuid: producto?.uuid,
                UpcomingPurchase: {
                  create: {
                    organizationUuid: event?.organization_uuid ?? "",
                    purchaseUuid: uuidPurchase[uuidPurchase.length - 1],
                    createdAt: new Date(fechaEmisionISO8601),
                    subQuantity:
                      parseInt(invoicePurchaseData?.producto_cantidad) ?? 0,
                    warehouse_uuid: bodega?.uuid ?? "",
                  },
                },
              },
            },
          },
          include: {
            SubproductPurchase: {
              include: {
                UpcomingPurchase: true,
              },
            },
            UpcomingPurchase: true,
          },
        });

        /*  await prisma.upcomingPurchase.create({
          data: {
            organizationUuid: event.organization_uuid ?? "",
            subQuantity:
              parseFloat(
                invoicePurchaseData.producto_cantidad.replace(",", ".")
              ) ?? 0,
            warehouse_uuid: bodega?.uuid ?? "",
            purchaseUuid: purchaseUpsert.uuid,
            createdAt: new Date(fechaEmisionISO8601),
            subProductPurchaseUuid: purchaseUpsert.SubproductPurchase[0].uuid,
          }, */
        /* update: {
            organizationUuid: event.organization_uuid ?? "",
            subQuantity:
              parseFloat(
                invoicePurchaseData.producto_cantidad.replace(",", ".")
              ) ?? 0,
            warehouse_uuid: bodega?.uuid ?? "",
            purchaseUuid: purchaseUpsert.uuid,
            createdAt: new Date(fechaEmisionISO8601),
            subProductPurchaseUuid: purchaseUpsert.SubproductPurchase[0].uuid,
          } */
        //});
      }
      invoicePastCode.push(invoiceCodigo);
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
