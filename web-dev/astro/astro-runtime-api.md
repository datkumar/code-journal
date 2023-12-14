# Astro Runtime API ([docs](https://docs.astro.build/en/reference/api-reference/#overview))

> Sections:

- [Astro Runtime API (docs)](#astro-runtime-api-docs)
  - [Astro Globals (docs)](#astro-globals-docs)
  - [`getStaticPaths()` (docs)](#getstaticpaths-docs)
  - [Content Collections (docs)](#content-collections-docs)
  - [Built-in Components](#built-in-components)
  - [Endpoint context functions (docs)](#endpoint-context-functions-docs)

## Astro Globals ([docs](https://docs.astro.build/en/reference/api-reference/#astro-global))

The `Astro` global is available in all contexts in `.astro` files. It has the following functions:

> ### `Astro.glob()`

- It is a way to load many local files into your static site setup.to load many local files into your static site setup
- It only takes one parameter: a **relative URL glob** of which local files you’d like to import (like `'../pages/post/*.md'`). It’s asynchronous, and returns an array of the exports from matching files.

> ### `Astro.props`

- It is an object containing any values that have been passed as [component attributes](https://docs.astro.build/en/core-concepts/astro-components/#component-props). Layout components for `.md` and `.mdx` files receive frontmatter values as props.

> ### `Astro.params`

- It is an object containing the values of dynamic route segments matched for this request.
- In static builds, this will be the params returned by `getStaticPaths()` used for prerendering [dynamic routes](https://docs.astro.build/en/core-concepts/routing/#dynamic-routes).
- In SSR builds, this can be any value matching the path segments in the dynamic route pattern.

> ### `Astro.request`

- It is a standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object. It can be used to get the url, headers, method, and even body of the request.
- Search parameters in `Astro.request.url` can be accessed **ONLY** in `output: 'server'` mode **NOT** in `output: 'static'`

> ### `Astro.response`

- Astro.response is a standard ResponseInit object. It contains the following fields:
  - `status`: The numeric status code of the response, e.g., `200`.
  - `statusText`: The status message associated with the status code, e.g., `OK`.
  - `headers`: A [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) instance that you can use to set the HTTP headers of the response.

> ### `Astro.cookies`

- It contains utilities for reading and manipulating cookies in server-side rendering mode.

> ### `Astro.redirect()`

- It allows you to redirect to another page. A page (and not a child component) must return the result of `Astro.redirect()` for the redirect to occur.

> ### `Astro.url`

- A [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object constructed from the current `Astro.request.url` URL string value. Useful for interacting with individual properties of the request URL, like **pathname** and **origin**.
- Equivalent to doing `new URL(Astro.request.url)`

---

## `getStaticPaths()` ([docs](https://docs.astro.build/en/reference/api-reference/#getstaticpaths))

- If a page uses **dynamic params** in the filename, that component will need to export a `getStaticPaths()` function.
- This function is required because Astro is a **static site builder**. That means that your entire site is built ahead of time. If Astro doesn’t know to generate a page at build time, your users won’t see it when they visit your site.
- It should return an array of objects to determine which paths will be pre-rendered by Astro.
- It can also be used in static file endpoints for dynamic routing. Refer [here](https://docs.astro.build/en/core-concepts/endpoints/#params-and-dynamic-routing)

> ### `params`

- The `params` key of every returned object tells Astro what routes to build. The returned params must map back to the dynamic parameters and rest parameters defined in your component filepath.
- These are encoded into the URL, so **only strings** are supported as values. The value for each params object must match the parameters used in the page name.

> ### `props` for passing data

- To pass additional data to each generated page, you can also set a `props` value on every returned path object.
- Unlike `params`, `props` are not encoded into the URL and so aren’t limited to only strings.

> ### `paginate()`

- Pagination is a common use-case for websites that Astro natively supports via the `paginate()` function.
- It will automatically generate the array to return from `getStaticPaths()` that creates one URL for every page of the paginated collection. The page number will be passed as a param, and the page data will be passed as a `page` prop.
- It assumes a file name of `[page].astro` or `[...page].astro`. The page param becomes the page number in your URL.
- `paginate()` has the following arguments:
  - `pageSize` - The number of items shown per page
  - `params` - Send additional parameters for creating dynamic routes
  - `props` - Send additional props to be available on each page

---

## Content Collections ([docs](https://docs.astro.build/en/reference/api-reference/#content-collections))

---

## Built-in Components

Astro includes these built-in components for you to use in your `.astro` files via

`import {....} from 'astro:components';`

> ### `<Code />`

This component provides syntax highlighting for code blocks at build time (no client-side JavaScript included). The component is powered internally by [Shiki](https://github.com/shikijs/shiki) and it supports all popular themes and languages. Plus, you can add your custom themes and languages by passing them to theme and lang respectively.

> ### `<Prism />`

You need to install the `@astrojs/prism` package. This component provides language-specific syntax highlighting for code blocks by applying Prism’s CSS classes. Note that you need to provide a Prism CSS stylesheet (or bring your own) for syntax highlighting to appear!

> ### `<Debug />`

This component provides a way to inspect values on the client-side, without any JavaScript.

---

## Endpoint context functions ([docs](https://docs.astro.build/en/reference/api-reference/#endpoint-context))

Endpoint functions receive a `context` object as the first parameter. It mirrors many of the `Astro` global properties.

---
