import { Request, Response } from "express";
import excelToJson from "convert-excel-to-json";
import { Worker } from "worker_threads";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "../../../generated/client";
import { Payload } from "../../../middlewares";

export const BpUser = async (req: Request, res: Response) => {
  try {
    const pubSub: PubSub = req.app.get("pubSub")
    const prisma: PrismaClient = req.app.get("prisma")
    const {organizationUuid} = req.body.payload as Payload
    const tmp = req.files?.excel;
    
    const newEvent = await prisma.bulkinEvents.create({
        data: {
            organization_uuid: organizationUuid,
            percentage: 0,
            type: "CUSTOMERS"
        }
    })
    const bufferToJson = excelToJson({
      //@ts-ignore
      source: tmp.data,
      header: {
        rows: 1,
      },
      columnToKey: {
        ['A']: 'id',
        ['B']: 'firstName',
        ['C']: 'lastName',
        ['D']: 'dni',
        ['E']: 'type_dni',
        ['F']: 'birthday',
        ['G']: 'gender',
        ['H']: 'email',
        ['I']: 'role',
        ['J']: 'country',
        ['K']: 'state',
        ['L']: 'city',
        ['M']: 'address',
        ['N']: 'profileImg',
        ['O']: 'phone',
        ['P']: 'permissions',
        ['Q']: 'sendEmail',
        ['R']: 'instagram',
        ['S']: 'account_status',
      },
    });
    console.log('🚀 ~ file: index.ts:45 ~ BpUser ~ bufferToJson:', bufferToJson);
    console.log(bufferToJson['Worksheet'].length);
    const dataParsed = bufferToJson['Worksheet'];
    const processWorker = new Worker(
      "./src/controllers/Bulks/users/workers/worker.import.js",
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
