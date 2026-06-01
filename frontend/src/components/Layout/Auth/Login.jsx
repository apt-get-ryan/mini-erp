"use client";
import { handleResponse, useApi } from '@/utils/Requests';
import React, { useCallback, useState } from 'react';
import { useForm } from "@mantine/form";
import { Flex, Button, PasswordInput, TextInput, Stack } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { loginSchema } from './schema/User';
import {Spinner} from "./Spinner/Spinner";

function Login() {
  const api = useApi();
  const router = useRouter();
  const [errorResponse, setErrorResponse] = useState("");
  const [waitingResponse, setWaitingReponse] = useState(false);
  const postData = useCallback((body) => {
    setWaitingReponse(true);
    setErrorResponse("");
    api.post("/auth/login", body)
      .then(handleResponse)
      .then(() => router.push("/home"))
      .catch(({error}) => {
        console.log(error);
        setErrorResponse(error.message)
      })
      .finally(() => setWaitingReponse(false));
  }, [])
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      login: "",
      password: ""
    },
    validate: zod4Resolver(loginSchema),
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
      <TextInput classNames={{label: "font-bold!"}} label="Login" {...form.getInputProps("login")} maxLength={50}/>
      <PasswordInput classNames={{label: "font-bold!"}} label="Senha" {...form.getInputProps("password")} maxLength={72}/>
      <p className="text-center mt-1 min-h-4 text-red-500">{errorResponse}</p>
      <Stack justify={"flex-end"} mt={12}>
        <Button onClick={handleSubmit} rightSection={<Spinner loading={waitingResponse}/>}>
          Entrar
        </Button>
      </Stack>
    </form>
  )
}

export default Login