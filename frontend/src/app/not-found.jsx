import React from 'react';
import '@mantine/core/styles.layer.css';
export const metadata = {
  title: "404 | Mini-ERP"
}
const NotFound = () => {
  return (
    <div className='grid place-items-center min-h-dvh bg-base-400'>
      <div className='flex justify-center items-center w-full max-w-md border bg-base-200 border-slate-300 rounded-2xl p-4'>
        <h1 className='text-3xl font-mono pr-5 mr-5 pl-5 border-r font-medium border-r-slate-500 leading-12'>404</h1>
        <h2 className='leading-12 grow'>Esta página não pôde ser encontrada.</h2>
      </div>
    </div>
  )
}

export default NotFound