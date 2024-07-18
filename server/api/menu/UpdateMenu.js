import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError, readBody } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body || !body.id || !body.name || !body.description || !body.price || !body.restaurantId || !body.menuCategoryId || !body.sections) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    const { id, name, description, price, imageUrl, restaurantId, menuCategoryId, sections } = body;

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

    // Prepare data for updating sections and options
    const updatedSections = sections.map((section) => ({
      where: { id: section.id || 0 }, // `id` or default `0` for new sections
      create: {
        name: section.name,
        menuOption: {
          create: section.options.map(option => ({
            name: option.name,
            price: option.price,
          })),
        },
      },
      update: {
        name: section.name,
        menuOption: {
          deleteMany: {
            id: {
              notIn: section.options.map(option => option.id).filter(id => id !== undefined), // Delete options not in the update list
            },
          },
          upsert: section.options.map(option => ({
            where: { id: option.id || 0 }, // `id` or default `0` for new options
            create: {
              name: option.name,
              price: option.price,
            },
            update: {
              name: option.name,
              price: option.price,
            },
          })),
        },
      },
    }));

    // Update the menu
    const updatedMenu = await prisma.menu.update({
      where: { id },
      data: {
        name,
        description,
        price,
        imageUrl,
        restaurantId,
        menuCategoryId,
        sections: {
          deleteMany: {
            id: {
              notIn: sections.map(section => section.id).filter(id => id !== undefined), // Delete sections not in the update list
            },
          },
          upsert: updatedSections,
        },
      },
    });

    return {
      statusCode: 200,
      body: {
        message: "Menu updated successfully",
        data: updatedMenu,
      },
    };
  } catch (error) {
    console.error("Error updating menu:", error);

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
