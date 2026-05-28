import packageJson from "./package.json" with { type: "json"};

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_VERSION: packageJson.version,
    APP_NAME: "Mini-ERP"
  }
};

export default nextConfig;
