import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Flex, Button} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

const path = process.env.NEXT_PUBLIC_API_URL;
async function addRoles(body) {
  const res = await fetch(path+"/roles", {
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
const AddRoleForm = () => {
  const form = useForm(
  {
    mode: "uncontrolled",
    initialValues:{
      nome: "",
      descricao: "",
    }
  })
  const handleSubmit = form.onSubmit(values => addRoles(values))
  return (
    <form>
      <TextInput classNames={{ label: "font-bold!"}} label="Nome" {...form.getInputProps("nome")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="Descrição" {...form.getInputProps("descricao")}/>
      <Flex justify={"flex-end"} mt={5} >
        <Button color='teal' onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default AddRoleForm