import React from 'react';
import { Spinner } from '@/components/Layout/Auth/Spinner/Spinner';



function Page() {
  return (
    <>
        Por favor aguarde
        <div>
          <Spinner loading={true}/>
        </div>
    </>
  )
}

export default Page;