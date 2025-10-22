# Quick Start - Review Collection Form

## Prerequisites Checklist

Before using the new review collection forms:

### ✅ Database Migration

**CRITICAL**: You must run the database migration first!

\`\`\`bash
# 1. Start your PostgreSQL database
./start-database.sh

# 2. Run the migration
pnpm prisma migrate dev --name add_review_app_junction_and_form_config

# 3. Verify migration success
pnpm prisma studio  # Optional: View database in browser
\`\`\`

**What the migration adds:**
- `ReviewApp` table for linking reviews to apps
- `slug`, `isFormPublic`, `formConfig` columns to `apps` table
- `customData` column to `reviews` table

---

## Usage Guide

### Step 1: Configure Your First Review Form (2 minutes)

1. Start the dev server:
   \`\`\`bash
   pnpm dev
   \`\`\`

2. Navigate to **Dashboard → Apps**

3. Click **"Review Form"** button on any app

4. In the dialog:
   - Set a **URL slug** (e.g., "my-awesome-app")
   - Toggle **"Accept Public Reviews"** to ON
   - Click **copy icon** to copy the form URL
   - Click **"Save Settings"**

### Step 2: Test the Public Form (1 minute)

1. Open an **incognito/private browser window**

2. Paste the copied URL (e.g., `http://localhost:3000/my-awesome-app`)

3. Fill out the review form:
   - Your Name: "Test User"
   - Rating: Click 5 stars
   - Review: "This is a test review!"

4. Click **"Submit Review"**

5. You should see a success message ✅

### Step 3: Approve the Review (1 minute)

1. Go back to **Dashboard → Reviews**

2. You'll see the new review (marked as **Unpublished**)

3. Click the **toggle switch** to publish it

4. *(Optional)* Click **"Link Apps"** to link it to multiple apps

---

## Common Tasks

### Share Your Review Form

1. Go to **Dashboard → Apps**
2. Click **"Review Form"** on the app
3. Click the **copy icon** next to the URL
4. Share this URL with customers via:
   - Email campaigns
   - Website footer
   - Thank you pages
   - Social media
   - QR codes

### Link Existing Reviews to Apps

1. Go to **Dashboard → Reviews**
2. Find the review you want to link
3. Click **"Link Apps"**
4. Select which apps should show this review
5. Click **"Save Links"**

### Make a Review Appear in Multiple Apps

Reviews can be displayed across multiple apps:

1. Go to **Dashboard → Reviews**
2. Click **"Link Apps"** on any review
3. Check multiple apps
4. Click **"Save Links"**

Now that review will show in all selected apps!

### Disable Public Form Temporarily

1. Go to **Dashboard → Apps**
2. Click **"Review Form"**
3. Toggle **"Accept Public Reviews"** to OFF
4. Click **"Save Settings"**

The form will show "Form Not Available" message.

---

## Testing Checklist

Run through these tests to verify everything works:

- [ ] Migration completed successfully
- [ ] Can access Apps page
- [ ] Can open "Review Form" settings
- [ ] Can set and save a slug
- [ ] Can toggle form public/private
- [ ] Can copy form URL
- [ ] Public form loads at `/{slug}` route
- [ ] Can submit a review as a customer
- [ ] Review appears in Dashboard → Reviews
- [ ] Review is unpublished by default
- [ ] Can publish review
- [ ] Can link review to apps
- [ ] Can unlink review from apps

---

## Troubleshooting

### "Cannot find module" errors
→ Run `pnpm install` to install dependencies

### Database connection errors
→ Run `./start-database.sh` to start PostgreSQL

### "Property does not exist" TypeScript errors
→ Run `pnpm prisma generate` to regenerate Prisma client

### Slug already taken
→ Choose a different slug or add numbers (e.g., "my-app-2")

### Form shows "Not Available"
→ Toggle "Accept Public Reviews" to ON in form settings

### Review not appearing
→ Check if it's published (toggle in Reviews page)

---

## What's Next?

Now that the basic system is working, you can:

1. **Customize Forms** (future):
   - Add custom fields
   - Create multi-step forms
   - Customize colors and branding

2. **Enhance Reviews**:
   - Add email notifications
   - Set up automated approval rules
   - Create review widgets for your apps

3. **Analyze Performance**:
   - Track review submissions by app
   - Monitor conversion rates
   - Export data for analysis

See `IMPLEMENTATION_GUIDE.md` for advanced features and customization options.

---

## Support Files

📘 **Quick Reference**: This file  
📗 **Full Guide**: `IMPLEMENTATION_GUIDE.md`  
📙 **Summary**: `REVIEW_FORM_SUMMARY.md`  
🗂️ **Database Schema**: `prisma/schema.prisma`

---

**Need Help?** Review the implementation files or check the guide documents above.

Happy collecting reviews! 🌟

