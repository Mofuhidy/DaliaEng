"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LangSwitcher from "./LangSwitcher";

export default function Navbar() {
  const t = useTranslations("HomePage");
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 md:px-6 pointer-events-none">
      <div className="bg-white/95 backdrop-blur-sm px-6 md:px-8 py-4 flex items-center justify-between shadow-[0_2px_20px_rgba(0,0,0,0.04)] pointer-events-auto w-full max-w-7xl border border-black/5">
        {/* Menu Toggle / Left Action */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center text-primary hover:text-navy transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Logo / Branding */}
        <Link href="/" className="flex flex-col items-center gap-1 group">
          <div className="relative w-12 h-6 md:w-16 md:h-8 transition-transform duration-500 group-hover:scale-105">
            <Image
              src="/BlackLogo.png"
              alt="Dalia Al Dukhain"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-[7px] md:text-[9px] tracking-[0.4em] text-navy font-sans uppercase font-medium">
            Dalia Al Dukhain
          </span>
        </Link>

        {/* Lang Switcher / Right Action */}
        <div className="flex items-center gap-4">
          <LangSwitcher />
        </div>
      </div>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-background-beige flex flex-col items-center justify-center gap-12 text-navy z-40 pointer-events-auto">
            <Link
              onClick={() => setIsOpen(false)}
              href="#projects"
              className="font-display text-5xl md:text-7xl hover:text-primary transition-colors cursor-pointer">
              {t("projects")}
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="#about"
              className="font-display text-5xl md:text-7xl hover:text-primary transition-colors cursor-pointer">
              {t("about")}
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="#contact"
              className="font-display text-5xl md:text-7xl hover:text-primary transition-colors cursor-pointer">
              {t("contact")}
            </Link>

            <div className="absolute bottom-12 flex gap-8 font-sans text-xs tracking-widest uppercase text-muted">
              <a
                href="https://www.instagram.com/dalia_aldukhain/"
                target="_blank">
                Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
