import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyOtp } from "@/lib/otp";

const schema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
  purpose: z.enum(["REGISTER_VERIFY", "LOGIN"]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const { email, code, purpose } = parsed.data;
    const result = await verifyOtp(email, code, purpose);

    if (!result.ok) {
      return NextResponse.json({ error: result.reason }, { status: 400 });
    }

    if (purpose === "REGISTER_VERIFY") {
      await prisma.user.update({
        where: { email },
        data: { emailVerified: new Date() },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
