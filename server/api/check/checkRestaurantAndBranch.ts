import { defineEventHandler, readBody } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { restaurantId, branchId } = body;

  try {
    // Check if the restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: Number(restaurantId) },
    });

    if (!restaurant) {
      return {
        exists: false,
        message: "Restaurant not found",
      };
    }

    // Check if the branch exists for the given restaurant
    const branch = await prisma.branch.findFirst({
      where: {
        id: Number(branchId),
        restaurantId: Number(restaurantId),
      },
    });

    if (!branch) {
      return {
        exists: false,
        message: "Branch not found",
      };
    }

    // If both exist, return the restaurant and branch names
    return {
      exists: true,
      restaurant: { name: restaurant.name },
      branch: { name: branch.name },
    };
  } catch (error) {
    console.error("Error checking restaurant and branch:", error);
    return {
      exists: false,
      message: "Internal server error",
    };
  }
});
