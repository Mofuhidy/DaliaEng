export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-02-16";

if (!projectId) {
  console.warn("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}
