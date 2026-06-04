import { useForm } from '@mantine/form'
import React, { useState, useEffect, useCallback } from 'react';
import { TextInput, Textarea, Input, Select, Switch, Group, Flex, Button } from '@mantine/core';
import { getSuccessData, handleResponse, useApi } from '@/utils/Requests';
import { emitirNotificacao } from '@/utils/Alertas';
import { modals } from '@mantine/modals';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { updateSchema } from './schemas/Categoria';

function EditCategoriasForm({defaultValues}) {
  const id = defaultValues.id;
  const api = useApi();
  const [categorias, setCategorias] = useState([]);
  const patchData = useCallback(async (body) => {
    api.patch("/categorias/"+id, body)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("editRow"))
      .catch(emitirNotificacao)
  }, [])
  const form = useForm({
    mode: "uncontrolled",
    initialValues:{
      nome: defaultValues.nome,
      descricao: defaultValues.descricao,
      is_active: defaultValues.is_active,
      id_parent: defaultValues.id_parent?.toString(),
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
  });
  const handleDelete = () => {
    api.delete("/categorias/"+id)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.closeAll())
      .catch(emitirNotificacao)
  }
  const handleDeleteModal = () => {
    modals.openConfirmModal({
      title: `Tem certeza que deseja deletar a categoria #${defaultValues.id}?`,
      labels: { confirm: "Confirmar", cancel: "Cancelar"},
      confirmProps: {color: "red"},
      children: (
        <div>
          Categoria: {defaultValues.nome}, não será possível recuperar esses dados após deletar
        </div>
      ),
      onConfirm: handleDelete
    })
    }
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
      <Select allowDeselect label="Filho de" classNames={{ label: "font-bold!"}} data={categorias.map(c => ({ value: c.id.toString(), label: c.nome}))}  {...form.getInputProps("id_parent")} />
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

export default EditCategoriasForm