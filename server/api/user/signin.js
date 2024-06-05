import { PrismaClient } from "@prisma/client";
import { createError, readBody } from "h3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secret = "secret";
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body || !body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email and password are required",
      });
    }

    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }
    const token = jwt.sign({ email }, secret, { expiresIn: "24h" });
    return {
      statusCode: 200,
      body: {
        message: "Sign-in successful",
        token,
      },
    };
  } catch (error) {
    console.error("Error signing in:", error);

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
