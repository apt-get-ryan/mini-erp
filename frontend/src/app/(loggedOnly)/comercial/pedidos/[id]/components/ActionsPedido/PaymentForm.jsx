import { useApi } from '@/utils/Requests'
import { Button, Flex, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import React from 'react'
import { paymentSchema } from '../../schemas/Payment';

function PaymentForm({id}) {
  const api = useApi();
  const form = useForm({
    initialValues: {
      payment: 0
    },
    validate: zod4Resolver(paymentSchema)
  });
  const handlePayment = form.onSubmit((values) => {
    values = {
      payment: values.payment * 100
    }
    console.log(values);
  });
  return (
    <form>
      <NumberInput
        key={form.key("payment")}
        prefix='R$ '
        thousandSeparator='.'
        decimalSeparator=','
        decimalScale={2}
        fixedDecimalScale
        min={0}
        classNames={{ label: "font-bold!"}}
        label="Valor do pagamento"
        {...form.getInputProps("payment")}
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