"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

// Placeholder data
const projects = [
  {
    id: "1",
    title: "Villa Al-Riyadh",
    category: "Residential",
    image: "/placeholder-1.jpg",
  }, // Need images or patterns
  {
    id: "2",
    title: "Oasis Penthouse",
    category: "Residential",
    image: "/placeholder-2.jpg",
  },
  {
    id: "3",
    title: "Azure Boutique",
    category: "Commercial",
    image: "/placeholder-3.jpg",
  },
];

export default function ProjectGallery() {
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
            <ProjectCard
              {...project}
              image={`https://placehold.co/600x800/f5efeb/2f4156?text=${project.title}`}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
