import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const menus = await prisma.menu.findMany({
      include: {
        sections: {
          include: {
            menuOption: true,
          },
        },
        restaurant: true,
        menuCategory: true,
      },
    });

    return {
      statusCode: 200,
      body: {
        message: "Menus retrieved successfully",
        data: menus,
      },
    };
  } catch (error) {
    console.error("Error retrieving menus:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
