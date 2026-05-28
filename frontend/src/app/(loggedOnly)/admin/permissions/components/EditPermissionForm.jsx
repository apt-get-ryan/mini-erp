import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Flex, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { handleResponse, useApi } from '@/utils/Requests';
import { useCallback } from 'react';
import { emitirNotificacao } from '@/utils/Alertas';

const EditPermissionForm = ({defaultValues}) => {
  const api = useApi();
  const patchData = useCallback((id, body) => {
    api.patch("/permissions/"+id, body)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("editRow"))
      .catch(emitirNotificacao)
  }, [])
  const form = useForm({
      mode: "uncontrolled",
      initialValues:{
        resource: defaultValues.resource,
        action: defaultValues.action,
        descricao: defaultValues.descricao
      }
    })
  const handleSubmit = form.onSubmit(values => patchData(defaultValues.id, values));
  const handleDelete = () => {
    api.delete("/permissions/"+defaultValues.id)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.closeAll())
      .catch(emitirNotificacao)
  }
  const handleDeleteModal = () => {
    modals.openConfirmModal({
      title: `Tem certeza que deseja deletar a permissão ${defaultValues.resource}?`,
      labels: { confirm: "Confirmar", cancel: "Cancelar"},
      confirmProps: {color: "red"},
      children: (
        <div>
          Permissão: {`${defaultValues.resource}:${defaultValues.action}`}, não será possível recuperar esses dados após deletar
        </div>
      ),
      onConfirm: handleDelete
    })
  }
  return (
    <form>
      <TextInput classNames={{ label: "font-bold!"}} label="Recurso" {...form.getInputProps("resource")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="Ação" {...form.getInputProps("action")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="Descrição" {...form.getInputProps("descricao")}/>
      <Flex justify={"flex-end"} mt={5} gap={5}>
        <Button color='red' onClick={handleDeleteModal}>
          Deletar
        </Button>
        <Button color='teal' onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default EditPermissionForm