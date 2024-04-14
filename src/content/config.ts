import { defineCollection, z } from "astro:content";

const concepts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
  }),
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

const dsaProblems = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    links: z.array(z.string().url()),
    ds: z.array(dataStructure),
    techniques: z.array(solutionTechnique),
    level: z.number().int().gte(0).lte(4),
    // 0: basic, 1:easy, 2:medium, 3:hard, 4:expert
  }),
});

export const collections = { concepts, dsaProblems };
