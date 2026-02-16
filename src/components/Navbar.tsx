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
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-primary bg-transparent">
      {/* Logo */}
      <Link href="/" className="relative w-12 h-12 z-50 mix-blend-normal">
        <Image
          src="/BlackLogo.png"
          alt={t("title")}
          fill
          className="object-contain"
          priority
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 z-50 mix-blend-normal">
        <Link
          href="#projects"
          className="text-sm font-sans uppercase tracking-widest hover:text-accent transition-colors">
          Projects
        </Link>
        <Link
          href="#about"
          className="text-sm font-sans uppercase tracking-widest hover:text-accent transition-colors">
          About
        </Link>
        <Link
          href="#contact"
          className="text-sm font-sans uppercase tracking-widest hover:text-accent transition-colors">
          Contact
        </Link>
        <LangSwitcher />
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden z-50 flex flex-col gap-1.5 focus:outline-none mix-blend-normal"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className="w-8 h-0.5 bg-primary block"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="w-8 h-0.5 bg-primary block"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          className="w-8 h-0.5 bg-primary block"
        />
      </button>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-canvas flex flex-col items-center justify-center gap-8 text-primary z-40">
            <Link
              onClick={() => setIsOpen(false)}
              href="#projects"
              className="text-3xl font-serif hover:text-accent transition-colors">
              Projects
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="#about"
              className="text-3xl font-serif hover:text-accent transition-colors">
              About
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="#contact"
              className="text-3xl font-serif hover:text-accent transition-colors">
              Contact
            </Link>
            <div className="mt-8">
              <LangSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
