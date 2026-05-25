"use client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { HttpErrorDTO, HttpSuccessDTO, SuccessData} from "@shared/utils"

const apiPath = process.env.NEXT_PUBLIC_API_URL;

function useApi() {
  const fetchConfig = useMemo<RequestInit>(() => ({
    //method: "GET",
    credentials: "include",
    cache: "no-store",
  }), []);

  const router = useRouter();

 

  const request = useCallback((path: String, options: RequestInit) => {
    options = {...fetchConfig, ...options};
    return fetch(apiPath+path, options)
      .then((res) => {
        if(res.status === 401) {
          router.replace("/");
          return null;
        }
        // if(!res.ok) {
        //   throw Error("Falha na requisição");
        // };
        return res.json();
      })
      .then((res )=> {
        return res;
      })
      .catch(rej => {throw Error("Falha na requisição")});

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

// function isResponseSuccessful(result) {
//   if(Object.hasOwn(result, 'success'))
//     return true;
//   return false;
// }

// function extractRequestData(response) {
//   if(isResponseSuccessful(response)) {
//     return response.success.data;
//   }
//   throw new Error("Requisição falhou");
// }

function handleResponse(response : HttpErrorDTO | HttpSuccessDTO) {
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