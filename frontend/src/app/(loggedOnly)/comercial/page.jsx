"use client";
import { useModules } from '@/stores/modulesProvider';
import { notifications } from '@mantine/notifications';
import React, { useEffect } from 'react';
import ModuleCard from '@/components/Layout/ModuleCard/ModuleCard';
import { getSubmodules } from '@/utils/Modules';

function Page() {
  let modules = useModules();
  modules = getSubmodules(modules, "/comercial")
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

export default Page