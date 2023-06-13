import { workerData } from 'worker_threads';
import { BulkinEvents } from '../../../../generated/client';
import { SellInvoice } from '../../sellInvoice/functions';
import { ROLE } from '../../../../generated/client';
import { PrismaClient } from '../../../../generated/client';
import fs from 'fs';
import { parseSellName } from '../functions';

const prisma: PrismaClient = new PrismaClient();
export const CustomerPos = async () => {
  console.log('Entrando al worker');
  const event = workerData.params.data.newEvent as BulkinEvents;
  const data = workerData.params.data.dataParsed as SellInvoice[];
  // console.log(event);
  // console.log(data);

  let errors = [];
  let succes = [];

  for (let i = 0; i < data.length; i++) {
    try {
      const invoiceData = data[i];

      const pos = await prisma.pos.findMany({
        where: {
          organizationUuid: String(event.organization_uuid),
        },
      });

      const customer = await prisma.customer.findFirst({
        where: {
          DNI: String(invoiceData.IDENTIFICACION_CLIENTE),
        },
        include: {
          CustomerPos: true
        }
      });
      console.log(customer?.DNI, String(invoiceData.IDENTIFICACION_CLIENTE))
      if (!customer) {
        const error = `Customer not found: ${invoiceData.IDENTIFICACION_CLIENTE}`;
        errors.push(error);
        throw '';
      }


      const posUuid = pos.find(
        (p) => p.name.toLowerCase() == invoiceData.BODEGA.toLowerCase()
      )?.uuid;

      if (!posUuid) {
        const error = `Pos not found: ${invoiceData.BODEGA}`;
        errors.push(error);
        throw '';
      }
      // console.log(posUuid, invoiceData.BODEGA);
      const validCustomerPos = customer.CustomerPos.find(c => c.posUuid === posUuid);

      if (!validCustomerPos) {
        await prisma.customer.update({
          where: {
            uuid: customer?.uuid,
          },
          data: {
            CustomerPos: {
              create: {
                pos: {
                  connect: {
                    uuid: posUuid,
                  },
                },
                organizationUuid: customer?.uuid,
              },
            },
          },
          include: {
            CustomerPos: true,
          },
        });
        const message = `Customer update: ${invoiceData.IDENTIFICACION_CLIENTE}`;
        succes.push(message);
      }
      const vendedor = invoiceData.VENDEDOR;
      if(!vendedor) throw ''
      const minuscula = vendedor.toLowerCase();

      const sellers = await prisma.internalUser.findMany({
        where: {
          organizationUuid: event.organization_uuid,
        },
        include: {
          SellerPos: true
        }
      });

      const seller = sellers.find(
        (seller) => {
          return (
            (minuscula.includes(String(seller.first_name).toLowerCase()) &&
              minuscula.includes(String(seller.last_name).toLowerCase())) ||
              (minuscula.includes(String(seller.first_name).toLowerCase()) &&
              minuscula.includes(String(seller.last_name.split(' ')[0]).toLowerCase())) ||
            parseSellName(vendedor as string).includes(
              parseSellName(seller.first_name + ' ' + seller.last_name)
            )
          );
        }
      );
      // console.log('excel seller: ', invoiceData.VENDEDOR);
      // console.log('db seller: ', seller?.first_name, seller?.last_name);
      // console.log('excel customer: ', invoiceData.CLIENTE_NOMBRE);
      // console.log('db customer: ', customer?.firstName, customer?.LastName);
      if (!seller) {
        const error = `Seller not found: ${vendedor}`;
        errors.push(error);
        throw '';
      }

      const validSellerPos = seller.SellerPos.find(
        (c) => c.pos_uuid === posUuid
      );
      
      if (!validSellerPos) {
        await prisma.internalUser.update({
          where: {
            uuid: seller?.uuid ?? '',
          },
          data: {
            SellerPos: {
              create: {
                pos: {
                  connect: {
                    uuid: posUuid,
                  },
                },
                organizationUuid: seller?.uuid,
              },
            },
          },
          include: {
            SellerPos: true,
          },
        });
        const messageSeller = `Seller update: ${invoiceData.VENDEDOR}`;
        succes.push(messageSeller);
        console.log(`Migrating: ${i + 1} of ${data.length}`);
      }

      // console.log('cliente:',customerUpdate.CustomerPos);
      // console.log('vendedor: ',sellerUpdate.SellerPos);
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
  }

  fs.writeFile(
    './src/controllers/Bulks/customerPos/logger/errors.json',
    JSON.stringify(errors),
    'utf-8',
    () => {
      console.log(
        'data saved with errors: ' + errors.length + ' of ' + data.length
      );
    }
  );
  fs.writeFile(
    './src/controllers/Bulks/customerPos/logger/success.json',
    JSON.stringify(succes),
    'utf-8',
    () => {
      console.log(
        'data saved with errors: ' + errors.length + ' of ' + data.length
      );
    }
  );
};

CustomerPos();
