# Review Collection Form - Implementation Guide

## Overview

This implementation adds a complete end-to-end review collection system with public forms and app-specific review management.

## Key Features Implemented

### 1. **Database Schema Updates**
- Added `ReviewApp` junction table for many-to-many relationship between reviews and apps
- Added `slug`, `isFormPublic`, and `formConfig` fields to `App` model
- Added `customData` field to `Review` model for storing custom field responses

### 2. **Public Review Form**
- Route: `/{app-slug}` (e.g., `/my-awesome-app`)
- Beautiful, modern UI with gradient background
- Star rating system with hover effects
- Real-time validation and character counter
- Success message after submission
- Mobile-responsive design
- SSR-optimized for performance

### 3. **App Form Settings**
- Dedicated dialog for configuring review forms
- Toggle to enable/disable public submissions
- Customizable URL slug
- Copy-to-clipboard functionality for form URL
- Direct link to open form in new tab
- Form preview before going live

### 4. **Review-App Linking**
- Many-to-many relationship support
- One review can be linked to multiple apps
- Reviews can be project-wide (not linked to specific apps)
- UI to manage app linkages from review management page
- Visual feedback showing selected apps

### 5. **tRPC API Endpoints**

#### App Router (`/src/server/api/routers/app.ts`)
- `getBySlug` - Public endpoint to fetch app by slug
- `updateFormConfig` - Update form public status and configuration
- `updateSlug` - Update app URL slug with uniqueness validation
- Auto-slug generation on app creation

#### Review Router (`/src/server/api/routers/review.ts`)
- `submitPublic` - Public endpoint for customer review submissions
- `linkToApps` - Link existing reviews to multiple apps
- `getByApp` - Get all reviews for a specific app
- `getLinkedApps` - Get all apps linked to a review

## How It Works

### Customer Journey
1. Customer visits `https://yourdomain.com/{app-slug}`
2. Fills out the review form (name, rating, review text)
3. Submits the review
4. Review is created and linked to the app
5. Review requires approval (unpublished by default)

### App Owner Journey
1. Create an app in the dashboard
2. Open "Review Form" settings
3. Configure the URL slug
4. Toggle "Accept Public Reviews" on
5. Copy and share the form URL
6. Receive reviews for approval
7. Manually link reviews to multiple apps if needed

## Files Changed/Created

### New Files
- `/src/app/[slug]/page.tsx` - Public review form page
- `/src/app/[slug]/_components/review-form.tsx` - Review form component
- `/src/components/app-form-settings-dialog.tsx` - Form settings dialog
- `/src/components/link-review-to-apps-dialog.tsx` - App linking dialog

### Modified Files
- `/prisma/schema.prisma` - Database schema updates
- `/src/server/api/routers/app.ts` - App router enhancements
- `/src/server/api/routers/review.ts` - Review router enhancements
- `/src/server/api/routers/user.ts` - User router updates
- `/src/app/dashboard/apps/page.tsx` - Added form settings button
- `/src/app/dashboard/reviews/page.tsx` - Added link apps button

## Running the Migration

**IMPORTANT**: Before running the app, you need to apply the database migration:

\`\`\`bash
# Start your PostgreSQL database
./start-database.sh

# Run the migration
pnpm prisma migrate dev --name add_review_app_junction_and_form_config

# Generate Prisma client (already done)
pnpm prisma generate
\`\`\`

## Post-Migration Steps

### For Existing Apps
If you have existing apps without slugs, you'll need to:

1. Go to the Apps page in your dashboard
2. Click "Review Form" for each app
3. Set a unique slug for each app
4. Toggle "Accept Public Reviews" on

### For Existing Reviews
Existing reviews will remain at the project level (not linked to specific apps) until you:

1. Go to the Reviews page
2. Click "Link Apps" for each review
3. Select which apps should show this review

## Future Enhancements (Scope for Expansion)

### Custom Fields
- Builder UI for adding custom fields to forms
- Field types: text, email, phone, select, checkbox
- Conditional field visibility
- Required/optional field configuration

### Multi-Step Forms
- Step-by-step form wizard
- Progress indicator
- Save and resume later
- Different questions per step

### Form Customization
- Custom colors and branding
- Logo upload
- Custom CSS injection
- Form templates
- Success message customization
- Redirect after submission

### Advanced Features
- Email notifications for new reviews
- Rate limiting and spam protection
- CAPTCHA integration
- Review analytics per app
- Export reviews by app
- Bulk app linking
- Review moderation workflow
- Automated approval rules

## Security & Performance

### Security
- Public endpoints validate app exists and is public
- Reviews require approval before publishing
- Ownership verification on all protected endpoints
- SQL injection protection via Prisma
- XSS protection via React

### Performance
- Server-Side Rendering (SSR) for public form
- Efficient database queries with Prisma
- Optimized joins for review-app relationships
- Lazy loading of linked apps
- Client-side form validation

## Testing the Implementation

1. **Create an App**
   - Go to Dashboard > Apps
   - Click "Create New App"
   - Fill in app details

2. **Configure Review Form**
   - Click "Review Form" button
   - Set a slug (e.g., "my-app")
   - Enable public submissions
   - Copy the form URL

3. **Submit a Review**
   - Open the form URL in incognito/private window
   - Fill out the form
   - Submit

4. **Manage the Review**
   - Go to Dashboard > Reviews
   - See the new review (unpublished)
   - Click "Link Apps" to link to multiple apps
   - Toggle published to make it visible

## Troubleshooting

### Slug Already Taken
- Try a different slug or add numbers/hyphens

### Form Not Accessible
- Ensure "Accept Public Reviews" is toggled ON
- Check that the slug is set correctly

### Reviews Not Appearing
- Check if reviews are published
- Verify app linkage if filtering by app

### Migration Errors
- Ensure database is running
- Drop and recreate database if needed (dev only)
- Check DATABASE_URL in .env

## API Usage Examples

### Fetch App by Slug (Public)
\`\`\`typescript
const app = await api.app.getBySlug({ slug: "my-app" });
\`\`\`

### Submit Review (Public)
\`\`\`typescript
await api.review.submitPublic({
  appId: "...",
  authorName: "John Doe",
  rating: 5,
  text: "Great product!",
});
\`\`\`

### Link Review to Apps (Protected)
\`\`\`typescript
await api.review.linkToApps({
  reviewId: "...",
  appIds: ["app-id-1", "app-id-2"],
});
\`\`\`

## Database Diagram

\`\`\`
Project
  ├── id
  ├── userId
  └── projectName
      │
      ├─── App (1:M)
      │    ├── id
      │    ├── slug (unique)
      │    ├── isFormPublic
      │    ├── formConfig (JSON)
      │    └── projectId
      │
      └─── Review (1:M)
           ├── id
           ├── authorName
           ├── rating
           ├── text
           ├── customData (JSON)
           └── projectId

ReviewApp (M:M Junction)
  ├── id
  ├── reviewId → Review.id
  ├── appId → App.id
  └── unique(reviewId, appId)
\`\`\`

## Support

For issues or questions:
1. Check this guide
2. Review the implementation files
3. Check Prisma schema for data structure
4. Inspect tRPC routers for API logic

