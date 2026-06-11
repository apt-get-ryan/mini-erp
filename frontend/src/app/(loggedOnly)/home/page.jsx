import ModuleCard from '@/components/Layout/ModuleCard/ModuleCard';
import { cookies } from 'next/headers';
import { env } from "@/utils/env";
import { getModuleTree } from '@/utils/Modules';

async function Home() {
  try {
    const cookieStore = await cookies();
    const response = await fetch(env.API_URL+"/me/modules", {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store"
    }).then(r => r.json())
    let modules = [];
    if("success" in response) {
      modules = getModuleTree(response.success.data);
    }

    if (!modules?.length) {
      return (
        <div className="flex justify-center items-start">
          <span>Sem módulos para listar</span>
        </div>
      );
    }
    return (
      <>
        <div className='grid grid-cols-2 lg:grid-cols-6 gap-4'>
          {modules?.map((module) => {
            return <ModuleCard key={module.id} title={module.nome} href={module.rota} icon={module.icone}/>
          })}
        </div>
      </>
    )
  } catch (error) {
    return (
      <div className="flex justify-center items-start">
        <span>Erro ao carregar a páginas</span>
      </div>
    );
  }
  
}

export default Home