"use client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { HttpErrorDTO, HttpSuccessDTO, SuccessData} from "@shared/utils"

const apiPath = process.env.NEXT_PUBLIC_API_URL;

function useApi() {
  const fetchConfig = useMemo<RequestInit>(() => ({
    credentials: "include",
    cache: "no-store",
  }), []);

  const router = useRouter();

 

  const request = useCallback((path: string, options: RequestInit) => {
    options = {...fetchConfig, ...options};
    return fetch(apiPath+path, options)
      .then(async (res) => {
        if(res.status === 401) {
          router.replace("/");
          return { error: {
            message: (await res.json()).error.message || "Erro"
          }};
        }
        return await res.json();
      })
      .catch(rej => {throw Error("Falha na requisição")});

  }, [router, fetchConfig]);

  return {
    get: (path: string) => request(path, {method: "GET"}),
    post: (path: string, body: object) => request(path, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {"Content-Type": "application/json"}
    }),
    patch: (path: string, body: object) => request(path, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {"Content-Type": "application/json"}
    }),
    put: (path: string, body: object) => request(path, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {"Content-Type": "application/json"}
    }),
    delete: (path: string) => request(path, {
      method: "DELETE",
    }),
  }
}

function handleResponse(response : HttpErrorDTO | HttpSuccessDTO) {
  if(!response) {
    throw new Error("Resposta inválida");
  }
  if("error" in response) {
    throw response;
  }
  return response.success;
}

function getSuccessData(response: SuccessData) {
  return response.data;
}

function handleApiFillTable(req: Promise<any>, setter, fetching) {
  req
    .then(handleResponse)
    .then(getSuccessData)
    .then(setter)
    .catch(console.log)
    .finally(() => {
      fetching(false);
    })
}

export {useApi, handleResponse, getSuccessData, handleApiFillTable};