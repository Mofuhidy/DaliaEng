"use client";

import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { SanityProject } from "@/types/sanity";
import { urlForImage } from "@/sanity/lib/image";

interface ProjectGalleryProps {
  initialProjects?: SanityProject[];
  locale?: string;
}

export default function ProjectGallery({
  initialProjects,
  locale,
}: ProjectGalleryProps) {
  const t = useTranslations("HomePage");
  const containerRef = useRef<HTMLDivElement>(null);

  const staticProjects = [
    {
      id: "1",
      title: t("project_1_title"),
      category: t("project_1_category"),
      location: t("project_1_location"),
      image: "/project-1.png",
      year: "2023",
      slug: "1",
    },
    {
      id: "2",
      title: t("project_2_title"),
      category: t("project_2_category"),
      location: t("project_2_location"),
      image: "/project-2.png",
      year: "2024",
      slug: "2",
    },
    {
      id: "3",
      title: t("project_3_title"),
      category: t("project_3_category"),
      location: t("project_3_location"),
      image: "/project-3.png",
      year: "2023",
      slug: "3",
    },
    {
      id: "4",
      title: t("project_4_title"),
      category: t("project_4_category"),
      location: t("project_4_location"),
      image: "/project-1.png",
      year: "2024",
      slug: "4",
    },
  ];

  const projects = initialProjects?.length
    ? initialProjects.map(p => ({
        id: p._id,
        title: locale === "ar" ? p.titleAr : p.title,
        category: locale === "ar" ? p.categoryAr : p.category,
        location: locale === "ar" ? p.locationAr : p.location,
        image: p.mainImage ? urlForImage(p.mainImage)?.url() : "/project-1.png",
        year: p.year,
        slug: p.slug,
      }))
    : staticProjects;

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".project-item");

      items.forEach((item: unknown, i: number) => {
        const el = item as HTMLElement;
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 60,
            clipPath: "inset(100% 0% 0% 0%)",
            willChange: "transform, opacity, clip-path",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%", // Trigger earlier on mobile
              toggleActions: "play none none none",
            },
            delay: (i % 2) * 0.1,
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      id="projects"
      ref={containerRef}
      className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12">
        {projects.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className={`project-item flex flex-col mb-12 group cursor-pointer ${index % 2 === 1 ? "md:mt-32" : ""}`}>
            <div className="relative w-full overflow-hidden bg-white p-3 shadow-sm border border-black/5 hover:shadow-2xl transition-all duration-700 ease-out">
              <div className="aspect-4/5 md:aspect-3/4 lg:aspect-9/12 w-full overflow-hidden bg-gray-100">
                <ProjectCard
                  id={project.slug}
                  title={project.title}
                  image={project.image}
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col items-start gap-1 p-2">
              <h3 className="font-display text-2xl lg:text-3xl text-navy group-hover:text-primary transition-colors leading-tight">
                {project.title}
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-muted font-sans font-medium">
                {project.location} — {project.year}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-12 mb-12">
        <button className="px-10 py-4 border border-muted/30 text-navy hover:border-primary hover:text-primary transition-all duration-300 font-sans text-[10px] uppercase tracking-[0.3em] font-bold">
          {t("load_more")}
        </button>
      </div>
    </div>
  );
}
