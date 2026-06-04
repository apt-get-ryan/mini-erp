import { useForm } from '@mantine/form'
import React, { useState, useEffect, useCallback } from 'react';
import { TextInput, Textarea, Select, Switch, Group, Flex, Button } from '@mantine/core';
import { getSuccessData, handleResponse, useApi } from '@/utils/Requests';
import { emitirNotificacao } from '@/utils/Alertas';
import { modals } from '@mantine/modals';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { createSchema } from './schemas/Categoria';


function AddCategoriaForm() {
  const api = useApi();
  const [categorias, setCategorias] = useState([]);
  const postData = useCallback(async (body) => {
    api.post("/categorias", body)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("addRow"))
      .catch(emitirNotificacao)
  }, []);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      nome: "",
      descricao: null,
      is_active: true,
      id_parent: null
    },
    validate: zod4Resolver(createSchema),
    validateInputOnBlur: true
  });
  const handleSubmit = form.onSubmit(values => {
    console.log(values)
    form.validate();
    if(form.isValid()) {
      postData(values)
    }
  });
  useEffect(() => {
    api.get("/categorias")
      .then(handleResponse)
      .then(getSuccessData)
      .then(r => setCategorias(r))
      .catch(console.log)
  }, []);
  return (
    <form>
      <TextInput classNames={{label: "font-bold!"}} label="Nome" {...form.getInputProps("nome")} maxLength={35}/>
      <Textarea classNames={{label: "font-bold!"}} label="Descrição" {...form.getInputProps("descricao")} maxLength={70} minRows={2} maxRows={5}/>
      <Select allowDeselect label="Filho de" classNames={{ label: "font-bold!"}} data={categorias.map(c => ({ value: c.id.toString(), label: c.nome}))} {...form.getInputProps("id_parent")} />
      <Group>
        <Switch
          mt="5"
          {...form.getInputProps("is_active", { type: "checkbox"})}
          classNames={{ label: "font-bold!"}}
          withThumbIndicator={false}
          labelPosition="left"
          label="Ativo"
        />
      </Group>
      <Flex justify={"flex-end"} mt={5}>
        <Button color='teal' onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default AddCategoriaForm