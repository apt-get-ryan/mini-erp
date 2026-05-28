import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export const runtime = 'nodejs';

export function middleware(req) {

  const token = req.cookies.get("token")?.value.trim();
  if(!token) {
    return NextResponse.redirect(new URL("/", req.url));

  }
  try {
    const KEY = process.env.JWT_KEY;
    const decoded = jwt.verify(token, KEY);
    const permissions = decoded.userPermissions;
    const accessibleModules = decoded.accessibleModules;
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
    "/clientes",
    "/produtos"

  ]
};