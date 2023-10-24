# Content Collections ([docs](https://docs.astro.build/en/guides/content-collections/))

- Content collections are the best way to manage and author content in any Astro project. Collections help to:
  - organize your documents
  - validate your frontmatter
  - provide automatic TypeScript type-safety for all of your content
- A content collection is any top-level directory inside the reserved `src/content` project directory, such as `src/content/newsletter`
- Only content collections are allowed inside the src/content directory. This directory cannot be used for anything else.
- A **collection entry** is any piece of content stored inside of your content collection directory. Entries can use content authoring formats including `.md`, `.mdx` or as one of two supported data formats: `.yaml` and `.json`. We recommend using a consistent naming scheme (lower-case, dashes instead of spaces) for your files to make it easier to find and organize your content, but this is not required.
- You can also exclude entries from being built by prefixing the filename with an underscore `_`
