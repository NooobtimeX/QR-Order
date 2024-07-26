import { defineEventHandler, createError, getQuery } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Staff ID is required",
    });
  }

  try {
    const deletedStaff = await prisma.staff.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    return {
      statusCode: 200,
      body: deletedStaff,
    };
  } catch (error) {
    console.error("Error deleting staff:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
