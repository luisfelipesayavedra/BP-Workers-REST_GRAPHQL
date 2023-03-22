import { Request, Response } from "express";
import { PubSub } from "graphql-subscriptions";
import { Worker } from "worker_threads";
import excelToJson from "convert-excel-to-json"; 
import fileUpload from "express-fileupload";

export const baseEventController = async (req: Request, res: Response) => {
  try {
    const pubSub: PubSub = req.app.get("pubSub");
    const tmp = req.files!.excel
    const proceso = new Worker('./src/controllers/workerjob/scripts/worker.import.js', {
        workerData: {
            path: "./index.ts",
            params: {
                data: excelToJson({
                    //@ts-ignore
                    source: tmp.data,
                    header: {
                        rows: 6
                    },
                    columnToKey: {["A"]: "first_name", ["B"]: "last_name", ["C"]: "phone", ["D"]: "email", ["E"]: "password", ["F"]: "imagen"}
                }),
            }
        }
    })
    proceso.on("message", (data) => {
        console.log(data.toString())
        pubSub.publish("event_worker", data.toString())
    })
    return res.send("recibido");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
