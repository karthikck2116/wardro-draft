export type AccountLoginMethod = "mobile" | "email";

export type OtpChallenge = {
  challengeId: string;
  expiresIn: number;
};

export type TrackingStage = {
  id: string;
  label: string;
  detail?: string;
  occurredAt?: string;
  state: "complete" | "current" | "upcoming";
};

export type TrackingResult = {
  status: string;
  stages: TrackingStage[];
};

export class AccountServiceError extends Error {
  constructor(
    message: string,
    public readonly status = 502,
  ) {
    super(message);
  }
}

function providerHeaders() {
  const token = process.env.WARDRO_ACCOUNT_PROVIDER_TOKEN;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function providerUrl(path: string) {
  const base = process.env.WARDRO_ACCOUNT_PROVIDER_URL?.replace(/\/$/, "");
  if (!base) {
    throw new AccountServiceError(
      "Secure account sign-in is temporarily unavailable. Please try again later.",
      503,
    );
  }
  return `${base}${path}`;
}

async function providerRequest<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(providerUrl(path), {
    method: "POST",
    headers: providerHeaders(),
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  }).catch(() => {
    throw new AccountServiceError(
      "We could not reach the secure account service. Please try again.",
      503,
    );
  });

  if (!response.ok) {
    if (response.status === 410) {
      throw new AccountServiceError(
        "That code has expired. Request a new OTP.",
        410,
      );
    }
    if (response.status === 429) {
      throw new AccountServiceError(
        "Too many attempts. Please wait before trying again.",
        429,
      );
    }
    throw new AccountServiceError(
      "We could not complete that request. Please try again.",
      response.status >= 400 && response.status < 500 ? 400 : 502,
    );
  }

  return (await response.json()) as T;
}

export async function requestAccountOtp({
  method,
  contact,
}: {
  method: AccountLoginMethod;
  contact: string;
}) {
  const result = await providerRequest<Partial<OtpChallenge>>("/otp/request", {
    method,
    contact,
  });
  if (!result.challengeId) {
    throw new AccountServiceError(
      "The secure account service returned an incomplete response.",
    );
  }
  return {
    challengeId: result.challengeId,
    expiresIn:
      typeof result.expiresIn === "number" ? result.expiresIn : 300,
  } satisfies OtpChallenge;
}

export async function verifyAccountOtp({
  challengeId,
  code,
}: {
  challengeId: string;
  code: string;
}) {
  const result = await providerRequest<{ sessionToken?: string }>(
    "/otp/verify",
    { challengeId, code },
  );
  if (!result.sessionToken) {
    throw new AccountServiceError(
      "The secure account service could not create a session.",
    );
  }
  return result.sessionToken;
}

export async function trackAccountOrder({
  orderId,
  contact,
}: {
  orderId: string;
  contact: string;
}) {
  const result = await providerRequest<Partial<TrackingResult>>(
    "/orders/track",
    { orderId, contact },
  );
  if (!result.status || !Array.isArray(result.stages)) {
    throw new AccountServiceError(
      "Tracking information is not available right now.",
      502,
    );
  }
  return result as TrackingResult;
}
