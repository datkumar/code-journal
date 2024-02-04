---
title: Design a dynamic (resizable) array
links: [https://neetcode.io/problems/dynamicArray]
ds: array
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
class DynamicArray {
    int *arr;
    int size, capacity;

public:

    DynamicArray(int capacity) {
        arr = new int[capacity];
        size = 0;
        this->capacity = capacity;
    }

    int getSize() { return size; }

    int getCapacity() { return capacity; }

    int get(int i) {
        // Assume that index i is valid
        return arr[i];
    }

    void set(int i, int n) {
        // Assume that index i is valid
        arr[i] = n;
    }

    void resize() {
        // Holds old array
        int *old = arr;
        // Create new double-sized array
        arr = new int[capacity << 1];
        for(int i=0; i<size; i++){
            // Copy old's elements into new array
            arr[i] = old[i];
        }
        // Capacity doubles, size unchanged
        capacity *= 2;
        // De-allocate old array's memory
        delete []old;
    }

    void pushback(int n) {
        // Fully filled
        if(size == capacity){
            resize();
        }
        arr[size] = n;
        size++;
    }

    int popback() {
        int ans = arr[size-1];
        size--;
        return ans;
    }

};
```
