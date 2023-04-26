import { parentPort, workerData } from 'worker_threads';
import { BulkinEvents, PrismaClient } from '../../../../generated/client';
import { productSkuExcel } from '../functions';

const prisma: PrismaClient = new PrismaClient();

export const BpProductSku = async () => {
  console.log('Entrando al worker');
  const event = workerData.params.data.newEvent as BulkinEvents;
  const data = workerData.params.data.dataParsed as productSkuExcel[];
  console.log(event);
  for (let index = 0; index < data.length; index++) {
    // if (index <= 3499) {
    //     continue
    // }
    try {
      const productData = data[index];
      let skuRep = String(productData.sku);
      if(String(productData.sku).charAt(0) === '0') {
        skuRep = String(productData.sku).replace('0', '');
      }
      console.log('🚀 ~ file: index.ts:20 ~ BpProductSku ~ skuRep:', skuRep);
      const product = await prisma.product.findFirst({
        where: {
          SKU: skuRep
        }
      });
      console.log('🚀 ~ file: index.ts:19 ~ BpProductSku ~ productData:', productData.sku);

      if (product!.SKU) {
        const productUpdate = await prisma.product.update({
          where: {
            uuid: product!.uuid,
          },
          data: {
            SKU: String(productData.sku),
          },
        });
        console.log('🚀 ~ file: index.ts:35 ~ BpProductSku ~ productUpdate:', productUpdate.SKU);
      }
        const eventData = await prisma.bulkinEvents.update({
          where: {
            uuid: event.uuid,
          },
          data: {
            percentage: (index / data.length) * 100,
          },
        });
      console.log(eventData.percentage, product!.uuid);
    } catch (error) {
      console.log(error);
      await prisma.bulkingEventsFailures.create({
        data: {
          log: `Error creating invoice with the next id: ${data[index].sku}`,
          position: index,
          bulkingEventUuid: event.uuid,
        },
      });
    }
  }
  parentPort?.close();
  prisma.$disconnect();
};

BpProductSku();
