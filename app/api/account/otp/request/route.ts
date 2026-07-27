import { NextResponse } from "next/server";
import { z } from "zod";
import {
  AccountServiceError,
  requestAccountOtp,
} from "@/lib/account/account-service";

const requestSchema = z.discriminatedUnion("method", [
  z.object({
    method: z.literal("mobile"),
    contact: z.string().regex(/^\+91[6-9]\d{9}$/),
  }),
  z.object({
    method: z.literal("email"),
    contact: z.string().email().max(254),
  }),
]);

const requestWindows = new Map<string, { count: number; resetsAt: number }>();

function checkRequestLimit(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0];
  const key = forwarded?.trim() || "local";
  const now = Date.now();
  const existing = requestWindows.get(key);

  if (!existing || existing.resetsAt <= now) {
    requestWindows.set(key, { count: 1, resetsAt: now + 60_000 });
    return true;
  }
  if (existing.count >= 5) return false;
  existing.count += 1;
  return true;
}

function maskContact(method: "mobile" | "email", contact: string) {
  if (method === "mobile") {
    return `${contact.slice(0, 3)} •••••• ${contact.slice(-2)}`;
  }
  const [local, domain] = contact.split("@");
  return `${local.slice(0, 2)}•••@${domain}`;
}

export async function POST(request: Request) {
  if (!checkRequestLimit(request)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait before trying again." },
      { status: 429 },
    );
  }

  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid mobile number or email address." },
      { status: 400 },
    );
  }

  try {
    const challenge = await requestAccountOtp(parsed.data);
    return NextResponse.json({
      ...challenge,
      maskedContact: maskContact(parsed.data.method, parsed.data.contact),
    });
  } catch (error) {
    const serviceError =
      error instanceof AccountServiceError
        ? error
        : new AccountServiceError(
            "We could not start secure sign-in. Please try again.",
          );
    return NextResponse.json(
      { error: serviceError.message },
      { status: serviceError.status },
    );
  }
}
