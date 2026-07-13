"use client";
import React from 'react';
import { useForm } from '@mantine/form';
import { NumberInput, Flex, Button } from '@mantine/core';
import { handleResponse, useApi } from '@/utils/Requests';
import { emitirNotificacao } from '@/utils/Alertas';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';

function ManageFreteForm({idPedido, valorFrete}) {
  const api = useApi();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      custo_frete: valorFrete / 100
    }
  });
  const handleSetFrete = form.onSubmit((values) => {
    values = {
      custo_frete: values.custo_frete * 100
    }
    api.patch("/pedidos/"+idPedido, values)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => router.refresh())
      .then(() => modals.closeAll())
      .catch(emitirNotificacao)
  })
  return (
    <form>
      <NumberInput
        label="Custo do frete"
        key={form.key("custo_frete")}
        {...form.getInputProps("custo_frete")}
        prefix='R$ '
        thousandSeparator='.'
        decimalSeparator=','
        decimalScale={2}
        fixedDecimalScale
        min={0}
        classNames={{ label: "font-bold!"}}
      />
      <Flex mt={5} justify={"flex-end"}>
        <Button color='teal' onClick={handleSetFrete}>
          Confirmar
        </Button>
      </Flex>
    </form>
  )
}

export default ManageFreteForm