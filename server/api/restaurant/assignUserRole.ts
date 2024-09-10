import { defineEventHandler, createError, readBody } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, role, restaurantId } = body;

    if (!email || !role || !restaurantId) {
      console.error("Missing required fields:", { email, role, restaurantId });
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error("User not found:", email);
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    // Check if the user already has a role in this restaurant
    const existingRole = await prisma.userRestaurantRole.findUnique({
      where: {
        restaurantId_userId: {
          restaurantId,
          userId: user.id,
        },
      },
    });

    if (existingRole) {
      console.error(
        "User already has a role in this restaurant:",
        existingRole,
      );
      throw createError({
        statusCode: 409,
        statusMessage: "User already has a role in this restaurant",
      });
    }

    // Create a new UserRestaurantRole entry
    await prisma.userRestaurantRole.create({
      data: {
        restaurantId,
        userId: user.id,
        role,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to add role:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to add role",
    });
  }
});
