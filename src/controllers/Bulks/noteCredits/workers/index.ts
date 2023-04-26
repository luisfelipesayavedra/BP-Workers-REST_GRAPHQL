import { parentPort, workerData } from 'worker_threads';
import {
  BulkinEvents,
  GENDER,
  PERMISSION,
  PrismaClient,
  ROLE,
  TYPE_OF_NOTE,
} from '../../../../generated/client';
import { TYPE_DNI } from '../../../../generated/client';
import { ACCOUNT_STATUS } from '../../../../generated/client';
import { noteCreditExcel } from '../functions';
import fs from 'fs';

const prisma: PrismaClient = new PrismaClient();

export const NoteCredit = async () => {
  console.log('Entrando al worker');
  const event = workerData.params.data.newEvent as BulkinEvents;
  const data = workerData.params.data.dataParsed as noteCreditExcel[];
  console.log(event);
  const notfoundItems = [];
  const notfoundCustomers = [];
  const notfoundInvoices = [];
  const admin = await prisma.internalUser.findFirst({
    where: {
      organizationUuid: event.organization_uuid,
      email: 'agudelocjuan@gmail.com',
      user_role: {
        type: {
          equals: 'SUPERUSER',
        },
      },
    },
  });
  for (let index = 0; index <  data.length; index++) {
    // if (index <= 3499) {
    //     continue
    // }
    try {
      const parseTypeNote: {
        [id: string]: TYPE_OF_NOTE;
      } = {
        ['Anulación de factura electrónica']: TYPE_OF_NOTE.ANULACION,
        ['Devolución parcial de los bienes y/o no aceptación parcial del servicio']:
          TYPE_OF_NOTE.DEVOLUCION,
        ['Rebaja o descuento parcial o total']: TYPE_OF_NOTE.DESCUENTO,
      };
      const noteCreditData = data[index];
      console.log(noteCreditData.numberNote);
      const existNoteCredit = await prisma.noteCredit.findFirst({
        where: {
          organizationUuid: admin!.organizationUuid ?? '',
          numberNote: noteCreditData.numberNote,
        },
      });
      const product = await prisma.product.findFirst({
        where: {
          SKU: {
            contains: String(noteCreditData.itemRef),
          },
        },
      });
      if (!product) {
        console.log('not found product: ', noteCreditData.itemRef);
        notfoundItems.push(String(noteCreditData.itemRef));
        throw new Error('No product found');
      }
      const customer = await prisma.customer.findFirst({
        where: {
          DNI: {
            contains: String(noteCreditData.customerDni)
          }
        }
      });
      if (!customer) {
        console.log('No customer found', noteCreditData.customerDni);
        notfoundCustomers.push(String(noteCreditData.customerDni));
        throw new Error('No customer found');
      }
      const resolution = String(noteCreditData.invoice).split(' ');
      const invoice = await prisma.baseInvoice.findFirst({
        where: {
          resolution: {
            in: resolution,
          },
        },
      });
      if (!invoice && noteCreditData.invoice != undefined) {
        console.log('No baseInvoice found', noteCreditData.invoice);
        notfoundInvoices.push(String(noteCreditData.invoice));
        throw new Error('No baseInvoice found');
      }
      console.log(
        '🚀 ~ file: index.ts:44 ~ NoteCredit ~ existNoteCredit:',
        existNoteCredit
      );
      if (existNoteCredit) {
        const noteCredit = await prisma.noteCreditProducts.create({
          data: {
            data: '',
            organizationUuid: admin!.organizationUuid ?? '',
            quantity: parseInt(noteCreditData.itemQuantity) ?? 0,
            productUuid: product?.uuid ?? '',
            noteCreditUuid: existNoteCredit.uuid,
          },
        });
        console.log(
          '🚀 ~ file: index.ts:102 ~ NoteCredit ~ noteCredit:',
          noteCredit
        );
        await prisma.bulkinEvents.update({
          where: {
            uuid: event.uuid,
          },
          data: {
            percentage: (index / data.length) * 100,
          },
        });
        continue;
      }
      console.log(noteCreditData.totalNoteCredit, noteCreditData.totalApply);
      // console.log(BigInt(noteCreditData.totalNoteCredit.replace(',', '')), BigInt(noteCreditData.totalApply.replace(',', '')))
      const noteCredit = await prisma.noteCredit.create({
        data: {
          organizationUuid: admin!.organizationUuid ?? '',
          data: String(
            noteCreditData.invoice != undefined ? noteCreditData.invoice : ''
          ),
          numberNote: String(noteCreditData.numberNote),
          statusDian: String(noteCreditData.statusDian),
          description: String(
            noteCreditData.razon != undefined ? noteCreditData.razon : ''
          ),
          total: BigInt(noteCreditData.totalNoteCredit.replace(',', '')),
          saldoPorPagar: BigInt(noteCreditData.totalApply.replace(',', '')),
          tipoDeNota: parseTypeNote?.[noteCreditData?.typeNote],
          noteCreditProducts: {
            create: {
              data: '',
              organizationUuid: admin!.organizationUuid ?? '',
              quantity: parseInt(noteCreditData.itemQuantity) ?? 0,
              productUuid: product?.uuid ?? '',
            },
          },
          createdAt: new Date(noteCreditData.createdAt),
          customer: {
            connect: {
              uuid: customer!.uuid,
            },
          },
          ...(invoice ? {
            baseInvoice: {
            connect: {
              uuid: invoice.uuid,
            },
          }
          }: {}),
        },
      });

      const eventData = await prisma.bulkinEvents.update({
        where: {
          uuid: event.uuid,
        },
        data: {
          percentage: (index / data.length) * 100,
        },
      });
      console.log(eventData.percentage, noteCredit.uuid);
    } catch (error) {
      console.log(error);
      await prisma.bulkingEventsFailures.create({
        data: {
          log: `Error creating note credit with the next id: ${data[index].numberNote}`,
          position: index,
          bulkingEventUuid: event.uuid,
        },
      });
    }
  }
  fs.writeFile(
    './src/controllers/Bulks/noteCredits/logger/notfoundItems.json',
    JSON.stringify(notfoundItems),
    'utf-8',
    () => {
      console.log(
        'data items saved with errors: ' + notfoundItems.length + ' of ' + data.length
      );
    }
  );
  fs.writeFile(
    './src/controllers/Bulks/noteCredits/logger/notfoundCustomers.json',
    JSON.stringify(notfoundCustomers),
    'utf-8',
    () => {
      console.log(
        'data customers saved with errors: ' +
          notfoundCustomers.length +
          ' of ' +
          data.length
      );
    }
  );
  fs.writeFile(
    './src/controllers/Bulks/noteCredits/logger/notfoundInvoices.json',
    JSON.stringify(notfoundInvoices),
    'utf-8',
    () => {
      console.log(
        'data invoices saved with errors: ' +
          notfoundInvoices.length +
          ' of ' +
          data.length
      );
    }
  );
  parentPort?.close();
  prisma.$disconnect();
};

NoteCredit();
