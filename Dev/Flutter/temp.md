# Temp

> Design a ListView with dummy. On clicking it, it trainsitions to a Details screen (Scaffold, Column, Listview, Layouts, Buttons, Handle Tap events)

---

[Flutter Google CodeLabs](https://codelabs.developers.google.com/?product=flutter)

- Widgets, types, Stateful vs Stateless
- Add diff. assets
- Basic animations (AnimatedContainer)
- Create diff. UI screens
- Calculator App / Todo App
- Async/Await, Futures
- State Mgmt instead of Stateful widgets (Provider, Bloc, RiverPod, GetX)
- Consuming a APIs ([restexample.org](http://restexample.org/), [reqres.in](http://reqres.in/), Weather API, TMDB API), keep the data, store it in the State, Design Models for the JSON, Lists, HTTP requests
- Databases, Auth (Firebase, AppWrite, Supabase, …)
- E-commerce / Chat / Social media Apps
- Dependency injection
- Storage: local, SharedPrefs
- Security, Tokens, SQLite
- Connect with a backend
- Services, repos
- Clean code, MVVM, Bloc architectures
- Deploy IPA/APK to app store
- Adv. Animations (Rive/Lottie,...)
- Push Notifs, Logging(errors, crashes), remote servers

---

## YT Channels

- Akshit Madan
- The Flutter Way

[Build reactive mobile apps with Flutter (Google I/O '18)](https://youtu.be/RS36gBEp8OI?si=Soz7jQsRGLjbnH8P)

**[Flutter for web developers](https://docs.flutter.dev/get-started/flutter-for/web-devs)**

**[Flutter CookBook](https://docs.flutter.dev/cookbook)**

---

## Udemy Course resources

Git Repos:

[Flutter-Course-Resources (londonappbrewery)](https://github.com/londonappbrewery/Flutter-Course-Resources)

[App-Brewery-Flutter-Null-Safety](https://github.com/DetainedDeveloper/App-Brewery-Flutter-Null-Safety)

- Widgets, types, Stateful vs Stateless

[**Flutter Basics by a REAL Project - 2023**](https://www.youtube.com/watch?v=D4nhaszNW4o)

[**Flutter Clean Architecture | News App Project (YT Playlist)**](https://youtube.com/playlist?list=PLjyxas0TsCpnjpzCv3rnsX3LjS9G2K05f&si=IjuRPeZGl3pV4ybb)

---

**_Encoding_** or **_serialization_** => turning a data structure into a string.

**_Decoding_** or **_deserialization_** : turning a string into a data structure.

However, serialization also commonly refers to the entire process of translating data structures to and from a more easily readable format. To avoid confusion, this doc uses “serialization” when referring to the overall process, and “encoding” and “decoding” when specifically referring to those processes.

[**Material Design styles**](https://m3.material.io/styles)

### Libraries

[Rive](https://rive.app/) (animations)

[ServerPod](https://serverpod.dev/) (Dart backend server)

---

## Kylas Notes

### Kylas Setup

- Flutter version: `3.3.10`
- Build Command:

  ```dart
  flutter build apk --flavor=dev --release -t lib/main_dev.dart
  ```

- `Android 13`, API level `33` and min. `21`
- iOS `12`

---

[Plant App UI](https://flutterawesome.com/nice-clean-plant-app-ui-using-flutter-the-home-page-you-will-get-search-box-than-a-horizontal-list-of-recommended-plants/)

List, Button, ScrollView

PopUp

Alignment,Spacing

Flexible, Expandable

Padding

Container, box-decoration, shadow, Circular border

debugger before setState()
console.log ~ print()

File Separation

Searching:
Shift Shift
Ctrl Shift F
Ctrl Shift O

State
notifyListener
Provider, Consumer
builder

`getField(__).value`

<details>
<summary><b>Starter  <code>main.dart</code></b></summary>

```dart
import 'package:flutter/material.dart';

void main() {
    runApp(const MyApp());
}

class MyApp extends StatelessWidget {
    const MyApp({super.key});

    // This widget is the root of your application.
    @override
    Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
        ),
        home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
    }
}

class MyHomePage extends StatefulWidget {
    const MyHomePage({super.key, required this.title});

    // This widget is the home page of your application. It is stateful, meaning
    // that it has a State object (defined below) that contains fields that affect
    // how it looks.

    // This class is the configuration for the state. It holds the values (in this
    // case the title) provided by the parent (in this case the App widget) and
    // used by the build method of the State. Fields in a Widget subclass are
    // always marked "final".

    final String title;

    @override
    State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
    int_counter = 0;

    void _incrementCounter() {
    setState(() {
        // This call to setState tells the Flutter framework that something has
        // changed in this State, which causes it to rerun the build method below
        // so that the display can reflect the updated values. If we changed
        // _counter without calling setState(), then the build method would not be
        // called again, and so nothing would appear to happen.
        _counter++;
    });
    }

    @override
    Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
        appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
        ),
        body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
            // Column is also a layout widget. It takes a list of children and
            // arranges them vertically. By default, it sizes itself to fit its
            // children horizontally, and tries to be as tall as its parent.
            //
            // Invoke "debug painting" (press "p" in the console, choose the
            // "Toggle Debug Paint" action from the Flutter Inspector in Android
            // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
            // to see the wireframe for each widget.
            //
            // Column has various properties to control how it sizes itself and
            // how it positions its children. Here we use mainAxisAlignment to
            // center the children vertically; the main axis here is the vertical
            // axis because Columns are vertical (the cross axis would be
            // horizontal).
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
            const Text(
                'You have pushed the button this many times:',
            ),
            Text(
                '$_counter',
                style: Theme.of(context).textTheme.headlineMedium,
            ),
            ],
        ),
        ),
        floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
        ), // This trailing comma makes auto-formatting nicer for build methods.
    );
    }
}
```

</details>
