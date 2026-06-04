import { NextResponse } from "next/server";
import { jwtVerify} from "jose";

const JWT_KEY = process.env.JWT_KEY;
const JWT_ALG = process.env.JWT_ALG;

type Module = {
  rota: string
};
export default async function proxy(req) {
  if(!JWT_KEY || !JWT_ALG) {
    throw new Error();
  }

  const token = req.cookies.get("token")?.value.trim();
  if(!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  try {
    const secret = new TextEncoder().encode(JWT_KEY);
    const {payload} = await jwtVerify(token, secret, {
      algorithms: [JWT_ALG]
    });
    // const permissions = payload.userPermissions;
    const accessibleModules = payload.accessibleModules as Module[];
    const url = req.nextUrl.pathname;
    if(url !== '/home' && !accessibleModules.some(m => m.rota === url))
      return NextResponse.redirect(new URL("/403", req.url));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}




export const config = {
  matcher: [
    "/home",
    "/admin/:path*",
    "/comercial/:path*",

  ]
};