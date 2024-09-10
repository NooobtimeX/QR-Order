import { defineEventHandler, createError, getQuery } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const restaurantId = parseInt(query.restaurantId as string, 10);

  if (!restaurantId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid restaurant ID",
    });
  }

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: {
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

    const allStaff = restaurant.userRestaurantRoles.map((role) => ({
      id: role.user.id,
      email: role.user.email,
      role: role.role, // This will be either 'owner' or 'staff'
    }));

    return { body: allStaff };
  } catch (error) {
    console.error("Error fetching staff members:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch staff members",
    });
  }
});
