import { Request, Response } from "express";
import excelToJson from "convert-excel-to-json";
import { Worker } from "worker_threads";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "../../../generated/client";
import { Payload } from "../../../middlewares";
import { productDataParsed } from "./functions";

export const ProductsBulkControllers = async (req: Request, res: Response) => {
    try {
        const prisma: PrismaClient = req.app.get("prisma")
        const pubSub: PubSub = req.app.get("pubSub")
        const {organizationUuid} = req.body.payload as Payload

        const newEvent = await prisma.bulkinEvents.create({
            data: {
                percentage: 0,
                type: "PRODUCT",
                organization_uuid: organizationUuid
            }
        })

        const tmp = req.files?.excel;
        const bufferToJson = excelToJson({
              //@ts-ignore
              source: tmp.data,
              header: {
                rows: 23,
              },
              columnToKey: {
                ["A"]: "Numero de Pagina Allegra",
                ["B"]: "Consecutivo de Pagina",
                ["C"]: "name",
                ["D"]: "Codigo",
                ["E"]: "sku",
                ["F"]: "categories",
                ["G"]: "Tipo de Item",
                ["H"]: "Unidad de Medida",
                ["I"]: "allegra_img",
                ["J"]: "price",
                ["K"]: "Impuessobre las ventas",
                ["L"]: "Precios Sin Impuesto",
                ["M"]: "minPrice",
                ["N"]: "quantity",
                ["O"]: "Lista de Precios",
                ["P"]: "img",
                ["Q"]: "warehouses",
              },
            });
            const dataParsed = productDataParsed(bufferToJson.Worksheet)
            const processWorker = new Worker(
                "./src/Api/controllers/Bulks/products/workers/worker.import.js",
                {
                  workerData: {
                    path: "./index.ts",
                    params: {
                      data: {
                          dataParsed,
                          newEvent,
                          organizationUuid
                      },
                    },
                  },
                }
              );
              processWorker.on("message", (data) => {
                  data
                  pubSub.publish(`event_worker: ${newEvent.uuid}`, {})
              })
        return res.send(dataParsed)
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }   
}