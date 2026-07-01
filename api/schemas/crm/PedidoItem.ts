import { z } from "zod";

export const pedidoItensSchema = z.object({

  id_pedido: z.number().int().positive(),

  id_produto: z.coerce.number().int().positive(),

  valor: z.number().int().nonnegative(), // valor em centavos

  quantidade: z.coerce.number().positive()
},
{
  error: (issue) => {
    if(issue.code == "invalid_type" && issue.input == undefined)
      return "Body indefinido"
    return "Payload inválido"
  }
})

const createSchema = pedidoItensSchema;
const updateSchema = pedidoItensSchema.partial().refine(
  (data) => Object.values(data).some(v => v !== undefined),
  {
    error: "Ao menos um campo é necessário para performar uma edição."
  }
);


export {
  createSchema,
  updateSchema
}

export type Pedido = z.infer<typeof pedidoItensSchema>