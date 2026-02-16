"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("HomePage");

  return (
    <footer className="bg-navy text-white py-16 lg:py-24 px-6 lg:px-12 mt-20">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-2">
            <div className="relative w-20 h-10">
              <Image
                src="/WhiteLogo.png"
                alt="Dalia Al Dukhain"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[10px] tracking-[0.4em] text-white/80 font-sans uppercase font-medium">
              Dalia Al Dukhain
            </span>
          </div>
          <p className="text-white/60 text-sm font-sans max-w-xs leading-relaxed">
            {t("footer_desc")}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6 text-sm font-sans uppercase tracking-[0.2em] text-white/80">
          <a
            href="#"
            className="hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">
            Instagram
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">
            Pinterest
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">
            LinkedIn
          </a>
          <a
            href={`mailto:hello@daliaeng.com`}
            className="hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1 italic lowercase tracking-normal">
            hello@daliaeng.com
          </a>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-20 md:mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-white/40 font-sans">
        <span>
          © {new Date().getFullYear()} {t("title")}
        </span>
        <span>{t("rights")}</span>
        <span>{t("designed_by")}</span>
      </div>
    </footer>
  );
}
