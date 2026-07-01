import { z } from "zod";

export const pedidoItemSchema = z.object({

  id_pedido: z.coerce.number().int().positive(),

  id_produto: z.string("Produto inválido").nonempty("Produto inválido").transform(Number).pipe(z.number().int().positive()),

  valor: z.number().nonnegative(), // valor em centavos

  quantidade: z.number().nonnegative()
},
{
  error: (issue) => {
    if(issue.code == "invalid_type" && issue.input == undefined)
      return "Body indefinido"
    return "Payload inválido"
  }
})

const createSchema = pedidoItemSchema;
const updateSchema = pedidoItemSchema.partial().refine(
  (data) => Object.values(data).some(v => v !== undefined),
  {
    error: "Ao menos um campo é necessário para performar uma edição."
  }
);


export {
  createSchema,
  updateSchema
}

export type Pedido = z.infer<typeof pedidoItemSchema>