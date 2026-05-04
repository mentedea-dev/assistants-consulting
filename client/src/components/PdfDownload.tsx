/**
 * PdfDownload — Premium PDF report download component
 * Design: McKinsey Quarterly style — authoritative, minimal
 */
import { FileText, Download, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PdfDownloadProps {
  url: string;
  title?: string;
  description?: string;
  fileSize?: string;  // "2.4 MB"
}

export default function PdfDownload({ url, title, description, fileSize }: PdfDownloadProps) {
  const { locale } = useLanguage();

  const label = locale === "pt"
    ? { download: "Baixar relatório", format: "Relatório em PDF", size: fileSize || "PDF" }
    : { download: "Download report", format: "PDF Report", size: fileSize || "PDF" };

  return (
    <div className="my-8 not-prose">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="group flex items-start gap-5 p-6 md:p-7 bg-white border border-navy/8 hover:border-orange/40 transition-all duration-400 no-underline"
      >
        {/* Icon */}
        <div className="w-12 h-12 bg-navy/4 group-hover:bg-orange/8 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
          <FileText size={22} className="text-navy group-hover:text-orange transition-colors duration-300" strokeWidth={1.5} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-steel mb-1.5">
            {label.format} · {label.size}
          </p>
          {title && (
            <p className="text-base font-serif text-navy group-hover:text-navy/80 transition-colors duration-300 leading-snug mb-1">
              {title}
            </p>
          )}
          {description && (
            <p className="text-sm text-steel font-light leading-relaxed mt-1">
              {description}
            </p>
          )}
        </div>

        {/* Download CTA */}
        <div className="flex items-center gap-2 flex-shrink-0 self-center">
          <span className="hidden sm:block text-xs font-medium text-navy group-hover:text-orange transition-colors duration-300">
            {label.download}
          </span>
          <div className="w-8 h-8 bg-navy/4 group-hover:bg-orange flex items-center justify-center transition-all duration-300">
            <Download size={14} className="text-navy group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </a>
    </div>
  );
}
