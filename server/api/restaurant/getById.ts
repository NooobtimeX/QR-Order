import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError, readBody } from "h3";

const prisma = new PrismaClient();

function isHttpError(error: any): error is { statusCode: number } {
  return error && typeof error.statusCode === "number";
}

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody<{ id: string | number | undefined }>(event);

    // Validate and parse the restaurant ID
    const restaurantId = parseInt(id as string, 10);
    if (isNaN(restaurantId)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid Restaurant ID",
      });
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: restaurantId,
      },
      include: {
        categories: true,
        menus: {
          include: {
            sections: {
              include: {
                options: true,
              },
            },
          },
        },
        tables: true,
        receipts: true,
        userRestaurantRoles: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!restaurant) {
      throw createError({
        statusCode: 404,
        statusMessage: "Restaurant not found",
      });
    }

    // Format the response to match the previous structure
    const formattedResponse = {
      ...restaurant,
      owners: restaurant.userRestaurantRoles
        .filter((role) => role.role === "owner")
        .map((role) => role.user),
      staffMembers: restaurant.userRestaurantRoles
        .filter((role) => role.role === "staff")
        .map((role) => role.user),
    };

    return {
      statusCode: 200,
      body: formattedResponse,
    };
  } catch (error) {
    console.error("Error fetching restaurant:", error);

    if (isHttpError(error)) {
      throw error;
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal server error",
      });
    }
  } finally {
    // Ensure the Prisma client is disconnected properly
    await prisma.$disconnect().catch((err) => {
      console.error("Error disconnecting Prisma client:", err);
    });
  }
});
