import { mergeClassNames } from '@/utils/Classes';
import React from 'react';

const ContentBox = ({children, className}) => {
  return (
    <section className={mergeClassNames(
      "rounded",
      "px-4 shadow bg-base-200",
      // "[box-shadow:-10px_-10px_30px_#ffffff,10px_10px_20px_#aeaec066]",
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