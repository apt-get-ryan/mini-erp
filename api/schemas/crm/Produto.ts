import z from "zod";

export const produtoSchema = z.object({
  nome: z.string().min(1).max(100),

  descricao: z.string().trim().max(200).nullable().optional(),

  preco: z.number().nonnegative(),

  custo: z.number().nonnegative(),

  },
  {
    error: (issue) => {
      if(issue.code == "invalid_type" && issue.input == undefined)
        return "Body indefinido"
      return "Payload inválido"
    }
  }
);


const createSchema = produtoSchema;
const updateSchema = produtoSchema.partial().refine(
  (data) => Object.values(data).some(v => v !== undefined),
  {
    error: "Ao menos um campo é necessário para performar uma edição."
  }
)


export {
  createSchema,
  updateSchema
}

export type Produto = z.infer<typeof produtoSchema>