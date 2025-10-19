# Authentication Setup Guide

This document outlines the complete authentication implementation for Kyndly using NextAuth.js v5, following T3 Stack best practices.

## Overview

The authentication system is built with:
- **NextAuth.js v5 (beta)** - Modern authentication for Next.js
- **Google OAuth** - Social authentication provider
- **Prisma** - Database adapter for session management
- **Edge Middleware** - Fast route protection
- **SSR-First** - Server-side rendering for optimal performance

## Architecture

### 1. Auth Configuration
**Location:** `src/server/auth/config.ts`

- Google OAuth provider configured
- Prisma adapter for database sessions
- Custom session callbacks for user ID
- Database session strategy for security

### 2. Middleware Protection
**Location:** `middleware.ts`

Handles route protection at the edge:
- Redirects authenticated users from `/sign-up` to `/dashboard`
- Redirects unauthenticated users from protected routes to `/sign-up`
- Runs on edge runtime for maximum performance

### 3. Route Structure

```
Public Routes:
├── / (landing page)
└── /sign-up (authentication page)

Protected Routes (automatically redirected if not authenticated):
├── /dashboard (main user dashboard)
└── /projects (project management)
```

### 4. Session Management

**Server-side (SSR):**
```typescript
import { auth } from "@/server/auth";

const session = await auth();
if (session?.user) {
  // User is authenticated
}
```

**Client-side:**
```typescript
import { useSession } from "next-auth/react";

const { data: session } = useSession();
```

## Components

### SessionProvider
**Location:** `src/components/providers/session-provider.tsx`

Wraps the app to provide client-side session access throughout the application.

### Navbar
**Location:** `src/components/navbar.tsx`

Protected navigation bar with:
- Active route highlighting
- Navigation to Dashboard and Projects
- User dropdown menu

### UserNav
**Location:** `src/components/user-nav.tsx`

User dropdown menu with:
- User avatar (from Google profile)
- User name and email display
- Sign out functionality

## Pages

### Landing Page
**Location:** `src/app/page.tsx`

- Shows marketing content for unauthenticated users
- Automatically redirects authenticated users to `/dashboard`

### Sign Up Page
**Location:** `src/app/sign-up/page.tsx`

- Google OAuth sign-in button
- Redirects to `/dashboard` after successful authentication
- Automatically redirects authenticated users to `/dashboard`

### Dashboard
**Location:** `src/app/(protected)/dashboard/page.tsx`

Main authenticated view featuring:
- Welcome message with user's name
- Statistics cards (Projects, Reviews, Avg Rating)
- Recent projects overview
- Call-to-action for creating first project

### Projects Page
**Location:** `src/app/(protected)/projects/page.tsx`

Project management interface (ready for project CRUD implementation).

## Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Next Auth
AUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Setting up Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. For production, add: `https://yourdomain.com/api/auth/callback/google`

## Security Features

✅ **CSRF Protection** - Built into NextAuth.js  
✅ **HTTP-Only Cookies** - Session cookies not accessible via JavaScript  
✅ **Secure Session Storage** - Database-backed sessions  
✅ **Environment Validation** - Type-safe env vars with Zod  
✅ **Edge Runtime** - Fast middleware execution  
✅ **Type Safety** - Full TypeScript support

## Performance Optimizations

1. **Cached Auth Function** - `auth()` is wrapped with React cache
2. **Edge Middleware** - Route protection runs on edge for speed
3. **SSR Session** - Session passed from server to avoid client fetch
4. **Route Groups** - Optimized layouts with Next.js 13+ route groups
5. **Parallel Data Fetching** - tRPC queries run in parallel

## Error Handling

### Loading States
- Global loading UI for protected routes: `(protected)/loading.tsx`
- Auth page loading: `sign-up/loading.tsx`

### Error Boundaries
- Error UI for protected routes: `(protected)/error.tsx`
- Graceful error handling with retry functionality

## Usage Examples

### Protecting a tRPC Procedure

```typescript
export const protectedRouter = createTRPCRouter({
  getUserProjects: protectedProcedure
    .query(async ({ ctx }) => {
      // ctx.session.user is guaranteed to exist
      const userId = ctx.session.user.id;
      return ctx.db.project.findMany({
        where: { userId }
      });
    }),
});
```

### Sign Out from Client Component

```typescript
import { signOut } from "next-auth/react";

const handleSignOut = async () => {
  await signOut({ callbackUrl: "/" });
};
```

### Checking Auth in Server Component

```typescript
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/sign-up");
  }
  
  return <div>Protected content</div>;
}
```

## Next Steps

1. ✅ Basic auth flow implemented
2. ✅ Protected routes configured
3. ✅ Dashboard and projects pages created
4. 🔄 Implement project CRUD operations
5. 🔄 Add user profile management
6. 🔄 Implement review collection features
7. 🔄 Add email notifications (optional)

## Troubleshooting

### "Invalid session token" Error
- Clear cookies and try signing in again
- Ensure `AUTH_SECRET` is set in `.env`
- Check database connection

### Redirect Loop
- Check middleware configuration
- Ensure routes are correctly categorized as public/protected
- Verify auth callbacks are working

### Google OAuth Not Working
- Verify redirect URIs in Google Console
- Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Ensure Google+ API is enabled

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [T3 Stack Documentation](https://create.t3.gg/)
- [Prisma Adapter](https://authjs.dev/reference/adapter/prisma)

