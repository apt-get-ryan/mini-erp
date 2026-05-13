import React from 'react'

const SemAcesso = () => {
  return (
    <div className="bg-base-400 grid place-items-center min-h-dvh p-4">
      <div className="w-full max-w-md border bg-base-200 border-slate-300 rounded-2xl p-4">
        <h1 className='text-xl font-semibold'><span className='font-mono'>403</span> - Acesso recusado</h1>
        <hr className='border-slate-300'/>
        <p className='mt-2'>Você não tem acesso a esta página</p>
      </div>
    </div>
  )
}

export default SemAcesso