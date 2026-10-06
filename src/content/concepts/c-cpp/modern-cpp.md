---
title: Modern C++ features
tags: [cpp]
---

**Contents**:

- [`auto` keyword for type inference](#auto-keyword-for-type-inference)
- [Lambda expressions](#lambda-expressions)
- [Structured Binding](#structured-binding)
- [Smart Pointers](#smart-pointers)

## `auto` keyword for type inference

CPP Reference: [Placeholder type specifiers](https://en.cppreference.com/w/cpp/language/auto.html)

```cpp title="'auto' type inference"
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

## Lambda expressions

CPP Reference: [Lambda expressions](https://en.cppreference.com/w/cpp/language/lambda.html)

**Syntax**: `[capture_list] (params) {...} (args)`

Use `[capture_list] (params) -> returnType {...} (args)` if you want to explicitly specify return-type

```cpp title="Lambda expressions"
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

## Structured Binding

CPP Reference: [Structured binding declaration](https://en.cppreference.com/w/cpp/language/structured_binding.html)

- Introduced in `C++17`, structured bindings provide a concise and expressive way to **unpack elements** of structured objects (arrays, tuples, maps etc.) and user-defined classes into separate variables. It's similar to **destructuring** in Javascript
- **Type safety**: Variables are implicitly deduced to the correct types
- Can either create references to items in the structure or create new variables of values copied from the structure
- **Syntax**:

  ```cpp title="Structured Binding syntax"
  // For creating new variables from the structure
  auto [var1, var2, ...] = structured_data;

  // For extracting references to items in the structure
  auto &[ref1, ref2, ...] = structured_data;
  ```

  ```cpp title="Structured Binding examples"
  // Custom data-type
  struct Point {
    int x, y;
    Point(int n1, int n2) : x(n1), y(n2) {}
  };

  int main() {
    // Tuples, extracting copy of variables
    tuple<int, double, string> myTuple(420, 3.14159, "Hello World");
    // Creates variables x,y,z of type int, double, string respectively
    auto [x, y, z] = myTuple;
    cout << x << " " << y << " " << z << endl;
    // Output: 420 3.14159 Hello World


    // Maps, extracting references
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

    // Extracting fields of custom "Point" data type
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

## Smart Pointers

These pointers safely handle automatic memory deallocation for objects that are no longer being referenced

These pointers safely handle automatic memory deallocation using the [RAII](https://en.cppreference.com/cpp/language/raii) idiom when objects are no longer referenced, eliminating memory leaks common with raw pointers (new/delete).

- [`unique_ptr`](https://en.cppreference.com/w/cpp/memory/unique_ptr) : Only **ONE** pointer allowed to access the object. Copying is disabled, but ownership can be transferred via `std::move`.
- [`shared_ptr`](https://en.cppreference.com/w/cpp/memory/shared_ptr) : **Multiple** pointers can access the same object. An internal **reference counter** tracks active owners; the resource is freed when the last `shared_ptr` goes out of scope.
- [`weak_ptr`](https://en.cppreference.com/w/cpp/memory/weak_ptr) : A **non-owning observer** companion to `shared_ptr`. It does not increment the strong reference counter and is primarily used to break cyclic dependencies, such as in deadlocks

<!-- TODO: Examples of Smart Pointers usage  -->

```cpp title="Smart Pointers usage example"
struct Resource {
    Resource () { cout << "Resource acquired" << endl; }
    ~Resource () { cout << "Resource destroyed" << endl; }
    void greet () { cout << "Hello from Resource!" << endl; }
};

int main () {
    {  // unique_ptr => Exclusive ownership
        cout << "==== UNIQUE POINTER BLOCK START ====" << endl;
        unique_ptr<Resource> ptr1 = make_unique<Resource>();
        ptr1->greet();

        // unique_ptr<Resource> ptr2 = ptr1;  // Throws error
        unique_ptr<Resource> ptr2 = move(ptr1);  // Ownership transferred
        if (!ptr1) {
            cout << "ptr1 is now null after move" << endl;
        }
        ptr2->greet();
        cout << "==== UNIQUE POINTER BLOCK END ====" << endl;
    }  // ptr2 goes out of scope here, resource is automatically destroyed

    {  // shared_ptr => Shared ownership with reference counting
        cout << "\n==== SHARED POINTER BLOCK START ====" << endl;
        shared_ptr<Resource> s1 = make_shared<Resource>();
        cout << "Use count after s1: " << s1.use_count() << endl;  // 1
        {
            shared_ptr<Resource> s2 = s1; // Shared ownership
            cout << "Use count inside inner block: " << s1.use_count() << endl;  // 2
        }  // s2 goes out of scope, reference count drops

        cout << "Use count after s2 destroyed: " << s1.use_count() << endl;  // 1
        cout << "==== SHARED POINTER BLOCK END ====" << endl;
    }  // s1 goes out of scope, resource is destroyed

    {  // weak_ptr => Non-owning observer
        cout << "\n==== WEAK POINTER BLOCK START ====" << endl;
        weak_ptr<Resource> w1;
        {
            auto sharedRes = make_shared<Resource>();
            w1 = sharedRes;  // Does not increment strong reference count
            cout << "Weak ptr expired? " << (w1.expired() ? "Yes" : "No") << endl;

            // Access resource via .lock() which returns a temporary shared_ptr
            if (auto tempShared = w1.lock()) {
                tempShared->greet();
            }
        }  // sharedRes goes out of scope, resource is destroyed here

        cout << "Weak ptr expired after scope? " << (w1.expired() ? "Yes" : "No") << endl;
        cout << "==== WEAK POINTER BLOCK END ====" << endl;
    }

    return 0;
}
```

```txt title="Output"
==== UNIQUE POINTER BLOCK START ====
Resource acquired
Hello from Resource!
ptr1 is now null after move
Hello from Resource!
==== UNIQUE POINTER BLOCK END ====
Resource destroyed

==== SHARED POINTER BLOCK START ====
Resource acquired
Use count after s1: 1
Use count inside inner block: 2
Use count after s2 destroyed: 1
==== SHARED POINTER BLOCK END ====
Resource destroyed

==== WEAK POINTER BLOCK START ====
Resource acquired
Weak ptr expired? No
Hello from Resource!
Resource destroyed
Weak ptr expired after scope? Yes
==== WEAK POINTER BLOCK END ====
```
