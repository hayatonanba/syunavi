import type { RouteConfigToHandler } from "@hono/zod-openapi";
import { prisma } from "../../../prisma";
import { getCompaniesRoute } from "../routes/appRoutes";

export const getCompaniesHandler: RouteConfigToHandler<typeof getCompaniesRoute> = async (c) => {
  const companies = await prisma.company.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true
        },
      },
    },
  });
  return c.json(companies, 200);
};
