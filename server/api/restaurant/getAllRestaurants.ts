import { defineEventHandler, createError, getQuery } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Get the userId from the query string for a GET request
    const query = getQuery(event);
    const { userId } = query;

    // Check if userId is present in the query parameters
    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request: Missing userId in query parameters",
      });
    }

    // Your logic for fetching restaurants
    const restaurants = await prisma.restaurant.findMany({
      where: {
        OR: [
          {
            userRestaurantRoles: {
              some: {
                userId: Number(userId), // Make sure userId is a number
              },
            },
          },
          {
            branches: {
              some: {
                userBranchRoles: {
                  some: {
                    userId: Number(userId), // Filter branches by userId
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        userRestaurantRoles: true,
        branches: {
          include: {
            userBranchRoles: {
              where: { userId: Number(userId) },
              select: { role: true },
            },
          },
        },
      },
    });

    // Return the response
    return {
      statusCode: 200,
      body: {
        ownedRestaurants: restaurants.filter(
          (r) => r.userRestaurantRoles.length > 0,
        ),
        staffRestaurants: restaurants.filter((r) =>
          r.branches.some((branch) => branch.userBranchRoles.length > 0),
        ),
      },
    };
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch restaurants",
    });
  }
});
