import z from "zod";

export const permissionSchema = z.object({
  resource: z.string().max(50),
  action: z.string().max(50),
  descricao: z.string().max(100).optional().nullable()
},
{
  error: (issue) => {
    if(issue.code == "invalid_type" && issue.input == undefined)
      return "Body indefinido"
    return "Payload inválido"
  }
})

const createSchema = permissionSchema;
const updateSchema = permissionSchema.partial().refine(
  (data) => Object.values(data).some(v => v !== undefined),
  {
    error: "Ao menos um campo é necessário para performar uma edição."
  }
)

export {createSchema, updateSchema};