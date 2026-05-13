"use client"
import { useModules } from '@/stores/modulesProvider';
import { notifications } from '@mantine/notifications';
import React, { useEffect } from 'react';
import ModuleCard from '@/components/Layout/ModuleCard/ModuleCard';


function Home() {
  useEffect(() => {
    notifications.clean();    
  }, []);

  let modules = useModules();
  if((typeof modules === 'object' && !Array.isArray(modules)) && modules?.error) {
    notifications.show({id: "modulesError", title: "Erro", message: modules.error, color: "red", classNames: {description: "!text-slate-700"}, autoClose: false })
    modules = [];
  }

  if(modules.length === 0) {
    return (
      <div className='flex justify-center items-start'>
        <span>Sem módulos para listar</span>
      </div>
    )
  }
  return (
    <>
      <div className='grid grid-cols-6 gap-4'>
        {modules?.map((module) => {
          return <ModuleCard key={module.id} title={module.nome} href={module.rota} icon={module.icone}/>
        })}
      </div>
    </>
  )
}

export default Home