import { defineEventHandler, createError, readBody, getQuery } from "h3";
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

  const body = await readBody(event);
  const { name, capacity, status, notification } = body;

  if (!name && !capacity && !status && !notification) {
    throw createError({
      statusCode: 400,
      statusMessage: "At least one field (name, capacity, status, or notification) is required to update",
    });
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (capacity) updateData.capacity = capacity;
  if (status) updateData.status = status;
  if (notification) updateData.notification = notification;

  try {
    const updatedTable = await prisma.table.update({
      where: {
        id: tableId,
      },
      data: updateData,
    });

    return {
      statusCode: 200,
      body: updatedTable,
    };
  } catch (error) {
    console.error("Error updating table:", error);

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
