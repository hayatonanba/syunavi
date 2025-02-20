import { createRoute, z } from "@hono/zod-openapi";
import { CompanyIdSchema, CompanySchema, CompaniesSchema, CreateCompanySchema } from "../models/appSchema";

export const getCompaniesRoute = createRoute({
  path: "/api/syunavi/",
  method: "get",
  description: "全企業の取得",
  responses: {
    200: {
      description: "取得成功",
      content: {
        "application/json": {
          schema: CompaniesSchema
        }
      }
    }
  },
})

export const getCompanyByIdRoute = createRoute({
  path: "api/syunavi/{id}",
  method: "get",
  description: "個別の企業情報を取得",
  request: {
    params: CompanyIdSchema
  },
  responses: {
    200: {
      description: "取得成功",
      content: { "application/json": { schema: CompanySchema } }
    },
    404: {
      description: "企業が見つかりませんでした。",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})
