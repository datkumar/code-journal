# Note

[Can use ONE controller for ONLY ONE Textfield](https://stackoverflow.com/questions/58359607/using-texteditingcontroller-more-than-once)

## Doubts

**Access control**: public, private, final, static, late, getters-setters

**Dart Constuctor**: private constructor, factory method

[Constructors in Dart](https://dart.dev/language/constructors)

[`factory` Constructor](https://dart-tutorial.com/object-oriented-programming/factory-constructor-in-dart/) and [it's purpose](https://stackoverflow.com/a/56107639)

[Implementing Singleton in Dart](https://stackoverflow.com/questions/12649573/how-do-you-build-a-singleton-in-dart)

[Super-script and sub-script](https://medium.com/@anna_muzykina/superscript-and-subscript-text-in-flutter-2d4f76ef18d3)

[Widget layouts guide](https://docs.flutter.dev/ui/layout#lay-out-multiple-widgets-vertically-and-horizontally)

[Center an overlapping widget inside Stack](https://stackoverflow.com/questions/50819354/flutter-position-stack-widget-in-center)

[Text-wrap](https://stackoverflow.com/questions/51930754/flutter-wrapping-text)

[Conatiner width - match with parent](https://stackoverflow.com/questions/57419127/flutter-how-create-container-with-width-match-parent)

---

## Scaffold

Inside the _state_ class of Stateful Widget:

```dart
int _currentPageIndex = 0;
/// To maintain context across different parts inside the Scaffold
final GlobalKey<ScaffoldState> _key = GlobalKey();

@override
Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: ,
        appBar: AppBar(
            leading: ,
            title: ,
            centerTitle: ,
            actions: <Widget>[...],
            elevation: ,
            backgroundColor: ,
            foregroundColor: ,
            iconTheme: ,
        ),
        bottomNavigationBar: NavigationBar(
            selectedIndex: _currentPageIndex,
            onDestinationSelected: (idx){
                setState(() => _currentPageIndex = idx);
            },
            destinations: [
                NavigationDestination(
                    icon: ,
                    label: ,
                ),
                NavigationDestination(...),
            ],

        ),
        drawer:
        body: <Widget>[...][_currentPageIndex],

    );
}
```

### Theme for bottom navbar

```dart
bottomNavigationBar: NavigationBarTheme(
    data: NavigationBarThemeData(...),
    child: NavigationBar(...),
),
```

### Generate multiple widgets of a type

```dart

/// Symptom Options scrollview
return Expanded(
    child: ListView.builder(
    /// To avoid default padding applied at the ends of ListView
    padding: const EdgeInsets.all(0),
    shrinkWrap: true,
    itemCount: allSymptoms.length,
    itemBuilder: (context, index) {
            return OptionSelection(
                title: allSymptoms[index].label,
                svgAssetPath: allSymptoms[index].svgAssetPath,
                onChangeCallback: () {
                    toggleSymptomStatus(allSymptoms[index]);
                },
                width: tileWidth,
                contentPadding: tileContentPadding,
            );
        },
    ),
),
```

### Using `List.generate()`

```dart
final items = List.generate(
    10,
    (idx) => Text('Item $idx')
);

return Column(
    children: items,
);
```

### Using `for` loop

```dart
final names = ['Alice', 'Bob', 'Charlie'];

return Column(
    children: [
        for (final name in names) {
            Text(name),
        },
    ],
);
```

---

- `InkWell` and `GestureDetector` are quite similar but use `InkWell` when you want a **Ripple effect** and `GestureDetector` when you want to handle a **variety of gestures** like pinch, swipe, touch

---

[Project requires newer version of Kotlin](https://stackoverflow.com/questions/70919127/your-project-requires-a-newer-version-of-the-kotlin-gradle-plugin-android-stud)
