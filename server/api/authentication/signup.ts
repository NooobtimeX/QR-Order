import { defineEventHandler, createError, readBody } from "h3";
import { PrismaClient, Prisma } from "@prisma/client";

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
  } catch (error: unknown) {
    console.error("Error during user sign-up:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Prisma-specific errors
      throw createError({
        statusCode: 500,
        statusMessage: `Prisma error: ${error.message}`,
      });
    } else if (error instanceof Error) {
      // General errors
      throw createError({
        statusCode: 500,
        statusMessage: error.message || "Internal Server Error",
      });
    } else {
      // Fallback for unknown error types
      throw createError({
        statusCode: 500,
        statusMessage: "Unknown error occurred",
      });
    }
  }
});
