import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError, readBody } from "h3";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body || !body.id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Staff ID is required",
      });
    }

    const { id, email, password } = body;

    // Check if the staff member exists
    const existingStaff = await prisma.staff.findUnique({
      where: { id },
    });

    if (!existingStaff) {
      throw createError({
        statusCode: 404,
        statusMessage: "Staff member not found",
      });
    }

    // Check if the new email already exists (if email is being updated)
    if (email && email !== existingStaff.email) {
      const existingEmail = await prisma.staff.findUnique({
        where: { email },
      });

      if (existingEmail) {
        throw createError({
          statusCode: 409,
          statusMessage: "Email already exists",
        });
      }
    }

    // Hash the new password if provided
    let passwordHash;
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    // Update the staff member
    const updatedStaff = await prisma.staff.update({
      where: { id },
      data: {
        email: email || existingStaff.email,
        password: passwordHash || existingStaff.password,
      },
    });

    return {
      statusCode: 200,
      body: {
        message: "Staff member updated successfully",
        data: updatedStaff,
      },
    };
  } catch (error) {
    console.error("Error updating staff member:", error);

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
