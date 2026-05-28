import { emitirNotificacao } from '@/utils/Alertas';
import { handleResponse, useApi } from '@/utils/Requests';
import { Button, Flex, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react'
import { useCallback } from 'react';

function AddProdutoForm() {
  const api = useApi();
  const postData = useCallback(async (body) => {
    api.post("/", body)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("addRow"))
  });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      nome: undefined,
      descricao: undefined,
      preco: undefined,
      custo: undefined,
      categoria: undefined,
    }
  })
  const handleSubmit = form.onSubmit((values) => console.log(values))
  return (
    <form>
      <TextInput classNames={{ label: "font-bold!"}} label="Nome" {...form.getInputProps("nome")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="Descrição" {...form.getInputProps("descricao")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="Preço" {...form.getInputProps("preco")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="Custo" {...form.getInputProps("custo")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="Categoria" {...form.getInputProps("categoria")}/>
      <Flex justify={"flex-end"} mt={5}>
        <Button color='teal' onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default AddProdutoForm;