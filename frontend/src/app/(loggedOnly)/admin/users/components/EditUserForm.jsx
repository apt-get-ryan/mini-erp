import React, { useState } from 'react';
import { TextInput, Switch, Flex, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { redirect } from 'next/navigation';
import ManageRolesForm from './ManageRolesForm';

const path = process.env.NEXT_PUBLIC_API_URL;

async function editUser(id, body) {
  const res = await fetch(path+"/users/"+id, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify(body)
  })

  if(res.status === 401){
    redirect("/");
  } else {
    modals.close("editRow")
  }

  
}

function EditUserForm({defaultValues}) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues:{
      nome: defaultValues.nome,
      email: defaultValues.email,
      login: defaultValues.login,
      //token_version: defaultValues.token_version,
      is_active: defaultValues.is_active,
    }
  })
  const handleSubmit = form.onSubmit(values => editUser(defaultValues.id, values))
  const handleRoleManagement = (id) => {
    modals.open({
      modalId: "editRoles",
      title: `Roles de ${defaultValues.login}`,
      children: <ManageRolesForm id={id}/>
    })
  }
  return (
    <form>
      <TextInput classNames={{ label: "!font-bold"}} label="Nome" {...form.getInputProps("nome")}/>
      <TextInput classNames={{ label: "!font-bold"}} label="E-mail" {...form.getInputProps("email")}/>
      <TextInput classNames={{ label: "!font-bold"}} label="Login" {...form.getInputProps("login")}/>
      <Group>
        <Switch
          mt="5"
          {...form.getInputProps("is_active", { type: "checkbox"})}
          classNames={{ label: "!font-bold"}}
          withThumbIndicator={false}
          labelPosition="left"
          label="Ativo"
        />
      </Group>
      <Flex justify={"flex-end"} gap={5}>
        <Button onClick={() => handleRoleManagement(defaultValues.id)}>
          Roles de {defaultValues.login}
        </Button>
        <Button onClick={handleSubmit} color={"teal"} >
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default EditUserForm;