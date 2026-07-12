import z from "zod";

export const pagamentoSchema = z.object({
  id: z.number()
    .int()
    .positive()
    .optional(),

  id_pedido: z.number()
    .int()
    .positive(),

  valor: z.number()
    .int()
    .nonnegative(),
},
{
  error: (issue) => {
    if(issue.code == "invalid_type" && issue.input == undefined)
      return "Body indefinido";
    return "Payload inválido";
  }
});

const createSchema = pagamentoSchema.omit({ id: true });

export {
  createSchema,
};

export type Pagamento = z.infer<typeof pagamentoSchema>;
