"use client";

import Image from "next/image";
import { Link } from "@/navigation";

interface ProjectCardProps {
  id: string;
  title: string;
  image: string;
}

export default function ProjectCard({ id, title, image }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${id}`}
      className="group block relative w-full h-full overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
        priority={id === "1"}
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Decorative corners or similar as per PRD "Sharp corners" */}
      <div className="absolute inset-0 border-[0px] group-hover:border-[1px] border-white/30 transition-all duration-700 pointer-events-none" />
    </Link>
  );
}
