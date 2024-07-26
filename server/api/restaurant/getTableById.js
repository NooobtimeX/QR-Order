import { defineEventHandler, createError, getQuery } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const restaurantId = parseInt(query.restaurantId);

  if (isNaN(restaurantId)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid restaurant ID",
    });
  }

  try {
    const tables = await prisma.table.findMany({
      where: {
        restaurantId: restaurantId,
      },
      include: {
        qrCodes: true,
        restaurant: true,
      },
    });

    if (tables.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "No tables found for this restaurant",
      });
    }

    return {
      statusCode: 200,
      body: tables,
    };
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
