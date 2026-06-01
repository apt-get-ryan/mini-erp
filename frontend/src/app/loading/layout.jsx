import React from 'react'
export const metadata = {
  title: "Carregando...",
}
const Layout = ({children}) => {
  return (
    <div className='bg-base-400 min-h-dvh grid place-items-center'>
      <div id="resp" className='w-full max-w-md border bg-base-200 border-slate-300 rounded-2xl p-4 flex justify-evenly'>
        {children}
      </div>
    </div>
  )
}

export default Layout