import React, { useEffect, useState} from 'react';
import Input from './Input';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const Register = () => {
  const [formMessage, setFormMessage] = useState("");
  const [isFormError, setIsFormError] = useState(false);
  const schema = yup.object({
    email: yup.string().max(255, "O campo e-mail não pode ser maior que 255 caracteres").email("E-mail inválido").required("O campo e-mail é obrigatório"),
    nome: yup.string().max(100, "O campo nome não pode ser maior que 100 caracteres").required("O campo nome é obrigatório"),
    login: yup.string().max(50, "O campo login não pode ser maior que 50 caracteres").required("O campo login é obrigatório"),
    password: yup.string().max(255, "O campo senha não pode ser maior que 255 caracteres").required("O campo senha é obrigatório")
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ 
    resolver: yupResolver(schema),
    mode: "onBlur"
  });

  const handleChange = ({target}) => {
    setFormData(
      (data) => {
        return {
          ...data,
          [target.name]: target.value
        }
      }
    )
  }
  
  const onSubmit = async (data) => {
    setIsFormError(false);
    setFormMessage("");
    const path = process.env.NEXT_PUBLIC_API_URL;
    await fetch(
      path+"/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
      }
    ).then( async (res) => {
      const content = await res.json();
      if(content?.success) {
        setIsFormError(false);
        setFormMessage("Cadastro efetuado com sucesso. Verifique o seu e-mail para o código de verificação");
        console.log("Acesse o E-mail aqui -> ", content.success.mailTestUrl);

      } else if (content?.error) {
        setIsFormError(true);
        setFormMessage(content.error)

      }
    }).catch((err) => {
      console.log(err)
      setIsFormError(true);
      setFormMessage("Erro ao tentar executar o cadastro");
    })
    
  }
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          E-mail
        </legend>
        <Input {...register("email")} name="email" />
        <p className="mt-1 text-red-400">{errors.email?.message}</p>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Nome
        </legend>
        <Input {...register("nome")} name="nome" />
        <p className="mt-1 text-red-400">{errors.nome?.message}</p>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Login
        </legend>
        <Input {...register("login")} name="login" />
        <p className="mt-1 text-red-400">{errors.login?.message}</p>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Senha
        </legend>
        <Input {...register("password")} name="password" />
        <p className="mt-1 text-red-400">{errors.password?.message}</p>
      </fieldset>
      <p className={`text-center inline-block mt-1 h-4 ${isFormError ? "text-red-400" : "text-green-400"}`}>{formMessage}</p>
      <button className="btn bg-blue-500 text-white rounded mt-2 btn-block">
        Entrar
      </button>
      
    </form>
  )
}

export default Register