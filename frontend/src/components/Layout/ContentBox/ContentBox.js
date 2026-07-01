import { mergeClassNames } from '@/utils/Classes';
import React from 'react';

const ContentBox = ({children, className}) => {
  return (
    <section className={mergeClassNames(
      "rounded",
      "px-4 shadow bg-base-200",
      "border border-slate-200 ",
      className
    )}>
      <div className=''>
        {children}
      </div>
    </section>
  )
}

export default ContentBox