import { defineEventHandler, createError, getQuery } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const menuCategoryId = parseInt(query.menuCategoryId);

  if (isNaN(menuCategoryId)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid menu category ID",
    });
  }

  try {
    const deletedMenuCategory = await prisma.menuCategory.delete({
      where: {
        id: menuCategoryId,
      },
    });

    return {
      statusCode: 200,
      body: deletedMenuCategory,
    };
  } catch (error) {
    console.error("Error deleting menu category:", error);

    if (error.code === "P2025") {
      throw createError({
        statusCode: 404,
        statusMessage: "Menu category not found",
      });
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
