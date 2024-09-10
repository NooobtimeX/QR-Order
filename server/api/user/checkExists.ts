// Assuming you are using an Express-like framework with H3 in a Nuxt.js project

import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Read the request body
    const body = await readBody(event);
    const userId = body.id;

    if (!userId) {
      return {
        status: 400,
        message: "User ID is required",
      };
    }

    // Check if the user exists
    const userExists = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (userExists) {
      return {
        status: 200,
        exists: true,
      };
    } else {
      return {
        status: 200,
        exists: false,
      };
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
});
