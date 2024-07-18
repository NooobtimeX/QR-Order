import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError, readBody } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body || !body.name || !body.description || !body.price || !body.restaurantId || !body.menuCategoryId || !body.sections) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    const { name, description, price, imageUrl, restaurantId, menuCategoryId, sections } = body;

    // Create the new menu
    const menu = await prisma.menu.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        restaurantId,
        menuCategoryId,
        sections: {
          create: sections.map(section => ({
            name: section.name,
            menuOption: {
              create: section.options.map(option => ({
                name: option.name,
                price: option.price,
              })),
            },
          })),
        },
      },
    });

    return {
      statusCode: 201,
      body: {
        message: "Menu created successfully",
        data: menu,
      },
    };
  } catch (error) {
    console.error("Error creating menu:", error);

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
