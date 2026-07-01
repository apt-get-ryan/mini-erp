import React, { useEffect, useState, useRef } from 'react';
import { Select, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useApi } from '@/utils/Requests';
import { handleResponse, getSuccessData } from '@/utils/Requests';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { z } from "zod";
import { modals } from '@mantine/modals';
import { emitirNotificacao } from '@/utils/Alertas';
import { useRouter } from 'next/navigation';

const clienteSchema = z.object({
  id_cliente: z.string("Cliente inválido").nonempty("Cliente inválido").transform(Number).pipe(z.number().int().positive())
})

function ManageClienteForm({idPedido}) {
  const isFirstRun = useRef(true);
  const api = useApi();
  const router = useRouter();
  const [clientes, setClientes] = useState([]);
  const form = useForm({
    initialValues: {
      id_cliente: null
    },
    validate: zod4Resolver(clienteSchema),
    validateInputOnBlur: true
  });
  useEffect(()=> {
    if(!isFirstRun.current) return;
    isFirstRun.current = false;
    api.get("/clientes?simplified=true")
      .then(handleResponse)
      .then(getSuccessData)
      .then(r => setClientes(r))
      .catch(console.log)
  }, []);
  const handleSubmit = form.onSubmit((values) => {
    const idCliente = values.id_cliente;
    modals.closeAll();
    api.post(`/pedidos/${idPedido}/cliente`, values)
      .then(handleResponse)
      .then(emitirNotificacao)
      .catch(emitirNotificacao)
      .finally(router.refresh())
  })
  const handleConfirm = () => {
    form.validate()
    if(form.isValid()) {
      const idCliente = form.getValues().id_cliente;
      const clienteNome = clientes.find(c => c.id.toString() == idCliente).nomeFantasia;
      modals.openConfirmModal({
        title: `Tem certeza que deseja vincular o cliente ao pedido?`,
        labels: { confirm: "Confirmar", cancel: "Cancelar"},
        confirmProps: { color: "teal" },
        children: (
          <div>
            <p>
              Esta ação não poderá ser desfeita nem alterada.
            </p>
            <p>
              Cliente: {clienteNome}  
            </p>
          </div>
        ),
        onConfirm: handleSubmit
      })
    }
  }
  return (
    <form>
      <Select
        key={form.key("id_cliente")}
        classNames={{ label: "font-bold!"}}
        allowDeselect={false}
        label="Cliente"
        data={clientes.map(c => ({value: c.id.toString(), label: c.nomeFantasia}))}
        {...form.getInputProps("id_cliente")}
      />
      <Group justify='flex-end'>
        <Button onClick={handleConfirm} color='teal' mt={5}>
          Salvar
        </Button>
      </Group>
    </form>
  )
}

export default ManageClienteForm