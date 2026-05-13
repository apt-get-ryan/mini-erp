import React, { memo } from "react";
import Icon from '@/components/Layout/Icon/Icon';
import { mergeClassNames } from "@/utils/Classes";

const ModuleCard = memo(({title, href, icon}) => {
  return (
    <a className={mergeClassNames(
      "bg-stone-100 text-center flex gap-4 hover:bg-base-400 p-4 rounded-md border border-slate-300",
      "items-center"
    )} href={href}>
      <Icon name={icon} size={25}/>
      {title}
    </a>
  )
})
export default ModuleCard;