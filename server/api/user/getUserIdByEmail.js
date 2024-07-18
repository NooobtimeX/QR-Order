import { PrismaClient } from "@prisma/client";
import { createError, readBody } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body || !body.email) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email is required",
      });
    }

    const { email } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    return {
      statusCode: 200,
      body: {
        userId: user.id,
      },
    };
  } catch (error) {
    console.error("Error fetching user ID:", error);

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
