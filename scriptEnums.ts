const { PrismaClient } = require("./src/generated/client");

const prisma = new PrismaClient();

const typeAnulacion = async () => {
  await prisma.$queryRaw`
    ALTER TYPE "public"."TYPE_OF_NOTE" ADD VALUE 'ANULACION';
  `;
};
(async () => {
  await typeAnulacion();
})();

const typeBulking = async () => {
  await prisma.$queryRaw`
    ALTER TYPE "public"."BULKING_TYPE_EVENT" ADD VALUE 'NOTE_CREDIT';
  `;
};
(async () => {
  await typeBulking();
})();
