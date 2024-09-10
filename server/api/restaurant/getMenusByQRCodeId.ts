import { defineEventHandler, createError, readBody } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { restaurantId } = body;

    if (!restaurantId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid or missing Restaurant ID in the request body",
      });
    }

    const menus = await prisma.menu.findMany({
      where: { restaurantId },
      include: {
        category: true,
      },
    });

    return { body: menus };
  } catch (error) {
    console.error("Error fetching menus:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
