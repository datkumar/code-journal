import { defineCollection } from "astro:content";

import { z } from "astro/zod";
import { glob } from "astro/loaders";

const markdownFilesPattern = [
  "**/*.md", // Take all files ending with .md
  "!**/_*", // ignore file/folder starting with _
];

const conceptsSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()),
});
const conceptsCollection = defineCollection({
  loader: glob({
    pattern: markdownFilesPattern,
    base: "./src/content/concepts",
  }),
  schema: conceptsSchema,
});

const dataStructure = z.enum([
  "array",
  "string",
  "list",
  "stack",
  "queue",
  "heap",
  "tree",
  "graph",
  "special-ds",
]);

const solutionTechnique = z.enum([
  "design",
  "sorting",
  "binary-search",
  "hashing",
  "sliding-window",
  "2-ptr",
  "recursion",
  "greedy",
  "dp",
  "dfs",
  "bfs",
  "bit-manip",
  "math",
  "precompute",
  "special-algo",
]);

const dsaProblemsSchema = z.object({
  title: z.string(),
  links: z.array(z.url()),
  ds: z.array(dataStructure),
  techniques: z.array(solutionTechnique),
  level: z.number().int().gte(0).lte(4), // 0(basic), 1(easy), 2(medium), 3(hard), 4(expert)
});
const dsaProblemsCollection = defineCollection({
  loader: glob({
    pattern: markdownFilesPattern,
    base: "./src/content/dsaProblems",
  }),
  schema: dsaProblemsSchema,
});

export const collections = {
  concepts: conceptsCollection,
  dsaProblems: dsaProblemsCollection,
};
