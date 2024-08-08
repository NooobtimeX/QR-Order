import { defineEventHandler, createError, readBody, getQuery } from "h3";
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

  const body = await readBody(event);
  const { name } = body;

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name is required",
    });
  }

  try {
    const updatedMenuCategory = await prisma.menuCategory.update({
      where: {
        id: menuCategoryId,
      },
      data: {
        name,
      },
    });

    return {
      statusCode: 200,
      body: updatedMenuCategory,
    };
  } catch (error) {
    console.error("Error updating menu category:", error);

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
