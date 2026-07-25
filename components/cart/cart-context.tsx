"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { trackCartEvent } from "@/components/cart/cart-analytics";
import type { CartLine } from "@/components/cart/cart-types";

type Ctx = {
  lines: CartLine[];
  add: (x: CartLine) => void;
  update: (id: string, q: number) => void;
  count: number;
  total: number;
  setDrawer: (x: boolean) => void;
  checkoutUrl: string;
};

const C = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawer, setDrawerState] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState("/cart");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const stored = JSON.parse(
          localStorage.getItem("wardro-cart") || "[]",
        ) as CartLine[];
        setLines(Array.isArray(stored) ? stored : []);
        setCheckoutUrl(
          localStorage.getItem("wardro-checkout-url")?.trim() || "/cart",
        );
      } catch {
        setLines([]);
      } finally {
        setHydrated(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("wardro-cart", JSON.stringify(lines));
  }, [hydrated, lines]);

  const setDrawer = useCallback((open: boolean) => {
    setDrawerState((current) => {
      if (open && !current) trackCartEvent("cart_drawer_opened");
      return open;
    });
  }, []);

  const add = useCallback((x: CartLine) => {
    setLines((v) => {
      const old = v.find((l) => l.id === x.id);
      return old
        ? v.map((l) =>
            l.id === x.id ? { ...l, quantity: l.quantity + x.quantity } : l,
          )
        : [...v, x];
    });
    setDrawer(true);
  }, [setDrawer]);

  const update = useCallback((id: string, q: number) => {
    setLines((v) =>
      q
        ? v.map((l) => (l.id === id ? { ...l, quantity: q } : l))
        : v.filter((l) => l.id !== id),
    );
  }, []);

  const value = useMemo(
    () => ({
      lines,
      add,
      update,
      count: lines.reduce((a, b) => a + b.quantity, 0),
      total: lines.reduce((a, b) => a + b.price * b.quantity, 0),
      setDrawer,
      checkoutUrl,
    }),
    [add, checkoutUrl, lines, setDrawer, update],
  );

  return (
    <C.Provider value={value}>
      {children}
      <CartDrawer
        open={drawer}
        onOpenChange={setDrawer}
        lines={lines}
        total={value.total}
        checkoutUrl={checkoutUrl}
        add={add}
        update={update}
      />
    </C.Provider>
  );
}

export const useCart = () => {
  const x = useContext(C);
  if (!x) throw new Error("Cart context missing");
  return x;
};

export type { CartLine } from "@/components/cart/cart-types";
