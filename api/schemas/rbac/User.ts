import z from "zod";

const userSchema = z.object({
  email: z
    .email()
    .min(5)
    .max(255),

  nome: z
    .string()
    .max(100),

  login: z
    .string()
    .min(5)
    .max(50),

  password: z
    .string()
    .min(5)
    .max(72),

  is_verified: z
    .boolean()
    .optional()
    .default(false),

  verification_code: z
    .string()
    .optional()
    .nullable(),

  token_version: z
    .number()
    .int()
    .optional()
    .default(1),

  is_active: z
    .boolean()
    .optional()
    .default(true),
},
{
  error: (issue) => {
    if(issue.code == "invalid_type" && issue.input == undefined)
      return "Body indefinido"
    return "Payload inválido"
  }
});

const createSchema = userSchema;
const updateSchema = userSchema.partial().extend({
  is_verified: z.boolean().optional(),
  token_version: z.number().int().optional(),
  is_active: z.boolean().optional()
  
}).refine(
  (data) => Object.values(data).some(v => v !== undefined),
  {
    error: "Ao menos um campo é necessário para performar uma edição."
  }
);
const loginSchema = userSchema.omit({email: true, nome: true, is_active: true, is_verified: true, verification_code: true, token_version: true})
const registerSchema = userSchema.extend({
  verification_code: z
    .string(),
  is_verified: z
    .boolean()
    .default(true),
  
})
export type User = z.infer<typeof userSchema>;
export {createSchema, updateSchema, loginSchema, registerSchema}