---
title: C++ STL Containers
tags: [cpp, stl, containers]
---

A container is a holder object that stores a collection of other objects (its elements). They are implemented as class templates, which allows great flexibility in the types supported as elements.

The container manages the storage space for its elements and provides member functions to access them, either directly or through iterators (reference objects with similar properties to pointers).

## Sequence containers

These containers implement data structures that can be **accessed sequentially**.

| Sequence Container | Details                  |
| :----------------: | ------------------------ |
|      `array`       | Static contiguous array  |
|      `vector`      | Dynamic contiguous array |
|      `deque`       | Double-ended queue       |
|   `forward_list`   | Singly-linked list       |
|       `list`       | Doubly-linked list       |

## Associative containers

### Ordered Associative containers

- These associative containers **sorted data structures that can be quickly searched**
- Operations typically have **`O(logN)`** time complexity

| Associative Container | Details                                                        |
| :-------------------: | -------------------------------------------------------------- |
|         `set`         | Collection of unique keys, sorted by keys                      |
|         `map`         | Collection of key-value pairs, sorted by keys, keys are unique |
|      `multiset`       | Collection of keys, sorted by keys                             |
|      `multimap`       | Collection of key-value pairs, sorted by keys                  |

### Unordered (i.e. Hashed) Associative containers

- These associative containers implement **unsorted (hashed) data structures that can be quickly searched**
- Operations typically have **`O(1)` amortized** and **`O(n)` worst-case** time complexity

|   Hashed Container   | Details                                                        |
| :------------------: | -------------------------------------------------------------- |
|   `unordered_set`    | Collection of unique keys, hashed by keys                      |
|   `unordered_map`    | Collection of key-value pairs, hashed by keys, keys are unique |
| `unordered_multiset` | Collection of keys, hashed by keys                             |
| `unordered_multimap` | Collection of key-value pairs, hashed by keys                  |

## Container adapters

They provide a different **interface for sequential containers**

| Container Adapter | Details                                                           |
| :---------------: | ----------------------------------------------------------------- |
|      `stack`      | Adapts a container to provide **Stack** (**LIFO** data structure) |
|      `queue`      | Adapts a container to provide **Queue** (**FIFO** data structure) |
| `priority_queue`  | Adapts a container to provide **Heap**                            |

---

### Sequence and Ordered containers

<img alt="Sequence and Ordered containers" src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200219122358/Sequence-and-Unordered-Containers-in-C-STL.png">

### Adaptive and Unordered Containers

<img alt="Adaptive and Unordered Containers" src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200219122316/Adaptive-and-Unordered-Containers-in-C-STL.png">
