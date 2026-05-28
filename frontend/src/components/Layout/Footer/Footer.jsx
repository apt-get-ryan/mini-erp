"use client";
import React from 'react'
import Image from 'next/image';
import { useNetwork } from '@mantine/hooks';
import { Badge } from "@mantine/core";

function envAtual(env) {
  if(env == "production")
    return "Em produção"
  else 
    return "Em desenvolvimento"
}

function Footer() {
  const networkStatus = useNetwork();
  return (
    <div className='bg-base-200 shadow'>
      <div className='container mx-auto px-4 py-2 '>
        <div className="flex items-center gap-2 ">
            <span>
              {"Mini-ERP"} v{process.env.APP_VERSION}
            </span>
            |
            <Badge color={networkStatus.online ? 'green' : 'red'} variant='outline' leftSection={'•'}>
              {networkStatus.online ? 'Online' : 'Offline'}
            </Badge>
            |
            <span>
              {envAtual(process.env.NODE_ENV)}
            </span>
        </div>
      </div>
    </div>
  )
}

export default Footer