# Client reviews setup

The review form is included in the existing Testimonials section. It stores new submissions as `pending`; only approved reviews are shown publicly.

## 1. Create the Supabase table

1. Open your Supabase project.
2. Open **SQL Editor** and create a new query.
3. Paste and run the SQL from `supabase/migrations/20261119000000_create_reviews.sql`.

The migration enables row-level security. Public visitors may submit pending reviews and read approved reviews only. They cannot approve, edit, or delete reviews through the public client.

## 2. Configure the frontend

Create a `.env` file in the project root (do not commit it) with:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Copy the Project URL and the publishable/anon key from **Supabase → Project Settings → API**. The browser key is expected to be public; row-level security is the access control. Never put a Supabase service-role/secret key in a Vite variable or browser code.

Add the same two variables to your hosting provider's production environment variables, then redeploy the site.

## 3. Approve submitted reviews

In **Supabase → Table Editor → reviews**, inspect pending submissions. Change `status` to `approved` to publish a review, or `rejected` to keep it hidden. Do not approve a review without checking that it is genuine and appropriate.

## 4. Verify

- Submit a test review from the website.
- Confirm its row is created with `status = pending`.
- Confirm it does not appear publicly while pending.
- Change its status to `approved` and refresh the website; it should appear in the testimonials list.

If Supabase environment variables are absent, the existing testimonials remain visible and the form displays a contact fallback rather than pretending a submission was saved.
