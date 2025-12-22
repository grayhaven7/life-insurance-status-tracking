# Life Insurance Status Tracking Portal

A client portal for Emerald Tide Financial to track Tax-Free Pension application status through 17 stages, with email notifications on status changes.

## Features

- **Client Portal**: Clients can log in to view their application progress
- **Visual Progress Bar**: 17-stage progress tracking from application to completion
- **Admin Panel**: Team can view all clients and update their status
- **Email Notifications**: Automatic emails sent when status changes
- **Secure Authentication**: Separate login flows for clients and administrators

## Tech Stack

- **Framework**: Next.js 14 with App Router + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Email**: Resend
- **SMS**: Twilio
- **Styling**: Tailwind CSS
- **Hosting**: Vercel (recommended)

## Application Stages

1. Submitted
2. Part 2 Sent
3. Part 2 Completed
4. Medical Exam Booked
5. Medical Exam Completed
6. Records Ordered
7. Records Received
8. Procedure / Report Outstanding
9. Procedure / Report Completed
10. News To Deliver To Client
11. Zoom Call Scheduled (Review)
12. Zoom Call Completed (Review)
13. Paperwork Delivered
14. Zoom Call Scheduled (Signing)
15. Zoom Call Completed (Signing)
16. Paperwork Signed
17. Tax-Free Pension In Force

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Resend account (for emails)
- Twilio account (optional, for SMS)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Database - Use your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/life_insurance_portal"

# NextAuth - Generate a secret with: openssl rand -base64 32
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Resend - Get your API key from https://resend.com
RESEND_API_KEY="re_xxxxxxxxxx"

# Twilio (SMS) - optional
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
# Choose ONE:
TWILIO_FROM_NUMBER="+15551234567"
# (Back-compat: older env name)
# TWILIO_PHONE_NUMBER="+15551234567"
# TWILIO_MESSAGING_SERVICE_SID="MGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

3. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

4. Seed the database with initial data:

```bash
npx tsx prisma/seed.ts
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

### Default Login Credentials

After seeding, you can log in with:

- **Admin**: neil@financialplanninggroup.com / admin123
- **Demo Client**: demo@example.com / demo123

## Deployment to Vercel

### Option 1: Using Vercel Postgres

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Add a Postgres database from the Vercel dashboard
4. Set the environment variables:
   - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (your production URL)
   - `RESEND_API_KEY` (from Resend dashboard)
5. Deploy!

### Option 2: Using External Database (Neon, Supabase, etc.)

1. Create a PostgreSQL database on your preferred provider
2. Get the connection string
3. Set it as `DATABASE_URL` in Vercel environment variables
4. Add other environment variables as above
5. Deploy!

### Post-Deployment

After deployment, run the database migrations:

```bash
npx prisma db push
```

And seed the admin user:

```bash
npx tsx prisma/seed.ts
```

## Project Structure

```
/src
  /app
    /(client)           # Client-facing pages
      /login
      /dashboard
    /(admin)            # Admin panel pages
      /admin/login
      /admin/dashboard
      /admin/clients/new
      /admin/clients/[id]
    /api                # API routes
      /auth
      /clients
  /components          # React components
  /lib                 # Utility functions and configurations
/prisma
  schema.prisma        # Database schema
  seed.ts             # Database seeding script
```

## Security Notes

- All passwords are hashed with bcrypt
- Session tokens are JWT-based with 30-day expiration
- Admin and client authentication are separated
- API routes are protected with session validation

## Email Configuration

This project uses [Resend](https://resend.com) for sending emails. The free tier includes 3,000 emails per month.

To set up email:
1. Create a Resend account
2. Get your API key from the dashboard
3. Add it to your environment variables

For production, you should:
1. Verify your sending domain in Resend
2. Update the `from` address in `/src/lib/email.ts` and `/src/app/api/clients/route.ts`

## License

Private - Emerald Tide Financial

## Support

For technical support, contact your developer.
