import { PrismaClient } from "@prisma/client";
import { defineEventHandler, sendError, readBody } from "h3";

const prisma = new PrismaClient();

interface RequestBody {
  branchId: number;
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<RequestBody>(event);
    const { branchId } = body;

    if (!branchId) {
      return sendError(event, {
        statusCode: 400,
        message: "Invalid data: branchId is missing",
        name: "",
      });
    }

    const branchMenus = await prisma.branchMenu.findMany({
      where: { branchId },
      include: {
        menu: {
          include: {
            category: true, // Include category information
          },
        },
      },
    });

    const menus = branchMenus.map((branchMenu) => branchMenu.menu);

    console.log("Fetched menus:", menus);

    return {
      statusCode: 200,
      body: { menus },
    };
  } catch (error) {
    console.error("Error fetching menus:", error);
    return sendError(event, {
      statusCode: 500,
      message: "Failed to fetch menus",
      name: "",
    });
  }
});
