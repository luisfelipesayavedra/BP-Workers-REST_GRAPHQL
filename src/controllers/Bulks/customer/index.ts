import { Request, Response } from "express";
import excelToJson from "convert-excel-to-json";
import { Worker } from "worker_threads";
import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "../../../generated/client";
import { Payload } from "../../../middlewares";

export const BpCustomer = async (req: Request, res: Response) => {
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
        ["A"]: "Tipo de contacto",
        ["B"]: "Nombre",
        ["C"]: "Segundo_nombre",
        ["D"]: "Primer_apellido",
        ["E"]: "Segundo_apellido",
        ["F"]: "Tipo_de_identificación",
        ["G"]: "Identificación",
        ["H"]: "Dígito_de_verificación",
        ["I"]: "Tipo_de_persona",
        ["J"]: "Responsabilidad_tributaria",
        ["K"]: "Teléfono_1",
        ["L"]: "Teléfono_2",
        ["M"]: "Celular",
        ["N"]: "País",
        ["O"]: "Departamento",
        ["P"]: "Municipio",
        ["Q"]: "Dirección",
        ["R"]: "Código_postal",
        ["S"]: "Correo",
        ["T"]: "Lista_de_precios",
        ["U"]: "Vendedor",
        ["V"]: "Plazo_de_pago",
        ["W"]: "Cuentas_por_cobrar",
        ["X"]: "Cuentas_por_pagar",
        }
    });
    console.log(bufferToJson)
    const dataParsed = bufferToJson["Sheet1"]
    const processWorker = new Worker(
      "./src/controllers/Bulks/customer/workers/worker.import.js",
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
