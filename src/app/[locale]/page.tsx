import Hero3D from "@/components/Hero3D";
import ProjectGallery from "@/components/ProjectGallery";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "HomePage" });
  return {
    title: t("title"),
    description: "Minimalist Luxury Interior Design Portfolio",
    openGraph: {
      title: t("title"),
      description: "Minimalist Luxury Interior Design Portfolio",
      type: "website",
    },
  };
}

import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("HomePage");

  // Try to fetch from Sanity, catch if project not yet set up
  let initialProjects = [];
  try {
    initialProjects = await client.fetch(projectsQuery);
  } catch {
    console.warn("Sanity fetch failed, falling back to static data.");
  }

  return (
    <main className="w-full min-h-screen bg-background-beige select-none">
      {/* Editorial Hero Session */}
      <section className="h-screen w-full relative overflow-hidden">
        <Hero3D />
      </section>

      {/* Index of Works */}
      <section
        id="projects"
        className="min-h-screen bg-background-beige flex flex-col items-center justify-center py-24">
        <ProjectGallery initialProjects={initialProjects} locale={locale} />
      </section>

      {/* Closing Statement / Contact */}
      <section
        id="contact"
        className="min-h-[70vh] bg-background-beige text-navy flex flex-col items-center justify-center relative overflow-hidden px-6 border-t border-sky-blue/20">
        {/* Subtle noise/texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>

        <div className="max-w-4xl text-center z-10 flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4">
            <span className="h-px w-24 bg-primary px-12"></span>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight transition-transform duration-1000 hover:scale-[1.02]">
              {t("collab_title")}
            </h2>
          </div>

          <div className="flex flex-col items-center gap-8">
            <p className="font-display italic text-2xl md:text-3xl text-navy/70 max-w-2xl">
              {t("collab_subtitle")}
            </p>

            <div className="h-px w-full bg-navy/10"></div>

            <a
              href="mailto:daliataleb550@gmail.com"
              className="text-2xl md:text-4xl lg:text-5xl font-sans font-light tracking-tighter hover:text-primary transition-all duration-500 underline underline-offset-[16px] decoration-navy/10 hover:decoration-primary">
              Dalia Al Dukhain
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
