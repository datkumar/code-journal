---
title: Differences in Java & C++
tags: [java, cpp]
---

## Memory Allocation

- In C++, you can allocate any type of variable on the stack as well as heap with use of pointers for manual memory management
- In Java, only primitive type variables and references can be allocated on the stack and the pointed data by the references is stored in heap. The garbage collector handles deallocation of unused variables

## Type-inference

The `var` keyword in Java and `auto` keyword in C++ are used for type-inference

## Equality Check

- The `==` operator in C++ checks if the **values** at both variables are the same
- The `==` operator in Java checks if both variables **point to the same location**. To check if the values at both variables are the same, use the `.equals()` method

## Arrays

Arrays are passed by reference to functions in Java as well as C++. Arrays are of fixed size and store only one type of elements in both

```java title="Arrays in Java"
// 'arr', 'brr', 'crr', 'drr' are reference variables stored in the stack
// The corresponding array of integers they are pointing to are stored in the heap
int arr[] = { 1, 2, 3, 4 };
int brr[] = new int[10];
int crr[] = new int[]{ 1, 2, 3, 4 };
int drr[]; // null reference (not pointing to anything)
// Must provide dimensions or initialize elements, but NOT both
// These ways are invalid:
//      int frr[] = new int[4]{1,2,3,4};
//      int grr[4] = new int[];
```

```cpp title="Arrays in C++"
// Array allocation on Stack:
int xrr[5];
int arr[] = {1, 2, 3, 4};
int mrr[10] = {1, 2, 3, 4};
int krr[]{1, 2, 3, 4};
int nrr[10]{1, 2, 3, 4};

// Array allocation on Heap:
int *brr = new int[10];
int *crr = new int[10]{1, 2, 3, 4};

int *prr[5];               // Array of 5 pointers-to-int
int **pprr = new int *[5]; // Dynamic array of 5 pointers-to-int
```

If we have an array `arr` of integers, it's size is given by:

- In C++ : `int n = sizeof(arr) / sizeof(int)` when array is created on stack
- In Java : `int n = arr.length` ... an array is also an object in Java having properties like `length` to it

> **Note**: There is **no way** to calculate **size of dynamic array** in C++

```cpp title="C++ Dynamic array traversal"
int *arr = new int[5]{1, 2, 3};
cout<< sizeof(arr) / sizeof(int) << endl;  // 2 (size of pointer type)
cout<< sizeof(*arr) / sizeof(int) << endl; // 1 (size of element at the address it pointed to)

// Traversal when size is known
for (int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}
cout << endl;
// Output: 1 2 3 0 0
```

In resizeable arrays like `vector` of C++ and `ArrayList` of Java, the number of elements is given by the `.size()` member function

### 2D Arrays

```cpp title="2D array in C++"
int mat1[2][3];
int(*mat2)[3] = new int[2][3];

int mat[][3]{
    {1, 2, 3},
    {4, 5, 6},
};
for (int(&row)[3] : mat) {
    for (int x : row) {
        cout << x << " ";
    }
    cout << endl;
}
// Can also write outer loop as:
// for(auto &row : mat) {...}
```

```java title="2D array in Java"
int mat1[][] = new int[2][3];
int mat3[][] = new int[2][];

int mat[][] = {
    { 1, 2, 3 },
    { 4, 5, 6 },
};
for (int[] row : mat) {
    for (int val : row) {
        System.out.print(val + " ");
    }
    System.out.println();
}
// Can also write fouter loop as:
// for(var row : mat) {...}
```

Both C++ and Java codes above produce the output:

```txt
1 2 3
4 5 6
```

#### Jagged 2D arrays

```cpp title="Jagged 2D array in C++"
int rowCount = 4;
int *jagged[rowCount];

jagged[0] = new int[3]{1, 2, 3};
jagged[2] = nullptr;
jagged[3] = new int[2];
jagged[1] = new int[5]{1, 2};
```

We can create jagged arrays in C++ but there is no automatic way to print them since we cannot calculate the number of elements present in a particluar row as that array is dynamic array. Vectors might be more suited in this case.

In Java, however, we can easily create and traverse jagged arrays

```java title="Jagged 2D array in Java"
int rowCount = 4;
int jagged[][] = new int[rowCount][];

jagged[0] = new int[3];
jagged[1] = new int[] { 1, 2, 3, 4 };
jagged[3] = new int[2];

for (var row : jagged) {
    if (row != null) {
        for (int val : row) {
            System.out.print(val + " ");
        }
    }
    System.out.println();
}
// Output:
// 0 0 0
// 1 2 3 4
//
// 0 0
```
