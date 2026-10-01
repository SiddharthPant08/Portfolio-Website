import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import CustomCursor from "./CustomCursor.jsx";
import ScrollProgress from "./ScrollProgress.jsx";
import PageLoader from "@/components/ui/PageLoader.jsx";

export default function SiteLayout() {
  const { pathname, hash } = useLocation();

  // Jump to top on route change unless the link targets a section hash.
  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [pathname, hash]);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-fg focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-bg"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main id="main">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </MotionConfig>
  );
}