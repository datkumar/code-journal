# Astro <img src="https://raw.githubusercontent.com/github/explore/5cc0a03a302ec862c4aeac2a22a513ae31c35432/topics/astro/astro.png" width="25">

---

<strong>

## Sections

- [Project Structure](./project-structure.md)
- [Astro Components](./astro-components.md)
- [Routing](./routing.md)
- [Content Collections](./content-collections.md)
- [Astro Runtime API](./astro-runtime-api.md)

</strong>

---

## Features:

- **Content-focused**: designed for content-rich websites.
- **Server-first**: Websites run faster when they render HTML on the server.
- **Fast by default**: ships with zero client-side JS bundle by deafult
- **Easy to use**: easy familiar syntax
- **Fully-featured, but flexible**: Over 100+ Astro integrations to choose froms

---

**Islands Architecture:** [blogpost](https://jasonformat.com/islands-architecture/)

**partial** or **selective hydration**

- parallel loading: the two different priority islands load in parallel and hydrate in isolation
- client directive for lazy loading

### Note

- Great for static HTML content pages (blogs, landing pages, docs etc.)
- Framework-agnostic. You can add one (or more) UI frameworks for interactivity. That part of the page is **hydrated** separately

---

Create new project: `npm create astro@latest`

Disable telemetry: `npm run astro telemetry disable`

Add Tailwind integration: `npx astro add tailwind`

---

[Astro v3 Blogpost](https://astro.build/blog/astro-3/)

[Astro Example sites](https://astro.new/latest)
