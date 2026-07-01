import React from 'react';
import Link from "next/link";
import logout from '@/api/logout';
import logo from "@/../public/logo.svg";
import Image from 'next/image';
import { Avatar } from '@mantine/core';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { env } from "@/utils/env";

const secret = new TextEncoder().encode(env.JWT_KEY);
const alg = env.JWT_ALG;

const Header = async () => {
  const token = (await cookies()).get("token").value;
  const {payload} = await jwtVerify(token, secret, { algorithms: [alg]});
  const login = payload.userLogin.trim();
  const letters = login.charAt(0).toUpperCase() + login.charAt(1);
  return (
    <header className='bg-base-200 shadow'>
      <div className='container mx-auto px-4 py-2 flex justify-between'>
      <Link href={"/home"} className='block font-bold text-xl'>
        <Image src={logo} alt="M-ERP" height={40}/>
      </Link>

      <div className='flex items-center justify-between gap-2'>
        <Avatar color="initials">{letters}</Avatar>
        <button className='text-red-500 hover:text-red-600 hover:cursor-pointer' onClick={logout}>
          Sair
        </button>
      </div>
      </div>

    </header>
  )
}

export default Header