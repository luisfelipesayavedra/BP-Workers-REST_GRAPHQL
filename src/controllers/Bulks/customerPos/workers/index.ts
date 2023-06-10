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

  let errors: any[] = [];
  let succes = [];

  const dataCustomerFilter = data.filter((item, index) => {
    return (
      data.indexOf(
        data.find(
          (e) =>
            e.IDENTIFICACION_CLIENTE === item.IDENTIFICACION_CLIENTE &&
            e.BODEGA === item.BODEGA
        ) ?? ({} as SellInvoice)
      ) === index
    );
  });
  // const dataSellerFilter = data.filter((item, index) => {
  //   return (
  //     data.indexOf(
  //       data.find(
  //         (e) => e.VENDEDOR === item.VENDEDOR && e.BODEGA === item.BODEGA
  //       ) ?? ({} as SellInvoice)
  //     ) === index
  //   );
  // });
  console.log('Customer pos uniques: ', dataCustomerFilter.length);
  // console.log('Seller pos uniques: ', dataSellerFilter.length);
  const pos = await prisma.pos.findMany({
    where: {
      organizationUuid: String(event.organization_uuid),
    },
  });
  // for (let i = 0; i < dataSellerFilter.length; i++) {
  //   try {
  //     const invoiceDataSeller = dataSellerFilter[i];

  //     const posUuidSeller = pos.find(
  //       (p) => p.name.toLowerCase() == invoiceDataSeller.BODEGA.toLowerCase()
  //     )?.uuid;

  //     if (!posUuidSeller) {
  //       const error = `Pos not found: ${invoiceDataSeller.BODEGA}`;
  //       errors.push(error);
  //       throw '';
  //     }
  //     // console.log(posUuid, invoiceData.BODEGA);

  //     const vendedor = invoiceDataSeller.VENDEDOR;
  //     if (!vendedor) throw '';
  //     const minuscula = vendedor.toLowerCase();

  //     const sellers = await prisma.internalUser.findMany({
  //       where: {
  //         organizationUuid: event.organization_uuid,
  //       },
  //       include: {
  //         SellerPos: true,
  //       },
  //     });

  //     const seller = sellers.find((seller) => {
  //       return (
  //         (minuscula.includes(String(seller.first_name).toLowerCase()) &&
  //           minuscula.includes(String(seller.last_name).toLowerCase())) ||
  //         (minuscula.includes(String(seller.first_name).toLowerCase()) &&
  //           minuscula.includes(
  //             String(seller.last_name.split(' ')[0]).toLowerCase()
  //           )) ||
  //         parseSellName(vendedor as string).includes(
  //           parseSellName(seller.first_name + ' ' + seller.last_name)
  //         )
  //       );
  //     });
  //     // console.log('excel seller: ', invoiceData.VENDEDOR);
  //     // console.log('db seller: ', seller?.first_name, seller?.last_name);
  //     // console.log('excel customer: ', invoiceData.CLIENTE_NOMBRE);
  //     // console.log('db customer: ', customer?.firstName, customer?.LastName);
  //     if (!seller) {
  //       const error = `Seller not found: ${vendedor}`;
  //       errors.push(error);
  //       throw '';
  //     }

  //     const validSellerPos = seller.SellerPos.find(
  //       (c) => c.pos_uuid === posUuidSeller
  //     );

  //     if (!validSellerPos) {
  //       await prisma.internalUser.update({
  //         where: {
  //           uuid: seller?.uuid ?? '',
  //         },
  //         data: {
  //           SellerPos: {
  //             create: {
  //               pos: {
  //                 connect: {
  //                   uuid: posUuidSeller,
  //                 },
  //               },
  //               organizationUuid: seller?.uuid,
  //             },
  //           },
  //         },
  //         include: {
  //           SellerPos: true,
  //         },
  //       });
  //       const messageSeller = `Seller update: ${invoiceDataSeller.VENDEDOR}`;
  //       succes.push(messageSeller);
  //       console.log(`Migrating Sellers: ${i + 1} of ${data.length}`);
  //     } else {
  //       console.log('SELLER ALREADY', invoiceDataSeller.VENDEDOR)
  //     }
  //     // console.log('cliente:',customerUpdate.CustomerPos);
  //     // console.log('vendedor: ',sellerUpdate.SellerPos);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     prisma.$disconnect();
  //   }
  // }
  console.log('-----------------> SELLER POS READY <--------------------')
  for (let j = 0; j < dataCustomerFilter.length; j++) {
    try {
      const invoiceDataCustomer = dataCustomerFilter[j];

      const customer = await prisma.customer.findFirst({
        where: {
          DNI: String(invoiceDataCustomer.IDENTIFICACION_CLIENTE),
        },
        include: {
          CustomerPos: true,
        },
      });
      console.log(
        customer?.DNI,
        String(invoiceDataCustomer.IDENTIFICACION_CLIENTE)
      );
      if (!customer) {
        const error = `Customer not found: ${invoiceDataCustomer.IDENTIFICACION_CLIENTE}`;
        errors.push(error);
        throw '';
      }

      const posUuidCustomer = pos.find(
        (p) => p.name.toLowerCase() == invoiceDataCustomer.BODEGA.toLowerCase()
      )?.uuid;

      if (!posUuidCustomer) {
        const error = `Pos not found: ${invoiceDataCustomer.BODEGA}`;
        errors.push(error);
        throw '';
      }
      const validCustomerPos = customer.CustomerPos.find(
        (c) => c.posUuid === posUuidCustomer
      );

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
                    uuid: posUuidCustomer,
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
        const message = `Customer update: ${invoiceDataCustomer.IDENTIFICACION_CLIENTE}`;
        succes.push(message);
        console.log(`Migrating Customers: ${j + 1} of ${data.length}`);
      } else {
        console.log(
          'CUSTOMER ALREADY',
          invoiceDataCustomer.IDENTIFICACION_CLIENTE
        );
      } 
    } catch (error) {
      console.log(error);
    }
  }
  console.log('-----------------> CUSTOMER POS POS READY <--------------------');

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
