import { createError, readBody } from "h3";
import prisma from "~/lib/prisma";

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

    // Debug logging
    console.log("Received email:", email);
    console.log("Received password:", password);

    const user = await prisma.staff.findUnique({
      where: {
        email,
      },
    });

    // Check if user is found and log the result
    if (!user) {
      console.log("User not found for email:", email);
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    // Log the retrieved user data (excluding the password for security reasons)
    console.log("User found:", { id: user.id, email: user.email });

    // Check if the password matches and log the result
    if (user.password !== password) {
      console.log("Password mismatch for user:", email);
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    return {
      statusCode: 200,
      body: {
        message: "Sign-in successful",
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
