import { defineEventHandler, createError, readBody } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, restaurantId } = body;

  if (!name || !restaurantId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name and restaurant ID are required",
    });
  }

  try {
    const newMenuCategory = await prisma.menuCategory.create({
      data: {
        name,
        restaurantId,
      },
    });

    return {
      statusCode: 201,
      body: newMenuCategory,
    };
  } catch (error) {
    console.error("Error creating menu category:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
