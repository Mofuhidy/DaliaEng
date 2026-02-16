"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useTranslations } from "next-intl";

export default function ProjectGallery() {
  const t = useTranslations("HomePage");

  const projects = [
    {
      id: "1",
      title: t("project_1_title"),
      category: t("project_1_category"),
      location: t("project_1_location"),
      image: "/project-1.png",
      year: "2023",
    },
    {
      id: "2",
      title: t("project_2_title"),
      category: t("project_2_category"),
      location: t("project_2_location"),
      image: "/project-2.png",
      year: "2024",
    },
    {
      id: "3",
      title: t("project_3_title"),
      category: t("project_3_category"),
      location: t("project_3_location"),
      image: "/project-3.png",
      year: "2023",
    },
    {
      id: "4",
      title: t("project_4_title"),
      category: t("project_4_category"),
      location: t("project_4_location"),
      image: "/project-1.png", // Reusing image 1 for demo
      year: "2024",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-navy">
          {t("selected_works")}
        </h2>
        <div className="flex gap-4 font-sans text-xs tracking-widest uppercase text-muted">
          <span>01 / 04</span>
          <span className="h-px w-12 bg-sky-blue self-center"></span>
          <span>Index</span>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={`${project.id}-${index}`}
            variants={item}
            className={`flex flex-col mb-12 group cursor-pointer ${index % 2 === 1 ? "md:mt-32" : ""}`}>
            <div className="relative w-full overflow-hidden bg-white p-3 shadow-sm border border-black/5 hover:shadow-2xl transition-all duration-700 ease-out">
              <div className="aspect-[4/5] md:aspect-[3/4] lg:aspect-[9/12] w-full overflow-hidden bg-gray-100">
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  image={project.image}
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col items-start gap-1">
              <h3 className="font-display text-2xl lg:text-3xl text-navy group-hover:text-primary transition-colors leading-tight">
                {project.title}
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-muted font-sans font-medium">
                {project.location} — {project.year}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="w-full flex justify-center mt-12 mb-12">
        <button className="px-10 py-4 border border-muted/30 text-navy hover:border-primary hover:text-primary transition-all duration-300 font-sans text-[10px] uppercase tracking-[0.3em] font-bold">
          {t("load_more")}
        </button>
      </div>
    </div>
  );
}
