import { z, defineCollection } from "astro:content";

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
  "ll",
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
  "hashing",
  "sliding-window",
  "2-ptr",
  "binary-search",
  "recursion",
  "greedy",
  "dp",
  "dfs",
  "bfs",
  "bit-manip",
  "math",
  "special-algo",
]);

const dsaProblems = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    links: z.array(z.string().url()),
    ds: dataStructure,
    techniques: z.array(solutionTechnique),
    level: z.number().int().gte(0).lte(4),
    // 0: basic, 1:easy, 2:medium, 3:hard, 4:expert
  }),
});

export const collections = { concepts, dsaProblems };
