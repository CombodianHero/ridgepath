// Run with: npm run seed:admin
// Edit the values below first, or set them via env vars ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const name = process.env.ADMIN_NAME ?? "Site Admin";
  const email = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "ADMIN",
      emailVerified: new Date(), // skip OTP verification for the seeded admin
    },
  });

  console.log(`Admin created: ${email} / ${password}`);
  console.log("Log in at /login, then change the password.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
