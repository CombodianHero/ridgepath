# Ridgepath — EdTech Platform

Next.js 14 + TypeScript + Tailwind + Prisma (Postgres) + NextAuth.
Registration, password login, email-OTP login, and three role-based panels: Student, Teacher, Admin.

## What's real vs. what's a shell

- **Real, working, database-backed:** registration, password hashing, email OTP (via Gmail SMTP), session auth, role-based route protection. Teachers create courses and lessons; students browse a catalog, enroll, and check off lessons; progress bars are computed live from actual completions. Admin sees real user and course tables.
- **Still sample data:** the streak/XP/rank stat cards and the "today's schedule" widget on the student dashboard — there's no gamification or live-class scheduling system behind those yet. Everything else on the dashboard (enrolled courses, progress %) is real.

## The full working loop

1. Register as a **Teacher** → verify email via OTP → log in.
2. On `/teacher`, click **+ New course** → fill in title/description/category (saved as a draft).
3. Open the course → add a few lessons → click **Publish course**.
4. Register a second account as a **Student** → verify → log in.
5. On `/student`, click **Browse courses** → see the published course → **Enroll**.
6. Open the course, check off lessons — progress updates in real time and shows back on the student dashboard.
7. Go to `/teacher/courses/[id]` as the teacher — the enrolled student now appears in the roster.
8. Log in as the seeded **Admin** → `/admin` shows both users and the course in the live tables.

## 1. Set up the database (Neon — free)

1. Go to [neon.tech](https://neon.tech), sign up, create a project.
2. Copy the **pooled** connection string it gives you.
3. Paste it into `.env.local` as `DATABASE_URL` (copy `.env.example` to `.env.local` first).

## 2. Set up Gmail SMTP for OTP emails

1. On the Gmail account you'll send from, turn on **2-Step Verification**: https://myaccount.google.com/security
2. Create an **App Password**: https://myaccount.google.com/apppasswords (choose "Mail" as the app).
3. Copy the 16-character password into `.env.local` as `SMTP_APP_PASSWORD`. Put the Gmail address itself in `SMTP_EMAIL`.

> Regular Gmail passwords will NOT work here — it must be an App Password.

## 3. Local setup

```bash
cp .env.example .env.local
# fill in DATABASE_URL, SMTP_EMAIL, SMTP_APP_PASSWORD
# generate NEXTAUTH_SECRET with: openssl rand -base64 32

npm install
npm run db:push        # creates tables in your database from prisma/schema.prisma
npm run seed:admin     # creates the first admin (edit ADMIN_EMAIL/PASSWORD in .env.local first)
npm run dev
```

Open http://localhost:3000. Register a student or teacher account (you'll get a real OTP email), or log in as the seeded admin at `/login`.

## 4. Deploy to Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com) → Add New Project → import the repo.
3. Under **Environment Variables**, add everything from `.env.example` with real values:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` → set to your production URL, e.g. `https://your-app.vercel.app`
   - `SMTP_EMAIL`, `SMTP_APP_PASSWORD`
4. Deploy.
5. Run the admin seed once against production — easiest way is temporarily setting `DATABASE_URL` in your local `.env.local` to the production database and running `npm run seed:admin` locally, then removing it.

## Roles & routes

| Route | Who can access |
|---|---|
| `/register`, `/login`, `/verify-otp` | Public |
| `/student` | Any logged-in user |
| `/teacher` | Teacher or Admin |
| `/admin` | Admin only |

Admins aren't self-registrable through `/register` — create them via `npm run seed:admin` (or by manually updating a user's `role` to `ADMIN` in the database).

## Project structure

```
app/
  api/auth/[...nextauth]/route.ts     NextAuth handler
  api/auth/register/route.ts          Registration + sends verify OTP
  api/auth/otp/request/route.ts       Send login/verify OTP
  api/auth/otp/verify/route.ts        Verify OTP code
  api/courses/route.ts                Create course (teacher)
  api/courses/[id]/route.ts           Update/publish/delete course (owner)
  api/courses/[id]/lessons/route.ts   Add lesson to course
  api/lessons/[id]/route.ts           Edit/delete a lesson
  api/lessons/[id]/complete/route.ts  Toggle lesson completion (student)
  api/enrollments/route.ts            Enroll in a course (student)
  login/  register/  verify-otp/      Auth pages
  student/                            Dashboard (real enrolled courses/progress)
  student/courses/                    Catalog + enroll
  student/courses/[id]/               Course detail, mark lessons complete
  teacher/                            Dashboard (real courses/students)
  teacher/courses/new/                Create course form
  teacher/courses/[id]/               Manage lessons, publish, roster
  admin/                               Live user + course tables
lib/
  prisma.ts       Prisma client
  auth.ts         NextAuth config (password + OTP providers)
  otp.ts          OTP generation/hashing/verification
  mailer.ts       Gmail SMTP + email templates
  progress.ts     Progress % calculation
prisma/schema.prisma                  User, Otp, Course, Lesson, Enrollment, LessonCompletion
middleware.ts                         Role-based route protection
components/                           UI building blocks
```

## Extending further

- **Quizzes/assignments/grading:** add `Assignment` and `Submission` models following the same pattern as `Lesson`/`LessonCompletion`.
- **Video uploads:** the `Lesson.content` field currently holds plain text or a pasted video URL — swap in a provider like Mux or Cloudflare Stream for real hosted video.
- **Social login (Google/GitHub):** add providers in `lib/auth.ts` — NextAuth supports this natively.
- **Password reset:** reuse the existing OTP system with a new purpose (`"PASSWORD_RESET"`) and a route to set a new password after verification.
- **Streaks/XP:** would need a `DailyActivity` model tracking login/completion dates per user, then replace the sample stat cards in `Dashboard.tsx`.
