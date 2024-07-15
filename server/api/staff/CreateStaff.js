import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError, readBody } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body || !body.email || !body.password || !body.restaurantId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email, password, and restaurantId are required",
      });
    }

    const { email, password, restaurantId } = body;

    // Check if the restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      throw createError({
        statusCode: 404,
        statusMessage: "Restaurant not found",
      });
    }

    // Check if the staff email already exists
    const existingStaff = await prisma.staff.findUnique({
      where: { email },
    });

    if (existingStaff) {
      throw createError({
        statusCode: 409,
        statusMessage: "Email already exists",
      });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the new staff member
    const staff = await prisma.staff.create({
      data: {
        email,
        password: passwordHash,
        restaurantId,
      },
    });

    return {
      statusCode: 201,
      body: {
        message: "Staff member created successfully",
        data: staff,
      },
    };
  } catch (error) {
    console.error("Error creating staff member:", error);

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
