import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.params.userId; // Assuming userId is passed as a URL parameter

    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: "User ID is required",
      });
    }

    const restaurants = await prisma.restaurant.findMany({
      where: { userId: parseInt(userId) },
      select: {
        id: true,
        name: true,
      },
    });

    return {
      statusCode: 200,
      body: {
        message: "Restaurants retrieved successfully",
        data: restaurants,
      },
    };
  } catch (error) {
    console.error("Error retrieving restaurants:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
