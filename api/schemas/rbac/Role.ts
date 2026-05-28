import z from "zod";

const RoleSchema = z.object({
  nome: z.string().max(50),
  descricao: z.string().max(100).nullable()
},
{
  error: (issue) => {
    if(issue.code == "invalid_type" && issue.input == undefined)
      return "Body indefinido"
    return "Payload inválido"
  }
})


const createSchema = RoleSchema;
const updateSchema = RoleSchema.partial().refine(
  (data) => Object.values(data).some(v => v !== undefined),
  {
    error: "Ao menos um campo é necessário para performar uma edição."
  }
);

export {createSchema, updateSchema};