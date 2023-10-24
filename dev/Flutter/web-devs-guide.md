# Guide for Web Develeopers

## Flutter for Web Devs

[Reference](https://docs.flutter.dev/get-started/flutter-for/web-devs)

- In both HTML and Flutter, child elements or widgets are anchored at the top left, by default
- **Background Color:**

  - In Flutter, you set the background color using the `color` property or the `decoration` property of a `Container`. However, you **cannot supply both**, since it would potentially result in the decoration drawing over the background color.
  - The `color` property should be preferred when the background is a simple color. For other cases, such as gradients or images, use the `decoration` property.

- **Inline formatting:**

  - A `Text` widget lets you display text with some formatting characteristics. To display text that uses multiple styles (in this example, a single word with emphasis), use a `RichText` widget instead. Its `text` property can specify one or more `TextSpan` objects that can be individually styled.

- **Container width:**

  - To specify the width of a `Container` widget, use its `width` property. This is a **fixed width**, unlike the CSS `max-width` property that adjusts the container width up to a maximum value. To mimic that effect in Flutter, use the `constraints` property of the `Container`. Create a new `BoxConstraints` widget with a `minWidth` or `maxWidth`.
  - For nested Containers, if the parent’s width is less than the child’s width, the **child Container sizes itself to match the parent**.

- **Rounding corners:**

  - To round the corners of a rectangular shape, use the `borderRadius` property of a `BoxDecoration` object. Create a new `BorderRadius` object that specifies the radius for rounding each corner.

- **Absolute Position:**

  - By default, widgets are positioned **relative to their parent**.
  - To specify an **absolute position** for a widget as x-y coordinates, nest it in a `Positioned` widget that is, in turn, nested in a `Stack` widget.

- **Rotating & Scaling Components:**

  - To rotate a widget, nest it in a `Transform` widget. Use the Transform widget’s `alignment` and `origin` properties to specify the transform origin (fulcrum) in relative and absolute terms, respectively.
  - For a simple 2D rotation, in which the widget is rotated on the Z axis, create a new `Matrix4` identity object and use its `rotateZ()` method to specify the rotation factor using radians (degrees × π / 180).
  - For a simple scaling operation along the x-axis, create a new `Matrix4` identity object and use its `scale()` method to specify the scaling factor. When you scale a parent widget, its **child widgets are scaled accordingly**.

---

## Dart for JS Devs

[Reference](https://dart.dev/guides/language/coming-from/js-to-dart)
