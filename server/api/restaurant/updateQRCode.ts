import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError, readBody } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { tableId, qrCodeId } = await readBody(event);

    if (!tableId || !qrCodeId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Table ID and QRCode ID are required",
      });
    }

    const updatedTable = await prisma.table.update({
      where: { id: parseInt(tableId, 10) },
      data: { qrCodeId },
    });

    return {
      statusCode: 200,
      body: updatedTable,
    };
  } catch (error) {
    console.error("Error updating QRCode:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
