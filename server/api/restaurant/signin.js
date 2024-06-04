import { createError, readBody } from "h3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "~/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET;

export default defineEventHandler(async (event) => {
  let body;
  try {
    body = await readBody(event);
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  const { email, password } = body || {};

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required",
    });
  }

  try {
    const user = await prisma.restaurant.findUnique({
      where: { email },
    });

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }, // Token expires in 24 hours
    );

    return {
      statusCode: 200,
      body: {
        message: "Sign-in successful",
        token,
      },
    };
  } catch (error) {
    console.error("Error signing in:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
