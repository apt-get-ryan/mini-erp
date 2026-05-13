import { TextInput, Group, Flex, Select, Input, NumberInput, Switch, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import Icon from '@/components/Layout/Icon/Icon';
import React from 'react';
import { modals } from '@mantine/modals';
import { notifications } from "@mantine/notifications"
const path = process.env.NEXT_PUBLIC_API_URL;

async function addPermissions(body) {
  const res = await fetch(path+"/permissions", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(body)
  })

  if(res.status === 401){
    redirect("/");
  } else {
    modals.close("addRow");
    notifications.show({
      id: "response",
      title: res.error? "Erro" : "Sucesso",
      message: res?.error || "Adicionado com sucesso",
      color: res?.error ? "red" : "green",
      classNames: {description: "!text-slate-700"},
    })
  }

  
}
const AddPermissionForm = ({defaultValues}) => {
  
  const form = useForm({
    mode: "uncontrolled",
    initialValues:{
      resource: "",
      action: "",
      descricao: ""
    }
  })
  const handleSubmit= form.onSubmit( (values) => addPermissions(values))
  return (
    <form>
      <TextInput classNames={{ label: "!font-bold"}} label="Recurso" {...form.getInputProps("resource")}/>
      <TextInput classNames={{ label: "!font-bold"}} label="Ação" {...form.getInputProps("action")}/>
      <TextInput classNames={{ label: "!font-bold"}} label="Descrição" {...form.getInputProps("descricao")}/>
      <Flex justify={"flex-end"} mt={5}>
        <Button color='teal' onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default AddPermissionForm