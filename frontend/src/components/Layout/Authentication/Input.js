import React from 'react'

const Input = ({...props}) => {
  return (
    <input {...props} className="input bg-slate-50 w-full focus:outline-0 focus:border-blue-500"  />
  )
}

export default Input;