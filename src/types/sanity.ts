export interface SanityProject {
  _id: string;
  title: string;
  titleAr: string;
  slug: string;
  category: string;
  categoryAr: string;
  location: string;
  locationAr: string;
  mainImage: { asset: { _ref: string; _type: "reference" } } | null;
  year: string;
  client?: string;
  clientAr?: string;
  architect?: string;
  architectAr?: string;
  materials?: string;
  materialsAr?: string;
  desc1?: string;
  desc1Ar?: string;
  desc2?: string;
  desc2Ar?: string;
  quote?: string;
  quoteAr?: string;
  caption?: string;
  captionAr?: string;
  gallery?: { asset: { _ref: string; _type: "reference" } }[];
}
