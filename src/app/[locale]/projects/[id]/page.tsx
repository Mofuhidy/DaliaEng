"use client";

import { use } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

interface ProjectPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = use(params);
  const t = useTranslations("ProjectDetail");
  const h = useTranslations("HomePage");
  const t_data = useTranslations(`ProjectData.${id as any}`);

  // Basic fallback check if data exists in messages
  const hasData = id === "1" || id === "2" || id === "3" || id === "4";

  if (!hasData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background-beige text-navy p-12">
        <h1 className="text-4xl font-display mb-8">Project Not Found</h1>
        <Link href="/" className="underline uppercase tracking-widest text-xs">
          Back to Home
        </Link>
      </main>
    );
  }

  const projectMeta = {
    "1": { image: "/project-1.png", year: "2023" },
    "2": { image: "/project-2.png", year: "2024" },
    "3": { image: "/project-3.png", year: "2023" },
    "4": { image: "/project-4.png", year: "2024" },
  }[id] || { image: "/project-1.png", year: "" };

  return (
    <main className="relative w-full min-h-screen pt-[60px] bg-background-beige text-navy antialiased font-sans-arabic">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${projectMeta.image})` }}>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white z-10 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xs md:text-sm font-sans tracking-[0.3em] uppercase mb-4">
            {h(`project_${id as any}_category`)} — {projectMeta.year}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-none tracking-tight mb-2 uppercase">
            {h(`project_${id as any}_title`)}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-2 mt-4 text-white/90">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="font-sans text-sm tracking-wide">
              {h(`project_${id as any}_location`)}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Sidebar (Metadata) */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32 flex flex-col gap-10">
              <div className="space-y-8 font-sans">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
                    {t("client")}
                  </h3>
                  <p className="text-navy text-base lg:text-lg font-medium">
                    {t_data("client")}
                  </p>
                </div>
                <div className="h-px w-full bg-sky-blue/30"></div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
                    {t("architect")}
                  </h3>
                  <p className="text-navy text-base lg:text-lg font-medium">
                    {t_data("architect")}
                  </p>
                </div>
                <div className="h-px w-full bg-sky-blue/30"></div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
                    {t("year")}
                  </h3>
                  <p className="text-navy text-base lg:text-lg font-medium">
                    {projectMeta.year}
                  </p>
                </div>
                <div className="h-px w-full bg-sky-blue/30"></div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
                    {t("materials")}
                  </h3>
                  <p className="text-navy text-base lg:text-lg font-medium">
                    {t_data("materials")}
                  </p>
                </div>
              </div>

              {/* Share */}
              <div className="flex flex-col gap-4 mt-8">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  {t("share_project")}
                </h3>
                <div className="flex gap-4">
                  {["Instagram", "Pinterest", "Email"].map(platform => (
                    <button
                      key={platform}
                      className="w-10 h-10 rounded-full border border-sky-blue/40 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all text-xs">
                      {platform[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Narrative Column */}
          <article className="lg:col-span-8 lg:col-start-5 flex flex-col gap-12 md:gap-20">
            <div className="max-w-prose">
              <p className="text-base md:text-xl lg:text-2xl leading-relaxed text-navy font-display first-letter-drop first-letter:text-6xl first-letter:font-bold first-letter:mt-1">
                {t_data("desc1")}
              </p>
              <p className="mt-8 text-base md:text-lg leading-relaxed text-navy/70 font-display">
                {t_data("desc2")}
              </p>
            </div>

            {/* In-content image */}
            <figure className="w-full overflow-hidden">
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                <Image
                  src={projectMeta.image}
                  alt={h(`project_${id as any}_title`)}
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
              <figcaption className="mt-4 text-[10px] uppercase tracking-widest text-muted text-center font-sans">
                {t_data("caption")}
              </figcaption>
            </figure>

            {/* Pull Quote */}
            <div className="py-16 md:py-24 flex flex-col items-center gap-8 border-y border-sky-blue/20">
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display italic text-center text-navy leading-tight px-4 max-w-3xl">
                "{t_data("quote")}"
              </blockquote>
              <span className="h-px w-24 bg-primary"></span>
            </div>

            {/* Final Narrative */}
            <div className="max-w-prose">
              <p className="text-base md:text-lg leading-relaxed text-navy/70 font-display">
                {t_data("desc1")}
              </p>
            </div>
          </article>
        </div>
      </div>

      {/* Next Project Footer (Minimal) */}
      <section className="bg-white border-t border-sky-blue/10 py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <Link
            href="/"
            className="group flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted mb-4">
              {t("back_to_index")}
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-medium text-navy group-hover:text-primary transition-colors uppercase">
              The Archive
            </h2>
            <div className="h-px bg-primary w-0 group-hover:w-24 transition-all duration-500 mt-4"></div>
          </Link>

          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
              {t("next_project")}
            </span>
            <h3 className="text-2xl md:text-3xl font-display italic text-navy">
              {h("project_1_title")}
            </h3>
            <Link
              href="/projects/1"
              className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-primary hover:text-navy transition-colors">
              {t("view_case_study")} →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
