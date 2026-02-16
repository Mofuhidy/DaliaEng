"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
}

export default function ProjectCard({
  id,
  title,
  category,
  image,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${id}`}
      className="group block relative overflow-hidden aspect-[4/5] bg-gray-100">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay with Teal interaction */}
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <motion.div className="absolute bottom-0 left-0 w-full p-6 text-canvas translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-xs uppercase tracking-widest text-accent mb-2 block">
          {category}
        </span>
        <h3 className="text-2xl font-serif">{title}</h3>
      </motion.div>
    </Link>
  );
}
