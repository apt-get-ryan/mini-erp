"use client";
import Validate from "@/components/Layout/Authentication/Validate.js";
import { useParams } from "next/navigation";

function Page() {
  const { login } = useParams();

  return (
    <div className="bg-base-400 grid place-items-center min-h-dvh p-4">
      <div className="w-full max-w-md border bg-base-200 border-slate-300 rounded-2xl p-4">
        <h2 className="mb-2">Olá, {login}!<br/> Por favor insira abaixo seu código de verificação</h2>
        <Validate login={login}/>
      </div>
    </div>
  )
}

export default Page;