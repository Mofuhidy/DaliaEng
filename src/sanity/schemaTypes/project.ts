/* eslint-disable */
// @ts-ignore
import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      // @ts-ignore
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "titleAr",
      title: "Title (Arabic)",
      type: "string",
      // @ts-ignore
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      // @ts-ignore
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category (English)",
      type: "string",
    }),
    defineField({
      name: "categoryAr",
      title: "Category (Arabic)",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location (English)",
      type: "string",
    }),
    defineField({
      name: "locationAr",
      title: "Location (Arabic)",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      title: "Main Project Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "client",
      title: "Client (English)",
      type: "string",
    }),
    defineField({
      name: "clientAr",
      title: "Client (Arabic)",
      type: "string",
    }),
    defineField({
      name: "architect",
      title: "Architect (English)",
      type: "string",
      initialValue: "Dalia Al Dukhain",
    }),
    defineField({
      name: "architectAr",
      title: "Architect (Arabic)",
      type: "string",
      initialValue: "داليا الدخين",
    }),
    defineField({
      name: "materials",
      title: "Materials (English)",
      type: "string",
    }),
    defineField({
      name: "materialsAr",
      title: "Materials (Arabic)",
      type: "string",
    }),
    defineField({
      name: "desc1",
      title: "Primary Description (English)",
      type: "text",
    }),
    defineField({
      name: "desc1Ar",
      title: "Primary Description (Arabic)",
      type: "text",
    }),
    defineField({
      name: "desc2",
      title: "Secondary Description (English)",
      type: "text",
    }),
    defineField({
      name: "desc2Ar",
      title: "Secondary Description (Arabic)",
      type: "text",
    }),
    defineField({
      name: "quote",
      title: "Pull Quote (English)",
      type: "text",
    }),
    defineField({
      name: "quoteAr",
      title: "Pull Quote (Arabic)",
      type: "text",
    }),
    defineField({
      name: "caption",
      title: "Image Caption (English)",
      type: "string",
    }),
    defineField({
      name: "captionAr",
      title: "Image Caption (Arabic)",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "mainImage",
    },
  },
});
