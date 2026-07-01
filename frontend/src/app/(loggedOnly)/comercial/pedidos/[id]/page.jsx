import React from 'react';
import { cookies } from 'next/headers';
import { env } from "@/utils/env";
import { getSuccessData, handleResponse } from '@/utils/Requests';
import Display from "./components/Display";

async function Page({params}) {
  try {
    const cookieStore = await cookies();
    const {id} = await params;
    const response = await fetch(env.API_URL+`/pedidos/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store"
    }).then(r => r.json());
    if(!("success" in response))
      throw new Error();
    let dadosPedido = response.success.data;
    if(!dadosPedido) {
      return(
        <div className="flex justify-center items-start">
          <span>Pedido não encontrado</span>
        </div>
      )
    }

    return (
      <div>
        <Display id={id} data={dadosPedido}/>
      </div>
    )
  } catch(error) {
    console.log(error)
    return (
      <div className="flex justify-center items-start">
        <span>Erro ao carregar o pedido</span>
      </div>
    );
  }
}

export default Page;