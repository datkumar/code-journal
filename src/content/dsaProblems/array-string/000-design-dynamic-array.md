---
title: Design a Dynamic array
links: [https://neetcode.io/problems/dynamicArray]
ds: [array]
techniques: [design]
level: 0
---

## Problem Statement

Design a Dynamic (resizable) Array class, such as an `ArrayList` in Java or a `vector` in C++

Your `DynamicArray` class should support the following operations:

- `DynamicArray(int capacity)` will initialize an empty array with a capacity of `capacity`, where `capacity > 0`.
- `int get(int i)` will return the element at index i. Assume that index i is valid.
- `void set(int i, int n)` will set the element at index i to n. Assume that index i is valid.
- `void pushback(int n)` will push the element n to the end of the array.
- `int popback()` will pop and return the element at the end of the array. Assume that the array is non-empty.
- `void resize()` will double the capacity of the array.
- `int getSize()` will return the number of elements in the array.
- `int getCapacity()` will return the capacity of the array.

If we call `pushback(int n)` but the array is full, we should resize the array first.

## Implementation

```cpp title="Dynamic Array in C++ "
class DynamicArray {
  private:
    int* arr;      // Points to block of heap memory containing integer array elements
    int size;      // Number of filled elements
    int capacity;  // Total elements the current array can hold

  public:
    // Parameterized constructor (with default capacity fallback)
    DynamicArray (int _capacity = 1) : size(0), capacity(_capacity) {
        arr = new int[_capacity];  // Allocate memory equal to capacity
    }

    int getSize () const { return size; }
    int getCapacity () const { return capacity; }
    bool isEmpty () const { return (size == 0); }

    int get (int i) const {
        if (i < 0 || i > (size - 1)) {  // Bounds check before access
            throw std::out_of_range("DynamicArray::set:Index out of bounds");
        }
        return arr[i];
    }
    void set (int i, int n) {
        if (i < 0 || i > (size - 1)) {  // Bounds check before modification
            throw std::out_of_range("DynamicArray::set: Index out of bounds");
        }
        arr[i] = n;
    }

    // Double the capacity of existing array
    void resize () {
        int* old = arr;                                  // To keep track of existing elements
        arr = new int[2 * capacity];                     // Set current array as new one with double capacity
        for (int i = 0; i < size; i++) arr[i] = old[i];  // Copy individual elements into newer array
        capacity *= 2;                                   // Capacity doubles (size remains same as before)
        delete[] old;                                    // De-allocate previous array's memory
    }

    // Insert element at the end of array
    void pushback (int val) {
        if (size == capacity) {  // Filled elements over entire capacity
            resize();            // Need to expand array (double the capacity)
        }
        // Last element present at (size-1) index. Insert after it
        arr[size] = val;
        size++;
    }

    // Remove last element from array
    int popback () {
        if (size == 0) {  // Check any element exists before removing
            throw std::underflow_error("DynamicArray::popback: Cannot pop from an empty array");
        }
        size--;            // Mark filled elements as one less from the end
        return arr[size];  // One element after the current last element at [size-1]
    }

    // ============ FURTHER MEMORY MANAGEMENT IMPROVEMENTS ============

    // Destructor
    ~DynamicArray () {
        delete[] arr;  // Free heap memory allocated via "new"
    }

    // By "Rule of Three", we'd have to define the copy and copy assignment constructor too
    // If we include move semantics, it would become "Rule of Five"

    // Copy Constructor (Deep Cloning)
    DynamicArray (const DynamicArray& other) : size(other.size), capacity(other.capacity) {
        arr = new int[capacity];
        // Copy individual elements of other array into current
        for (int i = 0; i < size; ++i) arr[i] = other.arr[i];
    }

    // Copy Assignment Operator (Deep Cloning)
    DynamicArray& operator=(const DynamicArray& other) {
        if (this != &other) {
            // Create new array and copy individual elements into it
            int* newArr = new int[other.capacity];
            for (int i = 0; i < other.size; ++i) newArr[i] = other.arr[i];
            // Clean up old memory and set fields as per the new array
            delete[] arr;
            arr = newArr;
            size = other.size;
            capacity = other.capacity;
        }
        return *this;
    }
};
// Demo run:
int main () {
    DynamicArray arr(2);  // Initial capacity of 2
    cout << "capacity: " << arr.getCapacity() << ", size: " << arr.getSize() << ", isEmpty: " << arr.isEmpty() << endl;

    arr.pushback(10), arr.pushback(20);
    cout << "capacity: " << arr.getCapacity() << ", size: " << arr.getSize() << ", isEmpty: " << arr.isEmpty() << endl;

    arr.pushback(30);
    cout << "capacity: " << arr.getCapacity() << ", size: " << arr.getSize() << ", isEmpty: " << arr.isEmpty() << endl;

    cout << "arr.get(1): " << arr.get(1) << endl;
    arr.set(1, 99);
    cout << "arr.get(1): " << arr.get(1) << endl;

    try {  // Out of Bounds get() example:
        cout << "Attempting arr.get(25) ..." << endl;
        int temp = arr.get(25);
    } catch (const std::out_of_range& e) {
        cerr << "An exception occurred: " << e.what() << endl;
    }

    // Printing array:
    cout << "Array elements: [";
    for (int i = 0; i < arr.getSize(); i++) cout << arr.get(i) << ", ";
    cout << "]" << endl;

    cout << "\nCopy Constructor and Deep Cloning:" << endl;
    DynamicArray brr = arr;  // Invokes Copy Constructor
    brr.set(0, 45);          // Modify copy to prove it's a deep copy (independent)
    cout << "Original arr[0]: " << arr.get(0) << " (should be 10)" << endl;
    cout << "Copied   brr[0]: " << brr.get(0) << " (should be 45)" << endl;

    cout << "\nPopback and Underflow Exception:" << endl;
    try {  // Array has 3 elements. Try popping more than 3 times
        cout << "size: " << arr.getSize() << ", isEmpty: " << arr.isEmpty() << endl;
        cout << "Popping thrice.." << endl;
        arr.popback();
        arr.popback();
        arr.popback();
        // Array is now empty. Trying to pop again will trigger underflow.
        cout << "size: " << arr.getSize() << ", isEmpty: " << arr.isEmpty() << endl;
        cout << "Trying to pop from empty array..." << endl;
        arr.popback();
    } catch (const std::underflow_error& e) {
        cerr << "An exception occurred: " << e.what() << endl;
    }

    return 0;
}
```

```txt title="Output"
capacity: 2, size: 0, isEmpty: 1
capacity: 2, size: 2, isEmpty: 0
capacity: 4, size: 3, isEmpty: 0
arr.get(1): 20
arr.get(1): 99
Attempting arr.get(25) ...
An exception occurred: DynamicArray::set:Index out of bounds
Array elements: [10, 99, 30, ]

Copy Constructor and Deep Cloning:
Original arr[0]: 10 (should be 10)
Copied   brr[0]: 45 (should be 45)

Popback and Underflow Exception:
size: 3, isEmpty: 0
Popping thrice..
size: 0, isEmpty: 1
Trying to pop from empty array...
An exception occurred: DynamicArray::popback: Cannot pop from an empty array
```

We can also use template programming like `<template typename T=int> class DynamicArray` with `T* arr`for a more generic dynamic array class. Refer the GFG article [Implement your own Vector class](https://www.geeksforgeeks.org/how-to-implement-our-own-vector-class-in-c/) for it
