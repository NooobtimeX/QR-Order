import { PrismaClient } from "@prisma/client";
import { H3Event, createError, readBody } from "h3";

const prisma = new PrismaClient();

// Define Option and Section types for clarity
interface Option {
  name: string;
  price: number;
}

interface Section {
  name: string;
  options: Option[];
}

// Define the request body interface to include all fields
interface CreateMenuBody {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  restaurantId: number;
  sections: Section[];
}

export default async (event: H3Event) => {
  try {
    // Parse request body and enforce types
    const body = await readBody<CreateMenuBody>(event);

    // Destructure the properties from the body
    const { name, description, price, categoryId, restaurantId, sections } =
      body;

    // Validate required fields
    if (!name || !description || !price || !categoryId || !restaurantId) {
      return createError({
        statusCode: 400,
        message: "Missing required fields",
      });
    }

    // Create the menu item with sections and options in Prisma
    const menu = await prisma.menu.create({
      data: {
        name,
        description,
        price,
        categoryId,
        restaurantId,
        sections: {
          create: sections.map((section) => ({
            name: section.name,
            options: {
              create: section.options.map((option) => ({
                name: option.name,
                price: option.price,
              })),
            },
          })),
        },
      },
    });

    // Fetch all branches of the restaurant
    const branches = await prisma.branch.findMany({
      where: {
        restaurantId: restaurantId,
      },
    });

    // Add the created menu to each branch by inserting into the BranchMenu table
    const branchMenuPromises = branches.map(async (branch) => {
      try {
        await prisma.branchMenu.create({
          data: {
            branchId: branch.id,
            menuId: menu.id,
            isActive: true, // Modify logic as needed
          },
        });
      } catch (error) {
        console.error(
          `Error creating branchMenu for branch ${branch.id}:`,
          error,
        );
      }
    });

    // Wait for all branchMenu records to be created
    await Promise.all(branchMenuPromises);

    // Return the created menu as a response
    return { status: 201, body: menu };
  } catch (error) {
    console.error("Error creating menu:", error);
    return createError({ statusCode: 500, message: "Internal Server Error" });
  }
};
