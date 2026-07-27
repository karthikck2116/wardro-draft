import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  AccountServiceError,
  verifyAccountOtp,
} from "@/lib/account/account-service";

const verifySchema = z.object({
  challengeId: z.string().min(8).max(512),
  code: z.string().regex(/^\d{6}$/),
});

export async function POST(request: Request) {
  const parsed = verifySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter the complete six-digit OTP." },
      { status: 400 },
    );
  }

  try {
    const sessionToken = await verifyAccountOtp(parsed.data);
    const cookieStore = await cookies();
    cookieStore.set("wardro_account_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const serviceError =
      error instanceof AccountServiceError
        ? error
        : new AccountServiceError(
            "We could not verify that OTP. Please try again.",
          );
    return NextResponse.json(
      { error: serviceError.message },
      { status: serviceError.status },
    );
  }
}
