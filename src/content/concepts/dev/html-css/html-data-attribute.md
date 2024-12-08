---
title: HTML data-* attribute
tags: [html]
---

**References**: [MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) , [W3Schools](https://www.w3schools.com/tags/att_data-.asp)

## Illustrative example

To know usage of `data-*` attribute, refer below example. In given CodePen, notice how the `data-status` and `data-duration` attributes are being used across HTML, CSS and JS:

<p
    class="codepen"
    data-height="500"
    data-theme-id="dark"
    data-default-tab="html,result"
    data-slug-hash="wvOJgrp"
    data-preview="true"
    data-user="datkumar"
    style="
    height: 300px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid;
    margin: 1em 0;
    padding: 1em;
    "
>
    <span>
        See the Pen
        <a href="https://codepen.io/datkumar/pen/wvOJgrp">
            HTML &quot;data-&quot; attribute
        </a>
        by Kumar (<a href="https://codepen.io/datkumar">@datkumar</a>) on
        <a href="https://codepen.io">CodePen</a>.
    </span>
</p>
<script
    async
    src="https://cpwebassets.codepen.io/assets/embed/ei.js"
></script>

## HTML

Notice on the `<li>` elements how the `data-status` attribute is set to be either of the values `complete | incomplete | in-progress` and the `data-duration` attribute to either of `short | long`

```html
<li data-status="in-progress" data-duration="short">Remove trash</li>
```

## CSS

The `<li>` elements can then be conditionally **styled based on the values** of those `data-` attributes via the [attribute selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors) of CSS having a square bracket syntax

```css
/* Make text color red for the elements having status as "incomplete" */
li[data-status="incomplete"] {
  color: red;
}
```

## JavaScript

Once we have selected the elements, we can access all the `data-` attribute values per element via the `.dataset` field per element

```js
const tasks = Array.from(document.querySelectorAll("li"));

const completedTasks = tasks.filter(
  (element) => element.dataset.status === "complete"
);

console.log("Completed Tasks:");
completedTasks.map((task) => console.log(task.innerText));
/* Output:
Completed Tasks:
Visit Dentist
Car repair
*/
```
