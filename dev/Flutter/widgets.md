# Widgets

[**Widget Catalog**](https://docs.flutter.dev/ui/widgets)

**[Layout Widgets in Flutter](https://docs.flutter.dev/ui/widgets/layout#Sliver%20widgets)**

<details>
<summary>
<b>Multi-child layout widgets:</b>
</summary>

- [`Row`](https://api.flutter.dev/flutter/widgets/Row-class.html) , [`Column`](https://api.flutter.dev/flutter/widgets/Column-class.html) , [`Stack`](https://api.flutter.dev/flutter/widgets/Stack-class.html)
- [`ListView`](https://api.flutter.dev/flutter/widgets/ListView-class.html) , [`ListBody`](https://api.flutter.dev/flutter/widgets/ListBody-class.html)
- [`GridView`](https://api.flutter.dev/flutter/widgets/GridView-class.html) , [`Table`](https://api.flutter.dev/flutter/widgets/Table-class.html)
- [`Wrap`](https://api.flutter.dev/flutter/widgets/Wrap-class.html) , [`Flow`](https://api.flutter.dev/flutter/widgets/Flow-class.html)
- [`LayoutBuilder`](https://api.flutter.dev/flutter/widgets/LayoutBuilder-class.html)

</details>

---

## Widgets journey 🗺️

### `Scaffold()` [(docs)](https://api.flutter.dev/flutter/material/Scaffold-class.html)

- Creates a page layout.
- _Props_ : `appBar` , `body` , `floatingActionButton`(permanently fixed button) , `drawer`(side menu) , `backgroundColor` etc.

### `AppBar()` [(docs)](https://api.flutter.dev/flutter/material/AppBar-class.html)

- Like toolbar/navbar
- _Props_ : `leading`(left), `title`(middle), multiple `actions: [ ]`(right), `bottom` , `backgroundColor` and

### `Container()` [(docs)](https://api.flutter.dev/flutter/widgets/Container-class.html)

- Behaves like `<div>` in HTML
- _Props_ : `child` , `padding` , `margin` , `decoration` , `constraints` , `transform` , `foregroundDecoration`
- If no `child` or `constraints` specified, it tries to takes up the entire available space. Containers themselves size to their `child` , but the `constraints` argument overrides this.

### `Center()` [(docs)](https://api.flutter.dev/flutter/widgets/Center-class.html)

- Aligns the mentioned `child` widget at the center of the corresponding parent Widget

### `SafeArea()` [(docs)](https://api.flutter.dev/flutter/widgets/SafeArea-class.html)

- Insets its `child` by sufficient padding to avoid intrusions by the operating system.
- It will indent the child by enough to **avoid the status bar** at the top of the screen. It will also indent the child by the amount necessary to **avoid the notch** or other similar creative physical features of the display.

---

<details>
<summary>
<code>margin</code> or <code>padding</code> :
</summary>

- `EdgeInsets.all(8)`
- `EdgeInsets.symmetric(vertical: 8, horizontal: 8)`
- `EdgeInsets.only(top: 8, bottom: 8, left: 10, right: 7)`

</details>

[**Conditionally show widget**](https://stackoverflow.com/questions/49713189/how-to-use-conditional-statement-within-child-attribute-of-a-flutter-widget-cen)

MaterialApp Button states: `MaterialStatePropertyAll()`. Refer [here](https://stackoverflow.com/questions/66542199/what-is-materialstatepropertycolor)

Widgets are always RE-built, NOT modified. So, all the fields are usually kept `final`. Refer [`final` vs `const` in Flutter](https://stackoverflow.com/a/53271272)
