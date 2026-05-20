import z from "zod/v4";

export const clienteSchema = z.object({
  id: z.number()
    .int()
    .positive()
    .optional(),

  nomeFantasia: z.string()
    .min(1, "Nome fantasia é obrigatório")
    .max(100),

  whatsapp: z.string()
    .max(11)
    .regex(/^\d+$/, "Whatsapp deve conter apenas números")
    .optional()
    .nullable(),

  email: z.email()
    .max(100)
    .optional()
    .nullable(),

  instagram: z.string()
    .max(30)
    .optional()
    .nullable(),

  obs: z.string()
    .max(150)
    .optional()
    .nullable(),

  estado: z.string()
    .optional()
    .nullable(),

  cidade: z.string()
    .optional()
    .nullable(),

  bairro: z.string()
    .optional()
    .nullable(),

  logradouro: z.string()
    .optional()
    .nullable(),

  endereco: z.string()
    .optional()
    .nullable(),
  },
  {
    // required_error: "Objeto deve estar definido",
    error: (issue) => {
      if(issue.code == "invalid_type" && issue.input == undefined)
        return "Body indefinido"
      return "Payload inválido"
    }
  }
);


const createSchema = clienteSchema.omit({id: true});
const updateSchema = clienteSchema.partial(true);


export {
  createSchema,
  updateSchema
}

export type Cliente = z.infer<typeof clienteSchema>