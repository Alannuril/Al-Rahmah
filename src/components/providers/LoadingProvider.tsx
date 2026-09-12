"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  Suspense,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LoadingModal } from "@/components/ui/LoadingModal";

interface LoadingContextType {
  showLoading: (title?: string, message?: string) => void;
  hideLoading: () => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType>({
  showLoading: () => {},
  hideLoading: () => {},
  isLoading: false,
});

export function useLoading() {
  return useContext(LoadingContext);
}

function NavigationWatcher({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // When route transition finishes, dismiss the loading modal
    onNavigate();
  }, [pathname, searchParams, onNavigate]);

  return null;
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loadingState, setLoadingState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: "Mohon tunggu",
    message: "",
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hideLoading = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setLoadingState((prev) =>
      prev.isOpen ? { ...prev, isOpen: false } : prev
    );
  }, []);

  const showLoading = useCallback(
    (title = "Mohon tunggu", message = "") => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setLoadingState({
        isOpen: true,
        title,
        message,
      });

      // Safety timeout: automatically dismiss if navigation or process takes > 6s
      timerRef.current = setTimeout(() => {
        hideLoading();
      }, 6000);
    },
    [hideLoading]
  );

  // Global click listener for internal route navigations
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Ignore if event already handled or not left-click
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      // Ignore links with target="_blank"
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (
        !rawHref ||
        rawHref.startsWith("#") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:") ||
        rawHref.startsWith("javascript:")
      ) {
        return;
      }

      try {
        const url = new URL(anchor.href, window.location.href);

        // Ignore external domains
        if (url.origin !== window.location.origin) return;

        // Ignore same page hash anchors
        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search
        ) {
          return;
        }

        // It's a genuine internal navigation! Show the modal load spinner
        showLoading("Mohon tunggu");
      } catch {
        // Invalid URL, ignore
      }
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [showLoading, hideLoading]);

  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        hideLoading,
        isLoading: loadingState.isOpen,
      }}
    >
      <Suspense fallback={null}>
        <NavigationWatcher onNavigate={hideLoading} />
      </Suspense>
      {children}
      <LoadingModal
        isOpen={loadingState.isOpen}
        title={loadingState.title}
        message={loadingState.message}
      />
    </LoadingContext.Provider>
  );
}

