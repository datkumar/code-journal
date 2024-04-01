---
title: Design a dynamic (resizable) array
links: [https://neetcode.io/problems/dynamicArray]
ds: [array]
techniques: [design]
level: 0
---

## Problem Statement

Design a Dynamic (resizable) Array class, such as an `ArrayList` in Java or a `vector` in C++

Your `DynamicArray` class should support the following operations:

- `DynamicArray(int capacity)` will initialize an empty array with a capacity of capacity, where capacity > 0.
- `int get(int i)` will return the element at index i. Assume that index i is valid.
- `void set(int i, int n)` will set the element at index i to n. Assume that index i is valid.
- `void pushback(int n)` will push the element n to the end of the array.
- `int popback()` will pop and return the element at the end of the array. Assume that the array is non-empty.
- `void resize()` will double the capacity of the array.
- `int getSize()` will return the number of elements in the array.
- `int getCapacity()` will return the capacity of the array.

If we call `pushback(int n)` but the array is full, we should resize the array first.

## Solution

Also refer this GFG article: [Implement your own Vector class](https://www.geeksforgeeks.org/how-to-implement-our-own-vector-class-in-c/)

```cpp
class DynamicArray
{
    int *arr;     // Points to block of heap memory containing array elements
    int size;     // Number of filled elements
    int capacity; // Total elements the current array can hold

public:
    // Parameterized constructor initialization
    DynamicArray(int _capacity) : size(0), capacity(_capacity){
        arr = new int[_capacity];
    }

    // Get size and capacity of current array
    int getSize() { return size; }
    int getCapacity() { return capacity; }

    // Get/Set element at index 'i' (Assuming index within bounds)
    int get(int i) { return arr[i]; }
    void set(int i, int n) { arr[i] = n; }

    void resize()
    {
        int *old = arr;              // To keep track of existing elements
        arr = new int[capacity * 2]; // Set current array as new double-capacity one
        for (int i = 0; i < size; i++){
            // Copy elements from existing array into new one
            arr[i] = old[i];
        }
        capacity *= 2; // Capacity doubles (size unchanged)
        delete[] old;  // De-allocate previous array's memory
    }

    void pushback(int val)
    {
        // Fully-filled, no space in current array
        if (size == capacity){
            resize();
        }
        // Last element present at 'size-1' index. Insert after it
        arr[size] = val;
        size++;
    }

    int popback()
    {
        // Mark filled elements as one less from end
        if (size > 0){
            size--;
        }
        return arr[size];
    }
};
```
