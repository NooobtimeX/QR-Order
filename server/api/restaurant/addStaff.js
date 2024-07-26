import { defineEventHandler, createError, readBody } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, restaurantId } = body;

  if (!email || !restaurantId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and restaurant ID are required",
    });
  }

  try {
    const newStaff = await prisma.staff.create({
      data: {
        email,
        restaurantId,
      },
    });

    return {
      statusCode: 201,
      body: newStaff,
    };
  } catch (error) {
    console.error("Error adding staff:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
