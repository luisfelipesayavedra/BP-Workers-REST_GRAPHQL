import { Request, Response } from "express";
import excelToJson from "convert-excel-to-json";
import { Worker } from "worker_threads";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "../../../generated/client";
import { Payload } from "../../../middlewares";
import { productDataParsed } from "./functions";

export const Products = async (req: Request, res: Response) => {
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
        ["A"]: "Tipo",
        ["B"]: "Ítem inventariable",
        ["C"]: "Ítem con variantes",
        ["D"]: "Venta en negativo",
        ["E"]: "Nombre",
        ["F"]: "Código del producto o servicio",
        ["G"]: "Referencia",
        ["H"]: "Img",
        ["I"]: "Unidad de medida",
        ["J"]: "Categoría",
        ["K"]: "Descripción",
        ["L"]: "Costo inicial",
        ["M"]: "Precio base",
        ["N"]: "Impuesto",
        ["O"]: "Precio total",
        ["P"]: "Precio: General",
        ["Q"]: "Precio: LEIDY PRECIO 1 (45.00%)",
        ["R"]: "Precio: barranquilla",
        ["S"]: "Precio: DESCUENTO 5% (5.00%)",
        ["T"]: "Precio: DESCUENTO 3% (3.00%)",
        ["U"]: "Código cuenta contable",
        ["V"]: "Cuenta contable",
        ["W"]: "Código cuenta de inventario",
        ["X"]: "Cuenta de inventario",
        ["Y"]: "Código cuenta de costo de venta",
        ["Z"]: "Cuenta de costo de venta",
        ["AA"]: "Código de barras",
        ["AB"]: "Subcategoria",
        ["AC"]: "Marca"
        }
    });
    const dataParsed = productDataParsed(bufferToJson["productosAllegra"])
    const processWorker = new Worker(
      "./src/controllers/Bulks/products/workers/worker.import.js",
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
