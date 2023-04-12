import { parentPort, workerData } from "worker_threads";
import { BulkinEvents, PrismaClient } from "../../../../generated/client";
import { PurchaseInvoice } from "../functions/index";
import fs from 'fs'

const prisma: PrismaClient = new PrismaClient();

export const purchaseInvoice = async () => {
        console.log("Entrando al worker")
        const event = workerData.params.data.newEvent as BulkinEvents
        const data = workerData.params.data.dataParsed as PurchaseInvoice[]
        const notfoundItems = []
        console.log(event)
        for (let index = 0; index < data.length - 1; index++) {
            // console.log([...data[index].items.map((i: any) =>i.concepto)])
            try {
                const listItems = [...data[index].items.map((i: any) =>i.concepto)]
                const products = await prisma.product.findMany({
                    where: {
                        organizationUuid: event.organization_uuid,
                        name: {
                            in: [...listItems]
                        }
                    }
                })

                if(products.length === 0) {
                    notfoundItems.push(...listItems)
                }
                const items = data[index].items.forEach((p) => {
                    const match = products.find((prod) => prod.name = p.concepto)
                    p["uuid"] = match?.uuid
                    return p
                })
                items
                console.log(products)
                // const createPurchaseInvoice = await prisma.purchase.create({
                //     data: {
                //         organizationUuid: event.organization_uuid,
                //         purchaseStatus: "COMPLETED",
                //         SubproductPurchase: {
                //             createMany: {
                //                 data: products.map(p => {
                //                     return {
                //                         subProductUuid: p.uuid,
                //                         organizationUuid: event.organization_uuid,
                //                         quantity: 
                //                     } as SubproductPurchase
                //                 })
                //             }
                //         }
                //     }
                // })
                await prisma.bulkinEvents.update({
                    where: {
                        uuid: event.uuid
                    },
                    data: {
                        percentage: (index * 100 / data.length),
                    }
                })
                parentPort?.postMessage("created")
            } catch (error) {
                await prisma.bulkingEventsFailures.create({
                    data: {
                        log: `Error creating invoice with the next id: ${data[index]["Número_de_Factura"]}`,
                        position: index,
                        bulkingEventUuid: event.uuid
                    }
                })
                parentPort?.postMessage("error")
            }
        }
        fs.writeFile("./src/Api/controllers/Bulks/purchaseInvoice/logger/notfoundItems.json", JSON.stringify(notfoundItems), "utf-8", () => {
            console.log("data saved with errors: " + notfoundItems.length)
        })
        parentPort?.close()
        prisma.$disconnect()
}

purchaseInvoice()
