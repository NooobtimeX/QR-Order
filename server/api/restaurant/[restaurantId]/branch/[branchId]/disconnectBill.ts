import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError, readBody } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Extract tableId from request body
    const { tableId } = await readBody(event);

    if (!tableId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Table ID is required",
      });
    }

    // Disconnect bill from table
    await prisma.bill.updateMany({
      where: {
        tableId: tableId,
      },
      data: {
        tableId: null, // Set tableId to null to disconnect
      },
    });

    return {
      statusCode: 200,
      statusMessage: "Bill disconnected successfully",
    };
  } catch (error) {
    console.error("Error disconnecting bill:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error disconnecting bill",
    });
  } finally {
    // Ensure Prisma Client is disconnected
    await prisma.$disconnect();
  }
});
