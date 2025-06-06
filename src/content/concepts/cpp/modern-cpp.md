---
title: Modern C++ features
tags: [cpp]
---

## `auto` keyword for type inference

```cpp
struct Point {
    int x, y;
    char name;
    Point (char _name, int _x, int _y) : name(_name), x(_x), y(_y) {}
};

int main () {
    auto a = 5;                   // int
    const auto b = 3.14;          // const double
    auto pr = make_pair(2, 'K');  // pair<int,char>
    auto s = "Hello World";       // const char*
    auto arr = new int[5];        // int*
    auto pt = Point('A', 3, 5);   // Point

    auto nums = vector<int>{1, 2, 3, 4};  // vector<int>
    cout << "[ ";
    for (const auto &x : nums) {  // const int&
        cout << x << ", ";
    }
    cout << "]" << endl;  // [ 1, 2, 3, 4, ]

    return 0;
}

```

## Lambda functions

**Syntax**: `[capture_list] (params) {...} (args)`

Use `[capture_list] (params) -> returnType {...} (args)` if you want to explicitly specify return-type

```cpp title="Lambda functions"
// Define and call
[](int a, int b){ cout << "Sum: " << a + b << endl; }(3, 6);
// Sum: 9

// Define, call and store result
int res = [](int a, int b){ return a + b; }(2, 5);
cout << "Result: " << res << endl;
// Result: 7

// Store reference to function definition
auto add = [](int a, int b){ return a + b; };
int ans = add(1, 4);
cout << "add(1,4): " << ans << endl;
// add(1,4): 5

// Explicitly specify return-type
int product = [](int a, int b) -> int { return a * b; }(3, 4);
cout << "Product: " << product << endl;
// Product: 12
```

## Smart Pointers

These pointers safely handle automatic memory deallocation for objects that are no longer being referenced

- [`unique_ptr`](https://en.cppreference.com/w/cpp/memory/unique_ptr) : Only ONE pointer allowed to access the object
- [`shared_ptr`](https://en.cppreference.com/w/cpp/memory/shared_ptr) : Multiple pointers can access the object. Reference counter maintained
- [`weak_ptr`](https://en.cppreference.com/w/cpp/memory/weak_ptr) : Similar to `shared_ptr` but no reference counter maintained. Pointer doesn't have strong hold of objects. Prevents deadlocks

## Structured Binding

- Introduced in `C++17`, structured bindings provide a concise and expressive way to **unpack elements** of structured objects (arrays, tuples, maps etc.) and user-defined classes into separate variables. It's similar to **destructuring** in Javascript
- **Type safety**: Variables are implicitly deduced to the correct types
- Can either create references to items in the structure or create new variables of values copied from the structure
- **Syntax**:

  ```cpp title="Structured binding"
  // For creating new variables from the structure
  auto [var1, var2, ...] = structured_data;

  // For extracting references to items in the structure
  auto &[ref1, ref2, ...] = structured_data;
  ```

- **Examples**:

  ```cpp title="Tuples, extracting copy of variables"
  tuple<int, double, string> myTuple(420, 3.14159, "Hello World");

  // Creates variables x,y,z of type int, double, string respectively
  auto [x, y, z] = myTuple;

  cout << x << " " << y << " " << z << endl;
  // Output: 420 3.14159 Hello World
  ```

  ```cpp title="Maps, extracting references"
  map<int, string> mp{
    {5, "aeyo"}, {1, "bruh"}, {9, "dawg"}, {5, "gotem"}, {4, "nope"},
  };

  // Uses reference to each key,value entry in map
  for (auto &[key, val] : mp) {
    cout << key << " -> " << val << endl;
  }

  /* Output:
  1 -> bruh
  4 -> nope
  5 -> aeyo
  9 -> dawg
  */
  ```

  ```cpp title="Custom data-types"
  struct Point {
    int x, y;
    Point(int n1, int n2) : x(n1), y(n2) {}
  };

  int main() {
    auto myPair = make_pair(Point(2, 3), 'z');

    auto &[myPoint, alphabet] = myPair;
    cout << myPoint.x << " " << myPoint.y << " " << alphabet << endl;
    // 2 3 z

    auto &[x_coord, y_coord] = myPoint;
    cout << x_coord << " " << y_coord << endl;
    // 2 3

    return 0;
  }
  ```
