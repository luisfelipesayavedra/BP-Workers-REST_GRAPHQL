import { Request, Response } from "express";
import excelToJson from "convert-excel-to-json";
import { Worker } from "worker_threads";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "../../../generated/client";
import { Payload } from "../../../middlewares";
import { transformJSON } from "./functions";

export const NotaCreditoBulController = async (req: Request, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.get("prisma");
    const pubSub: PubSub = req.app.get("pubSub");
    const { organizationUuid } = req.body.payload as Payload;

    const newEvent = await prisma.bulkinEvents.create({
      data: {
        percentage: 0,
        type: "SELL_INVOICE",
        organization_uuid: organizationUuid,
      },
    });

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
        ["C"]: "Número de Factura",
        ["D"]: "Estado ante DIAN",
        ["E"]: "DIAN",
        ["F"]: "Notificaciones",
        ["G"]: "CUDE",
        ["H"]: "Tipo De nota crédito",
        ["I"]: "Razón",
        ["J"]: "Cliente",
        ["K"]: "Creado",
        ["L"]: "Por Aplicar",
        ["M"]: "Notas",
        ["N"]: "Lista de precios",
        ["O"]: "Bodega",
        ["P"]: "Centro de Costo",
        ["Q"]: "Primer Subtotal",
        ["R"]: "Descuento",
        ["S"]: "Segundo Subtotal",
        ["T"]: "Impuestos",
        ["U"]: "Total",
        ["V"]: "Concepto Del Item",
        ["W"]: "Referencia Del Item",
        ["X"]: "Precio del Item",
        ["Y"]: "Descuento Del Item",
        ["Z"]: "Impuesto Del Item",
        ["AA"]: "Descripción Del Item",
        ["AB"]: "Cantidad del Item",
        ["AC"]: "Total del Item",
        ["AD"]: "Numero de Venta",
        ["AE"]: "Fecha de la Venta",
        ["AF"]: "Vencimiento Venta",
        ["AG"]: "Observaciones Venta",
        ["AH"]: "Total Venta",
        ["AI"]: "Pagado Venta",
        ["AJ"]: "Por pagar Venta",
        ["AK"]: "Monto de Venta",
      },
    });
    const dataParsed = transformJSON(bufferToJson["Notas de Crédito"]);
    const processWorker = new Worker(
      "./src/controllers/Bulks/NotaCredito/workers/worker.import.js",
      {
        workerData: {
          path: "./index.ts",
          params: {
            data: {
              dataParsed,
              newEvent,
              organizationUuid,
            },
          },
        },
      }
    );
    processWorker.on("message", (data) => {
      data;
      pubSub.publish(`event_worker: ${newEvent.uuid}`, {});
    });
    return res.send(dataParsed);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
