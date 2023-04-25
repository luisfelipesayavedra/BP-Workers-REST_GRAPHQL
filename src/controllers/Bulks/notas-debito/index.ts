import { Request, Response } from "express";
import excelToJson from "convert-excel-to-json";
import { Worker } from "worker_threads";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "../../../generated/client";
//import { Payload } from "../../../middlewares";

export const BpNoteDebitPurchase = async (req: Request, res: Response) => {
  try {
    const pubSub: PubSub = req.app.get("pubSub")
    const prisma: PrismaClient = req.app.get("prisma")
    const organizationUuid = "c0517e80-ab0d-41e9-b23d-44783c187820"//req.body.payload as Payload 
    const tmp = req.files?.excel;
    
    const newEvent = await prisma.bulkinEvents.create({
        data: {
            organization_uuid: organizationUuid,
            percentage: 0,
            type: "NOTE_DEBIT"
        }
    })
    const bufferToJson = excelToJson({
      //@ts-ignore
      source: tmp.data,
      header: {
        rows: 1,
      },
      columnToKey: {
        ['A']: 'numero',
        ['B']: 'fecha_creacion',
        ['C']: 'bodega',
        ['E']: 'factura',
        ['F']: 'cliente_type_dni',
        ['H']: 'provider_dni',
        ['L']: 'item_name',
        ['N']: 'item_quantity',
        ['V']: 'total_note',
        ['W']: 'saldo_pagar',
      },
    });
    console.log(bufferToJson)
    const dataParsed = bufferToJson["Worksheet"]
    const processWorker = new Worker(
      "./src/controllers/Bulks/notas-debito/workers/worker.import.js",
      {
        workerData: {
          path: "./index.ts",
          params: {
            data: {
                dataParsed,
                newEvent
            },
          },
        },
      }
    );
    processWorker.on("message", (data) => {
        data
        pubSub.publish(`event_worker: ${newEvent.uuid}`, {})
    })
    return res.send({...dataParsed});
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
