import React from 'react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from './Input';

function Login() {
  const router = useRouter();
  const [login , setLogin] = useState("");
  const [ password, setPassword] =  useState("");
  const [ errorMessage, setErrorMessage] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      login: login,
      password: password
    };3
    const path = process.env.NEXT_PUBLIC_API_URL;


    await fetch(path+"/auth/login",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
        credentials: "include"
      }
    ).then(async (res) => {
      const content = await res.json();
      if( content.success ) {
        setErrorMessage("");
        router.push("/home");
      } else {
        setErrorMessage(content.error || content.message);
      }
    })
    .catch((err) => {
      console.log(err)
      setErrorMessage("Erro ao tentar executar login");
    })
  }
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Login</legend>
        <Input value={login} onChange={(e) => setLogin(e.target.value)} />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Senha</legend>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      </fieldset>
      <p className="text-center mt-1 h-4 text-red-400">{errorMessage}</p>
      <button className="btn bg-blue-500 text-white rounded mt-2 btn-block">
        Entrar
      </button>
    </form> 
  )
}

export default Login