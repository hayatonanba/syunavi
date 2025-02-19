import { z } from "@hono/zod-openapi";

export const UserSchema = z.object({
  name: z.string().nullable().openapi({
    example: "kanoka"
  }),
  image: z.string().nullable().openapi({
    example: "https://avatars.githubuserstate.com/u/xxxxxxxx?v=4"
  }),
})

export const CompanySchema = z.object({
  id: z.number().openapi({
    example: 1
  }),
  name: z.string().openapi({
    example: "企業A"
  }),
  state: z.string().openapi({
    example: "書類選考"
  }),
  createdAt: z.string().datetime().openapi({
    example: "2025-02-16T12:00:00Z"
  }),
  userId: z.string().openapi({
    example: "xxxxxxxxxxxxxxxxxxx"
  }),
  user: UserSchema
})

export const CompaniesSchema = z.array(CompanySchema)

export const CompanyIdSchema = z.object({
  id: z.string().openapi({ example: "1" }),
})

export const CreateCompanySchema = z.object({
  name: z.string().min(1, { message: "入力されていません。" }).openapi({
    example: "企業A"
  }),
  state: z.string().min(1, { message: "入力されていません。" }).openapi({
    example: "書類選考"
  })
})


export type User = z.infer<typeof UserSchema>
export type Company = z.infer<typeof CompanySchema>
export type CreateCompany = z.infer<typeof CreateCompanySchema>