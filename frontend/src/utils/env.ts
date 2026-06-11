function getEnv(name: string) {
  const value = process.env[name];
  if(!value)
    throw new Error(`Variável de ambiente faltando: ${name}`);
  return value;
}


export const env = {
  JWT_KEY: getEnv("JWT_KEY"),
  JWT_ALG: getEnv("JWT_ALG"),
  API_URL: getEnv("NEXT_PUBLIC_API_URL")
}