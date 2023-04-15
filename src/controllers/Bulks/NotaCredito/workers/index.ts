import { parentPort, workerData } from "worker_threads";
import { BulkinEvents, PrismaClient } from "../../../../generated/client";
import { FacturaVenta } from "../functions";
import fs from 'fs'

function parseDatetime(value: string) {
    let valueSplit = value.split("/")
    let valueParse = valueSplit[0] + '-' + valueSplit[1] + '-' + valueSplit[2]
    return valueParse
}


const prisma: PrismaClient = new PrismaClient();

const bulkNotaCredito = async () => {
    const event = workerData.params.data.newEvent as BulkinEvents
    const data = workerData.params.data.dataParsed as FacturaVenta[]
    const organizationUuid  = workerData.params.data.organizationUuid 
    const notfoundItems = []
    const notfoundInvoice = []

    console.log(event)
    for (const index in data) {
        try {
            const listItems = [...data[index].items.map((i: any) =>i.concepto_del_item)]
            const products = await prisma.product.findMany({
                where: {
                    organizationUuid: organizationUuid,
                    name: {
                        in: [...listItems]
                    }
                }
            })

            if(products.length === 0) {
                notfoundItems.push(...listItems)
                console.log("Elements not found", listItems)
                continue
            }

            data[index].items.forEach((p) => {
                const match = products.find((prod) => prod.name = p.concepto_del_item)
                p["uuid"] = match?.uuid
                return p
            }) 

            const factura = await prisma.baseInvoice.findFirst({
                where: {
                    resolution: data[index].numero_de_venta
                },
                include: {
                    sellBaseInvoice: {
                        include: {
                            customer: true,
                            Sell: true
                        }
                    }
                }
            })

            if(!factura) {
                notfoundInvoice.push({"nota credito": data[index].numero_de_factura, "factura": data[index].numero_de_venta})
                console.log("Not Found Items", {"nota credito": data[index].numero_de_factura, "factura": data[index].numero_de_venta})
                continue
            }
            console.log(data[index].numero_de_venta)

            const NotaCredito = await prisma.noteCredit.create({
                data: {
                    buyOrSell: "SELL",
                    baseInvoiceUuid: factura.uuid,
                    customerUuid: factura.sellBaseInvoice[0].customerUuid,
                    data: "",
                    organizationUuid: event.organization_uuid!,
                    SellUuid: factura.sellBaseInvoice[0].Sell.uuid,
                    createdAt: new Date(parseDatetime(data[index].creado)),
                    CUDE: data[index].cude,
                    description: data[index].razon,
                    numberNote: data[index].numero_de_factura,
                    saldoPorPagar: data[index].por_pagar_venta,
                    statusDian: data[index].estado_ante_dian,
                    tipoDeNota: data[index].tipo_de_nota_credito,
                    total: parseInt(String(parseFloat(data[index].total.replace(/[^0-9.-]+/g,"")) * 100)),
                    noteCreditProducts: {
                        createMany: {
                            data: data[index].items.map((item) => {
                                return {
                                    productUuid: item.uuid,
                                    data: "",
                                    organizationUuid,
                                    quantity: item.cantidad_del_item
                                }
                            })
                        }
                    }
                }
            })
            console.log(NotaCredito)
            await prisma.bulkinEvents.update({
                where: {
                    uuid: event.uuid,
                },
                data: {
                    percentage: (parseInt(index) * 100 / data.length)
                }
            })
            parentPort?.postMessage("created")
        } catch (error) {
            parentPort?.postMessage("error")
            const errorData = await prisma.bulkingEventsFailures.create({
                data: {
                    log: String(error),
                    position: parseInt(index),
                    bulkingEventUuid: event.uuid
                }
            })
            console.log(errorData)
        }
    }
    fs.writeFile("./src/controllers/Bulks/NotaCredito/logger/notfoundItems.json", JSON.stringify(notfoundItems), "utf-8", () => {
        console.log("data saved with errors: " + notfoundItems.length + "of " + data.map((items) => {return items.items}).length)
    })
    parentPort?.close()
    prisma.$disconnect()
    
}

bulkNotaCredito()