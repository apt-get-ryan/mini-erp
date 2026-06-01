"use client";
import { emitirAlertaSucesso, emitirNotificacao } from '@/utils/Alertas';
import { getSuccessData, handleResponse, useApi } from '@/utils/Requests';
import React, { useState, useCallback, useEffect} from 'react';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Stack, Button } from '@mantine/core';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { registerSchema } from './schema/User';
import {Spinner} from "./Spinner/Spinner";
import { createRoot } from "react-dom/client";


function Register() {
  const api = useApi();
  const [errorResponse, setErrorResponse] = useState("");
  const [waitingResponse, setWaitingReponse] = useState(false);

  const postData = useCallback((body) => {
    setWaitingReponse(true);
    setErrorResponse("");
    api.post("/auth/register", body)
      .then(handleResponse)
      .then(r => {
        console.log(r.data.mailUrl);
        return r;
      })
      .then(emitirNotificacao)
      .catch(emitirNotificacao)
      .finally(() => setWaitingReponse(false))
  }, []);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      nome: "",
      email: "",
      login: "",
      password: ""
    },
    validate: zod4Resolver(registerSchema),
    validateInputOnBlur: true
  })
  const handleSubmit = form.onSubmit((values) => {
    form.validate();
    if(form.isValid()) {
      postData(values)
    }
  })
  return (
    <form className='mt-2'>
      <TextInput classNames={{label: "font-bold!"}} label="Nome" {...form.getInputProps("nome")} maxLength={100}/>
      <TextInput classNames={{label: "font-bold!"}} label="E-mail" {...form.getInputProps("email")} maxLength={50}/>
      <TextInput classNames={{label: "font-bold!"}} label="Login" {...form.getInputProps("login")} maxLength={50}/>
      <PasswordInput classNames={{label: "font-bold!"}} label="Senha" {...form.getInputProps("password")} maxLength={72}/>
      <p className="text-center mt-1 min-h-4 text-red-500">{errorResponse}</p>
      <Stack justify={"flex-end"} mt={12}>
        <Button onClick={handleSubmit} rightSection={<Spinner loading={waitingResponse}/>}>
          Registrar
        </Button>
      </Stack>
    </form>
  )
}

export default Register