import { parentPort, workerData } from "worker_threads";
import { BulkinEvents, PrismaClient } from "../../../../generated/client";
import { customerExcel } from "../functions";

const prisma: PrismaClient = new PrismaClient();

export const Customer = async () => {
    console.log("Entrando al worker")
    const event = workerData.params.data.newEvent as BulkinEvents
    const data = workerData.params.data.dataParsed as customerExcel[]
    console.log(event)
    for (let index = 0; index < data.length - 1; index++) {
        // if (index <= 3499) {
        //     continue
        // }
        try {
            const customerData = data[index]
            const admin = await prisma.internalUser.findFirst({
                where: {
                    organizationUuid: event.organization_uuid,
                    email: "agudelocjuan@gmail.com",
                    user_role: {
                        type: {
                            equals: "SUPERUSER"
                        }
                    }
                }
            })

           const customer = await prisma.customer.create({
            data: {
                DNI: String(customerData.DNI),
                email: customerData.email,
                firstName: customerData.firstName,
                LastName: customerData.lastName || "",
                birthDate: customerData.birthDate,
                TypeDOC: customerData.typeDoc,
                organizationUuid: event.organization_uuid,
                createdBy: admin!.uuid
            }
           })

           const eventData = await prisma.bulkinEvents.update({
            where: {
                uuid: event.uuid
            },
            data: {
                percentage: (index / data.length)  * 100
            }
           })
           console.log(eventData.percentage, customer.uuid)
        }catch(error) {
            console.log(error)
            await prisma.bulkingEventsFailures.create({
                data: {
                    log: `Error creating invoice with the next id: ${data[index].DNI}`,
                    position: index,
                    bulkingEventUuid: event.uuid
                }
            })
        }
    }
    parentPort?.close()
    prisma.$disconnect()
}

Customer()