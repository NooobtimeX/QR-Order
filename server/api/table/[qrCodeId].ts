import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const params = event.context.params!;
    const qrCodeId = params.qrCodeId;

    console.log("Received qrCodeId:", qrCodeId);

    if (!qrCodeId) {
      throw createError({
        statusCode: 400,
        statusMessage: "QR Code ID is required",
      });
    }

    // Find the table using qrCodeId and include the restaurantId from the related restaurant through branch
    const table = await prisma.table.findUnique({
      where: { qrCodeId },
      select: {
        branch: {
          select: {
            restaurantId: true, // Fetch restaurantId from the branch relation
          },
        },
      },
    });

    if (!table) {
      console.log("No table found for qrCodeId:", qrCodeId);
      throw createError({
        statusCode: 404,
        statusMessage: "Table not found",
      });
    }

    const restaurantId = table.branch.restaurantId;

    console.log("Found restaurantId:", restaurantId);

    return { restaurantId };
  } catch (error) {
    console.error("Error fetching restaurant from QR Code:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect().catch((err) => {
      console.error("Error disconnecting Prisma client:", err);
    });
  }
});
