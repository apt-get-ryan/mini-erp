import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Group, Switch, Flex, Button, NumberInput, Select, Input } from '@mantine/core';
import Icon from '@/components/Layout/Icon/Icon';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

const path = process.env.NEXT_PUBLIC_API_URL;

async function editPermissions(id, body) {
  const res = await fetch(path+"/permissions/"+id, {
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
    modals.close("editRow");
    notifications.show({
      id: "response",
      title: res.error? "Erro" : "Sucesso",
      message: res?.error || "Editado com sucesso",
      color: res?.error ? "red" : "green",
      classNames: {description: "!text-slate-700"},
    })
  }

  
}
const EditPermissionForm = ({defaultValues}) => {
  const form = useForm({
      mode: "uncontrolled",
      initialValues:{
        resource: defaultValues.resource,
        action: defaultValues.action,
        descricao: defaultValues.descricao
      }
    })
  const handleSubmit = form.onSubmit(values => editPermissions(defaultValues.id, values))
  return (
    <form>
      <TextInput classNames={{ label: "font-bold!"}} label="Recurso" {...form.getInputProps("resource")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="Ação" {...form.getInputProps("action")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="Descrição" {...form.getInputProps("descricao")}/>
      <Flex justify={"flex-end"} mt={5} >
        <Button color='teal' onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default EditPermissionForm