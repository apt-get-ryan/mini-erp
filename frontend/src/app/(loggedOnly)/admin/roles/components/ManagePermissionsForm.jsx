import React, { useEffect, useState } from 'react';
import {Button, Group, MultiSelect} from '@mantine/core';
import { redirect } from 'next/navigation';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { getSuccessData, handleResponse, useApi } from '@/utils/Requests';
import { useCallback } from 'react';
import { emitirNotificacao } from '@/utils/Alertas';




const ManagePermissionsForm = ({roleId}) => {
  const api = useApi();
  const putData = useCallback((body) => {
    api.put("/rolePermissions/"+roleId, body)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("editPermissions"))
      .catch(emitirNotificacao)
  }, [])
  const getPermissions = useCallback(() => {
    return api.get("/permissions")
      .then(handleResponse)
      .then(getSuccessData)
  }, [])
  const getRolePermissions = useCallback(() => {
    return api.get("/rolePermissions/"+roleId)
      .then(handleResponse)
      .then(getSuccessData)
  }, [])
  const [data, setData] = useState([]);
  const form = useForm({
    mode: "controlled",
    initialValues: {
      permissions: []
    }
  });

  useEffect(() => {
    (async () => {
      const [permissions, permissionsOfRole] = await Promise.all([
        getPermissions(),
        getRolePermissions()
      ]);
      const treatedPermissions = permissions.map(p => ({value: p.id.toString(), label: `${p.resource}.${p.action}`}));
      const permissionsValues = permissionsOfRole.map(p => p.id.toString());
      setData(treatedPermissions);
      form.setValues({permissions: permissionsValues})
    })();
  }, []);

  const handleSubmit = form.onSubmit(async (values) => {
    putData(values);
  })

  return (
    <form>
      <MultiSelect hidePickedOptions {...form.getInputProps("permissions")} data={data}/>
      <Group justify='flex-end'>
        <Button onClick={handleSubmit} color='teal' mt={5}>
          Salvar
        </Button>
      </Group>
    </form>
  )
}

export default ManagePermissionsForm