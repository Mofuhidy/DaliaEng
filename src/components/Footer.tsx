"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("HomePage"); // Should ideally have Footer namespace

  return (
    <footer className="bg-primary text-canvas py-20 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div>
          <h2 className="text-4xl font-serif mb-6">DaliaEng</h2>
          <p className="max-w-xs font-sans opacity-80">
            Creating timeless spaces that blend minimalist luxury with
            functional harmony.
          </p>
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
            <span>Riyadh, KSA</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 border-t border-canvas/10 pt-8 flex justify-between items-center text-xs opacity-50">
        <span>© {new Date().getFullYear()} DaliaEng Interiors</span>
        <span>Designed by Agents A, B, C</span>
      </div>
    </footer>
  );
}
