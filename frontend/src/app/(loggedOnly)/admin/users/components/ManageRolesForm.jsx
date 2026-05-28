import React, { useEffect, useState} from 'react';
import { Button, Group, MultiSelect } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useCallback } from 'react';
import { getSuccessData, handleResponse, useApi } from '@/utils/Requests';
import { emitirNotificacao } from '@/utils/Alertas';


const ManageRolesForm = ({id}) => {
  const api = useApi();
  const getRoles = useCallback(()=> {
    return api.get("/roles")
      .then(handleResponse)
      .then(getSuccessData)
  })
  const getUserRoles = useCallback(()=> {
    return api.get("/userRoles/"+id)
      .then(handleResponse)
      .then(getSuccessData)
  })
  const putData = useCallback((body) => {
    api.put("/userRoles/"+id, body)
      .then(handleResponse)
      .then(emitirNotificacao)
      .then(() => modals.close("editRoles"))
      .catch(emitirNotificacao)
  })
  const [data, setData] = useState([]);
  const form = useForm({
    mode: "controlled",
    initialValues:{
      roles: []
    }
  });

  useEffect(() => {
    (async () => {
      const [roles, userRoles] = await Promise.all([
        getRoles(),
        getUserRoles(id)
      ]);
      setData(roles.map(role => { return {label: role.nome, value: role.id.toString()} }));
      const roleValues = userRoles.map(role => role.id.toString());
      form.setValues({roles: roleValues})
    })();
  }, []);
  const handleSubmit = form.onSubmit(async values => {
    putData(values);
  })
  return (
    <form>
      <MultiSelect  hidePickedOptions {...form.getInputProps("roles")} data={data} />
      <Group justify='flex-end'>
        <Button onClick={handleSubmit} color='teal' mt={5}>
          Salvar
        </Button>
      </Group>
    </form>
  )
}

export default ManageRolesForm