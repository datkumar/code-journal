---
title: CSS Flexbox
tags: [css]
---

## References

**Articles**: [Josh W Comeau](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/), [CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

**MDN**: [Basic concepts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox), [How to use](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)

**Cheatsheets**: [yoksel](https://yoksel.github.io/flex-cheatsheet/), [malven](https://flexbox.malven.co/)

---

## Properties on Parent (OUTER) container

```css
.parent {
  /* ... */
  display: flex;
}
```

Flexbox layout algorithm, unlike default "Flow" of `block`
It revolves around axes with a lot of flexibility control over growing/shrinking

## Orientation of Primary axis

```css
.parent {
  /* ... */
  flex-direction: row (default) | column | row-reverse | column-reverse;
}
```

The default positioning of **children** is by:

- **Primary** axis: Only take up as much space as the **internal content** needs
- **Cross** axis: **stretched** to fill out available space

Define the alignment of children along the axes as:

## `justify-content` for PRIMARY axis

This property is used for defining how to align children along the PRIMARY axis. Think in terms of **distribution** of children of the group

```css
.parent {
  /* ... */
  justify-content: flex-start (default) | flex-end | center... + safe | unsafe;
}
```

The various kinds of `justify-content` values are:

- **Basic** values: `normal`
- **Positional** alignment: `center | start | end | flex-start | flex-end | left | right`
- **Distributed** alignment: `space-between | space-around | space-evenly | stretch`
- **Overflow** alignment: `safe center | unsafe center`
- **Global** values: `inherit | initial | revert | revert-layer | unset`
  By adding `safe` to `center` in the `justify-content` property, overflowing content behaves as if the alignment mode is `start`

> Each item can **move along cross-axis independently** without disturbing other siblings, but that isn't so along primary axis (kebab analogy)

Thus, we have `justify-content` to control the distribution of the group along the primary axis, and we have `align-items` to position each item individually along the cross axis

## `align-items` for CROSS axis

This property is used for defining how to align children along the CROSS axis

```css
.parent {
  /* ... */
  align-items: stretch (default) | center | baseline |...;
}
```

The various kinds of `align-items` values are:

- **Basic** values: `normal | stretch`
- **Positional** alignment: `center | start | end | flex-start | flex-end | self-start | self-end | anchor-center`
  Note that there's NO `left` OR `right`
- **Baseline** alignment: `baseline | first baseline | last baseline | safe center | unsafe center;`
  The `last-baseline` is overflow alignment (for positional alignment only)
- **Global** values: `inherit | initial | revert | revert-layer | unset`

> The `align-self` property has values same as `align-items` but it is used on the **specific children** container we want to target

---

## The `width` property

The `width` property in `flex` mode denotes **hypothetical** size. It's the size an element _would_ be, in a perfect utopian world, with nothing getting in the way.

> We tend to think of the CSS language as a collection of properties, the CSS we write is an **input** for the various layout **algorithms**

---

## The `flex-basis` property

- In a Flex **row**, it does the same thing as `width`. In a Flex **column**, it does the same thing as `height`
- Flexbox authors created a **generic “size”** property called `flex-basis`. It's like `width` or `height`, but pegged to the **primary axis**, like everything else. It allows us to set the **hypothetical size** of an element in the primary-axis direction, regardless of whether that's horizontal or vertical
- Like with `width`, `flex-basis` is more of a **suggestion** than a hard constraint. At a certain point, there just isn't enough space for all of the elements to sit at their assigned size, and so they have to compromise, in order to avoid an overflow

## The `flex-grow` property

- By default, elements in a Flex context will **shrink down to their minimum** comfortable size along the primary axis. This often creates extra space. The `flex-grow` property specifies how that space should be consumed
- The **default** value is `0` and so it doesn't fill up extra space
- The available extra space **divided proportionally** among the children as per their ratios of `flex-grow`

> Only one of `flex-grow` and `flex-shrink` properties can be active at once; one decides how to allocate available extra space and the other decides how to give up space

## The `flex-shrink` property

- The `flex-basis` and `width` set the elements' hypothetical size. The Flexbox algorithm might **shrink** elements below this desired size, but by default, they'll always scale together, **preserving the ratio** between both elements
- When we don't want our elements to scale down proportionally, we use the `flex-shrink` property. By default, all children have `flex-shrink: 1;`
- To **opt-out** of shrinking, i.e. not let the child size be reduced, set it's `flex-shrink: 0;`.It will treat `flex-basis` or `width` as a **hard minimum limit**. This can be useful for SVGs or circular containers

> **Why don't we use `min-width` instead of `flex-shrink`? See below**

### Note the `min-width` caveat

In addition to hypothetical size, the Flexbox algorithm cares about the minimum size. It refuses to shrink a child below its minimum size. The content will **overflow rather than shrink further**, no matter how high we crank `flex-shrink`.
Some examples of such **intrinsic minimum size** where such overflows can happen:

- **Text inputs** have a default minimum size of `170-200px` (depends on browser). When the container shrinks below a that size, the content overflows
- Sometimes, the limiting factor might be the **element's content**. For an element containing text, the minimum width is the **length** of the **longest unbreakable string** of characters
  Thankfully, we can redefine the minimum size with the `min-width` property
  An easy hack might seem to set `min-width: 0px;` but things can break in even worse unexpected ways, so be careful of redefining existing guardrails

---

## The `gap` property

Defines **spacing in-between** each flex child containers. Useful in scenarios like navigation headers

---

## Auto `margin`

- The `margin` property is used to add space **around** a specific element. In some layout modes, like Flow and Positioned, it can even be used to center an element, with `margin: auto;`

> So, the two ways to gobble up extra space available on primary axis are:

- `flex-grow` applies the extra space to a **child**
- `margin-left | margin-right: auto;` applies the extra space to the **element's margin** on that side

---

## The `flex-wrap` property

- Our child containers are shrinking/growing along primary axis but all are kept in the same row/column by default. This is because we have `flex-wrap: no-wrap;` by default.
- If we want to allow children to go on next row/column, we can set the `flex-wrap: wrap;`
  - Note that then, **items won't shrink below their hypothetical size**. At least, not when wrapping onto the next row/column is an option.
  - Also, there would be multiple primary axes as the children move to next row/column and the cross axis can go through multiple child containers. But don't worry about them mixing up as each row/column primary axis is its **own mini Flexbox environment**
- The `align-content` property:
  If want to align the multiple primary rows/columns within the parent container (i.e. decide `align-items` for the group of all containers aligning along a cross-axis), we'll have to use the `align-content` property. It can be set to almost the same values as `align-items`

> Typically, when we **work in two dimensions** we'll want to use the **grid** layout
