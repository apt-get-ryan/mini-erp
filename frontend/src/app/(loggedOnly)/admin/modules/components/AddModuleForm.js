import { TextInput, Group, Flex, Select, Input, NumberInput, Switch, Button, Autocomplete } from '@mantine/core';
import { useForm } from '@mantine/form';
import Icon from '@/components/Layout/Icon/Icon';
import React, { useEffect } from 'react';
import { modals } from '@mantine/modals';
const path = process.env.NEXT_PUBLIC_API_URL;

async function addModule(body) {
  
  const res = await fetch(path+"/modules", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(body)
  })

  if(res.status === 401){
    redirect("/");
  } else {
    modals.close("addRow")
  }

  
}
const AddModuleForm = ({modules}) => {
  const [icons, setIcons] = useState([]);
  const [search, setSearch] = useState(defaultValues.icone);
  const [debounced] = useDebouncedValue(search, 300);
  const filteredIcons = useMemo(() => {
    return icons.filter(icon => icon.toLowerCase().includes(debounced.toLowerCase()))
  }, [debounced, icons]);
  useEffect(() => {
    import('../assets/fa6-icons.json').then(m => setIcons(m.default));
  }, []);
  const form = useForm({
    mode: "uncontrolled",
    initialValues:{
      nome: "",
      slug: "",
      rota: "",
      icone: "",
      parent_id: null,
      sort_order: 0,
      is_active: true
    }
  })
  const handleSubmit= form.onSubmit( (values) => addModule(values));
  return (
    <form>
      <TextInput classNames={{ label: "!font-bold"}} label="Nome" {...form.getInputProps("nome")}/>
      <TextInput classNames={{ label: "!font-bold"}} label="Identificador" {...form.getInputProps("slug")}/>
      <TextInput classNames={{ label: "!font-bold"}} label="Rota" {...form.getInputProps("rota")}/>
      <Group>
        {/* <TextInput classNames={{ label: "!font-bold"}} label="Icone" {...form.getInputProps("icone")}/> */}
        <Autocomplete limit={30} classNames={{ label: "!font-bold"}} data={filteredIcons} label="Ícone" value={search} onChange={(value) => { setSearch(value); form.setFieldValue("icone", value)}}/>
        
        <Flex h={"stretch"} className='grow' align={"flex-end"} justify={"center"}>
          <Icon name={form.getValues().icone} size={35}/>

        </Flex>
      </Group>
      <Input.Wrapper classNames={{ label: "!font-bold"}} label="Filho de">
        <Select allowDeselect data={modules.map(m => ({ value: m.id.toString(), label: m.slug}))} {...form.getInputProps("parent_id")}/>
      </Input.Wrapper>
      <NumberInput classNames={{ label: "!font-bold"}} label="Ordenação" {...form.getInputProps("sort_order")}/>
      <Group>
        <Switch
          mt="5"
          {...form.getInputProps("is_active", { type: "checkbox"})}
          classNames={{ label: "!font-bold"}}
          withThumbIndicator={false}
          labelPosition="left"
          label="Ativo"
        />
      </Group>
      <Flex justify={"flex-end"} >
        <Button color='teal' onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

export default AddModuleForm