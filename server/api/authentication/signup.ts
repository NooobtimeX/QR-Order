import { defineEventHandler, createError, readBody } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: email, password",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: "User already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    return {
      statusCode: 201,
      body: {
        message: "User created successfully",
        userId: user.id,
      },
    };
  } catch (error) {
    console.error("Error during user sign-up:", error);
    throw createError({
      statusCode: (error as any).statusCode || 500,
      statusMessage: (error as any).statusMessage || "Internal Server Error",
    });
  }
});
