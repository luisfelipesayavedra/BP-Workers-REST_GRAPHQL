import { parentPort, workerData } from "worker_threads";
import { BulkinEvents, PrismaClient, STATUSCOBROFACTURA } from "../../../../generated/client";
import fs from 'fs'
import { SellInvoice } from "../functions";

const prisma: PrismaClient = new PrismaClient();

function parseDni(value: string) {
    if(value.includes(" -")) {
        const valueParse = value.split(" -")
        return valueParse[0]
    }
    return value
}

function parseDatetime(value: string) {
    let valueSplit = value.split("/")
    let valueParse = valueSplit[1] + '-' + valueSplit[0] + '-' + valueSplit[2]
    return valueParse
}

function parseStatusCobro(value: string): STATUSCOBROFACTURA {
    if(value === "POR COBRAR") {
        return STATUSCOBROFACTURA.POR_COBRAR
    }
    if(value === "COBRADA") {
        return STATUSCOBROFACTURA.COBRADA
    }
    if(value === "ANULADA") {
        return STATUSCOBROFACTURA.ANULADA
    }
    if(value === "BORRADOR") {
        return STATUSCOBROFACTURA.BORRADOR
    }
    return STATUSCOBROFACTURA.COBRADA
}
export const sellInvoice = async () => {
    console.log("Entrando al worker")
    const event = workerData.params.data.newEvent as BulkinEvents
    const data = workerData.params.data.dataParsed as SellInvoice[]
    const notfoundItems = []
    const notfoundCustomers = []
    console.log(event)
    for (let index = 0; index < data.length - 1; index++) {
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
                continue
            }
            data[index].items.forEach((p) => {
                const match = products.find((prod) => prod.name = p.concepto)
                p["uuid"] = match?.uuid
                return p
            }) 

            const parsedDni = parseDni(String(data[index].Numero_de_Identificacion))
            const customer = await prisma.customer.findFirst({
                where: {
                    DNI: parsedDni,
                    organizationUuid: event.organization_uuid,
                }
            })
            if(!customer) {
                notfoundCustomers.push(parsedDni)
                continue
            }

            const dateExpedition = new Date(parseDatetime(data[index].Fecha_de_Creacion)) 
            const dateExpiration = new Date(parseDatetime(data[index].Fecha_de_Vencimiento))
            const transaction = async () => {
                return await prisma.$transaction(async (prisma) => {
                    const baseInvoice = await prisma.baseInvoice.create({
                        data: {
                            title: "",
                            styles: "",
                            web: "",
                            address: "",
                            dateExpedition: dateExpedition,
                            dateExpiration: dateExpiration,
                            discount: parseInt(String(parseFloat(data[index].Valor_de_Descuento.replace(/[^0-9.-]+/g,"")) * 100)),
                            email: "",
                            footer: "",
                            description: "",
                            key: "",
                            nit: "",
                            total: parseInt(String(parseFloat(data[index].Total.replace(/[^0-9.-]+/g,""))* 100)),
                            organizationUuid: event.organization_uuid!,
                            resolution: data[index].Numero_de_Factura,
                            subtotal: parseInt(String(parseFloat(data[index].Subtotal.replace(/[^0-9.-]+/g,""))* 100)),
                            tax: 19,
                            totalTax: parseInt(String(parseFloat(data[index].Valor_de_IVA.replace(/[^0-9.-]+/g,""))* 100)) || 0,
                            type_document: "FACTURA",
                            taxporcentage: 19.00,
                            type_invoice: "VENTA",
                        }
                    })
                    const sell = await prisma.sell.create({
                        data: {
                            CustomerSell: {
                                create: {
                                    customerUuid: customer!.uuid
                                }
                            },
                            discount: parseInt(String(parseFloat(data[index].Valor_de_Descuento.replace(/[^0-9.-]+/g,""))* 100)),
                            SubproductSell: {
                                createMany: {
                                    data: data[index].items.map((item) => {
                                        return {
                                            productUuid: item.uuid
                                        }
                                    })
                                }
                            },
                            organizationUuid: event.organization_uuid,
                            SellBaseInvoice: {
                                create: {
                                    data: data[index]!.Url_Factura_PDF,
                                    isExternal: true,
                                    organizationUuid: event.organization_uuid!,
                                    number: data[index].Numero_de_Factura,
                                    customerUuid: customer.uuid,
                                    statusCobro: parseStatusCobro(data[index].Status_de_la_Factura),
                                    baseInvoiceUuid: baseInvoice.uuid,
                                }
                            }
                        }
                    })
        
                    const updateEvent = await prisma.bulkinEvents.update({
                        where: {
                            uuid: event.uuid
                        },
                        data: {
                            percentage: (index / data.length) * 100
                        }
                    })
                    console.log(updateEvent.percentage, sell.uuid, baseInvoice.uuid)
                })
            }
            transaction()
        }catch(error) {
            console.log(error)
            await prisma.bulkingEventsFailures.create({
                data: {
                    log: `Error creating invoice with the next id: ${data[index]["Numero_de_Factura"]}`,
                    position: index,
                    bulkingEventUuid: event.uuid
                }
            })
        }
    }
    fs.writeFile("./src/Api/controllers/Bulks/sellInvoice/logger/notfoundItems.json", JSON.stringify(notfoundItems), "utf-8", () => {
        console.log("data saved with errors: " + notfoundItems.length + " of " + data.length)
    })
    fs.writeFile("./src/Api/controllers/Bulks/sellInvoice/logger/notfoundCustomers.json", JSON.stringify(notfoundCustomers), "utf-8", () => {
        console.log("data saved with errors: " + notfoundCustomers.length + " of " + data.length)
    })
    parentPort?.close()
    prisma.$disconnect()
}

sellInvoice()