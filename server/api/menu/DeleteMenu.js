import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError, readBody } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body || !body.id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Menu ID is required",
      });
    }

    const { id } = body;

    // Check if the menu exists
    const existingMenu = await prisma.menu.findUnique({
      where: { id },
      include: {
        sections: {
          include: {
            menuOption: true,
          },
        },
      },
    });

    if (!existingMenu) {
      throw createError({
        statusCode: 404,
        statusMessage: "Menu not found",
      });
    }

    // Delete the menu along with its sections and options
    await prisma.menu.delete({
      where: { id },
    });

    return {
      statusCode: 200,
      body: {
        message: "Menu deleted successfully",
      },
    };
  } catch (error) {
    console.error("Error deleting menu:", error);

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
