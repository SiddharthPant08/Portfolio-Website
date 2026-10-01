import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout.jsx";
import PageLoader from "@/components/ui/PageLoader.jsx";

// Route-level code splitting: admin code never loads for normal visitors.
const Home = lazy(() => import("@/pages/Home.jsx"));
const ProjectDetails = lazy(() => import("@/pages/ProjectDetails.jsx"));
const AdminLogin = lazy(() => import("@/pages/AdminLogin.jsx"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard.jsx"));

function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Page not found</h1>
        <Link to="/" className="mt-8 inline-block text-accent underline-offset-4 hover:underline">
          Back home
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public site: navbar, cursor, footer */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin: no public chrome */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  );
}