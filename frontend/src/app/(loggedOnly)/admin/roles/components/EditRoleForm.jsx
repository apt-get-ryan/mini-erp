import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Flex, Button} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import ManagePermissionsForm from './ManagePermissionsForm';
import { handleResponse, useApi } from '@/utils/Requests';
import { useCallback } from 'react';
import { emitirNotificacao } from '@/utils/Alertas';
const path = process.env.NEXT_PUBLIC_API_URL;


const EditRoleForm = ({defaultValues}) => {
  const api = useApi();
  const patchData = useCallback((id, body) => {
    api.patch("/roles/"+id, body)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("editRow"))
      .catch(emitirNotificacao)
  }, [])
  const form = useForm(
  {
    mode: "uncontrolled",
    initialValues:{
      nome: defaultValues.nome,
      descricao: defaultValues.descricao,
    }
  })
  const handleSubmit = form.onSubmit(values => patchData(defaultValues.id, values));
  const handleDelete = useCallback(() => {
      api.delete("/roles/"+defaultValues.id)
        .then(handleResponse)
        .then(emitirNotificacao)
        .then(() => modals.closeAll())
        .catch(emitirNotificacao)
    }, []);
  const handleDeleteModal = useCallback(() => {
    modals.openConfirmModal({
      title: `Tem certeza que deseja deletar o role ${defaultValues.resource}?`,
      labels: { confirm: "Confirmar", cancel: "Cancelar"},
      confirmProps: {color: "red"},
      children: (
        <div>
          Role: {`${defaultValues.resource}:${defaultValues.action}`}, não será possível recuperar esses dados após deletar
        </div>
      ),
      onConfirm: handleDelete
    })
  }, [])
  const handlePermissionManagement = (id) => {
    modals.open({
      modalId: "editPermissions",
      title: `Permissões de ${defaultValues.nome}`,
      children: <ManagePermissionsForm roleId={id}/>
    })
  }
  return (
    <form>
      <TextInput classNames={{ label: "font-bold!"}} label="Nome" {...form.getInputProps("nome")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="Descrição" {...form.getInputProps("descricao")}/>
      <Flex justify={"flex-end"} mt={5} gap={5}>
        <Button color='red' onClick={handleDeleteModal}>
          Deletar
        </Button>
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