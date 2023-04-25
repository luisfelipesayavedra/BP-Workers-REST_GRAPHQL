import { parentPort, workerData } from "worker_threads";
import {
  BulkinEvents,
  PrismaClient,
} from "../../../../generated/client";
import { noteDebitPurchaseExcel } from "../functions";
import fs from 'fs';
import { TYPEINVOICE } from "../../../../generated/client";
import { BUYORSELL } from "../../../../generated/client";

const prisma: PrismaClient = new PrismaClient();

export const noteDebitPurchase = async () => {
  console.log("Entrando al worker");
  const event = workerData.params.data.newEvent as BulkinEvents;
  const data = workerData.params.data.dataParsed as noteDebitPurchaseExcel[];
  console.log(event);

  let uuidPurchase: any[] = [];
  let errorsProductLog: any[] = []
  let errorsLog: any[] = []
  let errorsSupplierLog: any[] = []
  let errorsBaseInvoiceLog: any[] = []
  console.log("uuidPurchase", uuidPurchase);
  for (let index = 0; index < data.length; index++) {
    // if (index <= 3499) {
    //     continue
    // }
    //console.log("noteDebitPastCode",noteDebitPastCode[noteDebitPastCode.length - 1])
    try {
      const noteDebitPurchaseData = data[index];
      //console.log(noteDebitPurchaseData)
      const noteDebitCodigo = noteDebitPurchaseData.numero;
      //console.log("noteDebitCodigo",noteDebitCodigo)
      //noteDebitPastCode.push(noteDebitCodigo);

      // if(!bodega) {
      //   errorsWarehouseLog.push(`${noteDebitPurchaseData.bodega}`);
      //   console.log(`bodega not found:  ${noteDebitPurchaseData.bodega}`);
      //   throw new Error(`Warehouse not found ${noteDebitPurchaseData.bodega}`)
      // }
      

      let createdAt = "";
     if(String(noteDebitPurchaseData.fecha_creacion).includes("/") ){

      const fechaEmision = noteDebitPurchaseData.fecha_creacion;
      const partesFecha = fechaEmision.split("/"); // Divide la cadena por "/"
      const dia = partesFecha[0]; // Obtiene el día
      const mes = partesFecha[1]; // Obtiene el mes
      const anio = partesFecha[2]; // Obtiene el año

      // Paso 2: Crear un objeto Date con los valores de día, mes y año en formato ISO 8601
      createdAt = `${anio}-${mes}-${dia}T00:00:00Z`; // Formato ISO 8601
     }else{
      createdAt = noteDebitPurchaseData.fecha_creacion;
     }
     const existNote = await prisma.noteDebit.findFirst({
      where: {
        numberNote: String(noteDebitPurchaseData.numero)
      },
      select: {
        uuid: true
      }
     })
     const basenoteDebit = await prisma.baseInvoice.findFirst({
       where: {
         key: String(noteDebitPurchaseData.factura),
       },
       include: {
         BuyBaseInvoice: {
           include: {
             Purchase: {
               include: {
                 SubproductPurchase: true,
               },
             },
           },
         },
       },
     });

     if (!basenoteDebit && noteDebitPurchaseData.factura != '\r\n') {
       errorsBaseInvoiceLog.push(`${noteDebitPurchaseData.factura}`);
       console.log(`factura not found:  ${noteDebitPurchaseData.factura}`);
      //  throw new Error(`invoice not found ${noteDebitPurchaseData.factura}`);
     }
     const supplier = await prisma.supplier.findFirst({
       where: {
          DNI: String(noteDebitPurchaseData.provider_dni)
       },
       select: {
        uuid: true,
       }
     });

     const products = await prisma.product.findFirst({
        where: {
          name: String(noteDebitPurchaseData.item_name),
        }
     });
     if(!products) {
        errorsProductLog.push(`${noteDebitPurchaseData.item_name}`);
        console.log(`products not found:  ${noteDebitPurchaseData.item_name}`);
        // throw new Error(`products not found ${noteDebitPurchaseData.item_name}`)
      }
     if(!supplier) {
        errorsSupplierLog.push(`${noteDebitPurchaseData.provider_dni}`);
        console.log(`supplier not found:  ${noteDebitPurchaseData.provider_dni}`);
        // throw new Error(`invoice not found ${noteDebitPurchaseData.provider_dni}`)
      }
      if(existNote) {
        await prisma.noteDebit.update({
          where: {
            uuid: existNote.uuid,
          },
          data: {
            noteDebitProducts: {
            create: {
              productUuid: products!.uuid ?? '',
              quantity: parseInt(noteDebitPurchaseData.item_quantity),
              organizationUuid: event.organization_uuid ?? '',
              data: '',
            },
          },
          }
        })
        continue
      }
      (await prisma.noteDebit.create({
        data: {
          organizationUuid: event.organization_uuid ?? '',
          data: '',
          createdAt,
          saldoPorPagar: BigInt(
            String(noteDebitPurchaseData.saldo_pagar.replace(',', '') ?? 0) ?? 0
          ),
          total: BigInt(String(noteDebitPurchaseData.total_note.replace(',', '') ?? 0) ?? 0),
          pref: '',
          ...(supplier ? {
            supplierUuid: supplier!.uuid
          }: {}),
          baseInvoiceUuid: basenoteDebit?.uuid,
          description: '',
          numberNote: String(noteDebitPurchaseData.numero) ?? '',
          
          ...(products ? {
            noteDebitProducts: {
            create: {
              productUuid: products!.uuid ?? '',
              quantity: parseInt(noteDebitPurchaseData.item_quantity),
              organizationUuid: event.organization_uuid ?? '',
              data: '',
            },
          },
          }: {})
        },
      })) as any;


      const eventData = await prisma.bulkinEvents.update({
        where: {
          uuid: event.uuid,
        },
        data: {
          percentage: (index / data.length) * 100,
        },
      });
      console.log(eventData.percentage, noteDebitPurchaseData.numero);
    } catch (error: any) {
      console.log(error);
      errorsLog.push(
        {
          message: `Error creating noteDebit with the next id: ${data[index].numero}`,
          reason: error.message
        }
      );
      await prisma.bulkingEventsFailures.create({
        data: {
          log: `Error creating noteDebit with the next id: ${data[index].numero}`,
          position: index,
          bulkingEventUuid: event.uuid,
        },
      });
    }
  }
  fs.writeFile(
    './src/controllers/Bulks/notas-debito/logger/errorsLog.json',
    JSON.stringify(errorsLog),
    'utf-8',
    () => {
      console.log(
        'data noteDebits saved with errors: ' +
          errorsLog.length +
          ' of ' +
          data.length
      );
    }
  );
  fs.writeFile(
    './src/controllers/Bulks/notas-debito/logger/errorsProductLog.json',
    JSON.stringify(errorsProductLog),
    'utf-8',
    () => {
      console.log(
        'data noteDebits saved with errors: ' +
          errorsLog.length +
          ' of ' +
          data.length
      );
    }
  );
  fs.writeFile(
    './src/controllers/Bulks/notas-debito/logger/errorsBaseInvoiceLog.json',
    JSON.stringify(errorsBaseInvoiceLog),
    'utf-8',
    () => {
      console.log(
        'data noteDebits saved with errors: ' +
          errorsLog.length +
          ' of ' +
          data.length
      );
    }
  );
  fs.writeFile(
    './src/controllers/Bulks/notas-debito/logger/errorsSupplierLog.json',
    JSON.stringify(errorsSupplierLog),
    'utf-8',
    () => {
      console.log(
        'data noteDebits saved with errors: ' +
          errorsLog.length +
          ' of ' +
          data.length
      );
    }
  );
  parentPort?.close();
  prisma.$disconnect();
};

noteDebitPurchase();
