import { ApolloProvider, type NormalizedCacheObject } from "@apollo/client";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import LocalFont from "next/font/local";
import Footer from "~/components/footer";
import HeadComponent from "~/components/head";
import LoadingScreen from "~/components/loader";
import { useApollo } from "~/lib/apollo";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";
import BackGroundGradient from "~/components/layout/background";
import { LoaderProvider } from "~/components/loader/loaderContext";

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

// Have to delete this font since it's only used in coming soon page
export const blackChancery = LocalFont({
  src: "../font/BlackChancery.ttf",
  weight: "400",
  variable: "--font-black-chancery",
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
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeout = useRef<NodeJS.Timeout>();

  const handleLoadingStart = useCallback(() => {
    // Clear any existing timeout
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current);
    }

    // Only show loading screen if loading takes more than 300ms
    loadingTimeout.current = setTimeout(() => {
      setIsLoading(true);
    }, 300);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    // Clear the timeout to prevent showing loader after completion
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", handleLoadingStart);
    router.events.on("routeChangeComplete", handleLoadingComplete);
    router.events.on("routeChangeError", handleLoadingComplete);

    return () => {
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
      }
      router.events.off("routeChangeStart", handleLoadingStart);
      router.events.off("routeChangeComplete", handleLoadingComplete);
      router.events.off("routeChangeError", handleLoadingComplete);
    };
  }, [router, handleLoadingStart, handleLoadingComplete]);

  const shouldRenderNavbar =
    !router.pathname.startsWith("/explore") &&
    !router.pathname.startsWith("/theme") &&
    !router.pathname.startsWith("/coming-soon");

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <ApolloProvider client={apolloClient}>
        <HeadComponent
          title="Incridea"
          description="Official Website of Incridea 2025, National level techno-cultural fest, NMAMIT, Nitte. Innovate. Create. Ideate."
        />
        <LoaderProvider>
          <BackGroundGradient>
            <Toaster />
            <div
              className={cn(
                trap.variable,
                lifeCraft.variable,
                blackChancery.variable,
                "min-h-screen font-trap tracking-wider text-lg",
              )}
            >
              {shouldRenderNavbar && <Navbar />}
              <AnimatePresence mode="wait">
                <Component key={router.pathname} {...pageProps} />
              </AnimatePresence>
              <Footer />
            </div>
          </BackGroundGradient>
        </LoaderProvider>
      </ApolloProvider>
      <Analytics />
    </>
  );
}
