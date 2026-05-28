import { emitirNotificacao } from '@/utils/Alertas';
import { handleResponse, useApi } from '@/utils/Requests';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { TextInput, Group, Switch, Flex, Button } from '@mantine/core';
import React from 'react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { createSchema } from './schemas/User';

function AddUserForm() {
  const api = useApi();
  const postData = (body) => {
    api.post("/users", body)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("addRow"))
      .catch(emitirNotificacao)
  },
  form = useForm({
    mode: "controlled",
    initialValues: {
      nome: "",
      email: "",
      login: "",
      password: "",
      is_active: true,
    },
    validate: zod4Resolver(createSchema),
    validateInputOnBlur: true
  });
  const handleSubmit = form.onSubmit((values) => {
    form.validate();
    if(form.isValid) {
      postData(values)
    }

  })
  return (
    <form>
      <TextInput classNames={{ label: "font-bold!"}} label="Nome" {...form.getInputProps("nome")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="E-mail" {...form.getInputProps("email")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="Login" {...form.getInputProps("login")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="Senha" {...form.getInputProps("password")}/>
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
      <Flex justify={"flex-end"} gap={5}>
        <Button onClick={handleSubmit} color={"teal"} >
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default AddUserForm;