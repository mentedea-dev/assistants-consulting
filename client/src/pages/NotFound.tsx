import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linen">
      <Header />
      <section className="pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="container text-center">
          <div className="text-8xl md:text-[12rem] font-bold text-navy/5 leading-none select-none">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy tracking-tight -mt-8 md:-mt-16 relative z-10">
            Página não encontrada
          </h1>
          <p className="text-steel-light mt-4 max-w-md mx-auto">
            A página que você procura não existe ou foi movida para outro endereço.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 text-sm font-semibold tracking-wide mt-8 hover:bg-navy-light transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar ao início
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
