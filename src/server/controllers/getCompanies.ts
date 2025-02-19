// server/controllers/getCompanies.ts
import { TypedHandler } from "@hono/zod-openapi";import { prisma } from "../../../prisma";
import { getCompaniesRoute } from "../routes/appRoutes";

export const getCompaniesHandler: TypedHandler<typeof getCompaniesRoute> = async (c) => {    const { id } = c.req.param();
  const blogs = await prisma.blog.findMany({
    include: {
      company: {
        select: {
            name: true,
            state: true,
            createdAt: true,
            userId: true,
            user: true
        },
      },
    },
  });

  return c.json(blogs, 200);
};
