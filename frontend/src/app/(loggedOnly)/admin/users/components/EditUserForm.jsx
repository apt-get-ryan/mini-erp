import React, { useState } from 'react';
import { TextInput, Switch, Flex, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { redirect } from 'next/navigation';
import ManageRolesForm from './ManageRolesForm';
import { handleResponse, useApi } from '@/utils/Requests';
import { emitirNotificacao, notificarFormInalterado } from '@/utils/Alertas';
import { updateSchema } from './schemas/User';
import { zod4Resolver } from 'mantine-form-zod-resolver';


function EditUserForm({defaultValues}) {
  const id = defaultValues.id;
  const api = useApi();
  const patchData = (body) => {
    api.patch("/users/"+id, body)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("editRow"))
      .catch(emitirNotificacao)
  }
  const [isSaving, setIsSaving] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues:{
      nome: defaultValues.nome,
      email: defaultValues.email,
      login: defaultValues.login,
      is_active: defaultValues.is_active,
    },
    validate: zod4Resolver(updateSchema),
    validateInputOnBlur: true
  })
  const handleSubmit = form.onSubmit(values => {
    form.validate();
    if(form.isValid()) {
      if(form.isDirty()) {
        patchData(values);
      } else {
        notificarFormInalterado();
      }
    }
  })
  const handleRoleManagement = (id) => {
    modals.open({
      modalId: "editRoles",
      title: `Roles de ${defaultValues.login}`,
      children: <ManageRolesForm id={id}/>
    })
  }
  const handleDelete = () => {
    api.delete("/users/"+id)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.closeAll())
      .catch(emitirNotificacao)
  }
  const handleDeleteModal = () => {
    modals.openConfirmModal({
      title: `Tem certeza que deseja deletar o usuário #${defaultValues.id}?`,
      labels: { confirm: "Confirmar", cancel: "Cancelar"},
      confirmProps: {color: "red"},
      children: (
        <div>
          Usuário: {defaultValues.nome}, não será possível recuperar esses dados após deletar
        </div>
      ),
      onConfirm: handleDelete
    })
  }
  return (
    <form>
      <TextInput classNames={{ label: "font-bold!"}} label="Nome" {...form.getInputProps("nome")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="E-mail" {...form.getInputProps("email")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="Login" {...form.getInputProps("login")}/>
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
        <Button color='red' onClick={handleDeleteModal}>
          Deletar
        </Button>
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