"use client"
import { useModules } from '@/stores/modulesProvider'
import { getSubmodules } from '@/utils/Modules';
import ModuleCard from '@/components/Layout/ModuleCard/ModuleCard';


const Admin = () => {
  let modules = useModules();
  modules = (getSubmodules(modules, "/admin"));
  return (
    <div className='grid grid-cols-6 gap-4'>
      {modules?.map((module) => {
        return <ModuleCard key={module.id} title={module.nome} href={module.rota} icon={module.icone}/>
      })}
    </div>
  )
}

export default Admin