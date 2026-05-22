"use server"
import { cookies } from 'next/headers';
import { redirect, RedirectType } from "next/navigation";
import jwt from 'jsonwebtoken'

const JWT_KEY = process.env.JWT_KEY;

export default async function accessModules() {
  const token = (await cookies()).get("token").value;
  const decoded = jwt.verify(token, JWT_KEY);
  const accessibleModules = decoded.accessibleModules;
  const map = {};
  accessibleModules.forEach(m => {
    delete m.accessPermission;
    map[m.id] = {...m, submodules: []};
  });
  const tree = [];
  accessibleModules.forEach(m => {
    if(m.parent_id != null) {
      map[m.parent_id].submodules.push(m);
    } else {
      tree.push(map[m.id]);
    }
  });
  
  return tree;
}