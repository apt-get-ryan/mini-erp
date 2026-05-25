"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Tabs } from "radix-ui";
import { mergeClassNames } from "@/utils/Classes";
import { AnimatePresence, motion } from "motion/react";
import Login from "@/components/Layout/Authentication/Login.js";
import Register from "@/components/Layout/Authentication/Register";

export default function Home() {

  const [activeTab, setActiveTab] = useState("login");
  const tabsRef = useRef({});
  const [underlineLeft, setUnderlineLeft] = useState(0);
  useEffect(() => {

    function updateUnderline() {
      /** @type {HTMLElement} */
      const node = tabsRef.current[activeTab];
      if( node ) {
        const rect = node.getBoundingClientRect();
        const parentRect = node.parentElement.getBoundingClientRect();
        setUnderlineLeft(rect.left - parentRect.left)
      }
    }

    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => {
      window.removeEventListener("resize", updateUnderline);
    }
  }, [activeTab])
  return (
    <div className="bg-base-400 grid place-items-center min-h-dvh p-4">
      <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md border bg-base-200 border-slate-300 rounded-2xl p-4">
        <Tabs.List className={mergeClassNames(
          "flex flex-row ",
          "relative"
        )}>
            <Tabs.Trigger ref={ (el) => (tabsRef.current["login"] = el)} value="login" className="basis-1/2 p-1">
              Login
            </Tabs.Trigger>
            <Tabs.Trigger ref={ (el) => (tabsRef.current["register"] = el)} value="register" className="basis-1/2 p-1">
              Registrar
            </Tabs.Trigger>
            <motion.div 
              className="absolute bottom-0 h-0.5 w-1/2 bg-blue-500"
              animate={{ left: underlineLeft}}
              transition={{ duration: 0.3, ease: "easeInOut"}}
            />
        </Tabs.List>
        <Tabs.Content value="login" className="mt-4">
          <Login/>
        </Tabs.Content>
        <Tabs.Content value="register" className="mt-4">
          <Register/>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

