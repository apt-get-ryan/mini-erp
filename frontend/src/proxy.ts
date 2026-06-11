import { NextResponse } from "next/server";
import { env } from "@/utils/env";
import { cookies } from 'next/headers';

function normalizeRouteIf(specialRoutes: string[], url: string) {
  const segments = url.split("/").filter(Boolean);
  if(segments.length <= 1)
    return url;
  const parentRoute = "/" + segments.slice(0, -1).join("/");
  if(specialRoutes.includes(parentRoute))
    return parentRoute;
  return url;
}

const doIHaveAccessTo = async (route) => {
  try {
    if(route == "/home")
      return true;
    const cookieStore = await cookies();
    const res = await fetch(env.API_URL+"/me/have/route", {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json"
      },
      cache: "no-store",
      body: JSON.stringify({route}),
    }).then(r => r.json());
    if("error" in res) {
      throw new Error();
    }
    return  res.success.data || false;
  } catch (error) {
    return false;
  }
}

export default async function proxy(req) {
  const token = req.cookies.get("token")?.value.trim();
  if(!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  try {
    let url = req.nextUrl.pathname;
    url = normalizeRouteIf([
      "/comercial/pedidos"
    ], url);
    console.log(url)
    const haveAccess = await doIHaveAccessTo(url);
    if(!haveAccess)
      return NextResponse.redirect(new URL("/403", req.url));
    return NextResponse.next();
  } catch (error) {
    console.error(error)
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