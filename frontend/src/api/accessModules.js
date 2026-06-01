"use server"
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { env } from '@/utils/env';

const JWT_KEY = env.JWT_KEY;
const JWT_ALG = env.JWT_ALG;

export default async function accessModules() {
  const token = (await cookies()).get("token").value;
  const secret = new TextEncoder().encode(JWT_KEY);
  const {payload} = await jwtVerify(token, secret, { algorithms: [JWT_ALG] });
  const accessibleModules = payload.accessibleModules;
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