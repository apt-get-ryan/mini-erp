import { z } from "zod";

const paymentSchema = z.object({
  payment: z.number().positive("O valor do pagamento deve ser maior que 0")
},
{
  error: (issue) => {
    if(issue.code == "invalid_type" && issue.input == undefined)
      return "Body indefinido"
    return "Payload inválido"
  }
})



export {
  paymentSchema
}

export type Payment = z.infer<typeof paymentSchema>