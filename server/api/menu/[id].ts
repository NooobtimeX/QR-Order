import type { H3Event } from "h3";
import { defineEventHandler } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  // Ensure params exist and extract id
  const { id } = event.context.params ?? {};

  if (!id) {
    return {
      statusCode: 400,
      message: "Menu ID is required",
    };
  }

  // Convert the ID to an integer
  const menuId = parseInt(id, 10);

  if (isNaN(menuId)) {
    return {
      statusCode: 400,
      message: "Invalid menu ID",
    };
  }

  try {
    // Fetch the menu item from the database, adjust the relation to `sections`
    const menuItem = await prisma.menu.findUnique({
      where: { id: menuId },
      include: {
        sections: {
          include: {
            options: true, // Assuming `options` are related to `sections`
          },
        },
        category: true, // If you want to include the category
      },
    });

    // Check if the menu item exists
    if (!menuItem) {
      return {
        statusCode: 404,
        message: "Menu item not found",
      };
    }

    // Map the menu item to the format expected by the frontend
    const formattedMenuItem = {
      name: menuItem.name,
      price: menuItem.price,
      img: menuItem.imageUrl, // Assuming you store image URLs in the `imageUrl` field
      options: menuItem.sections.map((section) => ({
        optionName: section.name,
        choices: section.options.map((option) => ({
          name: option.name,
          price: option.price,
        })),
      })),
    };

    return formattedMenuItem;
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return {
      statusCode: 500,
      message: "An error occurred while fetching the menu item",
    };
  }
});
