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
      image: "/project-1.png",
    },
    {
      id: "2",
      title: t("project_2_title"),
      category: t("project_2_category"),
      image: "/project-2.png",
    },
    {
      id: "3",
      title: t("project_3_title"),
      category: t("project_3_category"),
      image: "/project-3.png",
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
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-6">
      {projects.map(project => (
        <motion.div key={project.id} variants={item}>
          {/* Using a gray placeholder div if image fails, but Link handles it */}
          <div className="w-full h-full bg-gray-200">
            <ProjectCard {...project} image={project.image} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
