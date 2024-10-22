import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3"; // Assuming you're using Nuxt 3 or H3

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Get the request body
  const { qrCodeId, notification } = await readBody(event);

  // Validate that qrCodeId and notification are provided
  if (!qrCodeId || !notification) {
    return {
      statusCode: 400,
      body: {
        error: "QR Code ID and notification message are required.",
      },
    };
  }

  try {
    // Find the table by qrCodeId
    const table = await prisma.table.findUnique({
      where: {
        qrCodeId: String(qrCodeId),
      },
    });

    // If table is not found, return an error
    if (!table) {
      return {
        statusCode: 404,
        body: {
          error: "Table not found.",
        },
      };
    }

    // Update the table's notification field in the database
    const updatedTable = await prisma.table.update({
      where: {
        id: table.id, // Use the found table's ID
      },
      data: {
        notification, // Update the notification field
      },
    });

    return {
      statusCode: 200,
      body: {
        message: "Notification updated successfully.",
        table: updatedTable,
      },
    };
  } catch (error) {
    console.error("Failed to update notification:", error);
    return {
      statusCode: 500,
      body: {
        error: "Failed to update notification.",
      },
    };
  }
});
