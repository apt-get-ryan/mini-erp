import React, { useEffect, useState} from 'react';
import { Button, Group, MultiSelect } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

const path = process.env.NEXT_PUBLIC_API_URL;

async function fetchRoles() {
  let res = await fetch(path+'/roles', {
    method: "GET",
    credentials: "include",
    cache: "no-store"
  });
  if(res.status === 401)
    router.push("/"); //refatorar
  else {
    res = await res.json();
    return res;
  }
}

async function fetchUserRoles(id) {
  let res = await fetch(path+'/userRoles/'+id, {
    method: "GET",
    credentials: "include",
    cache: "no-store"
  });
  if(res.status === 401)
    router.push("/");
  else {
    res = await res.json();
    return res;
  }
}
const ManageRolesForm = ({id}) => {
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
        fetchRoles(),
        fetchUserRoles(id)
      ]);
      setData(roles.map(role => { return {label: role.nome, value: role.id.toString()} }));
      const roleValues = userRoles.map(role => role.id.toString());
      form.setValues({roles: roleValues})
    })();
  }, []);
  async function updateRoles(id, body) {
    let res = await fetch(path+"/userRoles/"+id, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(body)
    });
    if(res.status === 401){
      redirect("/");
    } else {
      //modals.close("editRoles")
      res = await res.json();
      return res;
    }
  }
  const handleSubmit = form.onSubmit(async values => {
    let res = await updateRoles(id, values);
    if(res.status === 500) {
      notifications.show({
        id: "editRolesError",
        title: "Erro",
        message: res.error,
        color: "red",
        classNames: {
          description: "!text-slate-700"
        }
      })
    } else {
      notifications.show({
        id: "editRolesSuccess",
        title: "Sucesso",
        message: "Roles editados com sucesso",
        color: "green",
        classNames: {
          description: "!text-slate-700"
        }
      })
    }
    modals.close("editRoles");
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