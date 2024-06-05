import { defineEventHandler, createError, readBody } from "h3";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  try {
    const body = await readBody(event);
    console.log("Received body:", body);

    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: email, password",
      });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: passwordHash,
      },
    });

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "User created successfully",
        data: user,
      }),
    };
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({
        statusCode: 409,
        statusMessage: "Email already exists",
      });
    }

    console.error("Error creating user:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
