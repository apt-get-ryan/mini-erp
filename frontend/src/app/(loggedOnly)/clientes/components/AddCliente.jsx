import { useForm } from '@mantine/form'
import React, { useCallback } from 'react';
import { TextInput, Textarea, Flex, Button } from '@mantine/core';
import { handleResponse, useApi } from '@/utils/Requests';
import { emitirNotificacao } from '@/utils/Alertas';
import { IMaskInput } from 'react-imask';
import { modals } from '@mantine/modals';

function MaskInput({maskFormat, ...props }) {
  return (
    <TextInput
      component={IMaskInput}
      mask={maskFormat}
      {...props}
    />
  )
}

function AddCliente() {
  const api = useApi();
  const postData = useCallback(async (body) => {
    api.post("/clientes", body)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("addRow"))
      .catch(emitirNotificacao)
  }, [])
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      nomeFantasia: "",
      whatsapp: undefined,
      email: undefined,
      instagram: undefined,
      obs: undefined,
      estado: "SP",
      cidade: "Jaú",
      bairro: undefined,
      logradouro: undefined,
      endereco: undefined,
    }});
  const handleSubmit = form.onSubmit(values => postData(values))
  // const handleSubmit = form.onSubmit(values => console.log(values))
  return (
    <form>
      <TextInput classNames={{label: "font-bold!"}} label="Nome" {...form.getInputProps("nomeFantasia")} maxLength={100}/>
      {/* <MaskInput classNames={{label: "font-bold!"}} label="WhatsApp" {...form.getInputProps("whatsapp")}/> */}
      {/* <MaskedInput classNames={{label: "font-bold!"}} label="WhatsApp" {...form.getInputProps("whatsapp")} maskFormat={"(00) 00000-0000"} placeholder="(99) 99999-9999"/> */}
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
      <TextInput classNames={{label: "font-bold!"}} label="E-mail" {...form.getInputProps("email")} maxLength={100}/>
      {/* <TextInput classNames={{label: "font-bold!"}} label="Instagram" {...form.getInputProps("instagram")} placeholder='@...' maxLength={30}/> */}
      <MaskInput
        classNames={{label: "font-bold!"}}
        label="Instagram"
        {...form.getInputProps("instagram")}
        placeholder='@...'
        maxLength={30}
        maskFormat={/^@.*$/}

      />
      <Textarea classNames={{label: "font-bold!"}} label="Obs" {...form.getInputProps("obs")} maxLength={150} minRows={2} maxRows={5}/>
      <TextInput classNames={{label: "font-bold!"}} label="Estado" {...form.getInputProps("estado")} />
      <TextInput classNames={{label: "font-bold!"}} label="Cidade" {...form.getInputProps("cidade")}/>
      <TextInput classNames={{label: "font-bold!"}} label="Bairro" {...form.getInputProps("bairro")}/>
      <TextInput classNames={{label: "font-bold!"}} label="Logradouro" {...form.getInputProps("logradouro")}/>
      <TextInput classNames={{label: "font-bold!"}} label="Endereco" {...form.getInputProps("endereco")}/>
      <Flex justify={"flex-end"} mt={5}>
        <Button color='teal' onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default AddCliente