"use client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

const apiPath = process.env.NEXT_PUBLIC_API_URL;

function useApi() {
  const fetchConfig = useMemo(() => ({
    //method: "GET",
    credentials: "include",
    cache: "no-store",
  }), []);

  const router = useRouter();

  /** @param {String} path Request path, @param {RequestInit} options Request options*/
  const request = useCallback((path, options) => {
    options = {...fetchConfig, ...options};
    return fetch(apiPath+path, options)
      .then(res => {
        if(res.status === 401) {
          //window.location = "/";
          router.replace("/");
          return null;
        }
        if(!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`)
        };
        return res.json();
      })
      .then(res => {
        //console.log(res);
        return res;
      })
      .catch(rej => console.log(rej));

  }, [router, fetchConfig]);

  return {
    get: (path) => request(path, {method: "GET"}),
    post: (path, body) => request(path, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {"Content-Type": "application/json"}
    })
  }
  
}
function isSuccessful(result) {
  if(Object.hasOwn(result, 'success'))
    return true;
  return false;
}

function extractRequestData(response) {
  if(isSuccessful(response)) {
    return response.success.data;
  }
  throw new Error("Requisição falhou");
}
export {useApi, extractRequestData};