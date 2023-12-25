# Flutter <img src='https://static-00.iconduck.com/assets.00/flutter-icon-1651x2048-ojswpayr.png' height="25">

[Dart programming language](./Dart/Dart.md)

[Learning Dart as a JavaScript developer](https://dart.dev/guides/language/coming-from/js-to-dart)

[Flutter for Web developers](./web-devs-guide.md)

**Learn Flutter** : [https://flutter.dev/learn](https://flutter.dev/learn)

**Flutter Clean Architecture**: [Part-1](https://devmuaz.medium.com/flutter-clean-architecture-series-part-1-d2d4c2e75c47) , [Part-2](https://devmuaz.medium.com/flutter-clean-architecture-series-part-2-bcdf9d38fe41)

---

## Editor Tips

- **Hot Reload** (`Ctrl` + `\`) : Re-runs the closest `build()` method
- **Hot Restart** (`Ctrl`+`Shift`+`\`) : Resets the _State_ of the App
- Add comma `,` after each closing parenthesis i.e. `),` or `],` for automatic **code-folding** while formatting

---

## Flutter CLI Commands [(docs)](https://docs.flutter.dev/reference/flutter-cli)

| Action                       | Command                                                     |
| ---------------------------- | ----------------------------------------------------------- |
| Check installed tooling      | `flutter doctor`                                            |
| Create new project           | `flutter create <DIR_NAME>`                                 |
| Specifying platforms         | `flutter create --platforms = android, ios, web <DIR_NAME>` |
| Get all project dependencies | `flutter pub get`                                           |
| View project dependencies    | `flutter pub deps`                                          |
| Add a project dependency     | `flutter pub add <PACKAGE_NAME>`                            |
| Add a dev dependency         | `flutter pub add -d <PACKAGE_NAME>`                         |
| Remove a dependency          | `flutter pub remove <PACKAGE_NAME>`                         |
| Delete old build files       | `flutter clean`                                             |
| Generate APK                 | `flutter build apk`                                         |

> Read more:

- [Flutter and the pubspec file](https://docs.flutter.dev/tools/pubspec)
- [Using packages](https://docs.flutter.dev/packages-and-plugins/using-packages#adding-a-package-dependency-to-an-app-using-flutter-pub-add)

---

### Imperative vs Declarative UI [(docs)](https://docs.flutter.dev/get-started/flutter-for/declarative)

- In Imperative UI, you **manually construct a full-functioned UI entity**, such as a `UIView` or equivalent, and **later mutate it using methods** and setters when the UI changes

    <img src='https://docs.flutter.dev/assets/images/docs/declarativeUIchanges.png' alt="Declarative UI examp">

  ```dart
  // Imperative style
  b.setColor(red)
  b.clearChildren()
  ViewC c3 = new ViewC(...)
  b.add(c3)
  ```

  You would typically go to `ViewB`’s owner and retrieve the instance `b` using selectors or with `findViewById` or similar, and invoke mutations on it (and implicitly invalidate it). You might also need to replicate this configuration in the constructor of `ViewB` since the source of truth for the UI might outlive instance `b` itself.

- In order to lighten the burden on developers from having to program how to transition between various UI states, **Flutter, by contrast, lets the developer describe the current UI state** and **leaves the transitioning to the framework**.
- In the declarative style, view configurations such as **Flutter’s Widgets are immutable** and are only lightweight _“blueprints”_. **To change the UI, a widget triggers a rebuild on itself and constructs a new Widget subtree**.

  ```dart
  // Declarative style
  return ViewB(
    color: red,
    child: const ViewC(),
  );
  ```

  Rather than mutating an old instance `b` when the UI changes, Flutter constructs new Widget instances. The framework manages many of the responsibilities of a traditional UI object (such as maintaining the state of the layout) behind the scenes with RenderObjects. RenderObjects persist between frames and Flutter’s lightweight Widgets tell the framework to mutate the RenderObjects between states. The Flutter framework handles the rest.
