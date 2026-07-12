import { z } from "zod";

const pagamentoSchema = z.object({
  valor: z.number().positive("O valor do pagamento deve ser maior que 0")
},
{
  error: (issue) => {
    if(issue.code == "invalid_type" && issue.input == undefined)
      return "Body indefinido"
    return "Payload inválido"
  }
})



export {
  pagamentoSchema
}

export type Pagamento = z.infer<typeof pagamentoSchema>