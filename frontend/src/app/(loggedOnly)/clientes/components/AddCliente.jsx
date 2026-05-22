import { useForm } from '@mantine/form'
import React, { useCallback } from 'react';
import { TextInput, Flex, Button } from '@mantine/core';
import { extractRequestData, useApi } from '@/utils/Requests';

function AddCliente() {
  const api = useApi();
  const postData = useCallback(async () => {
    api.post("/clientes")
      .then(extractRequestData)
      .then()
  }, [])
  const form = useForm({
    nomeFantasia: "",
    whatsapp: "",
    email: "",
    instagram: "",
    obs: "",
    estado: "SP",
    cidade: "Jaú",
    bairro: "",
    logradouro: "",
    endereco: "",
  });
  return (
    <form>
      <TextInput classNames={{label: "font-bold!"}} label="Nome" {...form.getInputProps("nomeFantasia")}/>
      <TextInput classNames={{label: "font-bold!"}} label="WhatsApp" {...form.getInputProps("whatsapp")}/>
      <TextInput classNames={{label: "font-bold!"}} label="E-mail" {...form.getInputProps("email")}/>
      <TextInput classNames={{label: "font-bold!"}} label="Instagram" {...form.getInputProps("instagram")}/>
      <TextInput classNames={{label: "font-bold!"}} label="Obs" {...form.getInputProps("obs")}/>
      <TextInput classNames={{label: "font-bold!"}} label="Estado" {...form.getInputProps("estado")}/>
      <TextInput classNames={{label: "font-bold!"}} label="Cidade" {...form.getInputProps("cidade")}/>
      <TextInput classNames={{label: "font-bold!"}} label="Bairro" {...form.getInputProps("bairro")}/>
      <TextInput classNames={{label: "font-bold!"}} label="Logradouro" {...form.getInputProps("logradouro")}/>
      <TextInput classNames={{label: "font-bold!"}} label="Endereco" {...form.getInputProps("endereco")}/>
      <Flex justify={"flex-end"} mt={5}>
        <Button color='teal' onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default AddCliente