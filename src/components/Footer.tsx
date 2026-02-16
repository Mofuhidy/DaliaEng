"use client";

import { useTranslations } from "next-intl";

import Image from "next/image";

export default function Footer() {
  const t = useTranslations("HomePage"); // Should ideally have Footer namespace

  return (
    <footer className="bg-primary text-canvas py-20 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div>
          <div className="relative w-32 h-32 mb-6">
            <Image
              src="/WhiteLogo.png"
              alt={t("title")}
              fill
              className="object-contain"
            />
          </div>
          <p className="max-w-xs font-sans opacity-80">{t("footer_desc")}</p>
        </div>
        <div className="flex gap-12 font-sans uppercase tracking-widest text-sm">
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:text-accent transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Pinterest
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              LinkedIn
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:hello@daliaeng.com"
              className="hover:text-accent transition-colors">
              hello@daliaeng.com
            </a>
            <span>Sana'a, Yemen</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 border-t border-canvas/10 pt-8 flex justify-between items-center text-xs opacity-50">
        <span>
          © {new Date().getFullYear()} {t("title")}
        </span>
        <span>{t("designed_by")}</span>
      </div>
    </footer>
  );
}
