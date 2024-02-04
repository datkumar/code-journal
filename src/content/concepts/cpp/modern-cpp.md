---
title: Pointers
tags: [cpp, modern-cpp]
---

## `auto` keyword for type inference

## Lambda functions

Syntax: `[capture_list] (params) -> returnType { ..body.. } (args)`

## Smart Pointers

- `unique_ptr` : Only ONE pointer allowed to access the object

- `shared_ptr` : Multiple pointers can access the object. Reference counter maintained

- `weak_ptr` : Similar to `shared_ptr` but no reference counter maintained. Pointer doesn't have strong hold of objects. Prevents deadlocks

## Structured Binding

- Structured Bindings, introduced in `C++17`, provide a concise and expressive way to **unpack elements** of structured objects (arrays, tuples, maps, etc.) and user-defined classes into separate variables
- Type safety: Variables are implicitly deduced to the correct types
- Can either create references to items in the structure or create new variables of values copied from the structure

- **Syntax**:

  ```cpp
  // For creating new variables from the structure
  auto [var1, var2, ...] = structured_data;

  // For only extracting references to items in the structure
  auto &[ref1, ref2, ...] = structured_data;
  ```

- **Examples**:

  Tuples + creating new variable copies:

  ```cpp
  tuple<int, double, string> myTuple(420, 3.14159, "Hello World");

  auto [x, y, z] = myTuple;
  // Creates variables x,y,z of type int, double, string respectively
  cout << x << " " << y << " " << z << endl;

  /* Output:
  420 3.14159 Hello World
  */
  ```

  Maps + only extracting references:

  ```cpp
  map<int,string> mp{
    {5, "aeyo"},
    {1, "bruh"},
    {9, "dawg"},
    {5, "gotem"},
    {4, "nope"},
  };

  for(auto &[key, val] : mp){
    cout<< key << " -> "<< val << endl;
  }

  /* Output:
  1 -> bruh
  4 -> nope
  5 -> aeyo
  9 -> dawg
  */
  ```

  Custom Data types:

  ```cpp
  struct Point{
    int x,y;
    Point(int n1, int n2) : x(n1), y(n2) {}
  };

  int main(){
    auto myPair = make_pair( Point(2,3), 'z');

    auto &[myPoint, alphabet] = myPair;
    cout<< myPoint.x <<" "<< myPoint.y <<" "<< alphabet <<endl;
    // 2 3 z

    auto &[x_coord, y_coord] = myPoint;
    cout<< x_coord <<" "<< y_coord <<endl;
    // 2 3

    return 0;
  }
  ```
