import z from "zod";

export const categoriaSchema = z.object({
  nome: z.string().min(1).max(35),

  descricao: z.string().trim().max(70).nullable().optional(),

  is_active: z.boolean().default(true),

  id_parent: z.coerce.number().positive().int().nullable()
  },
  {
    error: (issue) => {
      if(issue.code == "invalid_type" && issue.input == undefined)
        return "Body indefinido"
      return "Payload inválido"
    }
  }
);


const createSchema = categoriaSchema;
const updateSchema = categoriaSchema.partial().refine(
  (data) => Object.values(data).some(v => v !== undefined),
  {
    error: "Ao menos um campo é necessário para performar uma edição."
  }
)


export {
  createSchema,
  updateSchema
}

export type Categoria = z.infer<typeof categoriaSchema>