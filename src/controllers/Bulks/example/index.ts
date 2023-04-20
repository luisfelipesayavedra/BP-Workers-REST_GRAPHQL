import { Request, Response } from "express";
import excelToJson from "convert-excel-to-json";
import { Worker } from "worker_threads";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "../../../generated/client";
import { Payload } from "../../../middlewares";

export const BpExample = async (req: Request, res: Response) => {
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
        rows: 23,
      },
      columnToKey: {
        ["A"]: "id",
        ["B"]: "firstName",
        ["C"]: "lastName",
        ["D"]: "localCreation",
        ["E"]: "birthDate",
        ["F"]: "email",
        ["G"]: "DNI",
        ["H"]: "gender",
        ["I"]: "phone",
        ["J"]: "profileImg",
        ["K"]: "typeDoc",
        ["L"]: "country",
        ["M"]: "state",
        ["N"]: "city",
        ["O"]: "address",
        ["P"]: "instagram",
        ["Q"]: "sendEmail",
        }
    });
    const dataParsed = bufferToJson["Worksheet"]
    const processWorker = new Worker(
      "./src/controllers/Bulks/Customers/workers/worker.import.js",
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
