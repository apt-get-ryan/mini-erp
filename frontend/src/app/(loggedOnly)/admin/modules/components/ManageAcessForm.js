import React, { useEffect, useState } from 'react';
import {Button, Group, Select} from '@mantine/core';
import { redirect } from 'next/navigation';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';

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

const fetchModuleAccessPermission = async (id) => {
   let res = await fetch(path+'/modulePermissions/'+id, {
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

const updateAccess = async (moduleId, body) => {
  let res = await fetch(path+"/modulePermissions/"+moduleId, {
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

const ManageAcessForm = ({moduleId}) => {
  const [data, setData] = useState([]);
  const form = useForm({
    mode: "controlled",
    initialValues: {
      permissions: null
    }
  });

  useEffect(() => {
    (async () => {
      const [permissions, moduleAccess] = await Promise.all([
        fetchPermissions(),
        fetchModuleAccessPermission(moduleId)
      ]);
      const treatedPermissions = permissions.map(p => ({value: p.id.toString(), label: `${p.resource}.${p.action}`}));
      const accessValue = moduleAccess.map(p => p.id.toString())[0] || null;
      console.log(accessValue)
      setData(treatedPermissions);
      form.setValues({permissions: accessValue});
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = form.onSubmit(async (values) => {
    let res = await updateAccess(moduleId, values);
    if(res.status === 500) {
      notifications.show({
        id: "editAcessError",
        title: "Erro",
        message: res.error,
        color: "red",
        classNames: {
          description: "!text-slate-700"
        }
      });
    } else {
      notifications.show({
        id: "editAcessSuccess",
        title: "Sucesso",
        message: "Acesso ao módulo editado com sucesso",
        color: "green",
        classNames: {
          description: "!text-slate-700"
        }
      });
    }
    modals.close("editAcess");
  })

  return (
    <form>
      <Select allowDeselect searchable  {...form.getInputProps("permissions")} data={data}/>
      <Group justify='flex-end'>
        <Button onClick={handleSubmit} color='teal' mt={5}>
          Salvar
        </Button>
      </Group>
    </form>
  )
}

export default ManageAcessForm