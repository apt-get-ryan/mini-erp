import React, {useEffect} from "react";
import { handleResponse, useApi } from "@/utils/Requests";
import { useForm } from "@mantine/form";
import {TextInput, Flex, Button} from "@mantine/core";
import { useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { emitirNotificacao, notificarFormInalterado } from "@/utils/Alertas";
import { MaskInput } from "@/components/MaskInput/MaskInput";
import { modals } from "@mantine/modals";
import { getDiffFields } from "@/utils/Form";

function EditClienteForm({defaultValues}) {
  const id = defaultValues.id;
  const api = useApi();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      nomeFantasia: defaultValues.nomeFantasia ?? undefined,
      whatsapp: defaultValues.whatsapp ?? undefined,
      email: defaultValues.email ?? undefined,
      instagram: defaultValues.instagram ?? undefined,
      obs: defaultValues.obs ?? undefined,
      estado: defaultValues.estado ?? undefined,
      cidade: defaultValues.cidade ?? undefined,
      bairro: defaultValues.bairro ?? undefined,
      logradouro: defaultValues.logradouro ?? undefined,
      endereco: defaultValues.endereco ?? undefined,
    }
  });
  const patchData = useCallback(async (body) => {
    api.patch("/clientes/"+id, body)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("editRow"))
      .catch(emitirNotificacao)
  }, [])
  const handleSubmit = form.onSubmit((values) => {
    if(form.isDirty()) {
      const body = getDiffFields(form);
      patchData(body);
    } else {
      notificarFormInalterado();
    }
  })
  const handleDelete = () => {
    api.delete("/clientes/"+id)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.closeAll())
      .catch(emitirNotificacao)
  }
  const handleDeleteModal = () => {
    modals.openConfirmModal({
      title: `Tem certeza que deseja deletar o cliente #${id}?`,
      labels: { confirm: "Confirmar", cancel: "Cancelar"},
      confirmProps: {color: "red"},
      children: (
        <div>
          Cliente: {defaultValues.nomeFantasia}, não será possível recuperar esses dados após deletar
        </div>
      ),
      onConfirm: handleDelete
    })
  }
  return (
    <form>
      <TextInput classNames={{ label: "font-bold!"}} label="nomeFantasia" {...form.getInputProps("nomeFantasia")}/>
      {/* <TextInput classNames={{ label: "font-bold!"}} label="whatsapp" {...form.getInputProps("whatsapp")}/> */}
      <MaskInput
        classNames={{label: "font-bold!"}} 
        label="WhatsApp"
        defaultValue={form.getValues().whatsapp}
        onAccept={
          (value, mask) => form.setFieldValue('whatsapp', value)
        }
        unmask={true}
        maskFormat={"(00) 00000-0000"}
        placeholder="(99) 99999-9999"
      />
      <TextInput classNames={{ label: "font-bold!"}} label="email" {...form.getInputProps("email")}/>
      {/* <TextInput classNames={{ label: "font-bold!"}} label="instagram" {...form.getInputProps("instagram")}/> */}
      <MaskInput
          classNames={{label: "font-bold!"}}
          label="Instagram"
          {...form.getInputProps("instagram")}
          placeholder='@...'
          maxLength={30}
          maskFormat={/^@.*$/}
        />
      <TextInput classNames={{ label: "font-bold!"}} label="obs" {...form.getInputProps("obs")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="estado" {...form.getInputProps("estado")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="cidade" {...form.getInputProps("cidade")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="bairro" {...form.getInputProps("bairro")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="logradouro" {...form.getInputProps("logradouro")}/>
      <TextInput classNames={{ label: "font-bold!"}} label="endereco" {...form.getInputProps("endereco")}/>
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

export default EditClienteForm;