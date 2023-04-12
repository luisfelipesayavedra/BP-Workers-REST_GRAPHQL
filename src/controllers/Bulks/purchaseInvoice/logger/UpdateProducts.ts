import { PrismaClient } from "../../../../../generated/client";
import fs from 'fs'

const prisma = new PrismaClient()

const data = fs.readFileSync("./src/Api/controllers/Bulks/purchaseInvoice/logger/notfoundItems.json", {
    encoding: "utf-8",
})

const dataParsed = JSON.parse(data)

const getProducts = async () => {
    for (const index in dataParsed) {
       const item = await prisma.product.findFirst({
        where: {
            name: {
                equals: dataParsed[index]
            }
        },
        select: {
            name: true,
            organizationUuid: true
        }
       })
       console.log(item)
    }
}

(async () => {
    await getProducts()
})()