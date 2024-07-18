import { defineEventHandler, createError, getQuery } from "h3";
import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const query = getQuery(event);
  const userId = parseInt(query.userId);

  if (isNaN(userId)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid user ID",
    });
  }

  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        userId: userId,
      },
    });

    return {
      statusCode: 200,
      body: restaurants,
    };
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
