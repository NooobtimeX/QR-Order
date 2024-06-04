import { defineEventHandler } from "h3";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const restaurants = await prisma.restaurant.findMany(); // Fetch all restaurants
    return {
      statusCode: 200,
      data: restaurants,
    };
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
