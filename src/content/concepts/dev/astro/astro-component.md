---
title: Astro Components
tags: [astro]
---

[Astro Components Docs](https://docs.astro.build/en/core-concepts/astro-components/)

- Astro components are the basic building blocks of any Astro project. They are HTML-only templating components with no client-side runtime. They have the `.astro` file extension.
- Astro components are extremely flexible. Often, an Astro component will contain some reusable UI on the page, like a header or a profile card.
- You must note that Astro components **don’t render on the client**. They render to HTML either at build-time or on-demand using server-side rendering (SSR). You can include JavaScript code inside of your component frontmatter, and all of it will be stripped from the final page sent to your users’ browsers. The result is a faster site, with zero JavaScript footprint added by default.
- When your Astro component does need client-side interactivity, you can add standard HTML `<script>` tags or UI Framework components.

## Structure of Astro Components

```astro
---
// Component Script (JavaScript)
---
<!-- Component Template (HTML + JS Expressions) -->
```

- An Astro component is made up of two main parts: the [**Component Script**](#component-script) and the [**Component Template**](#component-template).

- Each part performs a different job, but together they provide a framework that is both easy to use and expressive enough to handle whatever you might want to build.

- Astro uses a code fence (`---`) to identify the component script in your Astro component

- In basic terms:

```astro
---
// Your Server-side code
// (runs at page build on the server)
---

<!-- Your Content -->
<!-- HTML, markdown or other Components -->

<script>
// Your Client-side code
// (runs after page load on the client)
</script>
```

---

### Component Script

It's inspired from the [frontmatter](https://daily-dev-tips.com/posts/what-exactly-is-frontmatter/) used in Markdown files

```astro
---
import SomeAstroComponent from '../components/SomeAstroComponent.astro';
import SomeReactComponent from '../components/SomeReactComponent.jsx';
import someData from '../data/pokemon.json';

// Access passed-in component props, like `<X title="Hello, World" />`
const {title} = Astro.props;
// Fetch external data, even from a private API or database
const data = await fetch('SOME_SECRET_API_URL/users').then(r => r.json());
---
<!-- Your template here! -->
```

- You can use the component script to write any JavaScript (or TypeScript) code that you need to render your template. This can include:
  - importing other components (`.astro` or UI framework files)
  - importing data, like a **JSON** file
  - **fetching** content from an **API** or **database**
  - creating **variables** that you will reference in your template
- The code fence is designed to guarantee that the JavaScript that you write in it is **fenced in**. It won’t escape into your frontend application, or fall into your user’s hands. You can safely write code here that is expensive or sensitive (_like a call to your private database_) without worrying about it ever ending up in your user’s browser.

### Component Template

- It's below the code fence and determines the HTML output of your component.
- If you write plain HTML here, your component will render that HTML in any Astro page it is imported and used.
- However, Astro’s component template syntax also supports JavaScript expressions, Astro `<style>` and `<script>` tags, imported components, and special Astro directives.
- Data and values defined in the component script can be used in the component template to produce dynamically-created HTML.

---

## Props [(docs)](https://docs.astro.build/en/core-concepts/astro-components/#component-props)

- An Astro component can define and accept props. These props then become available to the component template for rendering HTML. Props are available on the `Astro.props` global in your frontmatter script.
- Here is an example of a component that receives a greeting prop and a name prop. Notice that the props to be received are **destructured** from the global `Astro.props` object.

  ```astro title="components/GreetingHeadline.astro"
  ---
  // Usage: <GreetingHeadline greeting="Howdy" name="Partner" />
  const { greeting, name } = Astro.props;
  ---
  <h2>{greeting}, {name}!</h2>
  ```

  This component, when imported and rendered in other Astro components, layouts or pages, can pass these props as attributes:

  ```astro title="components/GreetingCard.astro"
  ---
  import GreetingHeadline from './GreetingHeadline.astro';
  const name = "Astro"
  ---
  <h1>Greeting Card</h1>
  <GreetingHeadline greeting="Hi" name={name} />
  <p>I hope you have a wonderful day!</p>
  ```

- You can also define your props with TypeScript with a `Props` type interface. Astro will automatically pick up the Props interface in your frontmatter and give type warnings/errors. These props can also be given default values when destructured from `Astro.props`

  ```astro
  ---
  interface Props {
    name: string;
    greeting?: string;
  }

  const { greeting = "Hello", name } = Astro.props;
  ---
  ```

- Component props can be given default values to use when none are provided.

  ```astro
  ---
  const { greeting = "Hello", name = "Astronaut" } = Astro.props;
  ---
  ```

## Slots

- The `<slot />` element is a placeholder for external HTML content , allowing you to “slot” i.e.**inject child elements from other files into your component** template.
- By default, **all child elements passed** to a component will be rendered in its `<slot />`
- Unlike props, which are attributes passed to an Astro component available for use throughout your component with `Astro.props`, slots render child HTML elements where they are written.

```astro title="components/Wrapper.astro"
---
import Header from './Header.astro';
import Logo from './Logo.astro';
import Footer from './Footer.astro';

const { title } = Astro.props
---
<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{title}</h1>
  <slot />  <!-- children will go here -->
  <Footer />
</div>
```

```astro title="pages/fred.astro"
---
import Wrapper from '../components/Wrapper.astro';
---
<Wrapper title="Fred's Page">
  <h2>All about Fred</h2>
  <p>Here is some stuff about Fred.</p>
</Wrapper>
```

This pattern is the basis of an Astro layout component: an entire page of HTML content can be “wrapped” with `<SomeLayoutComponent>` tags and sent to the component to render inside of common page elements defined there.

- Slots can also render **fallback content**. When there are no matching children passed to a slot, a <slot /> element will render its own placeholder children.

---

Refer: [Named Slots](https://docs.astro.build/en/core-concepts/astro-components/#named-slots) , [Fallback for Slots](https://docs.astro.build/en/core-concepts/astro-components/#fallback-content-for-slots) , [Transfer Slots](https://docs.astro.build/en/core-concepts/astro-components/#transferring-slots)

[Using HTML Components in Astro](https://docs.astro.build/en/core-concepts/astro-components/#html-components)
