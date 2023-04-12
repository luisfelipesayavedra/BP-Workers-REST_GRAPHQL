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
    
    const newEvent = await prisma.bulkinEvents.create({
        data: {
            organization_uuid: organizationUuid,
            percentage: 0,
            type: "SELL_INVOICE"
        }
    })
    newEvent
    pubSub
    Worker
    transformJSON
    const bufferToJson = excelToJson({
      //@ts-ignore
      source: tmp.data,
      header: {
        rows: 23,
      },
      columnToKey: {
        ["A"]: "Numero de Pagina Allegra",
        ["B"]: "Consecutivo de Pagina",
        ["C"]: "Valor Total",
        ["D"]: "Retenido",
        ["E"]: "Notas Credito",
        ["F"]: "Cobrado",
        ["G"]: "Por Cobrar",
        ["H"]: "Numero de Factura",
        ["I"]: "Status de la Factura",
        ["J"]: "Nombre de Cliente",
        ["K"]: "Fecha de Creacion",
        ["L"]: "Numero de Identificacion",
        ["M"]: "Fecha de Vencimiento",
        ["N"]: "Telefono",
        ["O"]: "Plazo de Pago",
        ["P"]: "Subtotal",
        ["Q"]: "Valor de Descuento",
        ["R"]: "Subtotal Con Descuento",
        ["S"]: "Valor de IVA",
        ["T"]: "Total",
        ["U"]: "Forma de Pago",
        ["V"]: "Medio de Pago",
        ["W"]: "Vendedor",
        ["X"]: "Lista de Precios",
        ["Y"]: "Bodega",
        ["Z"]: "Centro de Costos",
        ["AA"]: "Item Producto",
        ["AB"]: "Referencia Producto",
        ["AC"]: "Precio Producto",
        ["AD"]: "Descuento % (Producto)",
        ["AE"]: "Impuesto Producto",
        ["AF"]: "Descripcion, Producto",
        ["AG"]: "Cantidad Producto",
        ["AH"]: "Total Producto",
        ["AI"]: "Url Factura PDF",
        ["AJ"]: "Url XML Factura DIAN"
        }
    });
    const dataParsed = transformJSON(bufferToJson["Hoja1"])
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
