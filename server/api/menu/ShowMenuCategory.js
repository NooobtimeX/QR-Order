import { defineEventHandler, createError } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const menuCategories = await prisma.menuCategory.findMany();

    if (menuCategories.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "No menu categories found",
      });
    }

    return {
      statusCode: 200,
      body: menuCategories,
    };
  } catch (error) {
    console.error("Error fetching menu categories:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
