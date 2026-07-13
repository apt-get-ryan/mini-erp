import { z } from "zod";

export const pedidoSchema = z.object({

  id_cliente: z
    .number()
    .int()
    .positive({ message: "ID do cliente inválido" }),

  custo_frete: z
    .number()
    .int()
    .min(0, { message: "O custo de frete não pode ser negativo" })
    .optional()
    .default(0)
},
{
  error: (issue) => {
    if(issue.code == "invalid_type" && issue.input == undefined)
      return "Body indefinido"
    return "Payload inválido"
  }
});

const createSchema = pedidoSchema;
const updateSchema = pedidoSchema.partial().refine(
  (data) => Object.values(data).some(v => v !== undefined),
  {
    error: "Ao menos um campo é necessário para performar uma edição."
  }
)


export {
  createSchema,
  updateSchema
}

export type Pedido = z.infer<typeof pedidoSchema>