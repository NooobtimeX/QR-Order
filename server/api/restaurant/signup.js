import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError, readBody } from "h3";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log("Received body:", body); // Add this line for debugging

    if (!body.name || !body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: name, email, password",
      });
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const restaurant = await prisma.restaurant.create({
      data: {
        name: body.name,
        email: body.email,
        password: passwordHash,
        phoneNumber: body.phoneNumber,
        no: body.no,
        street: body.street,
        subdistrict: body.subdistrict,
        district: body.district,
        province: body.province,
        zipCode: body.zipCode,
      },
    });

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Restaurant created successfully",
        data: restaurant,
      }),
    };
  } catch (error) {
    if (error.code === "P2002") {
      // Prisma unique constraint error
      throw createError({
        statusCode: 409,
        statusMessage: "Email already exists",
      });
    }
    console.error("Error creating restaurant:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
