---
title: Constants in C++
tags: [cpp]
---

## Where to use `const` in C++

### 1. Constant Values

Use `const` to declare variables whose **values should not change after initialization**. This enhances code readability, maintainability, and helps prevent accidental modifications.

```cpp
const int PI = 3.14159;
const string NAME = "Alice";
```

### 2. Function Parameters

Declare function parameters as `const` if you **don't intend to modify them within the function**. This protects the original values passed to the function and can potentially improve compiler optimizations.

```cpp
void printMessage(const string &message) {
    // Use message without modifying it
    cout << message << endl;
}

int add(const int a, const int b) {
    return a + b;
}
```

### 3. Return Values of Functions

Declare **functions returning constant values (or objects)** as `const`. This guarantees callers won't be able to modify the returned value through a non-const reference.

```cpp
const vector<int>& getNumbers() const {
    // ... fill the vector with values
    return numbers;
}

const int* findMax(const int* arr, int size) const {
    // ... find the maximum element
    return &maxElement;
}
```

### 4. Member Variables of Constant Objects

When declaring a member variable of a const object, make it const as well. This ensures consistency and prevents modification from within const member functions.

```cpp
class Car {
  public:
    const string model;  // Constant member variable

    // ... other members
};

const Car myCar = {"Tesla Model S"};  // Create a const Car object
// myCar.model cannot be modified (it's const)
```

### 5. Member Functions of Constant Objects

If a member **function doesn't modify the object's state**, declare it as `const`. This ensures the function can be called on constant objects and prevents accidental modifications

```cpp
class Point {
  public:
    int x, y;
    const int getX () const { return x; }  // Doesn't modify state
    void setX (int val) { x = val; }       // Modifies state
};
```

### 6. Pointers and References to Constant Data

Use `const` to declare **pointers or references to constant data**. This enforces that the data pointed to or referred to cannot be modified.

```cpp
const int *ptr = &PI;      // Pointer to constant integer
const string &ref = NAME;  // Reference to constant string

// *ptr cannot be modified (PI is constant)
// ref cannot be used to modify NAME
```

## General Guidelines

- **Favor `const`**: By default, consider making variables, parameters, and return values const unless there's a specific reason to modify them. This promotes **immutability** and prevents unintended side-teffects.

- **Clarity and Encapsulation**: Using `const` effectively can improve code clarity by signaling to the reader that certain values or objects are not meant to be changed. It also strengthens encapsulation by restricting access to internal data.

- **Performance Optimization**: In some cases, the compiler can optimize code based on the use of const, as it knows the values won't change.

## Additional Considerations

- `const_cast`: This operator should be used cautiously, as it can bypass the constness of a value and potentially lead to unexpected behavior. Use it only when absolutely necessary and understand the potential risks.
- **Smart Pointers**: Consider using smart pointers like `unique_ptr` and `shared_ptr` to manage memory ownership and prevent memory leaks. They can handle const correctness automatically.

Also refer [`constexpr`](https://en.cppreference.com/w/cpp/language/constexpr)

By effectively using `const` in your C++ code, you'll enhance code reliability, maintainability, and potentially improve performance.
