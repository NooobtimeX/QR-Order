import { defineEventHandler, createError, readBody } from "h3";
import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  try {
    const body = await readBody(event);

    if (!body.name || !body.phoneNumber || !body.userId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: name, phoneNumber, userId",
      });
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name: body.name,
        phoneNumber: body.phoneNumber,
        no: body.no || "",
        street: body.street || "",
        subdistrict: body.subdistrict || "",
        district: body.district || "",
        province: body.province || "",
        zipCode: body.zipCode || "",
        userId: body.userId,
      },
    });

    return {
      statusCode: 201,
      body: {
        message: "Restaurant created successfully",
        data: restaurant,
      },
    };
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
