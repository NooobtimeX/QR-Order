import { defineEventHandler, createError, readBody } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, capacity, status, notification, restaurantId } = body;

  if (!name || !capacity || !status || !notification || !restaurantId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name, capacity, status, notification, and restaurant ID are required",
    });
  }

  try {
    const newTable = await prisma.table.create({
      data: {
        name,
        capacity,
        status,
        notification,
        restaurantId,
      },
    });

    return {
      statusCode: 201,
      body: newTable,
    };
  } catch (error) {
    console.error("Error creating table:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
