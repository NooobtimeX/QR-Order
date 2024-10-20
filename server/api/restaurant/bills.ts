import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Get the branchId from the request body or query params
  const { branchId } = await readBody(event);

  if (!branchId) {
    return { error: "branchId is required" };
  }

  try {
    const bills = await prisma.bill.findMany({
      where: {
        branchId: Number(branchId), // Filter by branchId
      },
      select: {
        id: true,
        totalAmount: true,
        paymentStatus: true,
        createdAt: true,
      },
    });
    return bills;
  } catch (error) {
    return { error: "Failed to fetch bills" };
  }
});
