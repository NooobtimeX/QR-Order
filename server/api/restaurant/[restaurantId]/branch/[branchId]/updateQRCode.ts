import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody, sendError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Extract only branchId from the URL parameters
    const { branchId } = event.context.params as {
      branchId: string;
    };

    // Read the request body (tableId and new qrCodeId)
    const body = await readBody(event);
    const { tableId, qrCodeId } = body;

    // Validate input
    if (!tableId || !qrCodeId) {
      return sendError(event, new Error("Missing tableId or qrCodeId"));
    }

    // Ensure qrCodeId is a string (handle cases where it could be null)
    const validatedQrCodeId = qrCodeId ?? undefined;

    // Start a database transaction
    const result = await prisma.$transaction(async (prisma2) => {
      // Update the QR code for the specified table
      const updatedTable = await prisma2.table.update({
        where: {
          id: Number(tableId),
        },
        data: {
          qrCodeId: validatedQrCodeId,
        },
      });

      // Create a new bill linked with the updated table
      const newBill = await prisma2.bill.create({
        data: {
          tableId: updatedTable.id,
          qrCodeId: validatedQrCodeId,
          branchId: Number(branchId), // Include branchId
          totalAmount: 0, // Default value or calculate if necessary
          paymentStatus: "PENDING", // Set a default or appropriate value
          // Add any additional bill details here
        },
      });

      return {
        updatedTable,
        newBill,
      };
    });

    // Return the updated table and new bill data
    return {
      statusCode: 200,
      body: result,
    };
  } catch (error) {
    console.error("Error updating QR code and creating bill:", error);
    return sendError(
      event,
      new Error("Failed to update QR code and create bill"),
    );
  }
});
