const { PrismaClient } =  require("../generated/client");
const { PURCHASE_STATUS } = require("../generated/client")

const prisma = new PrismaClient();


const updateStatusUpcoming = async () => {
  try {
    
    const upcomingPurchases = await prisma.upcomingPurchase.updateMany({
      where: {
        organizationUuid: 'c0517e80-ab0d-41e9-b23d-44783c187820',
      },
      data: {
        status: PURCHASE_STATUS.COMPLETED,
      },
    });

    console.log(upcomingPurchases);
  } catch (error) {
    console.log(error);
  }
}

updateStatusUpcoming()