# BLoC widgets in Flutter

`flutter_bloc` [(pub.dev)](https://pub.dev/packages/flutter_bloc#bloc-widgets)

| Bloc Widget    | Purpose                                                  |
| -------------- | -------------------------------------------------------- |
| `BlocListener` | Call function on state change                            |
| `BlocBuilder`  | Return a widget on state change                          |
| `BlocConsumer` | Call functions as well as return widgets on state change |

## `BlocListener` vs `BlocBuilder` vs `BlocConsumer`

### `BlocListener`

- invokes the `listener` in response to `state` changes in the bloc
- should be used for functionality that needs to occur only in response to a `state` change (**navigation**, show `SnackBar` or `Dialog`)
- the `listener` is guaranteed to only be called once for each `state` change unlike the `builder` in `BlocBuilder`

```dart
BlocListener<BlocA, BlocAState>(
    // value: blocA,  // ONLY to provide a bloc that is otherwise not accessible via BlocProvider and the current BuildContext
    listener: (context, state) {
        // do stuff here based on BlocA's state
    },
    child: Container(),
    // listenWhen: (previous, current) {...}, // More granular control over when listener is called
)
```

> Use `BlocListener` if you want to **do** anything in response to `state` changes

---

### `BlocBuilder`

- Handles building a widget in response to new `states`
- If the `bloc` parameter is omitted, `BlocBuilder` will automatically perform a lookup using `BlocProvider` and the current `BuildContext`

```dart
BlocBuilder<BlocA, BlocAState>(
    builder: (context, state) {
    // return widget here based on BlocA's state
    }
    // bloc: blocA, // ONLY to provide a bloc that is otherwise not accessible via **BlocProvider** and the current **BuildContext**
    // buildWhen: (previous, current) {...}, // More granular control over how often **BlocBuilder** rebuilds
)
```

> Can use a `BlocBuilder` inside a `BlocListener`

### `BlocConsumer`

- exposes a `builder` and `listener` in order react to new `state`
- analogous to a nested `BlocListener`**and**`BlocBuilder` but reduces the amount of boilerplate needed
- should ONLY be used when it is necessary to both **rebuild UI AND execute other reactions to state changes in the bloc**

```dart
BlocConsumer<BlocA, BlocAState>(
    listener: (context, state) {
        // do stuff here based on BlocA's state
    },
    builder: (context, state) {
        // return widget here based on BlocA's state
    }
    // Optionally, 'listenWhen' and 'buildWhen' can be implemented for more granular control over when 'listener' and 'builder' are called
)
```

> `builder` executes **always**, but <br> `listener` executes **ONLY** when some **state is emitted**

---
