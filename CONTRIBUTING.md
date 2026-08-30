# Contributing

This project was built as the practical component of a bachelor's thesis and is not under active development. Contributions are not being accepted.

If you want to run it locally, see the setup instructions in the [README](README.md).

## If you found a bug

You can open an issue, but there is no guarantee it will be addressed. The project served its purpose as a thesis deliverable and is kept in a working, archived state.

## If you want to build something similar

These are the resources most directly relevant to what this project does:

- [Next.js App Router](https://nextjs.org/docs/app) — server components, static generation via `generateStaticParams`, and the file-based routing used throughout `frontend/src/app`.
- [Zustand persist middleware](https://zustand.docs.pmnd.rs/integrations/persisting-store-data) — how the shelf survives a reload, and why `skipHydration` matters when the server renders first. See `src/stores/library-store.ts` and `src/hooks/use-hydrated.ts`.
- [Strapi v4 REST API](https://docs.strapi.io/dev-docs/api/rest) — the filtering, sorting, pagination and population query syntax that the Strapi adapter in `src/lib/content/strapi.ts` builds with `qs`.
- [Strapi v4 content type builder](https://docs.strapi.io/user-docs/content-type-builder) — how the Book, Comment, Home Page and Global types in `backend/src/api/` are defined.
- [t3-env](https://env.t3.gg/) — the Zod-based environment validation in `src/env.ts`.
- [Radix UI](https://www.radix-ui.com/) — the unstyled, accessible primitives behind the dropdowns, tabs, select and accordion.
- [Recharts](https://recharts.org/) — the statistics charts in `src/components/custom-ui/`.
- [kbar](https://kbar.vercel.app/) — the command palette, implemented in `src/components/custom-ui/command-bar.tsx`.
- [Strapi deployment guide](https://docs.strapi.io/dev-docs/deployment) — if you want to host your own Strapi instance with PostgreSQL.
