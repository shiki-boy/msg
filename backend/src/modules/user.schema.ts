import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  firstName: z.string(),
  lastName: z.string(),
};

const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

const createUserResponseSchema = z.object({
  _id: z.string(),
  ...userCore,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

// ---

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({ ...userCore, _id: z.string() }),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ---

const userInfoResponseSchema = z.object({
  ...userCore,
  _id: z.string()
})

// ---

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,

  loginSchema,
  loginResponseSchema,

  userInfoResponseSchema,
});
