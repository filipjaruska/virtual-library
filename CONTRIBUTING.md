# Contributing

This project was built as the practical component of a bachelor's thesis and is not under active development. Contributions are not being accepted.

If you want to run it locally (for reference or to experiment), see the setup instructions in the [README](README.md).

## If you found a bug

You can open an issue, but there is no guarantee it will be addressed. The project served its purpose as a thesis deliverable and is archived in its current state.

## If you want to build something similar

The following resources are directly relevant to what this project uses:

- [Next.js App Router documentation](https://nextjs.org/docs/app) -- covers server components, server actions, middleware, and the file-based routing used throughout the frontend.
- [Strapi v4 REST API documentation](https://docs.strapi.io/dev-docs/api/rest) -- explains the filtering, sorting, pagination, and population query syntax that `loaders.ts` relies on.
- [Strapi v4 content type builder](https://docs.strapi.io/user-docs/content-type-builder) -- how to define the Book, Comment, and other content types in the admin panel.
- [Strapi Users & Permissions plugin](https://docs.strapi.io/dev-docs/plugins/users-permissions) -- the authentication system (JWT-based registration, login, and role management) used by the backend.
- [t3-env documentation](https://env.t3.gg/) -- the pattern used for environment variable validation with Zod schemas in `src/env.ts`.
- [Radix UI](https://www.radix-ui.com/) -- the unstyled, accessible component primitives used for dialogs, dropdowns, tabs, and other interactive elements.
- [kbar](https://kbar.vercel.app/) -- the command palette library. The implementation is in `src/components/custom-ui/command-bar.tsx`.
- [Railway deployment guide for Strapi](https://docs.strapi.io/dev-docs/deployment) -- relevant if you want to deploy your own Strapi instance with PostgreSQL.
