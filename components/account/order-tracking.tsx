"use client";

import { Check, Circle } from "lucide-react";
import { useState } from "react";
import type { TrackingResult } from "@/lib/account/account-service";

export function OrderTracking({ compact = false }: { compact?: boolean }) {
  const [orderId, setOrderId] = useState("");
  const [contact, setContact] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const trackOrder = async () => {
    setError("");
    setResult(null);
    if (orderId.trim().length < 4 || contact.trim().length < 6) {
      setError("Enter your order ID and verified mobile number or email.");
      return;
    }
    setBusy(true);
    window.dispatchEvent(
      new CustomEvent("wardro:analytics", {
        detail: { event: "order_tracking_opened" },
      }),
    );
    try {
      const response = await fetch("/api/account/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderId.trim(), contact: contact.trim() }),
      });
      const payload = (await response.json()) as TrackingResult & { error?: string };
      if (!response.ok) throw new Error(payload.error || "Tracking is unavailable.");
      setResult(payload);
    } catch (trackingError) {
      setError(
        trackingError instanceof Error
          ? trackingError.message
          : "Tracking information is unavailable. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={`account-track-card${compact ? " is-compact" : ""}`}>
      <div>
        <h2>Track Your Order</h2>
        <p>Enter your Order ID and verified mobile number or email.</p>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void trackOrder();
        }}
      >
        <label>
          <span>Order ID</span>
          <input
            value={orderId}
            placeholder="Enter order ID"
            onChange={(event) => setOrderId(event.target.value)}
          />
        </label>
        <label>
          <span>Mobile number or email</span>
          <input
            value={contact}
            placeholder="Verified mobile or email"
            onChange={(event) => setContact(event.target.value)}
          />
        </label>
        <button type="submit" disabled={busy}>
          {busy ? "Checking…" : "Track"}
        </button>
      </form>
      <p className="account-track-message" aria-live="polite">
        {error}
      </p>
      {result ? (
        <div className="account-tracking-result">
          <h3>{result.status}</h3>
          <ol>
            {result.stages.map((stage) => (
              <li className={`is-${stage.state}`} key={stage.id}>
                <span>
                  {stage.state === "complete" ? (
                    <Check aria-hidden />
                  ) : (
                    <Circle aria-hidden />
                  )}
                </span>
                <div>
                  <strong>{stage.label}</strong>
                  {stage.detail ? <small>{stage.detail}</small> : null}
                  {stage.occurredAt ? <time>{stage.occurredAt}</time> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
