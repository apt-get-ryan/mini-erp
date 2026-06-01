import z from "zod";

const userSchema = z.object({
  email: z
    .email("E-mail inválido.")
    .min(5, "O e-mail não pode ser menor que 5 caracteres.")
    .max(255, "O e-mail não pode ser maior que 255 caracteres."),

  nome: z
    .string()
    .min(1, "O nome não pode ser menor que 1 caractere.")
    .max(100, "O nome não pode ser maior que 100 caracteres."),

  login: z
    .string()
    .min(5, "O login não pode ser menor que 5 caracteres.")
    .max(50, "O login não pode ser maior que 72 caracteres."),

  password: z
    .string()
    .min(5, "A senha não pode ser menor que 5 caracteres.")
    .max(72, "A senha não pode ser maior que 72 caracteres."),
},
{
  error: (issue) => {
    if(issue.code == "invalid_type" && issue.input == undefined)
      return "Body indefinido"
    return "Payload inválido"
  }
});

const loginSchema = userSchema.omit({email: true, nome: true});
const registerSchema = userSchema;
export {loginSchema, registerSchema}