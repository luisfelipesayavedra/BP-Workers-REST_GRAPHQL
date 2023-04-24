import { parentPort, workerData } from 'worker_threads';
import { BulkinEvents, GENDER, PERMISSION, PrismaClient, ROLE } from '../../../../generated/client';
import { userExcel } from '../functions';
import { TYPE_DNI } from '../../../../generated/client';
import { ACCOUNT_STATUS } from '../../../../generated/client';
import { encryptPassword } from '../../../../middlewares/helpers';

const prisma: PrismaClient = new PrismaClient();

export const User = async () => {
  console.log('Entrando al worker');
  const event = workerData.params.data.newEvent as BulkinEvents;
  const data = workerData.params.data.dataParsed as userExcel[];
  console.log(event);
  for (let index = 0; index < data.length; index++) {
    // if (index <= 3499) {
    //     continue
    // }
    try {
      const parseGender: {
        [id: string]: GENDER;
      } = {
        ['F']: GENDER.FEMALE,
        ['M']: GENDER.MALE,
      };
      const userData = data[index];
      const role = await prisma.userRole.findFirst({
        where: {
          type: userData.role as ROLE
        }
      })
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
      const permissionTypeArray = userData.permissions.split('|');
      console.log('🚀 ~ file: index.ts:44 ~ User ~ permissionTypeArray:', permissionTypeArray);
      const permissionsUuid = await prisma.permission.findMany({
        where: {
          type: {
            in: permissionTypeArray as PERMISSION[]
          }
        }
      })
      console.log(userData.type_dni);
      const passwordHash = encryptPassword("1234567");
      const existUser = await prisma.internalUser.findFirst({
        where: {
          email: userData.email
        }
      })
      if (existUser) return;
      const user = await prisma.internalUser.create({
        data: {
          first_name: String(userData.firstName),
          last_name: String(userData.lastName),
          gender: parseGender?.[userData.gender],
          type_DNI: userData.type_dni as TYPE_DNI,
          DNI: String(userData.dni != undefined ? userData.dni : ''),
          position: '',
          email: String(userData.email),
          account_status: userData.account_status as ACCOUNT_STATUS,
          profile_img: String(
            userData.profileImg != undefined ? userData.profileImg : ''
          ),
          organizationUuid: admin!.organizationUuid,
          user_role_uuid: role!.uuid,
          birthday: String(
            userData.birthday != undefined ? userData.birthday : null
          ),
          instagram: String(
            userData.instagram != undefined ? userData.instagram : ''
          ),
          internal_user_password: {
            create: {
              password: passwordHash,
            },
          },
          internal_user_cellphone: {
            create: {
              cellphone_number: String(
                userData.phone != undefined ? userData.phone : ''
              ),
            },
          },
          internal_user_address: {
            create: {
              country: String(
                userData.country != undefined ? userData.country : ''
              ),
              state: String(
                userData.state != undefined ? userData.state : ''
              ),
              city: String(
                userData.city != undefined ? userData.city : ''
              ),
              address: String(
                userData.address != undefined ? userData.address : ''
              ),
            },
          },
          user_has_permission: {
            create: permissionsUuid!.map((permission) => {
              return {
                permission_uuid: permission.uuid,
              };
            }),
          },
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
      console.log(eventData.percentage, user.uuid);
    } catch (error) {
      console.log(error);
      await prisma.bulkingEventsFailures.create({
        data: {
          log: `Error creating invoice with the next id: ${data[index].dni}`,
          position: index,
          bulkingEventUuid: event.uuid,
        },
      });
    }
  }
  parentPort?.close();
  prisma.$disconnect();
};

User();
