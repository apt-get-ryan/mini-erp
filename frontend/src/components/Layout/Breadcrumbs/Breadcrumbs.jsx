"use client";
import React, { Fragment, useEffect, useState } from 'react';
import {usePathname} from "next/navigation";
import Link from 'next/link';
import { FaHouse } from 'react-icons/fa6';

const Breadcrumbs = () => {
  const url = usePathname();
  const segments = url.split("/").filter(Boolean)
  const breadcrumbs = segments.map((seg, index) => {
    const href = segments.slice(0, index + 1).join("/")
    return {
      label: seg,
      href
    }
  });

  if(segments.length === 1 && segments[0] == 'home' ) {
    return (
      <nav>
        <Link className="text-blue-500 hover:text-sky-700 underline underline-offset-3" href={"/home"}>
          <span className='border-b hover:border-sky-700 mr-2 inline'>
            <FaHouse size={17} className={"inline relative align-middle -top-0.75"}/>
          </span>
        </Link>
      </nav>
    )

  }
  return (
    <nav>
      <Link className="text-blue-500 hover:text-sky-700 underline underline-offset-3" href={"/home"}>
        <span className='border-b hover:border-sky-700 mr-1 inline'>
          <FaHouse size={17} className={"inline relative align-middle -top-0.75"}/>
        </span>
      </Link>
      {
        !(segments.length === 1 && segments[0] == 'home' ) && (
          <>
          <span className='px-1'>/</span>
          {
            breadcrumbs.map((b, index) => (
              <Fragment key={index}>
                <Link className='text-blue-500 hover:text-sky-700 underline underline-offset-3' href={"/" + b.href}>{b.label}</Link>
                <span className='last:hidden px-2' aria-hidden>/</span>
              </Fragment>
            ))
          }
          </>
        )
      }
    </nav>
  )
}

export default Breadcrumbs