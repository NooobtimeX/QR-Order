import { defineEventHandler, createError, readBody } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  if (event.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed",
    });
  }

  try {
    const body = await readBody(event);
    const resId = body.resId;

    if (!resId || isNaN(parseInt(resId, 10))) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid or missing Restaurant ID in the request body",
      });
    }

    const menus = await prisma.menu.findMany({
      where: {
        restaurantId: parseInt(resId, 10),
      },
      include: {
        category: true,
        sections: {
          include: {
            options: true,
          },
        },
      },
      orderBy: {
        category: {
          name: "asc",
        },
      },
    });

    return {
      statusCode: 200,
      body: menus,
    };
  } catch (error: unknown) {
    console.error("Error fetching menus:", error);

    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message || "Internal Server Error",
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
      });
    }
  } finally {
    await prisma.$disconnect();
  }
});
