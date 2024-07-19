import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError, readBody } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Restaurant ID is required",
      });
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include: {
        staffs: true,
        menuCategories: true,
        menus: true,
        tables: true,
        receipts: true,
      },
    });

    if (!restaurant) {
      throw createError({
        statusCode: 404,
        statusMessage: "Restaurant not found",
      });
    }

    return {
      statusCode: 200,
      body: restaurant,
    };
  } catch (error) {
    console.error("Error fetching restaurant:", error);

    if (error.statusCode) {
      throw error;
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal server error",
      });
    }
  } finally {
    await prisma.$disconnect();
  }
});
