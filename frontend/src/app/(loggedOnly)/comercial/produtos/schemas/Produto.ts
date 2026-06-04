import z from "zod";

export const produtoSchema = z.object({
  nome: z.string().min(1, "O nome não pode ser menor que 1 caractere.").max(100, "O nome não pode ser maior que 100 caracteres."),

  descricao: z.string().trim().max(200, "A descrição não pode ser maior que 200 caracteres.").nullable().optional(),

  preco: z.number().nonnegative(),

  custo: z.number().nonnegative(),

  categorias: z.array(z.coerce.number().int().nonnegative())

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