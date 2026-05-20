
//import React, { useEffect } from 'react'
import Header from '@/components/Layout/Header/Header';
import { ModulesProvider } from '@/stores/modulesProvider';
import { cookies } from 'next/headers';
import ContentBox from '@/components/Layout/ContentBox/ContentBox';
import { Notifications, notifications } from '@mantine/notifications';
import Breadcrumbs from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import accessModules from '@/api/accessModules';
import 'mantine-datatable/styles.layer.css';

const path = process.env.NEXT_PUBLIC_API_URL;
const Layout = async ({children}) => {
  // const cookieStore = await cookies();

  // let modules = await fetch(path+"/me/modules",
  //   {
  //     headers: {
  //       Cookie: cookieStore.toString(),
  //     },
  //     method: "GET",
  //     credentials: "include",
  //     cache: "no-store"
  //   }
  // ).then(res => res.json())
  let modules = await accessModules();

  return (
    <div className='grid grid-rows-[auto_auto_1fr_auto] min-h-dvh bg-base-400'>
      <Header/>
      <ModulesProvider modules={modules}>
        <div suppressHydrationWarning className='mx-auto container mt-2 z-20'>
          <Breadcrumbs/>
        </div>
        <ContentBox className={"mx-auto container py-3  mt-1"}>
          {children}
        </ContentBox>
        <div>
          footer
        </div>
        <Notifications/>
      </ModulesProvider>
    </div>
  )
}

export default Layout