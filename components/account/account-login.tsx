"use client";

import { Mail, ShieldCheck, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AccountLoginMethod } from "@/lib/account/account-service";

type LoginPhase = "contact" | "verify";

function trackAccountEvent(event: string) {
  window.dispatchEvent(
    new CustomEvent("wardro:analytics", { detail: { event } }),
  );
}

export function AccountLogin({ autoFocus = false }: { autoFocus?: boolean }) {
  const mobileRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);
  const [method, setMethod] = useState<AccountLoginMethod>("mobile");
  const [phase, setPhase] = useState<LoginPhase>("contact");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [maskedContact, setMaskedContact] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!autoFocus) return;
    const frame = window.requestAnimationFrame(() => mobileRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [autoFocus]);

  useEffect(() => {
    if (phase !== "verify" || countdown <= 0) return;
    const timer = window.setInterval(() => {
      setCountdown((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [countdown, phase]);

  const contact =
    method === "mobile"
      ? `+91${mobile.replace(/\D/g, "")}`
      : email.trim().toLowerCase();

  const requestOtp = async (resend = false) => {
    setError("");
    setNotice("");
    if (
      (method === "mobile" && !/^[6-9]\d{9}$/.test(mobile)) ||
      (method === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ) {
      setError(
        method === "mobile"
          ? "Enter a valid 10-digit Indian mobile number."
          : "Enter a valid email address.",
      );
      return;
    }

    setBusy(true);
    if (!resend) {
      trackAccountEvent("account_login_started");
    }
    try {
      const response = await fetch("/api/account/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, contact }),
      });
      const result = (await response.json()) as {
        challengeId?: string;
        maskedContact?: string;
        expiresIn?: number;
        error?: string;
      };
      if (!response.ok || !result.challengeId) {
        throw new Error(result.error || "Unable to send OTP.");
      }
      setChallengeId(result.challengeId);
      setMaskedContact(result.maskedContact || "your contact");
      setCountdown(Math.min(result.expiresIn ?? 30, 60));
      setOtp("");
      setPhase("verify");
      setNotice(resend ? "A new OTP has been sent." : "OTP sent securely.");
      window.requestAnimationFrame(() => otpRef.current?.focus());
      trackAccountEvent("otp_requested");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to send OTP. Please try again.",
      );
      trackAccountEvent("account_login_failed");
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async () => {
    setError("");
    setNotice("");
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the complete six-digit OTP.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/account/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, code: otp }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unable to verify OTP.");
      }
      trackAccountEvent("otp_verified");
      window.location.assign("/account");
    } catch (verificationError) {
      setError(
        verificationError instanceof Error
          ? verificationError.message
          : "Unable to verify OTP. Please try again.",
      );
      trackAccountEvent("account_login_failed");
    } finally {
      setBusy(false);
    }
  };

  const changeMethod = (nextMethod: AccountLoginMethod) => {
    setMethod(nextMethod);
    setPhase("contact");
    setError("");
    setNotice("");
  };

  return (
    <section className="account-login-card" aria-labelledby="account-login-title">
      <h2 className="sr-only" id="account-login-title">
        Secure account sign in
      </h2>
      <div className="account-login-tabs" role="tablist" aria-label="Sign-in method">
        <button
          type="button"
          role="tab"
          aria-selected={method === "mobile"}
          onClick={() => changeMethod("mobile")}
        >
          <Smartphone aria-hidden /> Mobile Number
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={method === "email"}
          onClick={() => changeMethod("email")}
        >
          <Mail aria-hidden /> Email
        </button>
      </div>

      {phase === "contact" ? (
        <form
          className="account-login-form"
          onSubmit={(event) => {
            event.preventDefault();
            void requestOtp();
          }}
        >
          {method === "mobile" ? (
            <label>
              <span>Mobile Number</span>
              <span className="account-mobile-field">
                <b>+91</b>
                <input
                  ref={mobileRef}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={mobile}
                  maxLength={10}
                  placeholder="Enter your mobile number"
                  onChange={(event) =>
                    setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                />
              </span>
            </label>
          ) : (
            <label>
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                placeholder="Enter your email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
          )}
          <button className="account-primary-button" type="submit" disabled={busy}>
            {busy ? "Sending…" : "Send OTP"}
          </button>
        </form>
      ) : (
        <form
          className="account-login-form account-otp-form"
          onSubmit={(event) => {
            event.preventDefault();
            void verifyOtp();
          }}
        >
          <div className="account-otp-heading">
            <strong>Enter the six-digit OTP</strong>
            <span>Sent to {maskedContact}</span>
          </div>
          <label>
            <span>One-time password</span>
            <input
              ref={otpRef}
              className="account-otp-input"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              maxLength={6}
              aria-describedby="account-otp-help"
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
              }
            />
          </label>
          <div className="account-otp-controls" id="account-otp-help">
            <button
              type="button"
              onClick={() => {
                setPhase("contact");
                setError("");
                setNotice("");
              }}
            >
              Edit contact
            </button>
            <button
              type="button"
              disabled={countdown > 0 || busy}
              onClick={() => void requestOtp(true)}
            >
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
            </button>
          </div>
          <button className="account-primary-button" type="submit" disabled={busy}>
            {busy ? "Verifying…" : "Verify & Sign In"}
          </button>
        </form>
      )}

      <p className="account-form-message" aria-live="polite">
        {error ? <span className="is-error">{error}</span> : notice}
      </p>
      <div className="account-login-security">
        <ShieldCheck aria-hidden />
        <span>Use OTP for quick and secure login</span>
      </div>
      <p className="account-login-note">No heavy account setup. Just essentials.</p>
    </section>
  );
}
