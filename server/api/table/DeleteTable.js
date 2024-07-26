import { defineEventHandler, createError, getQuery } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const tableId = parseInt(query.tableId);

  if (isNaN(tableId)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid table ID",
    });
  }

  try {
    const deletedTable = await prisma.table.delete({
      where: {
        id: tableId,
      },
    });

    return {
      statusCode: 200,
      body: deletedTable,
    };
  } catch (error) {
    console.error("Error deleting table:", error);

    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        statusMessage: "Table not found",
      });
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
