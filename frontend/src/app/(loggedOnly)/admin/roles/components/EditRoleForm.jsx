import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Flex, Button} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import ManagePermissionsForm from './ManagePermissionsForm';
const path = process.env.NEXT_PUBLIC_API_URL;

async function editRoles(id, body) {
  const res = await fetch(path+"/roles/"+id, {
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
const EditRoleForm = ({defaultValues}) => {
  const form = useForm(
  {
    mode: "uncontrolled",
    initialValues:{
      nome: defaultValues.nome,
      descricao: defaultValues.descricao,
    }
  })
  const handleSubmit = form.onSubmit(values => editRoles(defaultValues.id, values));
  const handlePermissionManagement = (id) => {
    modals.open({
      modalId: "editPermissions",
      title: `Permissões de ${defaultValues.nome}`,
      children: <ManagePermissionsForm roleId={id}/>
    })
  }
  return (
    <form>
      <TextInput classNames={{ label: "!font-bold"}} label="Nome" {...form.getInputProps("nome")}/>
      <TextInput classNames={{ label: "!font-bold"}} label="Descrição" {...form.getInputProps("descricao")}/>
      <Flex justify={"flex-end"} mt={5} gap={5}>
        <Button onClick={() => handlePermissionManagement(defaultValues.id)}>
          Permissões de {defaultValues.nome}
        </Button>
        <Button color='teal' onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default EditRoleForm