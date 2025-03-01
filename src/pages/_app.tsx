import { ApolloProvider, type NormalizedCacheObject } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import LocalFont from "next/font/local";
import Footer from "~/components/footer";
import LoadingScreen from "~/components/loader";
import { useApollo } from "~/lib/apollo";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";
import BackGroundGradient from "~/components/layout/background";
import { LoaderProvider } from "~/components/loader/loaderContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import BaseSEO from "~/components/SEO/BaseSEO";
import { scan } from "react-scan";
import { env } from "~/env";
import Notice from "~/components/notice";

const Navbar = dynamic(() => import("~/components/navbar"), { ssr: false });

export const trap = LocalFont({
  src: [
    {
      path: "../font/Trap-Black.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/Trap-Light.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/Trap-Medium.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/Trap-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/Trap-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../font/Trap-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../font/Trap-SemiBold.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-trap",
  display: "swap",
});

export const lifeCraft = LocalFont({
  src: "../font/LifeCraft.ttf",
  weight: "400",
  variable: "--font-life-craft",
  display: "swap",
  style: "normal",
});

export default function App({
  Component,
  pageProps: { session: _session, ...pageProps },
  initialApolloState,
}: AppProps & { initialApolloState?: NormalizedCacheObject }) {
  const router = useRouter();

  const apolloClient = useApollo(initialApolloState);

  const loadingTimeout = useRef<NodeJS.Timeout>();

  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingStart = useCallback((url: string) => {
    if (url === "/") return;

    // Clear any existing timeout
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current);
    }

    // Show loading screen only if page takes more than 500ms to load
    loadingTimeout.current = setTimeout(() => {
      setIsLoading(true);
    }, 500);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    // Clear timeout if page loads before timeout
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const onRouteChangeStart = (url: string) => handleLoadingStart(url);

    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", handleLoadingComplete);
    router.events.on("routeChangeError", handleLoadingComplete);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", handleLoadingComplete);
      router.events.off("routeChangeError", handleLoadingComplete);
    };
  }, [router, handleLoadingStart, handleLoadingComplete]);

  useEffect(() => {
    scan({
      enabled: env.NEXT_PUBLIC_NODE_ENV === "development",
      log: true,
    });
  }, []);

  const shouldRenderNavbar =
    !router.pathname.startsWith("/explore") &&
    !router.pathname.startsWith("/theme") &&
    !router.pathname.startsWith("/coming-soon");

  return (
    <>
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ""}
      />

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <ApolloProvider client={apolloClient}>
        <Toaster />

        <BaseSEO
          {...(router.pathname !== "/" && {
            title: (() => {
              const p = router.pathname.split("/")[1] ?? ""
              return p.charAt(0).toUpperCase() + p.slice(1)
            })() + " | " + "Incridea'25",
          })}
        />

        <LoaderProvider>
        <Notice />
          <BackGroundGradient>
            <div
              className={cn(
                trap.variable,
                lifeCraft.variable,
                "min-h-screen font-trap tracking-wider sm:text-lg text-sm",
              )}
            >
              {shouldRenderNavbar && <Navbar />}

              <AnimatePresence mode="wait">
                <Component
                  key={router.pathname}
                  {...pageProps}
                />
              </AnimatePresence>
              <Footer />
            </div>
          </BackGroundGradient>
        </LoaderProvider>
      </ApolloProvider>
    </>
  );
}
