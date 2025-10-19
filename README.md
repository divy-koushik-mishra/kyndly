# Kyndly

**Turn kind words into growth.**

A modern review management platform built with the [T3 Stack](https://create.t3.gg/).

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) with App Router
- **Authentication:** [NextAuth.js v5](https://next-auth.js.org) with Google OAuth
- **Database:** [Prisma](https://prisma.io) + PostgreSQL
- **Styling:** [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **API:** [tRPC](https://trpc.io)
- **Type Safety:** TypeScript with Zod validation

## Features

✅ **Complete Authentication System**
- Google OAuth integration
- Protected routes with middleware
- Server-side and client-side session management
- Automatic redirects and route protection

✅ **Modern UI/UX**
- Dark theme with beautiful gradients
- Responsive design
- Loading states and error boundaries
- Smooth navigation with active states

✅ **Performance Optimized**
- SSR-first approach
- Edge middleware for fast auth checks
- Cached auth function
- Parallel data fetching with tRPC

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Google OAuth credentials

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd kyndly
pnpm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Next Auth (generate with: openssl rand -base64 32)
AUTH_SECRET="your-secret-key-here"

# Google OAuth (get from: https://console.cloud.google.com/)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

NODE_ENV="development"
```

### 3. Database Setup

```bash
# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm db:migrate

# (Optional) Open Prisma Studio
pnpm db:studio
```

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Project Structure

```
kyndly/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   └── images/                # Static assets
├── src/
│   ├── app/
│   │   ├── (protected)/       # Protected routes (require auth)
│   │   │   ├── dashboard/     # Main dashboard
│   │   │   └── projects/      # Project management
│   │   ├── sign-up/           # Authentication page
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── navbar.tsx         # Main navigation
│   │   ├── user-nav.tsx       # User dropdown menu
│   │   ├── providers/         # React providers
│   │   └── ui/                # Reusable UI components
│   ├── server/
│   │   ├── auth/              # Auth configuration
│   │   ├── api/               # tRPC routers
│   │   └── db.ts              # Prisma client
│   └── lib/
│       └── utils.ts           # Utility functions
└── middleware.ts              # Route protection
```

## Authentication Flow

1. **Unauthenticated User:**
   - Visits landing page (`/`)
   - Clicks "Get Started" → redirected to `/sign-up`
   - Signs in with Google
   - Redirected to `/dashboard`

2. **Authenticated User:**
   - Visits landing page → auto-redirected to `/dashboard`
   - Can navigate between protected routes
   - Can sign out from user dropdown

3. **Route Protection:**
   - Edge middleware checks auth status
   - Protected routes require authentication
   - Automatic redirects to appropriate pages

For detailed authentication documentation, see [AUTH_SETUP.md](./AUTH_SETUP.md).

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server with Turbo
pnpm build            # Build for production
pnpm start            # Start production server
pnpm preview          # Build and start production

# Database
pnpm db:generate      # Generate Prisma client & run migrations
pnpm db:migrate       # Deploy migrations
pnpm db:push          # Push schema without migrations
pnpm db:studio        # Open Prisma Studio

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors
pnpm format:check     # Check Prettier formatting
pnpm format:write     # Fix Prettier formatting
pnpm typecheck        # Run TypeScript compiler
pnpm check            # Run lint + typecheck
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

See [Vercel deployment guide](https://create.t3.gg/en/deployment/vercel) for details.

### Other Platforms

- [Netlify](https://create.t3.gg/en/deployment/netlify)
- [Docker](https://create.t3.gg/en/deployment/docker)

## Learn More

- [T3 Stack Documentation](https://create.t3.gg/)
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [tRPC Documentation](https://trpc.io/docs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
