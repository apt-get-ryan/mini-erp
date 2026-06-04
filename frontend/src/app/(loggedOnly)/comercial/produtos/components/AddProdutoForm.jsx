import { emitirNotificacao } from '@/utils/Alertas';
import { handleResponse, useApi, getSuccessData } from '@/utils/Requests';
import { Button, Flex, MultiSelect, TextInput, NumberInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import React, { useState, useCallback, useEffect } from 'react';
import { createSchema } from '../schemas/Produto';
import { modals } from '@mantine/modals';

function AddProdutoForm() {
  const api = useApi();
  const [categorias, setCategorias] = useState([]);
  const postData = useCallback(async (body) => {
    api.post("/produtos", body)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("addRow"))
      .catch(emitirNotificacao)
  });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      nome: "",
      descricao: null,
      preco: 0,
      custo: 0,
      categorias: [],
    },
    validate: zod4Resolver(createSchema),
    validateInputOnBlur: true
  });
  useEffect(() => {
    api.get("/categorias")
      .then(handleResponse)
      .then(getSuccessData)
      .then(r => setCategorias(r))
      .catch(console.log)
    }, []);
  const handleSubmit = form.onSubmit((values) => {
    form.validate();
    if(form.isValid()) {
      const treatedData = {...values, preco: values.preco * 100, custo: values.custo * 100}
      console.log(treatedData);
      postData(treatedData);
    }
  })
  return (
    <form>
      <TextInput key={form.key("nome")} classNames={{ label: "font-bold!"}} label="Nome" {...form.getInputProps("nome")}/>
      <Textarea key={form.key("descricao")} classNames={{ label: "font-bold!"}} label="Descrição" {...form.getInputProps("descricao")} maxLength={70} minRows={2} maxRows={5}/>
      <NumberInput key={form.key("preco")} prefix='R$ ' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale min={0} classNames={{ label: "font-bold!"}} label="Preço" {...form.getInputProps("preco")}/>
      <NumberInput key={form.key("custo")} prefix='R$ ' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale min={0} classNames={{ label: "font-bold!"}} label="Custo" {...form.getInputProps("custo")}/>
      <MultiSelect
        label="Categoria"
        key={form.key("categorias")}
        hidePickedOptions
        classNames={{ label: "font-bold!"}}
        data={categorias.map(c => ({ value: c.id.toString(), label: c.nome}))}
        {...form.getInputProps("categorias")}
      />
      <Flex justify={"flex-end"} mt={5}>
        <Button color='teal' onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default AddProdutoForm;