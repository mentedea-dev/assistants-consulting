import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import "@/i18n"; // Register all translations
import { lazy, Suspense } from "react";
import GoogleVerification from "./components/GoogleVerification";
import BrandSymbol from "./components/BrandSymbol";

// ═══════════════════════════════════════════════════════════════
// COMING SOON MODE — Set to false to restore the full site
// ═══════════════════════════════════════════════════════════════
const COMING_SOON_MODE = true;
// ═══════════════════════════════════════════════════════════════

// Code splitting: lazy load all pages for better performance
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const Home = lazy(() => import("./pages/Home"));
const Servicos = lazy(() => import("./pages/Servicos"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Clientes = lazy(() => import("./pages/Clientes"));
const Insights = lazy(() => import("./pages/Insights"));
const Contato = lazy(() => import("./pages/Contato"));
const Admin = lazy(() => import("./pages/Admin"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ChatWidget = lazy(() => import("./components/ChatWidget"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1929]">
      <BrandSymbol variant="light" className="w-12 h-12" animate dotPulse />
    </div>
  );
}

function Router() {
  if (COMING_SOON_MODE) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Switch>
          {/* Admin still accessible during coming soon */}
          <Route path="/admin" component={Admin} />
          {/* Everything else shows the coming soon page */}
          <Route component={ComingSoon} />
        </Switch>
      </Suspense>
    );
  }

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/servicos" component={Servicos} />
          <Route path="/sobre" component={Sobre} />
          <Route path="/clientes" component={Clientes} />
          <Route path="/insights" component={Insights} />
          <Route path="/insights/:slug" component={ArticleDetail} />
          <Route path="/contato" component={Contato} />
          <Route path="/admin" component={Admin} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <GoogleVerification />
            {/* Chat widget only in full site mode */}
            {!COMING_SOON_MODE && (
              <Suspense fallback={null}>
                <ChatWidget />
              </Suspense>
            )}
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
