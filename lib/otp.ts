import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const OTP_TTL_MINUTES = 10;
const MAX_ATTEMPTS = 5;

export function generateOtpCode(): string {
  // 6-digit numeric code
  return crypto.randomInt(100000, 999999).toString();
}

export async function createOtp(email: string, purpose: "REGISTER_VERIFY" | "LOGIN") {
  const code = generateOtpCode();
  const codeHash = await bcrypt.hash(code, 10);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await prisma.otp.create({
    data: { email, codeHash, purpose, expiresAt },
  });

  return code;
}

export async function verifyOtp(email: string, code: string, purpose: "REGISTER_VERIFY" | "LOGIN") {
  const otp = await prisma.otp.findFirst({
    where: { email, purpose, consumedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (!otp) return { ok: false, reason: "No active code. Request a new one." };
  if (otp.expiresAt < new Date()) return { ok: false, reason: "Code expired. Request a new one." };
  if (otp.attempts >= MAX_ATTEMPTS) return { ok: false, reason: "Too many attempts. Request a new code." };

  const valid = await bcrypt.compare(code, otp.codeHash);

  if (!valid) {
    await prisma.otp.update({ where: { id: otp.id }, data: { attempts: { increment: 1 } } });
    return { ok: false, reason: "Incorrect code." };
  }

  await prisma.otp.update({ where: { id: otp.id }, data: { consumedAt: new Date() } });
  return { ok: true as const };
}
