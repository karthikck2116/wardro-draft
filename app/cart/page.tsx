"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { formatMoney } from "@/lib/money";
import { checkServiceability } from "@/lib/delivery/check-serviceability";
const EARLIEST_INSTALLATION_DATE = new Date(Date.now() + 5 * 86400000)
  .toISOString()
  .slice(0, 10);
export default function CartPage() {
  const { lines, total, update } = useCart();
  const [pin, setPin] = useState(""),
    [message, setMessage] = useState(""),
    [notice, setNotice] = useState("");
  if (!lines.length)
    return (
      <div className="shell empty">
        <h1>Your cart is empty</h1>
        <p>Find a wardrobe that fits the way you live.</p>
        <Link className="button" href="/collections/all-wardrobes">
          Browse wardrobes
        </Link>
      </div>
    );
  return (
    <div className="shell section">
      <h1>Your cart</h1>
      <div className="cart-page">
        {" "}
        <div>
          {lines.map((l) => (
            <article className="cart-line" key={l.id}>
              {l.image ? (
                <Image src={l.image} alt="" width={110} height={120} />
              ) : (
                <div aria-hidden="true" />
              )}
              <div>
                <h3>{l.title}</h3>
                <p>{l.variant}</p>
                <b>{formatMoney(l.price)}</b>
                <label>
                  Quantity{" "}
                  <input
                    type="number"
                    min="0"
                    value={l.quantity}
                    onChange={(e) => update(l.id, Number(e.target.value))}
                  />
                </label>
              </div>
            </article>
          ))}
        </div>
        <aside className="cart-summary">
          <h2>Order summary</h2>
          <p>
            <span>Subtotal</span>
            <b>{formatMoney(total)}</b>
          </p>
          <label>
            Delivery PIN code
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="6-digit PIN"
            />
          </label>
          <button
            className="button secondary"
            onClick={() => setMessage(checkServiceability(pin).message)}
          >
            Check serviceability
          </button>
          {message && <small>{message}</small>}
          <label>
            Preferred installation date <small>(subject to confirmation)</small>
            <input
              type="date"
              min={EARLIEST_INSTALLATION_DATE}
            />
          </label>
          <label className="check">
            <input type="checkbox" /> I understand customised products cannot be
            cancelled after confirmation.
          </label>
          <button
            className="button"
            onClick={() =>
              setNotice(
                "Development mode: connect Shopify to continue to its secure checkout.",
              )
            }
          >
            Proceed to Shopify checkout
          </button>
          {notice && <p className="warning">{notice}</p>}
        </aside>
      </div>
    </div>
  );
}
