import { parentPort, workerData } from "worker_threads";
import { PrismaClient, Usuario } from "../../../generated/client";

const prisma: PrismaClient = new PrismaClient();

function doSetTimeout() {
  setTimeout(() => {}, 10000);
}
export const eventFunction = async function () {
  const dataUser = workerData.params.data.Worksheet as Usuario[];
  const baseLenght = dataUser.length;
  const errors = [];
  prisma.$connect();
  const bulk = await prisma.bulkings.create({
    data: {
      percentage: 0,
    },
  });
  console.log(bulk.id);
  for (let index = 0; index < baseLenght; index++) {
    const data = dataUser[index];
    try {
      await prisma.usuario.create({
        data,
      }),
        await prisma.bulkings.update({
          where: {
            id: bulk.id,
          },
          data: {
            percentage: parseFloat(((index * 100) / baseLenght).toFixed(2)),
          },
        });
      parentPort?.postMessage("created");
    } catch (error) {
      await prisma.bulkings.update({
        where: {
          id: bulk.id,
        },
        data: {
          percentage: parseFloat(((index * 100) / baseLenght).toFixed(2)),
        },
      });
      const bulkError = await prisma.bulkingsError.create({
        data: {
          BuilkingsId: bulk.id,
          error: String(error),
        },
      });
      errors.push(bulkError);
      parentPort?.postMessage("error");
      continue
    }
  }
  prisma.$disconnect();
  parentPort?.close();
};

eventFunction();
