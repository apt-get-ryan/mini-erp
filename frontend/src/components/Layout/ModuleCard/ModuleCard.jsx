import React, { memo } from "react";
import Icon from '@/components/Layout/Icon/Icon';
import { mergeClassNames } from "@/utils/Classes";

const ModuleCard = memo(({title, href, icon}) => {
  return (
    <a className={mergeClassNames(
      "bg-stone-100  hover:bg-base-400 py-4 px-2 rounded-md border border-slate-300",
      "grid grid-cols-[25px_1fr]",
      "gap-0.5 content-center items-center justify-items-center justify-center"
    )} href={href}>
      <div>
        <Icon name={icon} size={25}/>
      </div>
      <span className="text-center">
        {title}
      </span>
    </a>
  )
})
export default ModuleCard;