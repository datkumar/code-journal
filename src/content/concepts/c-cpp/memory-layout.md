---
title: Memory layout during execution of program
tags: [cpp]
---

## Sections of main-memory

The main-memory (RAM) is divided into following 4 sections during execution of C/C++ program

![Sections of main-memory](/code-journal/diagrams/memory-layout.svg)

## Code section

- Also known as **text**, it stores the **executable instructions** of your compiled **machine code**
- It is usually **read-only** (to prevent overwriting) and **shareable** (to maintain a single copy of frequently executed programs)

## Data section

It stores **static and global variables**. It is further categorised into 2 parts as:

1. **Initialized data**: Usually called simply as the data segment, it is a portion of the virtual address space of a program, which contains the global variables and static variables that are initialized by the programmer. The variables may be read-only or mutable

2. **Uninitialized data**: Often called the **BSS** segment, named after an ancient assembler operator that stood for “block started by symbol", the data in this segment is initialized by the kernel to arithmetic 0 before the program starts executing. Uninitialized data starts at the end of the data segment and contains all global variables and static variables that are initialized to zero or do not have explicit initialization in source code.

## Stack section

- Also known as the **Call Stack**, it stores local variables and function calls
- It is an implementation the of Stack data structure with a `top` pointer and _LIFO_ nature of operations
- The set of values pushed for each function call is known as it's **stack frame** or **activation record**. A stack frame consists of at least a return address. It is machine-dependent but usually contains:
  - **Return address** where the program should resume execution after the function returns
  - **Parameters** passed to the function call
  - **Local variables** declared within the function body (scope restricted just to the call)
- Whenever a function call is made, that call and the local variables associated with that scope are pushed on top. After the call is completed, those memory blocks are automatically popped from stack. Thus, the **allocation and deallocation is automatic** for stack memory.
- It typically grows backwards (from higher address to lower). The stack's element blocks are typically arranged **contiguously**, so there are lesser CPU cache misses
- The stack grows with each function call but it's total **size is fixed** at the start of program execution (depending on the OS, architecture etc.). If we allocate more memory than the stack size, we get stack **overflow** and thereby program crashes or unexpected behaviour. So avoid allocating very large chunks of memory
- Memory **access is faster** in Stack as there's just one move instruction on it's `top` pointer
- Memory allocated in stack is maintained only until the lifetime of that function call or block's scope. We **cannot persist** memory beyond it's scope

## Heap section

- It is **large pool of memory** available for dynamic memory allocation
- It's not related in any way to the Heap data structure
- It's size is set initially at the start of programs but it is **flexible** to grow as required during the runtime of program (as long as there's space available in RAM). So, heap memory is suited for allocating large chunks of memory
- Unlike stack memory, heap memory has to be **allocated and deallocated explicitly** by the programmer. If not deallocated, it can **persist outside scope** and that can cause **memory leaks**
- In C++, the heap memory is allocated via the `new` operator (or `malloc()` function in C) and deallocated via the `delete` operator (or `free()` function in C)
- There is **no contiguous allocation** of memory guaranteed on the heap
- The heap memory is typically accessed via **pointers**. The pointers are created in stack section and they point to data in heap memory i.e. **indirect access** of heap memory
- Heap section is common to all the shared libraries and dynamically loaded modules in a process.
- Modern C++ features like [smart pointers](/code-journal/cpp/cpp/modern-cpp/#smart-pointers) simplify the hassle of explicit management of heap memory

### Stack vs Heap memory

|                 | Stack memory                        | Heap memory                               |
| --------------: | ----------------------------------- | ----------------------------------------- |
|        **Size** | Fixed size limit                    | Flexible size                             |
|   **Managment** | Automatically managed               | Explicit allocation & deallocation        |
|      **Access** | Direct and faster access            | Indirect and slower access (via pointers) |
|  **Contiguous** | Stack frames allocated contiguously | No contiguous allocation guaranteed       |
| **Persistance** | Removed when out of scope           | Can persist out of scope                  |

> **Use Stack memory whenever possible** as it's fast and automatically-managed; unless you want to store large data or persist data beyond scopes, in which case use Heap memory

---

## Common memory mistakes

- Return pointer to a stack variable from inside of a helper function (After helper function executes, the pointed address' data will be popped and later overwritten)
- Dereferencing a null pointer or accessing pointer after the pointed heap memory has been freed (dangling pointer) causes undefined behaviour
- Assignment on an uninitialized pointer (good practice to set the pointer to `nullptr` when it isn't pointing to anything or if that heap memory has been freed)
- Segmentation fault i.e. `exit(139)` : program was trying to access a memory location not allocated to it, such as out-of-bounds index etc.

---

## References

- [CS 225 | Stack and Heap memory](https://courses.engr.illinois.edu/cs225/fa2022/resources/stack-heap/)
- [Alex Hyett | Stack vs Heap Memory - Simple Explanation](https://youtu.be/5OJRqkYbK-4?si=7b9991HqaajdFP8n)
- [The Cherno | Stack vs Heap Memory in C++](https://youtu.be/wJ1L2nSIV1s?si=ssRN5xR9bu5B0PnV)
- [mycodeschool | Pointers and dynamic memory - stack vs heap](https://youtu.be/_8-ht2AKyH4?si=sbf2vJ65_oHFpa2N)
- [Demystifying memory, code, and data size!](https://mirzafahad.github.io/2021-05-08-text-data-bss/)
- [GFG | Memory Layout of C Programs](https://www.geeksforgeeks.org/memory-layout-of-c-program/)
- [Understanding Memory Layout](https://www.linkedin.com/pulse/understanding-memory-layout-stack-heap-bss-data-text-segments-shah/)
