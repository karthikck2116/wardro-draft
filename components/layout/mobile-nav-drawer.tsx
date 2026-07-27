"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { HeaderLogo } from "@/components/layout/logo";
import {
  MobileNavigationMain,
  MobileNavigationSubPanel,
  type MobileNavigationPanel,
} from "@/components/navigation/mobile-navigation";

export function MobileNavDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [panel, setPanel] = useState<MobileNavigationPanel>("main");
  const wardrobesTriggerRef = useRef<HTMLButtonElement>(null);
  const shopByNeedTriggerRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const wardrobesActive =
    pathname.startsWith("/collections") || pathname.startsWith("/products");
  const shopByNeedActive =
    pathname === "/shop-by-need" || pathname === "/measure-your-space";

  const close = () => {
    setPanel("main");
    onOpenChange(false);
  };

  const openPanel = (nextPanel: Exclude<MobileNavigationPanel, "main">) => {
    setPanel(nextPanel);
    window.requestAnimationFrame(() => backRef.current?.focus());
  };

  const goBack = () => {
    const previousPanel = panel;
    setPanel("main");
    window.requestAnimationFrame(() => {
      if (previousPanel === "wardrobes") wardrobesTriggerRef.current?.focus();
      else shopByNeedTriggerRef.current?.focus();
    });
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) setPanel("main");
        onOpenChange(nextOpen);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-nav-overlay" />
        <Dialog.Content
          className="mobile-nav-drawer"
          aria-describedby={undefined}
        >
          <header className="mobile-nav-head">
            {panel === "main" ? (
              <Dialog.Title className="mobile-nav-title">
                <HeaderLogo />
                <span className="sr-only">Wardro navigation</span>
              </Dialog.Title>
            ) : (
              <>
                <button
                  ref={backRef}
                  className="mobile-nav-back"
                  type="button"
                  onClick={goBack}
                  aria-label="Back to main navigation"
                >
                  <ArrowLeft aria-hidden />
                </button>
                <Dialog.Title className="mobile-nav-subtitle">
                  {panel === "wardrobes" ? "Wardrobes" : "Shop by Need"}
                </Dialog.Title>
              </>
            )}
            <Dialog.Close asChild>
              <button type="button" aria-label="Close navigation">
                <X aria-hidden="true" />
              </button>
            </Dialog.Close>
          </header>
          {panel === "main" ? (
            <MobileNavigationMain
              wardrobesActive={wardrobesActive}
              shopByNeedActive={shopByNeedActive}
              onOpenWardrobes={() => openPanel("wardrobes")}
              onOpenShopByNeed={() => openPanel("shopByNeed")}
              onSelect={close}
              wardrobesTriggerRef={wardrobesTriggerRef}
              shopByNeedTriggerRef={shopByNeedTriggerRef}
            />
          ) : (
            <MobileNavigationSubPanel panel={panel} onSelect={close} />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
