import React, { useEffect, useState, useCallback } from 'react';
import {Button, Group, Select} from '@mantine/core';
import { redirect } from 'next/navigation';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { getSuccessData, handleResponse, useApi } from '@/utils/Requests';
import { emitirNotificacao } from '@/utils/Alertas';
import { getDiffFields } from '@/utils/Form';

const ManageAcessForm = ({moduleId}) => {
  const api = useApi();
  const getPermission = useCallback(() => {
    return api.get("/permissions")
      .then(handleResponse)
      .then(getSuccessData);
  }, []);

  const getModuleAccessPermission = useCallback((id) => {
    return api.get("/modulePermission/" + id)
      .then(handleResponse)
      .then(getSuccessData);
  }, []);

  const putData = useCallback((id, body) => {
    api.put('/modulePermission/' + id, body)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("editAccess"))
      .catch(emitirNotificacao);
  }, []);
  const [data, setData] = useState([]);
  const form = useForm({
    mode: "controlled",
    initialValues: {
      permission: null
    }
  });

  useEffect(() => {
    (async () => {
      const [permissions, moduleAccess] = await Promise.all([
        getPermission(),
        getModuleAccessPermission(moduleId)
      ]);
      const treatedPermissions = permissions.map(p => ({value: p.id.toString(), label: `${p.resource}.${p.action}`}));
      const accessValue = moduleAccess;
      setData(treatedPermissions);
      form.setValues({permission: accessValue?.toString() || null});
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = form.onSubmit(async (values) => {
    putData(moduleId, values);
  });

  return (
    <form>
      <Select allowDeselect searchable {...form.getInputProps("permission")} data={data}/>
      <Group justify='flex-end'>
        <Button onClick={handleSubmit} color='teal' mt={5}>
          Salvar
        </Button>
      </Group>
    </form>
  )
}

export default ManageAcessForm