import { parentPort, workerData } from "worker_threads";
import { BulkinEvents, PrismaClient, Product, STATUSCOBROFACTURA, SubproductSell } from "../../../../generated/client";
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
    if(value === "Por Cobrar") {
        return STATUSCOBROFACTURA.POR_COBRAR
    }
    if(value === "Cobrada") {
        return STATUSCOBROFACTURA.COBRADA
    }
    if(value === "Anulada") {
        return STATUSCOBROFACTURA.ANULADA
    }
    if(value === "Borrador") {
        return STATUSCOBROFACTURA.BORRADOR
    }
    return STATUSCOBROFACTURA.COBRADA
}
export const sellInvoice = async () => {
    console.log("Entrando al worker")
    const event = workerData.params.data.newEvent as BulkinEvents
    const data = workerData.params.data.dataParsed as SellInvoice[]
    const notfoundWarehouses = []
    const admin = await prisma.internalUser.findFirst({
        where: {
            email: "agudelocjuan@gmail.com",
            organizationUuid: event.organization_uuid,
        }
    })
    console.log(event)
    for (let index = 0; index < data.length - 1; index++) {
        try {
            const listItems = [...data[index].items.map((i: any) =>String(i.ITEM_REFERENCIA))]
            let prods: Product[] = []

            for (const i in data[index].items) {
                const prod = await prisma.product.findFirst({
                    where: {
                        SKU: {
                            contains: String(data[index].items[i].ITEM_REFERENCIA)
                        }
                    }
                })
                if(prod) {
                    prods.push(prod)
                }
                if(!prod) {
                    let prodToCreate = await prisma.product.create({
                        data: {
                            name: String(data[index].items[i].ITEM_NOMBRE),
                            SKU: String(data[index].items[i].ITEM_REFERENCIA),
                            price: parseInt(String((parseFloat(data[index].items[i].ITEM_PRECIO_UNITARIO) * 100))) || 0,
                            organizationUuid: event.organization_uuid,
                            description: "",
                        }
                    })
                    prods.push(prodToCreate)
                
                }
            }
            data[index].items.forEach((p) => {
                const match = prods.find((prod) => prod.SKU = p.ITEM_REFERENCIA)
                p["uuid"] = match?.uuid
                return p
            }) 

            const parsedDni = parseDni(String(data[index].IDENTIFICACION_CLIENTE))
            let customer = await prisma.customer.findFirst({
                where: {
                    DNI: {
                        contains: parsedDni
                    },
                    organizationUuid: event.organization_uuid,
                }
            })
            if(!customer) {
                customer = await prisma.customer.create({
                    data: {
                        DNI: parsedDni,
                        name: String(data[index].CLIENTE_NOMBRE),
                        email: "",
                        firstName: String(data[index].CLIENTE_NOMBRE),
                        LastName: "",
                        organizationUuid: event.organization_uuid,
                        createdBy: admin!.uuid,
                        CustomerDetails: {
                            create: {
                                phone: String(data[index].TELEFONO_CLIENTE) || "",
                                address: String(data[index].DIRECCION_CLIENTE) || "",
                                birthDate: new Date(),
                            }
                        }
                    }
                })
            }

            const warehouse = await prisma.warehouse.findFirst({
                where: {
                    name: {
                        contains: data[index].BODEGA
                    }
                }
            })

            if(!warehouse) {
                notfoundWarehouses.push(data[index].BODEGA)
                console.log("Not found warehouse", data[index].BODEGA)
                continue
            }
            const transaction = async () => {
                return await prisma.$transaction(async (prisma) => {
                    const baseInvoice = await prisma.baseInvoice.create({
                        data: {
                            title: "",
                            styles: "",
                            web: "",
                            address: "",
                            dateExpedition: data[index].FECHA_DE_EMISION,
                            dateExpiration: data[index].VENCIMIENTO,
                            discount: data[index].items.map(item => parseInt(item.ITEM_DESCUENTO)).reduce((a, b) => a + b, 0) * 100,
                            email: "",
                            footer: "",
                            description: "",
                            key: "",
                            nit: "",
                            total: (data[index].TOTAL_FACTURA / 100),
                            organizationUuid: event.organization_uuid!,
                            resolution: data[index].CODIGO,
                            subtotal: (data[index].SUBTOTAL_FACTURA / 100),
                            tax: data[index].items.map((item) => parseInt(item.ITEM_IMPUESTO_VALOR)).reduce((a, b) => a + b, 0) / 100,
                            totalTax: data[index].items.map((item) => parseInt(item.ITEM_IMPUESTO_VALOR)).reduce((a, b) => a + b, 0) / 100,
                            type_document: "FACTURA",
                            taxporcentage: parseInt(data[index].items[0].ITEM_IMPUESTO_PORCENTAJE),
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
                            discount: data[index].items.map(item => parseInt(item.ITEM_DESCUENTO)).reduce((a, b) => a + b, 0) * 100,
                            SubproductSell: {
                                createMany: {
                                    data: data[index].items.map((item) => {
                                        return {
                                            productUuid: item.uuid,
                                            quantity: parseInt(item.ITEM_CANTIDAD),
                                            warehouseUuid: warehouse.uuid
                                        } as SubproductSell
                                    })
                                }
                            },
                            organizationUuid: event.organization_uuid,
                            SellBaseInvoice: {
                                create: {
                                    data: "",
                                    isExternal: true,
                                    organizationUuid: event.organization_uuid!,
                                    number: data[index].CODIGO,
                                    customerUuid: customer!.uuid,
                                    statusCobro: parseStatusCobro(data[index].ESTADO),
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
            await transaction()
        }catch(error) {
            console.log(error)
            await prisma.bulkingEventsFailures.create({
                data: {
                    log: `Error creating invoice with the next id: ${data[index]["CODIGO"]}`,
                    position: index,
                    bulkingEventUuid: event.uuid
                }
            })
        }
    }
    // fs.writeFile("./src/controllers/Bulks/sellInvoice/logger/notfoundItems.json", JSON.stringify(notfoundItems), "utf-8", () => {
    //     console.log("data saved with errors: " + notfoundItems.length + " of " + data.length)
    // })
    // fs.writeFile("./src/controllers/Bulks/sellInvoice/logger/notfoundCustomers.json", JSON.stringify(notfoundCustomers), "utf-8", () => {
    //     console.log("data saved with errors: " + notfoundCustomers.length + " of " + data.length)
    // })
    fs.writeFile("./src/controllers/Bulks/sellInvoice/logger/notfoundWarehouse.json", JSON.stringify(notfoundWarehouses), "utf-8", () => {
        console.log("data saved with errors: " + notfoundWarehouses.length + " of " + data.length)
    })
    parentPort?.close()
    prisma.$disconnect()
}

sellInvoice()