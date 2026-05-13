import React from 'react';
import Link from "next/link";
import logout from '@/api/logout';

const Header = async () => {
  return (
    <header className='bg-base-200 shadow'>
      <div className='container mx-auto px-4 py-2 flex justify-between'>
      <Link href={"/home"} className='block font-bold text-xl'>
        CRM
      </Link>

      <div>
        <button className='text-red-500 hover:text-red-600 hover:cursor-pointer' onClick={logout}>
          Sair
        </button>
      </div>
      </div>

    </header>
  )
}

export default Header