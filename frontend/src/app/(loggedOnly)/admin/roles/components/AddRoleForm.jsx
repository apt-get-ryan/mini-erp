import React, { useCallback } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Flex, Button} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useApi } from '@/utils/Requests';
import { handleResponse } from '@/utils/Requests';
import { emitirNotificacao } from '@/utils/Alertas';

const AddRoleForm = () => {
  const api = useApi();
  const postData = useCallback(async (body) => {
      api.post("/roles", body)
        .then(handleResponse)
        .then(emitirNotificacao)
        .then(() => modals.close("addRow"))
        .catch(emitirNotificacao)
    }, []);

  const form = useForm(
  {
    mode: "uncontrolled",
    initialValues:{
      nome: "",
      descricao: "",
    }
  })
  const handleSubmit = form.onSubmit(values => postData(values))
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