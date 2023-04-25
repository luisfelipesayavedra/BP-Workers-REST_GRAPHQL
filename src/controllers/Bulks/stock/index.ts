import { Request, Response } from "express";
import excelToJson from "convert-excel-to-json";
import { Worker } from "worker_threads";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "../../../generated/client";
import { Payload } from "../../../middlewares";
import { parseStock } from "./functions";

export const ProductStocks = async (req: Request, res: Response) => {
  try {
    const pubSub: PubSub = req.app.get("pubSub")
    const prisma: PrismaClient = req.app.get("prisma")
    const {organizationUuid} = req.body.payload as Payload 
    const tmp = req.files?.excel;
    
    // const newEvent = await prisma.bulkinEvents.create({
    //     data: {
    //         organization_uuid: organizationUuid,
    //         percentage: 0,
    //         type: "CUSTOMERS"
    //     }
    // })
    const bufferToJson = excelToJson({
      //@ts-ignore
      source: tmp.data,
      header: {
        rows: 1,
      },
      columnToKey: {
        ["C"]: "Titulo del Producto",
        ["D"]: "Codigo",
        ["E"]: "Referencia",
        ["N"]: "Stock",
        ["Q"]: "Bodegas",
        }
    });
    const dataParsed = parseStock(bufferToJson["Hoja1"])
    // const processWorker = new Worker(
    //   "./src/controllers/Bulks/Customers/workers/worker.import.js",
    //   {
    //     workerData: {
    //       path: "./index.ts",
    //       params: {
    //         data: {
    //             dataParsed,
    //             newEvent
    //         },
    //       },
    //     },
    //   }
    // );
    // processWorker.on("message", (data) => {
    //     data
    //     pubSub.publish(`event_worker: ${newEvent.uuid}`, {})
    // })
    return res.send({...dataParsed});
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
