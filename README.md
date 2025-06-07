# Book Collection - Virtual Library

A modern book collection management system built with Next.js and Strapi. Browse, search, and manage books with features like comments, tags, and analytics.

## 🌐 Live Demo

Check out the live demo: **[https://virtual-library-rho.vercel.app/](https://virtual-library-rho.vercel.app/)**

> **Note:** This is a personal learning project. See [LICENSE](LICENSE) for terms and conditions.

## ✨ Features

- 📚 **Book Management** - Browse and search book collections
- 🏷️ **Tag System** - Organize books with customizable tags
- 💬 **Comments** - Leave reviews and comments on books
- 📊 **Analytics** - View statistics and reading trends
- 🔍 **Advanced Search** - Filter by title, author, tags, and more
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🌙 **Dark/Light Theme** - Toggle between themes
- ⌨️ **Keyboard Shortcuts** - Quick navigation with Kbar
- 🔐 **User Authentication** - Secure login and user profiles

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19 RC** - Latest React features
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling
- **@t3-oss/env-nextjs** - Environment variable validation
- **Zod** - Schema validation
- **React Query** - Data fetching and caching

### Backend

- **Strapi v4** - Headless CMS
- **SQLite/PostgreSQL** - Database options
- **REST API** - Data communication

## 📁 Project Structure

```
bc/
├── frontend/          # Next.js frontend application
├── backend/           # Strapi CMS backend
├── CONTRIBUTING.md    # Contribution guidelines
├── LICENSE            # MIT License
└── README.md          # This file
```

## 🚀 Local Development

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bc
   ```

2. **Setup Backend (Strapi)**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run develop
   ```

3. **Setup Frontend (Next.js)**

   ```bash
   cd frontend
   npm install --legacy-peer-deps
   cp .env.example .env.local
   # Edit .env.local with your Strapi URL
   npm run dev
   ```

4. **Access the applications**
   - Frontend: http://localhost:3000
   - Strapi Admin: http://localhost:1337/admin

## 🔧 Environment Variables

Environment variables are validated using `@t3-oss/env-nextjs` to ensure type safety and proper configuration.

### Frontend (.env.local)

```bash
# REQUIRED: Strapi backend URL (must be a valid URL)
NEXT_PUBLIC_STRAPI_URL="http://localhost:1337"

# OPTIONAL: Node environment (defaults to 'development')
NODE_ENV="development"

# OPTIONAL: Host for deployment
HOST="localhost"

# OPTIONAL: Skip environment validation during build (useful for Docker builds)
# SKIP_ENV_VALIDATION=true
```

### Backend (.env)

```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS="your-app-keys"
API_TOKEN_SALT="your-api-token-salt"
ADMIN_JWT_SECRET="your-admin-jwt-secret"
TRANSFER_TOKEN_SALT="your-transfer-token-salt"
JWT_SECRET="your-jwt-secret"
```

### Environment Validation

The frontend uses t3-env for runtime environment variable validation. If you add new environment variables:

1. Update `src/env.ts` with the new variable schema
2. Add the variable to the `runtimeEnv` object
3. Use the validated `env` object instead of `process.env` directly

Example:

```typescript
import { env } from "@/env";

// ✅ Good - validated and type-safe
const apiUrl = env.NEXT_PUBLIC_STRAPI_URL;

// ❌ Avoid - no validation or type safety
const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
```

## 💻 Development Scripts

### Frontend

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend

- `npm run develop` - Start in development mode
- `npm run start` - Start in production mode
- `npm run build` - Build admin panel
- `npm run strapi` - Access Strapi CLI

## 🔧 Known Considerations

- Uses React 19 RC - may require `--legacy-peer-deps` flag during installation
- Environment variables are validated at build time using t3-env
- Designed for learning and demonstration purposes
- Some features are experimental and may evolve

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for learning and experimentation**
