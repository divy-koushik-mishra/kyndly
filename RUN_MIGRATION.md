# Database Migration Instructions

## ⚠️ IMPORTANT: Run This Before Using the New Features

The review collection form requires database schema changes. Follow these steps carefully.

## Prerequisites

- PostgreSQL must be running
- You have access to the terminal/command line
- You're in the project root directory

## Step-by-Step Migration

### 1. Start PostgreSQL Database

```bash
# If using the provided script
./start-database.sh

# Or if you have PostgreSQL running elsewhere, just ensure it's accessible
# Check your DATABASE_URL in .env points to the correct database
```

**Verify it's running:**
```bash
# This should connect without errors
pnpm prisma db pull
```

### 2. Run the Migration

```bash
# This will create and apply the migration
pnpm prisma migrate dev --name add_review_app_junction_and_form_config
```

**What this does:**
1. Creates a new migration file in `prisma/migrations/`
2. Adds new tables and columns to your database
3. Preserves all existing data
4. Updates the Prisma client

**Expected output:**
```
✔ Generated Prisma Client
✔ Migration applied successfully
```

### 3. Verify Migration Success

```bash
# Open Prisma Studio to inspect the database
pnpm prisma studio
```

Check that these exist:
- ✅ `apps` table has `slug`, `is_form_public`, `form_config` columns
- ✅ `reviews` table has `custom_data` column  
- ✅ `review_apps` table exists (new junction table)

### 4. Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000/dashboard/apps` and verify:
- ✅ "Review Form" button appears on app cards
- ✅ No TypeScript/linting errors
- ✅ Can open the form settings dialog

## What Gets Changed

### New Table: `review_apps`
```sql
CREATE TABLE "review_apps" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "review_id" TEXT NOT NULL,
  "app_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE,
  FOREIGN KEY ("app_id") REFERENCES "apps"("id") ON DELETE CASCADE
);

CREATE UNIQUE INDEX ON "review_apps"("review_id", "app_id");
```

### Updated Table: `apps`
```sql
ALTER TABLE "apps" 
  ADD COLUMN "slug" TEXT UNIQUE,
  ADD COLUMN "is_form_public" BOOLEAN DEFAULT true,
  ADD COLUMN "form_config" JSONB;
```

### Updated Table: `reviews`
```sql
ALTER TABLE "reviews" 
  ADD COLUMN "custom_data" JSONB;
```

## Handling Existing Data

### Existing Apps
- Will have `slug = NULL` initially
- Will have `is_form_public = true` by default
- You'll need to set slugs manually via the UI

**To fix existing apps:**
1. Go to Dashboard → Apps
2. For each app, click "Review Form"
3. Set a unique slug
4. Save

### Existing Reviews
- Will have `custom_data = NULL`
- Will NOT be linked to any apps initially (project-wide)
- Can be linked to apps manually via "Link Apps" button

## Troubleshooting

### Error: "Can't reach database server"
```bash
# Solution: Start the database
./start-database.sh

# Or check DATABASE_URL in .env
cat .env | grep DATABASE_URL
```

### Error: "Migration failed to apply"
```bash
# Solution: Reset database (⚠️ DEV ONLY - loses data!)
pnpm prisma migrate reset

# Then run migration again
pnpm prisma migrate dev
```

### Error: "Column already exists"
```bash
# This means migration already ran successfully
# Just regenerate the client:
pnpm prisma generate
```

### TypeScript Errors After Migration
```bash
# Regenerate Prisma client
pnpm prisma generate

# Restart TypeScript server in VS Code
# Press: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Linting Errors in Router Files
These will disappear after running:
```bash
pnpm prisma generate
```

The errors occur because TypeScript doesn't know about the new schema fields until the Prisma client is regenerated.

## Rollback (Emergency Only)

If something goes wrong and you need to undo:

```bash
# ⚠️ WARNING: This will delete ALL data in the database!
# Only use in development!

# Reset to before migration
pnpm prisma migrate reset

# Then restore from backup if you have one
```

**Better approach:** Fix forward instead of rolling back
- Existing data is preserved
- New columns are nullable/have defaults
- No breaking changes to existing functionality

## Post-Migration Checklist

After running the migration, verify:

- [ ] Migration completed without errors
- [ ] `pnpm dev` starts successfully
- [ ] No TypeScript errors in terminal
- [ ] Can access `/dashboard/apps`
- [ ] "Review Form" button appears
- [ ] Can open form settings dialog
- [ ] Can set a slug and save
- [ ] Can visit `/{slug}` route
- [ ] Public form loads correctly
- [ ] Can submit a test review
- [ ] Review appears in dashboard
- [ ] Can link review to apps

## Production Deployment

When deploying to production:

```bash
# Don't use 'migrate dev' in production!
# Use 'migrate deploy' instead:
pnpm prisma migrate deploy
```

This applies pending migrations without prompting or running seeds.

## Need Help?

1. Check error message carefully
2. Verify database is running
3. Check DATABASE_URL in .env
4. Try regenerating Prisma client
5. Review this file and QUICK_START.md

---

**Status After Migration:**
- ✅ Database schema updated
- ✅ Review collection forms ready
- ✅ App-Review linking enabled
- ✅ Ready to collect public reviews

**Next Step:** See `QUICK_START.md` for usage instructions

