import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { billId, branchId } = await readBody(event);

  if (!branchId || !billId) {
    return { error: "branchId and billId are required" };
  }

  try {
    const bill = await prisma.bill.findFirst({
      where: {
        id: Number(billId),
        branchId: Number(branchId), // Ensure that the bill belongs to the branch
      },
      include: {
        orderMenus: {
          where: {
            status: "finish", // Filter only finished orders
          },
          include: {
            orderOptions: true,
          },
        },
      },
    });

    if (!bill) {
      return { error: "Bill not found or does not belong to the branch" };
    }

    // Sum the total price of finished orders
    const totalFinishedOrders = bill.orderMenus.reduce(
      (sum, order) => sum + order.totalPrice,
      0,
    );

    return {
      ...bill,
      totalFinishedOrders,
    };
  } catch (error) {
    return { error: "Failed to fetch bill details" };
  }
});
