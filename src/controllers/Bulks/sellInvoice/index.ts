import { Request, Response } from "express";
import excelToJson from "convert-excel-to-json";
import { Worker } from "worker_threads";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "../../../generated/client";
import { Payload } from "../../../middlewares";
import { transformJSON } from "./functions";

export const sellInvoice = async (req: Request, res: Response) => {
  try {
    const pubSub: PubSub = req.app.get("pubSub")
    const prisma: PrismaClient = req.app.get("prisma")
    const {organizationUuid} = req.body.payload as Payload 
    const tmp = req.files?.excel;
    console.log(organizationUuid)
    
    const newEvent = await prisma.bulkinEvents.create({
        data: {
            organization_uuid: organizationUuid,
            percentage: 0,
            type: "SELL_INVOICE"
        }
    })
    const bufferToJson = excelToJson({
      //@ts-ignore
      source: tmp.data,
      header: {
        rows: 1,
      },
      columnToKey: {
        ["A"]: "FECHA DE EMISIÓN",
        ["B"]: "TIPO DE DOCUMENTO",
        ["C"]: "CÓDIGO",
        ["D"]: "TIPO DE FACTURA",
        ["E"]: "TIPO DE OPERACIÓN",
        ["F"]: "ESTADO LEGAL",
        ["G"]: "ESTADO",
        ["H"]: "BODEGA",
        ["I"]: "CENTRO DE COSTO",
        ["J"]: "CLIENTE - NOMBRE",
        ["K"]: "CLIENTE TIPO DE IDENTIFICACIÓN CLIENTE",
        ["L"]: "IDENTIFICACIÓN CLIENTE",
        ["M"]: "DIRECCIÓN CLIENTE",
        ["N"]: "TELÉFONO CLIENTE",
        ["O"]: "CLIENTE CIUDAD",
        ["P"]: "REMISIÓN",
        ["Q"]: "ORDEN DE COMPRA",
        ["R"]: "FORMA DE PAGO",
        ["S"]: "PLAZO DE PAGO",
        ["T"]: "MEDIO DE PAGO",
        ["U"]: "VENCIMIENTO",
        ["V"]: "VENDEDOR",
        ["W"]: "LISTAS DE PRECIOS",
        ["X"]: "NOTAS",
        ["Y"]: "ÍTEM NOMBRE",
        ["Z"]: "ÍTEM REFERENCIA",
        ["AA"]: "ÍTEM DESCRIPCIÓN",
        ["AB"]: "ÍTEM CANTIDAD",
        ["AC"]: "ÍTEM PRECIO UNITARIO",
        ["AD"]: "ÍTEM DESCUENTO",
        ["AE"]: "ÍTEM IMPUESTO",
        ["AF"]: "ÍTEM IMPUESTO (%)",
        ["AG"]: "ÍTEM IMPUESTO (VALOR)",
        ["AH"]: "ÍTEM TOTAL",
        ["AI"]: "SUBTOTAL FACTURA",
        ["AJ"]: "TOTAL FACTURA",
        ["AK"]: "RETENCIÓN NOMBRE",
        ["AL"]: "RETENCIÓN BASE",
        ["AM"]: "RETENCIÓN VALOR",
        ["AN"]: "ESTADO DE RETENCIÓN",
        ["AO"]: "RETENCIÓN NOMBRE",
        ["AP"]: "RETENCIÓN BASE",
        ["AQ"]: "RETENCIÓN VALOR",
        ["AR"]: "ESTADO DE RETENCIÓN"
        }        
    });
    const dataParsed = transformJSON(bufferToJson["facturasAllegra"])

    const processWorker = new Worker(
      "./src/controllers/Bulks/sellInvoice/workers/worker.import.js",
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
