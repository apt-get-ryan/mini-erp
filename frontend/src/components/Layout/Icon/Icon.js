"use client"
import * as FaIcon from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa6";



const Icon = ({name, ...props}) => {
  const Component = FaIcon[name] || FaQuestion;
  return <Component {...props}/>
}

export default Icon;