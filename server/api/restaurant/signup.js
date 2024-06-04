import { defineEventHandler, createError, readBody } from "h3";
import bcrypt from "bcrypt";
import prisma from "~/lib/prisma";

const HASH_SALT = process.env.HASH_SALT;

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log("Received body:", body); // Debugging line

    const {
      name,
      email,
      password,
      phoneNumber,
      no,
      street,
      subdistrict,
      district,
      province,
      zipCode,
    } = body;

    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: name, email, password",
      });
    }

    // Hash password
    let passwordHash;
    try {
      passwordHash = await bcrypt.hash(password, HASH_SALT);
    } catch (error) {
      console.error("Error hashing password:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Error processing password",
      });
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        email,
        password: passwordHash,
        phoneNumber,
        no,
        street,
        subdistrict,
        district,
        province,
        zipCode,
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
