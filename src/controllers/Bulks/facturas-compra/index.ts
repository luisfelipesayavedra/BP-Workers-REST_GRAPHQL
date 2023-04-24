import { Request, Response } from "express";
import excelToJson from "convert-excel-to-json";
import { Worker } from "worker_threads";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "../../../generated/client";
//import { Payload } from "../../../middlewares";

export const BpInvoicePurchase = async (req: Request, res: Response) => {
  try {
    const pubSub: PubSub = req.app.get("pubSub")
    const prisma: PrismaClient = req.app.get("prisma")
    const organizationUuid = "c0517e80-ab0d-41e9-b23d-44783c187820"//req.body.payload as Payload 
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
        rows: 1,
      },
      columnToKey: {
        ["A"]: "fecha_de_emision",
        ["B"]: "codigo",
        ["C"]: "estado",
        ["D"]: "bodega",
        ["E"]: "centro_de_costos",
        ["F"]: "ordenes_de_compra_asociadas",
        ["G"]: "nombre_proveedor",
        ["H"]: "tipo_de_identificacion_proveedor",
        ["I"]: "identificacion_proveedor",
        ["J"]: "direccion_proveedor",
        ["K"]: "telefono_proveedor",
        ["L"]: "ciudad_proveedor",
        ["M"]: "vencimiento",
        ["N"]: "producto_nombre",
        ["O"]: "description",
        ["P"]: "producto_referencia",
        ["Q"]: "producto_cantidad",
        ["R"]: "producto_precio",
        ["S"]: "producto_descuento",
        ["T"]: "producto_impuesto_concepto",
        ["U"]: "producto_impuesto_porcentaje",
        ["V"]: "producto_total_impuesto",
        ["W"]: "producto_total",
        ["X"]: "factura_subtotal",
        ["Y"]: "factura_total",
        ["Z"]: "factura_retencion_1",
        ["AA"]: "factura_base_retencion_1",
        ["AB"]: "factura_total_retencion_1",
        ["AC"]: "factura_estado_retencion_1",
        ["AD"]: "factura_retencion_2",
        ["AE"]: "factura_base_retencion_2",
        ["AF"]: "factura_total_retencion_2",
        ["AG"]: "factura_estado_retencion_2",
        }
    });
  
    const dataParsed = bufferToJson["Alegra - Facturas de compra - S"]
    const processWorker = new Worker(
      "./src/controllers/Bulks/facturas-compra/workers/worker.import.js",
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
