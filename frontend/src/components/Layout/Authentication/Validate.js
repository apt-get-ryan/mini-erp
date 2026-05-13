import React, { useState } from 'react';
import Input from "@/components/Layout/Authentication/Input.js";
import { useForm }  from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from './Spinner/Spinner';
import Link from 'next/link';

function Validate({login}) {
  const [formMessage, setFormMessage] = useState("");
  const [isFormError, setIsFormError] = useState(false);
  const schema = yup.object({
    validationCode: yup.string().length(6, "O código de verificação deve ter 6 caracteres").required("O código de verificação é obrigatório")
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful}
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur"
  });
  const path = process.env.NEXT_PUBLIC_API_URL;
  const onSubmit = async (data) => {
    setIsFormError(false);
    // /auth/verify/
    console.log(data);
    await fetch(
      path+"/auth/verify/"+login,
      {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
      }
    ).then( async (res) => {
      const content = await res.json();
      if(content?.success) {
        setIsFormError(false);
        setFormMessage(<>Validação concluída com sucesso!<br/><Link className='link link-info' href={"/"}>Clique aqui para efetuar seu login</Link></>);
      } else {
        throw new Error();
      }
    }).catch((err) => {
      setIsFormError(true);
      setFormMessage(<>Erro na validação</>);
    })
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("validationCode")} readOnly={isSubmitSuccessful || isSubmitting}/>
      <p className="mt-1 text-red-400">{errors.validationCode?.message}</p>
      <button className="btn bg-blue-500 text-white rounded mt-2 btn-block" disabled={isSubmitSuccessful}>
        { isSubmitting ? <><Spinner/> Validando</> : <>Validar</>}
      </button>
      <p className={`text-center mt-1 ${isFormError ? "text-red-400" : ""}`}>{formMessage}</p>
    </form>
  )
}

export default Validate