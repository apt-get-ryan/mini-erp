import z from "zod";

const validationSchema = z.object({
  verification_code: z.string().length(6, "O código de verificação deve ter 6 dígitos.")
},
{
  error: (issue) => {
    if(issue.code == "invalid_type" && issue.input == undefined)
      return "Body indefinido"
    return "Payload inválido"
  }
})

export {validationSchema};