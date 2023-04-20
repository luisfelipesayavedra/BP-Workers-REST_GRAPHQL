import { parentPort, workerData } from "worker_threads";
import { BulkinEvents, PrismaClient } from "../../../../../generated/client";
import { ProductsFromExcel } from "../../functions";


const prisma: PrismaClient = new PrismaClient();

const bulkProduct = async () => {
    const data = workerData.params.data.dataParsed as ProductsFromExcel[]
    const organizationUuid  = workerData.params.data.organizationUuid 
    for (const index in data) {
        try {
            console.log(data[index].name)
            let {warehouses} = data[index]
            const baseWarehouse = await prisma.warehouse.findFirst({
                where: {
                    name:  {
                        contains: "Bogota",
                    },
                    organizationUuid,
                }
            })
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
            const product = await  prisma.product.findFirst({
                where: {
                    organizationUuid,
                    // SKU: String(data[index].sku),
                    name: data[index].name
                },
                include: {
                    product_warehouse: true
                }
            })
            if(!product) {
                await prisma.product.create({
                    data: {
                        organizationUuid,
                        description: "",
                        name: data[index].name,
                        justBuyable: false,
                        minimalPrice: parseInt(String(parseFloat(data[index].minPrice.replace(/[^0-9.-]+/g,""))* 100)),
                        price: parseInt(String(parseFloat(data[index].price.replace(/[^0-9.-]+/g,""))* 100)),
                        SKU: String(data[index].sku),
                        status: "AVAILABLE",
                        principalImage: data[index].img,
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
                continue
            }
            data[index].uuid = product!.uuid!
            const productUpdate = await prisma.product.update({
                where: {
                    uuid: data[index].uuid
                },
                data: {
                    minimalPrice: parseInt(String(parseFloat(data[index].minPrice.replace(/[^0-9.-]+/g,""))* 100)),
                    price: parseInt(String(parseFloat(data[index].price.replace(/[^0-9.-]+/g,""))* 100)),
                    principalImage: data[index].img,
                }
            })
            console.log(parseInt(index) * 100 / data.length)
            parentPort?.postMessage("created")
        } catch (error) {
            parentPort?.postMessage("error")
            console.log(parseInt(index) * 100 / data.length)
            console.log(error)
        }
    }
    
}

bulkProduct()