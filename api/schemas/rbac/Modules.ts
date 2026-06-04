import z from "zod";

export const moduleSchema = z.object({
  id: z.number().positive().int(),
  nome: z.string().max(100),
  slug: z.string().max(100),
  rota: z.string().max(200).nullable(),
  icone: z.string().nullable(),
  parent_id: z.coerce.number().positive().int().nullable(),
  sort_order: z.number().int().default(0),
  is_active: z.boolean().nullable().default(true)
},
{
  error: (issue) => {
    if(issue.code == "invalid_type" && issue.input == undefined)
      return "Body indefinido"
    return "Payload inválido"
  }
});

const createSchema = moduleSchema.omit({ id: true});
const updateSchema = moduleSchema.omit({id: true}).partial().refine(
  (data) => Object.values(data).some(v => v !== undefined),
  {
    error: "Ao menos um campo é necessário para performar uma edição."
  }
)

export {
  createSchema,
  updateSchema
}