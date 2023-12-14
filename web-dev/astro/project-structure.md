# Project Structure [(docs)](https://docs.astro.build/en/core-concepts/project-structure)

Inside your project root folder, Astro creates the following file structure:

- `src/*` - project source code (_components, pages, styles,..._)
- `public/*` - non-code, unprocessed assets _(fonts, icons,..._)
- `package.json` - project manifest
- `astro.config.mjs` - Astro configuration file (_recommended_)
- `tsconfig.json` - TypeScript configuration file. (_recommended_)

## The `src/` folder

- Astro processes, optimizes, and bundles your `src/` files to create the final website that is shipped to the browser. Unlike the static `public/` directory, your `src/` files are built and handled for you by Astro.
- Some files (like Astro components) are not even sent to the browser as written but are instead rendered to static HTML. Other files (like CSS) are sent to the browser but may be optimized or bundled with other CSS files for performance.
- The only directories **reserved** by Astro are `src/pages/` and `src/content/` , while the rest you can name as you want.
