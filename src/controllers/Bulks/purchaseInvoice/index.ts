import { Request, Response } from "express";
import excelToJson from "convert-excel-to-json";
import { Worker } from "worker_threads";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "../../../generated/client";
import { Payload } from "../../../middlewares";
import { transformJSON } from "./functions";

export const purchaseInvoice = async (req: Request, res: Response) => {
  try {
    const pubSub: PubSub = req.app.get("pubSub")
    const prisma: PrismaClient = req.app.get("prisma")
    const {organizationUuid} = req.body.payload as Payload 
    const tmp = req.files?.excel;
    
    const newEvent = await prisma.bulkinEvents.create({
        data: {
            organization_uuid: organizationUuid,
            percentage: 0,
            type: "PURCHASE_INVOICE"
        }
    })
    const bufferToJson = excelToJson({
      //@ts-ignore
      source: tmp.data,
      header: {
        rows: 23,
      },
      columnToKey: {
        ["A"]: "Numero de Pagina Allegra",
        ["B"]: "Consecutivo de Pagina",
        ["C"]: "Número de Factura",
        ["D"]: "Consecutivo Interno",
        ["E"]: "Proveedor",
        ["F"]: "Bodega",
        ["G"]: "Fecha de creación",
        ["H"]: "Vencimiento",
        ["I"]: "Total",
        ["J"]: "Por Pagar",
        ["K"]: "Adjunto 1",
        ["L"]: "Adjunto 2",
        ["M"]: "Centro de Costo",
        ["N"]: "Valor recibido",
        ["O"]: "Detalle de Factura",
        ["P"]: "Primer Subtotal",
        ["Q"]: "Descuento Total",
        ["R"]: "Segundo Subtotal",
        ["S"]: "Impuestos",
        ["T"]: "Concepto Del Item",
        ["U"]: "Costo Del Item",
        ["V"]: "Descuento Del Item",
        ["W"]: "Impuesto Del Item",
        ["X"]: "Cantidad Del Item",
        ["Y"]: "Observaciones Del Item",
        ["Z"]: "Total Del Item",
      },
    });
    const dataParsed = transformJSON(bufferToJson["Facturas de compra"])
    const processWorker = new Worker(
      "./src/controllers/Bulks/purchaseInvoice/workers/worker.import.js",
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
