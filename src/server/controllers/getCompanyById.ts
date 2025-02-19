import { TypedHandler } from "@hono/zod-openapi";
import { prisma } from "../../../prisma";
import { getCompanyByIdRoute } from "../routes/appRoutes";

//contorllers/getBlogById.ts
export const getCompanyByIdHandler: TypedHandler<typeof getCompanyByIdRoute> = async (c) => {    const { id } = c.req.param();
    const blog = await prisma.blog.findUnique({
      where: { id: Number(id) },
      include: {
        company: {
          select: {
            name: true,
            state: true,
            createdAt: true,
            userId: true,
            user: true
          }
        }
      }
    })
  
    if (!blog) {
      return c.json(null, 404)
    }
  
    return c.json(blog, 200)
  }