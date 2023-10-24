# Routing [(docs)](https://docs.astro.build/en/core-concepts/routing)

- Astro leverages a routing strategy called **file-based routing**. Each file in your `src/pages/` directory becomes an endpoint on your site based on its file path.

  ```txt
  # Static routes
  src/pages/index.astro        -> mysite.com/
  src/pages/about.astro        -> mysite.com/about
  src/pages/about/index.astro  -> mysite.com/about
  src/pages/about/me.astro     -> mysite.com/about/me
  src/pages/posts/1.md         -> mysite.com/posts/1
  ```

- Astro uses standard HTML `<a>` elements to navigate between routes. There is no framework-specific `<Link>` component provided.
- A single file can also generate multiple pages using [dynamic routing](https://docs.astro.build/en/core-concepts/routing/#dynamic-routes). This allows you to create pages even if your content lives outside of the special `/pages/` directory,

## Pages [(docs)](https://docs.astro.build/en/core-concepts/astro-pages)

- Pages are files that live in the `src/pages/` subdirectory of your Astro project. They are responsible for handling routing, data loading, and overall page layout for every page in your website.
- Astro supports the following file types in the src/pages/ directory:
  - `.astro`
  - `.md`
  - `.mdx` (with the MDX Integration installed)
  - `.html`
  - `.js`/`.ts` (as endpoints)
