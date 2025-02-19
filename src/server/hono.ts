// server/hono.ts
import { OpenAPIHono } from "@hono/zod-openapi";
import {
  getCompanyByIdRoute,
  getCompaniesRoute,
} from "@/server/routes/appRoutes";
import { getCompaniesHandler } from "./controllers/getCompanies";
import { getCompanyByIdHandler } from "./controllers/getCompanyById";

export const app = new OpenAPIHono().basePath("/api");

const blogApp = new OpenAPIHono()
  .openapi(getCompaniesRoute, getCompaniesHandler)
  .openapi(getCompanyByIdRoute, getCompanyByIdHandler);

app.route("/blogs", blogApp);

export default app;
