import React, { useState, useCallback, useEffect } from 'react';
import { getSuccessData, handleResponse, useApi } from '@/utils/Requests';
import { useRef } from 'react';
import { emitirNotificacao } from '@/utils/Alertas';
import { updateSchema } from '../schemas/Produto';
import { TextInput, Textarea, MultiSelect, NumberInput, Flex, Button, Skeleton} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { modals } from '@mantine/modals';

function EditProdutoForm({id}) {
  const api = useApi();
  const isFirstRun = useRef(true);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const patchData = useCallback(async (body) => {
      api.patch("/produtos/"+id, body)
        .then(handleResponse)
        .then(emitirNotificacao)
        .then(() => modals.close("editRow"))
        .catch(emitirNotificacao)
    });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      nome: "",
      descricao: null,
      preco: 0,
      custo: 0,
      categorias: [],
    },
    validate: zod4Resolver(updateSchema),
    validateInputOnBlur: true
  });

  useEffect(() => {
    if(!isFirstRun.current) return;
    isFirstRun.current = false;
    (async () => {
      api.get("/categorias")
        .then(handleResponse)
        .then(getSuccessData)
        .then(r => setCategorias(r))
      let r = await api.get("/produtos/"+id);
      if("error" in r)
        emitirNotificacao(r);
      form.setInitialValues(r.success.data);
      form.setDirty(r.success.data);
      form.setValues(r.success.data);
      setLoading(false);
    })();
  }, []);
  
  const handleSubmit = form.onSubmit((values) => {
    form.validate();
    if(form.isValid()) {
      const treatedData = {...values, preco: Math.round(values.preco * 100), custo: Math.round(values.custo * 100)}
      patchData(treatedData);
    }
  })
  if(loading) {
    return (<>
      <>
        <Skeleton height={12} width={50} mb={6} />
        <Skeleton height={36} radius="sm" mb={6}/>
      </>
      <>
        <Skeleton height={12} width={50} mb={6} />
        <Skeleton height={36} radius="sm" mb={6}/>
      </>
      <>
        <Skeleton height={12} width={50} mb={6} />
        <Skeleton height={36} radius="sm" mb={6}/>
      </>
      <>
        <Skeleton height={12} width={50} mb={6} />
        <Skeleton height={36} radius="sm" mb={6}/>
      </>
      <>
        <Skeleton height={12} width={50} mb={6} />
        <Skeleton height={36} radius="sm" mb={6}/>
      </>
      <Flex justify={"flex-end"} mt={5}>
        <Skeleton  height={40} width={150} mb={6} />
      </Flex>
    </>)
  }
  return (
    <form>
      <TextInput key={form.key("nome")} classNames={{ label: "font-bold!"}} label="Nome" {...form.getInputProps("nome")}/>
      <Textarea key={form.key("descricao")} classNames={{ label: "font-bold!"}} label="Descrição" {...form.getInputProps("descricao")} maxLength={70} minRows={2} maxRows={5}/>
      <NumberInput prefix='R$ ' key={form.key("preco")} decimalSeparator=',' thousandSeparator="." decimalScale={2} fixedDecimalScale min={0} classNames={{ label: "font-bold!"}} label="Preço" {...form.getInputProps("preco")}/>
      <NumberInput prefix='R$ ' key={form.key("custo")} decimalSeparator=',' thousandSeparator="." decimalScale={2} fixedDecimalScale min={0} classNames={{ label: "font-bold!"}} label="Custo" {...form.getInputProps("custo")}/>
      <MultiSelect
        label="Categoria"
        key={form.key("categorias")}
        hidePickedOptions
        classNames={{ label: "font-bold!"}}
        data={categorias.map(c => ({ value: c.id.toString(), label: c.nome}))}
        {...form.getInputProps("categorias")}
      />
      <Flex justify={"flex-end"} mt={5}>
        <Button color='teal' onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default EditProdutoForm