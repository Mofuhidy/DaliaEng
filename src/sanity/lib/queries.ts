/* eslint-disable */
// @ts-ignore
import { groq } from "next-sanity";

export const projectsQuery = groq`*[_type == "project"] | order(year desc) {
  _id,
  title,
  titleAr,
  "slug": slug.current,
  category,
  categoryAr,
  location,
  locationAr,
  mainImage,
  gallery,
  year
}`;

export const projectByIdQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  ...,
  "slug": slug.current
}`;
