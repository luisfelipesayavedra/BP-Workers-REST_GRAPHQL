import { parentPort, workerData } from "worker_threads";
import { BulkinEvents, PrismaClient } from "../../../../../generated/client";
import { ProductsFromExcel } from "../functions";


const prisma: PrismaClient = new PrismaClient();

const bulkProduct = async () => {
    const event = workerData.params.data.newEvent as BulkinEvents
    const data = workerData.params.data.dataParsed as ProductsFromExcel[]
    const organizationUuid  = workerData.params.data.organizationUuid 
    const baseWarehouse = await prisma.warehouse.findFirst({
        where: {
            name:  {
                contains: "Bogota",
            },
            organizationUuid,
        }
    })

    console.log(event)
    prisma
    for (const index in data) {
        try {
            let {warehouses} = data[index]
            const validatedWarehouses = warehouses.filter((item) => item.quantity !== null && typeof item.quantity === "number")

            const warehousesFind = await prisma.warehouse.findMany({
                where: {
                    name: {
                        in: [...validatedWarehouses.map(item => item.name)]
                    }
                }
            })
            
            if(warehousesFind.length < 1) {
                warehouses = []
            } else {
                warehouses = warehouses.map((item) => {
                    const match = warehousesFind.find((itemDb) => itemDb.name = item.name)
                    item["uuid"] =  match!.uuid
                    return item
                })
            }
            const product = await prisma.product.create({
                data: {
                    name: data[index].name,
                    description: "", 
                    minimalPrice: parseInt(String(parseFloat(data[index].minPrice.replace(",", "").split("$")[1]) * 100)),
                    principalImage: data[index].img,
                    price: parseInt(String(parseFloat(data[index].Precios_Sin_Impuesto.replace(",", "").split("$")[1]) * 100)),
                    productType: "FIXED",
                    SKU: String(data[index].sku),
                    organizationUuid,
                    product_warehouse: {
                        createMany: {
                            data: warehouses.length > 1 ? warehouses.map((warehouse) => {
                                return {
                                    warehouse_uuid: String(warehouse.uuid!),
                                    currentStock: warehouse.quantity,
                                    initialStock: warehouse.quantity,
                                    organizationUuid,
                                }
                            }) : [{
                                warehouse_uuid: baseWarehouse!.uuid,
                                currentStock: parseInt(data[index].quantity),
                                initialStock: parseInt(data[index].quantity),
                                organizationUuid,  
                            }]
                        }
                    }
                }
            })
            console.log(product)
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
    
}

bulkProduct()