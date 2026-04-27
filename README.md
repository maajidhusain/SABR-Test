# SABR Platform

Private community platform for the Chicagoland Shia community, built with Next.js and Supabase.

## Stack

- Next.js App Router
- Supabase Auth + Postgres + Row Level Security
- Vercel-ready frontend deployment

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Add your Supabase project values.
3. Install dependencies with `npm install`.
4. Run `npm run dev`.

If Supabase environment variables are missing, the app falls back to a demo mode so the product flows can still be explored locally.

## Database setup

Run the SQL in [supabase/schema.sql](supabase/schema.sql) against your Supabase project. It creates:

- metro-aware profile tables
- access request workflow
- section content
- role and approval policies

Create a Supabase storage bucket named `request-files` before testing the full join form, since resume and headshot uploads are stored there.

## Docs

- [Network graph — how nodes and scoring work](docs/network-graph.md)

## Estimated cost

- Supabase Pro: about `$25/month`
- Hosting: typically `$0-$20/month` at this stage
- Expected Phase 1 run rate: about `~$25-$45/month`
