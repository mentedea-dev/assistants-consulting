import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import "@/i18n"; // Register all translations
import { lazy, Suspense, useState, useCallback } from "react";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";

// Code splitting: lazy load all pages for better performance
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
import GoogleVerification from "./components/GoogleVerification";
import BrandSymbol from "./components/BrandSymbol";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linen">
      <BrandSymbol variant="dark" className="w-12 h-12" animate dotPulse />
    </div>
  );
}

function Router() {
  return (
    <>
      <ScrollToTop />
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
  // Show splash only on first visit per session
  const [showSplash, setShowSplash] = useState(() => {
    const seen = sessionStorage.getItem("splash_seen");
    return !seen;
  });

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("splash_seen", "1");
    setShowSplash(false);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
            <Router />
            <GoogleVerification />
            <Suspense fallback={null}>
              <ChatWidget />
            </Suspense>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
