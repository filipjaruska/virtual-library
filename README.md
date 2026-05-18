# Virtual Library

This project is the practical part of a bachelor's thesis titled **"Leveraging a Content Management System (CMS) in conjunction with Next.js"** (_"Využití redakčního systému v kombinaci s Next.js"_), defended in May 2025 at the Czech University of Life Sciences Prague (CZU), Faculty of Economics and Management, under the supervision of doc. Ing. Jan Masner, Ph.D.

The full thesis text is available at [theses.cz/id/m5huc8](https://theses.cz/id/m5huc8/).

The application is a book collection manager. Users can browse a library of books, filter and sort them, leave comments, mark favourites, and view collection statistics. The point of the project was to demonstrate how a headless CMS (Strapi) can serve as a backend for a modern React frontend (Next.js) -- how the two communicate, what the development workflow looks like, and what trade-offs come with this architecture.

## Live demo

The frontend is deployed on Vercel: **[virtual-library-rho.vercel.app](https://virtual-library-rho.vercel.app/)**

The demo runs in **demo mode** by default -- it uses bundled mock data instead of calling a live Strapi instance, so you can explore the UI without any backend running. The Strapi backend was originally deployed on [Railway](https://railway.app/) with a PostgreSQL database.

## What the app does

- **Book catalogue** -- paginated grid of books with cover images, pulled from Strapi's REST API. Each book has a detail page (`/books/[slug]`) with description, external links, and tags.
- **Search and filtering** -- text search across titles/authors/descriptions, tag-based filtering, and sort by title or author (ascending/descending). All handled server-side through Strapi's query parameter API.
- **Comments** -- authenticated users can post comments on individual books. Comments are stored as a separate content type in Strapi and linked to books via a relation.
- **Favourites** -- logged-in users can mark books as favourites. The favourite list is tied to the user record in Strapi and displayed in the dashboard.
- **User dashboard** (`/dashboard`) -- shows the user's profile, their favourite books, and derived stats (number of favourites, unique authors, most common tag). There is also an account settings page at `/dashboard/account`.
- **Library statistics** (`/dashboard/information`) -- aggregate stats rendered with [Recharts](https://recharts.org/): total books, total comments, unique authors, a pie chart of tag distribution, and an area chart of monthly additions.
- **Authentication** -- sign up / sign in forms that talk to Strapi's built-in Users & Permissions plugin. JWT tokens are stored in cookies. A Next.js middleware redirects unauthenticated users away from `/dashboard` and `/books`.
- **Command bar** -- a [kbar](https://kbar.vercel.app/) command palette (Ctrl+K) for quick navigation between pages and theme switching.
- **Theming** -- light, dark, and OLED dark themes via [next-themes](https://github.com/pacocoursey/next-themes). Theme preference persists across sessions.

## Architecture

```
virtual-library/
  frontend/       Next.js 15 (App Router) + React 19 RC
  backend/        Strapi v4.25.6
```

The frontend and backend are separate Node.js applications in a single repository. They communicate exclusively through Strapi's REST API.

### Frontend

Built with Next.js 15 using the App Router. Key implementation details:

- **Data loading** -- all Strapi API calls go through `src/lib/loaders.ts`, which builds query strings with the [qs](https://github.com/ljharb/qs) library (Strapi's filtering/population/pagination syntax requires nested query parameters). Responses are flattened from Strapi's nested `{ data: { attributes: ... } }` format into plain objects via a `flattenAttributes` utility.
- **Caching** -- uses Next.js `fetch` with `next.revalidate` for ISR-style caching. Different endpoints use different TTLs (5 minutes for book listings, 1 hour for stats, 24 hours for global layout data).
- **Demo mode** -- a `DEMO_MODE` flag in `loaders.ts` short-circuits all API calls and returns data from static mock files in `src/lib/mock-data/`. This is what the Vercel deployment uses, so the app works without a running backend.
- **Environment validation** -- uses [@t3-oss/env-nextjs](https://env.t3.gg/) with Zod schemas to validate `NEXT_PUBLIC_STRAPI_URL` and other env vars at build time. Can be skipped with `SKIP_ENV_VALIDATION=true` for demo mode.
- **UI components** -- built with [Radix UI](https://www.radix-ui.com/) primitives (dialog, dropdown menu, tabs, accordion, tooltip, select, etc.) and styled with [Tailwind CSS](https://tailwindcss.com/). Component variants managed with [class-variance-authority](https://cva.style/docs).
- **Forms** -- [React Hook Form](https://react-hook-form.com/) with Zod resolvers for login, signup, comments, and profile editing.
- **Server actions** -- comment creation, favourite toggling, authentication, and profile updates are implemented as Next.js Server Actions in `src/lib/actions/`.

### Backend

Strapi v4 with the following content types (defined in `backend/src/api/`):

- **Book** -- title, author, description, slug, cover image (media), tags (relation to Tag), external links (component), comments (relation to Comment).
- **Comment** -- content text, linked to a Book and a User.
- **Home Page** -- single type with dynamic zones for hero section, features section, and Q&A section. This is how the landing page content is managed through the Strapi admin panel.
- **Global** -- single type for site-wide data: header logo/nav, footer content, social links, and SEO metadata (title, description).

The database config (`backend/config/database.js`) supports SQLite for local development and PostgreSQL for production. The production deployment on Railway used a PostgreSQL instance connected via `DATABASE_URL`.

## Running it locally

### Prerequisites

- Node.js 18 or newer
- npm

### Backend (Strapi)

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set the required secrets (`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`). You can generate random values with `openssl rand -base64 32`. For local development, the database defaults to SQLite, so you do not need to set `DATABASE_URL`.

```bash
npm run develop
```

Strapi admin panel will be at `http://localhost:1337/admin`. On first run it will ask you to create an admin account.

### Frontend (Next.js)

```bash
cd frontend
npm install --legacy-peer-deps
cp .env.example .env.local
```

The `--legacy-peer-deps` flag is needed because the project uses React 19 RC, and some dependencies have not updated their peer dependency ranges yet.

To connect to your local Strapi, edit `.env.local`:

```
SKIP_ENV_VALIDATION=false
NEXT_PUBLIC_STRAPI_URL="http://localhost:1337"
```

You also need to set `DEMO_MODE = false` in the following files (they default to `true`):

- `src/lib/loaders.ts`
- `src/lib/services/auth-service.ts`
- `src/lib/services/get-token.ts`
- `src/lib/services/get-user-me-loader.ts`
- `src/lib/actions/favorite-actions.ts`
- `src/lib/actions/create-comment.ts`

Then start the dev server:

```bash
npm run dev
```

The frontend will be at `http://localhost:3000`.

To run in **demo mode** without a backend, keep `SKIP_ENV_VALIDATION=true` and `DEMO_MODE = true` (the defaults). The app will serve mock data for all pages.

### Available scripts

| Directory  | Command              | Description                          |
|------------|----------------------|--------------------------------------|
| `frontend` | `npm run dev`        | Start Next.js dev server             |
| `frontend` | `npm run build`      | Production build                     |
| `frontend` | `npm run start`      | Start production server              |
| `frontend` | `npm run lint`       | Run ESLint                           |
| `backend`  | `npm run develop`    | Start Strapi in development mode     |
| `backend`  | `npm run start`      | Start Strapi in production mode      |
| `backend`  | `npm run build`      | Build the Strapi admin panel         |
| `backend`  | `npm run strapi`     | Access the Strapi CLI                |

## Key dependencies

| Package | Version | What it does in this project |
|---|---|---|
| [next](https://nextjs.org/) | 15.x | App Router, server components, server actions, middleware |
| [react](https://react.dev/) | 19.0.0-rc | Used the release candidate for `useFormStatus`, `useOptimistic`, and other React 19 APIs |
| [@strapi/strapi](https://strapi.io/) | 4.25.6 | Headless CMS, REST API, user auth, media uploads |
| [@tanstack/react-query](https://tanstack.com/query) | 5.x | Client-side data fetching and cache management |
| [kbar](https://kbar.vercel.app/) | 0.1.0-beta.45 | Command palette UI |
| [recharts](https://recharts.org/) | 2.x | Charts on the statistics page |
| [zod](https://zod.dev/) | 3.x | Schema validation for forms and environment variables |
| [motion](https://motion.dev/) | 11.x | Animations |

## Services used for deployment

- **[Vercel](https://vercel.com/)** -- frontend hosting. The free tier was sufficient. Vercel also provides the `@vercel/speed-insights` package integrated in the app.
- **[Railway](https://railway.app/)** -- backend (Strapi) hosting with a managed PostgreSQL database. The Strapi instance ran as a standard Node.js service.

## Notes

- The project uses React 19 RC. Some dependency installations will show peer dependency warnings -- this is expected and the reason for the `--legacy-peer-deps` flag.
- Environment variables are validated at build time when `SKIP_ENV_VALIDATION` is not set. If the build fails with a URL validation error, make sure `NEXT_PUBLIC_STRAPI_URL` includes the protocol (`https://`).
- The trailing slash on URLs can sometimes cause issues with Strapi API calls. The `.env.example` file notes this.

## License

MIT. See [LICENSE](LICENSE).
