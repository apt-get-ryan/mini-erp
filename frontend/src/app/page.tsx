"use client";
import { Tabs, TextInput } from '@mantine/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {mergeClassNames} from "@/utils/Classes";
import Login from "@/components/Layout/Auth/Login";
import Register from "@/components/Layout/Auth/Register";
import { createTheme, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from '@mantine/notifications';

const theme = createTheme({

});


function FloatingIndicator({left}) {
  return (
    <div className={mergeClassNames(
      'h-0.5 absolute bottom-0 z-30 bg-blue-500 w-1/2 transition-[left] duration-300 ease-in-out will-change-[left]',
    )}
    style={{
      left: left,
    }}></div>
  )
}

const Page = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const tabsRefs = useRef({});

  const setTabRef = useCallback((key : string, tab: HTMLElement) => {
    tabsRefs.current[key] = tab;
  }, [])

  const updateIndicator = useCallback(() => {
    const tab: HTMLElement = tabsRefs.current[activeTab];
    if(tab) {
      const tabLeft = tab.getBoundingClientRect().left;
      const parentLeft = tab.parentElement.getBoundingClientRect().left;
      setIndicatorLeft(tabLeft - parentLeft );
    }
  }, [activeTab]);
  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("resize", updateIndicator);
    }
  }, [activeTab])
  return (
    <>
      <div className="bg-base-400 grid place-items-center min-h-dvh p-4">
        <main className='w-full max-w-md border bg-base-200 border-slate-300 rounded-2xl p-4'>
          <section>
            <Tabs variant='none' value={activeTab} onChange={setActiveTab}>
              <Tabs.List grow className='relative'>
                <Tabs.Tab className='focus-visible:outline-0!' value='login' ref={(el) => setTabRef("login", el)}>
                  <span className='text-base!'>Login</span>
                </Tabs.Tab>
                <Tabs.Tab className='focus-visible:outline-0!' value='register' ref={(el) => setTabRef("register", el)}>
                  <span className='text-base!'>Registrar</span>
                </Tabs.Tab>
                <FloatingIndicator left={indicatorLeft}/>
              </Tabs.List>

              <Tabs.Panel value='login'>
                <Login/>
                
              </Tabs.Panel>
              <Tabs.Panel value='register'>
                <Register/>
              </Tabs.Panel>
            </Tabs>
          </section>
        </main>
      </div>
      <Notifications/>
    </>
  )
}

export default Page;