"use server";
import { cookies } from 'next/headers';
import { redirect, RedirectType } from "next/navigation"

export default async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/", RedirectType.push);

}