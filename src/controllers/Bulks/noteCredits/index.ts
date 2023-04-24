import { Request, Response } from "express";
import excelToJson from "convert-excel-to-json";
import { Worker } from "worker_threads";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "../../../generated/client";
import { Payload } from "../../../middlewares";

export const BpNoteCredit = async (req: Request, res: Response) => {
  try {
    const pubSub: PubSub = req.app.get("pubSub")
    const prisma: PrismaClient = req.app.get("prisma")
    const {organizationUuid} = req.body.payload as Payload
    const tmp = req.files?.excel;
    
    const newEvent = await prisma.bulkinEvents.create({
        data: {
            organization_uuid: organizationUuid,
            percentage: 0,
            type: "NOTE_CREDIT"
        }
    })
    const bufferToJson = excelToJson({
      //@ts-ignore
      source: tmp.data,
      header: {
        rows: 1,
      },
      columnToKey: {
        ['A']: 'numberNote',
        ['B']: 'createdAt',
        ['C']: 'statusDian',
        ['D']: 'status',
        ['E']: 'typeNote',
        ['F']: 'warehouse',
        ['H']: 'invoice',
        ['I']: 'customer',
        ['K']: 'customerDni',
        ['Q']: 'razon',
        ['R']: 'itemName',
        ['S']: 'itemRef',
        ['U']: 'itemQuantity',
        ['AC']: 'totalNoteCredit',
        ['AD']: 'totalApply',
      },
    });
    console.log('🚀 ~ file: index.ts:45 ~ BpNoteCredit ~ bufferToJson:', bufferToJson);
    console.log(bufferToJson['Alegra - Notas crédito - SBQ CO'].length);
    const dataParsed = bufferToJson['Alegra - Notas crédito - SBQ CO'];
    const processWorker = new Worker(
      "./src/controllers/Bulks/noteCredits/workers/worker.import.js",
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
