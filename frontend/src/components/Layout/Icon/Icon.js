"use client"
import * as FaIcon from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa6";
/*
import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa6";
// import { lazy, Suspense } from "react";
// import { FaQuestion } from "react-icons/fa6";

const iconCache = {};
const moduleCache = {};
// function getLazyIcon(name) {
//   if (!iconCache[name]) {
//     iconCache[name] = lazy(async () => {
//       const fontAweasome = await import("react-icons/fa6");
//       console.log(Object.keys(fontAweasome))
//       return {
//         default: fontAweasome[name] || FaQuestion,
//       };
//     });
//   }
//   return iconCache[name];
// }

// export function Icon({ name, ...props }) {
//   const LazyIcon = getLazyIcon(name);

//   return (
//     <Suspense fallback={<span>...</span>}>
//       <LazyIcon {...props} />
//     </Suspense>
//   );
// }


async function getIcon(name) {
  if(iconCache[name])
    return iconCache[name];
  if(!moduleCache.fa6)
    moduleCache.fa6 = await import("react-icons/fa6");
  const icons = moduleCache.fa6;

  const iconComponent = icons[name] || FaQuestion;
  iconCache[name] = iconComponent;
  return iconComponent;
}

export function Icon({ name, ...props }) {
  const [Component, setComponent] = useState(iconCache[name]);

  useEffect(() => {
    // let mounted = true;

    if ( name.startsWith("Fa")) { //!Component) {
      getIcon(name).then((icon) => {
        // if (mounted) {
          setComponent(() => icon);
        // }
      });
    }

    // return () => {
    //   mounted = false;
    // };
  }, [name]);

  const FinalIcon = Component || FaQuestion;

  return <FinalIcon {...props} />;
}


export default Icon;

*/


const Icon = ({name, ...props}) => {
  const Component = FaIcon[name] || FaQuestion;
  return <Component {...props}/>
}

export default Icon;