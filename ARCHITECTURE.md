# Review Collection System - Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         KYNDLY PLATFORM                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐              ┌──────────────────┐         │
│  │  App Owner       │              │   Customer       │         │
│  │  (Authenticated) │              │ (Public/No Auth) │         │
│  └────────┬─────────┘              └─────────┬────────┘         │
│           │                                   │                  │
│           ▼                                   ▼                  │
│  ┌─────────────────┐              ┌─────────────────┐          │
│  │   Dashboard      │              │  Public Form    │          │
│  │   /dashboard/*   │              │   /{app-slug}   │          │
│  └────────┬─────────┘              └─────────┬───────┘          │
│           │                                   │                  │
│           │                                   │                  │
│  ┌────────▼──────────────────────────────────▼────────┐         │
│  │              tRPC API Layer                        │         │
│  │  - app.getBySlug (public)                          │         │
│  │  - review.submitPublic (public)                    │         │
│  │  - app.updateFormConfig (protected)                │         │
│  │  - review.linkToApps (protected)                   │         │
│  └────────────────────┬───────────────────────────────┘         │
│                       │                                          │
│                       ▼                                          │
│  ┌─────────────────────────────────────────────────┐            │
│  │           Prisma ORM                            │            │
│  └────────────────────┬────────────────────────────┘            │
│                       │                                          │
│                       ▼                                          │
│  ┌─────────────────────────────────────────────────┐            │
│  │         PostgreSQL Database                     │            │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐     │            │
│  │  │ Project  │  │   App    │  │  Review  │     │            │
│  │  └─────┬────┘  └────┬─────┘  └────┬─────┘     │            │
│  │        │            │              │            │            │
│  │        └────────────┼──────────────┘            │            │
│  │                     │                           │            │
│  │              ┌──────▼──────┐                    │            │
│  │              │ ReviewApp   │                    │            │
│  │              │ (Junction)  │                    │            │
│  │              └─────────────┘                    │            │
│  └──────────────────────────────────────────────────┘            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Customer Submits Review

```
Customer Browser
      │
      │ 1. Visit /{app-slug}
      ▼
┌─────────────────┐
│ Public Form     │ SSR - Server renders page with app data
│ /[slug]/page    │
└────────┬────────┘
         │ 2. Fill form & submit
         ▼
┌─────────────────┐
│ ReviewForm      │ Client-side component with React hooks
│ Component       │
└────────┬────────┘
         │ 3. api.review.submitPublic()
         ▼
┌─────────────────────────┐
│ tRPC Review Router      │
│ submitPublic()          │
├─────────────────────────┤
│ 1. Verify app exists    │
│ 2. Check isFormPublic   │
│ 3. Create review        │
│ 4. Link to app (junction)│
└────────┬────────────────┘
         │ 4. Save to database
         ▼
┌─────────────────────────┐
│ PostgreSQL              │
│ - Review created        │
│ - ReviewApp created     │
└─────────────────────────┘
```

### 2. App Owner Manages Reviews

```
App Owner Browser
      │
      │ 1. View Dashboard → Reviews
      ▼
┌─────────────────┐
│ Reviews Page    │ SSR - Fetches reviews server-side
│                 │
└────────┬────────┘
         │ 2. Click "Link Apps"
         ▼
┌─────────────────┐
│ LinkReviewTo    │ Client component with state management
│ AppsDialog      │
└────────┬────────┘
         │ 3. Select apps & save
         ▼
┌─────────────────────────┐
│ tRPC Review Router      │
│ linkToApps()            │
├─────────────────────────┤
│ 1. Verify ownership     │
│ 2. Delete old links     │
│ 3. Create new links     │
└────────┬────────────────┘
         │ 4. Update junction table
         ▼
┌─────────────────────────┐
│ PostgreSQL              │
│ - ReviewApp updated     │
└─────────────────────────┘
```

## Database Relationships

```
┌──────────────────┐
│     User         │
└────────┬─────────┘
         │ 1:M
         ▼
┌──────────────────┐
│    Project       │
└────────┬─────────┘
         │
         ├─────────────┐
         │ 1:M         │ 1:M
         ▼             ▼
┌──────────────┐  ┌──────────────┐
│     App      │  │   Review     │
│ ──────────── │  │ ──────────── │
│ slug         │  │ authorName   │
│ isFormPublic │  │ rating       │
│ formConfig   │  │ text         │
│              │  │ customData   │
└──────┬───────┘  └──────┬───────┘
       │                 │
       │    M:M via      │
       │ ┌─────────────┐ │
       └─│  ReviewApp  │─┘
         │ ──────────  │
         │ reviewId    │
         │ appId       │
         └─────────────┘
```

## Component Hierarchy

```
/dashboard/apps/page.tsx (SSR)
├── <Navbar />
└── <DashboardLayout>
    └── App Cards
        ├── <AppSettingsDialog /> ─── Edit app details
        └── <AppFormSettingsDialog /> ─── Configure review form
                                           │
                                           ├── Toggle public/private
                                           ├── Edit slug
                                           └── Copy form URL

/dashboard/reviews/page.tsx (SSR)
├── <Navbar />
└── <DashboardLayout>
    └── Review Cards
        ├── <TogglePublishedSwitch /> ─── Publish/Unpublish
        ├── <LinkReviewToAppsDialog /> ─── Link to apps
        ├── <EditReviewDialog /> ─────── Edit review
        └── <DeleteReviewDialog /> ───── Delete review

/[slug]/page.tsx (SSR - Public)
└── App Branding Header
    └── <ReviewForm /> ─── Client-side form
         ├── Name input
         ├── Star rating
         ├── Review textarea
         └── Submit button
```

## API Architecture

### tRPC Routers

```
src/server/api/
├── root.ts ─────────── Combines all routers
└── routers/
    ├── app.ts ────────── App management
    │   ├── create (protected)
    │   ├── update (protected)
    │   ├── delete (protected)
    │   ├── getById (protected)
    │   ├── getBySlug (PUBLIC) ──────┐
    │   ├── updateFormConfig (protected)
    │   └── updateSlug (protected)   │
    │                                 │
    ├── review.ts ──── Review management
    │   ├── create (protected)       │
    │   ├── update (protected)       │
    │   ├── delete (protected)       │
    │   ├── getByProject (protected) │
    │   ├── getByApp (protected)     │
    │   ├── getLinkedApps (protected)
    │   ├── submitPublic (PUBLIC) ◄──┘
    │   ├── linkToApps (protected)
    │   └── togglePublished (protected)
    │
    └── user.ts ────── User/Project management
        ├── getUserStatus (protected)
        ├── onboardUser (protected)
        ├── getUserProject (protected)
        └── getProjectApps (protected)
```

## Security Model

### Public Endpoints (No Authentication)
- ✅ `app.getBySlug` - Read-only app data
- ✅ `review.submitPublic` - Create review only
  - ⚠️ Rate limiting recommended
  - ⚠️ CAPTCHA recommended for production

### Protected Endpoints (Require Authentication)
All other endpoints require:
1. Valid session (NextAuth)
2. User ownership verification
3. Project/App/Review ownership checks

### Ownership Verification Flow

```
Request → Session Check → Owner Check → Action
   │           │              │            │
   │           ▼              ▼            ▼
   │      Auth Required   Verify User   Execute
   │           │          Owns Resource  Query
   │           ▼              │            │
   │       Session ID    ─────┘            │
   └──────────────────────────────────────┘
                     Success
```

## Performance Optimizations

### Server-Side Rendering (SSR)
- `/[slug]/page.tsx` - Pre-rendered with app data
- `/dashboard/*` - Pre-rendered with user data
- Fast First Contentful Paint (FCP)
- SEO-friendly

### Database Queries
```typescript
// Efficient joins with Prisma
await db.reviewApp.findMany({
  where: { appId },
  include: {
    review: true  // Single join, not N+1
  }
})
```

### Client-Side
- React hooks for state management
- Optimistic UI updates
- tRPC automatic caching
- Lazy loading of dialogs

## Scalability Considerations

### Current Capacity
- ✅ Handles thousands of apps per project
- ✅ Handles thousands of reviews per app
- ✅ M:M junction table for flexible linking
- ✅ Indexed slugs for fast lookups

### Future Scaling
- 🔄 Add database indexes on frequently queried fields
- 🔄 Implement Redis caching for public forms
- 🔄 CDN for static form assets
- 🔄 Rate limiting on public endpoints
- 🔄 Background jobs for email notifications

## Extension Points

The architecture is designed for easy extension:

### 1. Custom Fields
```typescript
// formConfig JSON structure
{
  customFields: [
    { type: "email", label: "Email", required: true },
    { type: "phone", label: "Phone", required: false }
  ]
}
```

### 2. Multi-Step Forms
```typescript
// formConfig JSON structure
{
  formType: "multi-step",
  steps: [
    { name: "Basic Info", fields: [...] },
    { name: "Details", fields: [...] }
  ]
}
```

### 3. Styling
```typescript
// formConfig JSON structure
{
  appearance: {
    primaryColor: "#6366f1",
    backgroundColor: "#000000",
    customCss: "..."
  }
}
```

All these use the existing `formConfig` JSON column - no schema changes needed!

---

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API**: tRPC
- **Auth**: NextAuth.js v5
- **UI**: Tailwind CSS + shadcn/ui
- **State**: React Hooks
- **Rendering**: SSR + Client Components

---

**This architecture supports:**
- ✅ High performance
- ✅ Type safety end-to-end
- ✅ Easy maintenance
- ✅ Future extensibility
- ✅ Security best practices

