"use client"
import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Select, Flex, Button, Alert, NumberFormatter, Skeleton } from '@mantine/core';
import { getSuccessData, handleResponse, useApi } from '@/utils/Requests';
import React, { useEffect, useState, useRef } from 'react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { updateSchema } from '../../schemas/PedidoItem';
import { emitirNotificacao } from '@/utils/Alertas';
import { modals } from '@mantine/modals';

function EditPedidoItemForm({idPedido, idItem}) {
  const api = useApi();
  const isFirstRun = useRef(true);
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const form = useForm({
    mode: "controlled",
    initialValues: {
      id_pedido: idPedido,
      id_produto: null,
      valor: 0,
      quantidade: 1
    },
    validate: zod4Resolver(updateSchema),
    validateInputOnBlur: true 
  });
  useEffect(()=> {
    if(!isFirstRun.current) return;
    isFirstRun.current = false;
    (async () => {
      api.get("/produtos?simplified=true")
        .then(handleResponse)
        .then(getSuccessData)
        .then(r => setProdutos(r))
        .catch(console.log);
      const r = await api.get(`/pedidos/${idPedido}/itens/${idItem}`);
      const data = r.success.data;
      const values = {
        id_pedido: data?.id_pedido,
        id_produto: data?.id_produto?.toString(),
        valor: (data?.valor / 100) ?? 0,
        quantidade: Number(data?.quantidade)
      }
      form.setInitialValues(values);
      form.setDirty(values);
      form.setValues(values);
      setLoading(false);
    })();
  }, []);
  const handleSubmit = form.onSubmit((values) => {
    const data = {
      ...values,
      valor: values.valor * 100,
    };
    api.patch(`/pedidos/itens/${idItem}`, data)
      .then(handleResponse)
      .then(emitirNotificacao)
      .catch(emitirNotificacao)
      .finally(() => modals.closeAll())
  })
  const handleDelete = () => {
    api.delete("/pedidos/itens/"+idItem)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.closeAll())
      .catch(emitirNotificacao);
  }
  const handleDeleteModal = () => {
    modals.openConfirmModal({
      title: `Tem certeza que deseja deletar o item do pedido #${idItem}?`,
      labels: { confirm: "Confirmar", cancel: "Cancelar"},
      confirmProps: {color: "red"},
      children: (
        <div>
          Não será possível recuperar esse item após deletar.
        </div>
      ),
      onConfirm: handleDelete
    })
  }
  if(loading) {
    return(
      <>
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
          <Skeleton height={56} radius="sm" mb={6}/>
        </>
        <Flex justify={"flex-end"} mt={5}>
          <Skeleton  height={40} width={150} mb={6} />
        </Flex>
      </>
    )
  }
  return (
    <form>
      <Select
        key={form.key("id_produto")}
        classNames={{ label: "font-bold!"}}
        allowDeselect={false}
        label="Produto"
        data={produtos.map(p => ({value: p.id.toString(), label: p.nome}))}
        {...form.getInputProps("id_produto")}
        onChange={(v) => {
          const produto = produtos.find(p => p.id == v);
          const valor = produto.preco / 100;
          form.setFieldValue("valor", valor);
          form.setFieldValue("id_produto", v);
        }}
      />
      <NumberInput key={form.key("valor")} prefix='R$ ' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale min={0} classNames={{ label: "font-bold!"}} label="Valor" {...form.getInputProps("valor")}/>
      <NumberInput key={form.key("quantidade")} thousandSeparator='.' decimalSeparator=',' decimalScale={3} fixedDecimalScale min={0.001} max={9_999_999.999} classNames={{ label: "font-bold!"}} label="Quantidade" {...form.getInputProps("quantidade")}/>
      <Alert variant='default' title="Valor total do item" mt={8} classNames={{ root: "py-2! px-4!", body: "gap-0.5!"}}>
        R$ <NumberFormatter thousandSeparator='.' decimalSeparator=',' decimalScale={3} value={form.getValues().valor * form.getValues().quantidade}/>
      </Alert>
      <Flex justify={"flex-end"} mt={5} gap={5}>
        <Button color='red' onClick={handleDeleteModal}>
          Deletar
        </Button>
        <Button color="teal" onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default EditPedidoItemForm