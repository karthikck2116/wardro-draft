import { NextResponse } from "next/server";
import { z } from "zod";
import {
  AccountServiceError,
  trackAccountOrder,
} from "@/lib/account/account-service";

const trackSchema = z.object({
  orderId: z.string().trim().min(4).max(64),
  contact: z.string().trim().min(6).max(254),
});

export async function POST(request: Request) {
  const parsed = trackSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter your order ID and verified mobile number or email." },
      { status: 400 },
    );
  }
  try {
    return NextResponse.json(await trackAccountOrder(parsed.data));
  } catch (error) {
    const serviceError =
      error instanceof AccountServiceError
        ? error
        : new AccountServiceError(
            "Tracking information is unavailable. Please try again.",
          );
    return NextResponse.json(
      { error: serviceError.message },
      { status: serviceError.status },
    );
  }
}
