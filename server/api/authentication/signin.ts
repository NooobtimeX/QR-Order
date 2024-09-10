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

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    // Directly compare the provided password with the stored password
    if (body.password !== user.password) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    return {
      statusCode: 200,
      body: {
        message: "Sign in successful",
        userId: user.id,
      },
    };
  } catch (error) {
    console.error("Error during user sign-in:", error);
    throw createError({
      statusCode: (error as any).statusCode || 500,
      statusMessage: (error as any).statusMessage || "Internal Server Error",
    });
  }
});
