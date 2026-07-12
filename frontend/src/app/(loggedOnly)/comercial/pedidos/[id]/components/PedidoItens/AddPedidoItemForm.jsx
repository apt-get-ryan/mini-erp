import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Select, Flex, Button, Alert, NumberFormatter } from '@mantine/core';
import { getSuccessData, handleResponse, useApi } from '@/utils/Requests';
import React, { useEffect, useState, useRef } from 'react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { createSchema } from '../../schemas/PedidoItem';
import { emitirNotificacao } from '@/utils/Alertas';
import { modals } from '@mantine/modals';

function AddPedidoItemForm({idPedido}) {
  const api = useApi();
  const isFirstRun = useRef(true);
  const [produtos, setProdutos] = useState([]);
  const form = useForm({
    mode: "controlled",
    initialValues: {
      id_pedido: idPedido,
      id_produto: null,
      valor: 0,
      quantidade: 1
    },
    validate: zod4Resolver(createSchema),
    validateInputOnBlur: true 
  });
  const postData = (data) => {
    api.post("/pedidos/itens", data)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("addRow"))
      .catch(emitirNotificacao)
  };
  useEffect(()=> {
    if(!isFirstRun.current) return;
    isFirstRun.current = false;
    api.get("/produtos?simplified=true")
      .then(handleResponse)
      .then(getSuccessData)
      .then(r => setProdutos(r))
      .catch(console.log)
  }, []);
  const handleSubmit = form.onSubmit((values) => {
    form.validate();
    if(form.isValid()) {
      const data = {
        ...values,
        id_pedido: Number(values.id_pedido),
        id_produto: Number(values.id_produto),
        valor: values.valor * 100
      }
      postData(data);
    }
  });
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
        <NumberFormatter prefix='R$ ' thousandSeparator='.' decimalSeparator=',' decimalScale={3} value={form.getValues().valor * form.getValues().quantidade}/>
      </Alert>
      <Flex justify={"flex-end"} mt={5}>
        <Button color="teal" onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default AddPedidoItemForm