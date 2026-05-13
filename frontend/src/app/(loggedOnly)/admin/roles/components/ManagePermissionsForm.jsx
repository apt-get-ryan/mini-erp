import React, { useEffect, useState } from 'react';
import {Button, Group, MultiSelect} from '@mantine/core';
import { redirect } from 'next/navigation';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { useApi } from '@/utils/Requests';

const path = process.env.NEXT_PUBLIC_API_URL;

const fetchPermissions = async () => {
  let res = await fetch(path+'/permissions?fields=id,resource,action', {
    method: 'GET',
    credentials: 'include',
    cache: "no-store"
  });
  if(res.status === 401) {
    redirect("/");
  } else {
    res = await res.json();
    return res;
  }
}

const fetchRolePermissions = async (roleId) => {
  let res = await fetch(path+'/rolePermissions/'+roleId, {
    method: "GET",
    credentials: "include",
    cache: "no-store"
  });
  if(res.status === 401) {
    redirect("/");
  } else {
    res = await res.json();
    console.log(res)
    return res;
  }
}


const updatePermissions = async (roleId, body) => {
  let res = await fetch(path+"/rolePermissions/"+roleId, {
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
    res = await res.json();
    return res;
  }
}


const ManagePermissionsForm = ({roleId}) => {
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
        fetchPermissions(),
        fetchRolePermissions(roleId)
      ]);
      const treatedPermissions = permissions.map(p => ({value: p.id.toString(), label: `${p.resource}.${p.action}`}));
      const permissionsValues = permissionsOfRole.map(p => p.id.toString());
      setData(treatedPermissions);
      form.setValues({permissions: permissionsValues})
    })();
  }, []);

  const handleSubmit = form.onSubmit(async (values) => {
    let res = await updatePermissions(roleId, values);
    if(res.status === 500) {
      notifications.show({
        id: "editPermissionsError",
        title: "Erro",
        message: res.error,
        color: "red",
        classNames: {
          description: "!text-slate-700"
        }
      });
    } else {
      notifications.show({
        id: "editPermissionsSuccess",
        title: "Sucesso",
        message: "Permissões editadas com sucesso",
        color: "green",
        classNames: {
          description: "!text-slate-700"
        }
      });
    }
    modals.close("editPermissions");
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