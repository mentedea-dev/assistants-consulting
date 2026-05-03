import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Servicos from "./pages/Servicos";
import Sobre from "./pages/Sobre";
import Clientes from "./pages/Clientes";
import Insights from "./pages/Insights";
import Contato from "./pages/Contato";
import Admin from "./pages/Admin";
import ArticleDetail from "./pages/ArticleDetail";
import ChatWidget from "./components/ChatWidget";

function Router() {
  return (
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
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <ChatWidget />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
