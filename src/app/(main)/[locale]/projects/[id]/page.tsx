import { client } from "@/sanity/lib/client";
import { projectByIdQuery } from "@/sanity/lib/queries";
import ProjectDetailClient from "./ProjectDetailClient";
import { SanityProject } from "@/types/sanity";
import { Link } from "@/navigation";

interface ProjectPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id, locale } = await params;

  // Static fallback check
  const isStaticId = id === "1" || id === "2" || id === "3" || id === "4";

  let projectData: SanityProject | null = null;

  if (!isStaticId) {
    try {
      projectData = await client.fetch(projectByIdQuery, { slug: id });
    } catch {
      console.warn("Sanity fetch failed for project detail:", id);
    }
  }

  // If not static and no data found in Sanity
  if (!isStaticId && !projectData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background-beige text-navy p-12">
        <h1 className="text-4xl font-display mb-8">Project Not Found</h1>
        <Link href="/" className="underline uppercase tracking-widest text-xs">
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <ProjectDetailClient
      id={id}
      locale={locale}
      projectData={projectData || undefined}
    />
  );
}
