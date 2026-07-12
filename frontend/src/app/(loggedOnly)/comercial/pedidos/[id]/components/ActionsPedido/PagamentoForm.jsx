import { useApi } from '@/utils/Requests'
import { Button, Flex, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import React, { useCallback } from 'react'
import { pagamentoSchema } from '../../schemas/Pagamento';
import { emitirNotificacao } from '@/utils/Alertas';
import { handleResponse } from '@/utils/Requests';
import { useRouter } from 'next/navigation';
import { modals } from '@mantine/modals';

function PaymentForm({idPedido, data}) {
  const api = useApi();
  const router = useRouter();
  const postData = useCallback((data) => {
      api.post("/pedidos/"+idPedido+"/pagamentos", data)
        .then(handleResponse)
        .then(emitirNotificacao)
        .then(() => router.refresh())
        .then(() => modals.closeAll())
        .catch(emitirNotificacao)
    }, [api, idPedido]);
  const form = useForm({
    initialValues: {
      valor: 0
    },
    validate: zod4Resolver(pagamentoSchema)
  });
  const handlePayment = form.onSubmit((values) => {
    values = {
      valor: values.valor * 100
    }
    postData(values);
  });
  return (
    <form>
      <NumberInput
        key={form.key("valor")}
        prefix='R$ '
        thousandSeparator='.'
        decimalSeparator=','
        decimalScale={2}
        fixedDecimalScale
        min={0}
        max={(data.valor_total - data.valor_pago) / 100}
        classNames={{ label: "font-bold!"}}
        label="Valor do pagamento"
        {...form.getInputProps("valor")}
      />
      <Flex mt={5} justify={"flex-end"}>
        <Button color='teal' onClick={handlePayment}>
          Confirmar
        </Button>
      </Flex>
    </form>
  )
}

export default PaymentForm