/* eslint-disable */
// @ts-ignore
import { defineConfig } from "sanity";
// @ts-ignore
import { structureTool } from "sanity/structure";
// @ts-ignore
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  basePath: "/admin",
  projectId,
  dataset,
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
