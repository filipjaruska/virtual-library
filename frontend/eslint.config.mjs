import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // The Strapi adapter deals in untyped JSON before it maps responses onto
      // the domain types, so `any` is load-bearing there.
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default config;
