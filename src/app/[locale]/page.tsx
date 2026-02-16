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

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main className="w-full min-h-screen">
      <section className="h-screen w-full relative">
        <Hero3D />
      </section>

      {/* Featured Projects */}
      <section
        id="projects"
        className="min-h-screen bg-canvas flex flex-col items-center justify-center border-t border-primary/10 py-20">
        <div className="w-full max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-primary">
            {t("selected_works")}
          </h2>
        </div>
        <ProjectGallery />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-[50vh] bg-canvas flex items-center justify-center border-t border-primary/10 py-20">
        <div className="max-w-3xl text-center px-6">
          <h2 className="text-4xl font-serif text-primary mb-6">
            {t("about")}
          </h2>
          <p className="font-sans text-lg md:text-xl text-primary/80 leading-relaxed">
            {t("about_text")}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-[50vh] bg-primary text-canvas flex flex-col items-center justify-center relative overflow-hidden">
        {/* Noise overlay could go here */}
        <h2 className="text-4xl md:text-6xl font-serif mb-8 z-10 transition-transform duration-700 hover:scale-110">
          {t("collab_title")}
        </h2>
        <a
          href="mailto:hello@daliaeng.com"
          className="text-xl md:text-2xl font-sans uppercase tracking-widest hover:text-accent transition-colors z-10 underline underline-offset-8 decoration-canvas/30 hover:decoration-accent">
          hello@daliaeng.com
        </a>
      </section>

      <Footer />
    </main>
  );
}
