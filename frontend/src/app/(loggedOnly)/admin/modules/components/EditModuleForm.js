import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Group, Switch, Flex, Button, NumberInput, Select, Input, Autocomplete } from '@mantine/core';
import Icon from '@/components/Layout/Icon/Icon';
import { modals, openModal } from '@mantine/modals';
import ManageAcessForm from './ManageAcessForm';
import { useDebouncedValue, useDebouncedState, useDebouncedCallback } from '@mantine/hooks';

const path = process.env.NEXT_PUBLIC_API_URL;

async function editModule(id, body) {
  const res = await fetch(path+"/modules/"+id, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify(body)
  })

  if(res.status === 401){
    redirect("/");
  } else {
    modals.close("editRow")
  }

  
}
const EditModuleForm = ({defaultValues, otherModules, form}) => {
  const [icons, setIcons] = useState([]);
  
  // const form = useForm({
  //   mode: "uncontrolled",
  //   initialValues:{
  //     nome: defaultValues.nome,
  //     slug: defaultValues.slug,
  //     rota: defaultValues.rota,
  //     icone: defaultValues.icone,
  //     parent_id: defaultValues.parent_id?.toString(),
  //     sort_order: defaultValues.sort_order,
  //     is_active: defaultValues.is_active
  //   }
  // });
  const [search, setSearch] = useState(form.getValues().icone); //defaultValues.icone);
  const [debounced] = useDebouncedValue(search, 300);

  const filteredIcons = useMemo(() => {
    return icons.filter(icon => icon.toLowerCase().includes(debounced.toLowerCase()))
  }, [debounced, icons]);

  useEffect(() => {
    form.setValues({icone: debounced})
    // setSearch(form.getValues().icone)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])
  useEffect(() => {
    import('../assets/fa6-icons.json').then(m => setIcons(m.default));
  }, []);

  const handleSubmit = form.onSubmit(values => editModule(defaultValues.id, values));
  const handleAcessManagement = (id) => {
    console.log(id)
    modals.open({
      modalId: "editAcess",
      title: `Acesso a #${id} - ${defaultValues.slug}`,
      children: <ManageAcessForm moduleId={id}/>
    })
  }
  return (
    <form>
      <TextInput classNames={{ label: "!font-bold"}} label="Nome" {...form.getInputProps("nome")}/>
      <TextInput readOnly classNames={{ label: "!font-bold"}} label="Slug" {...form.getInputProps("slug")}/>
      <TextInput classNames={{ label: "!font-bold"}} label="Rota" {...form.getInputProps("rota")}/>
      <Group>
        {/* <TextInput classNames={{ label: "!font-bold"}} label="Ícone" {...form.getInputProps("icone")}/> */}
        <Autocomplete limit={30} classNames={{ label: "!font-bold"}} data={filteredIcons} label="Ícone" value={search} onChange={(value) => { setSearch(value); form.setFieldValue("icone", value)}}/>
        <Flex h={"stretch"} className='grow' align={"flex-end"} justify={"center"}>
          <Icon name={search} size={35}/>

        </Flex>
      </Group>
      <Input.Wrapper classNames={{ label: "!font-bold"}} label="Filho de">
        <Select allowDeselect data={otherModules.map(m => ({ value: m.id.toString(), label: m.slug}))} {...form.getInputProps("parent_id")}/>
      </Input.Wrapper>
      <NumberInput classNames={{ label: "!font-bold"}} label="Ordenação" {...form.getInputProps("sort_order")}/>
      <Group>
        <Switch
          mt={5}
          {...form.getInputProps("is_active", { type: "checkbox"})}
          classNames={{ label: "!font-bold"}}
          withThumbIndicator={false}
          labelPosition="left"
          label="Ativo?"
        />
      </Group>
      <Flex justify={"flex-end"} gap={5} mt={5}>
        <Button onClick={() => handleAcessManagement(defaultValues.id)}>
          Permissão de acesso
        </Button>
        <Button color='teal' onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default EditModuleForm