# C++ STL Containers

- [Vectors](./vectors.md)

---

A container is a holder object that stores a collection of other objects (its elements). They are implemented as class templates, which allows great flexibility in the types supported as elements.

The container manages the storage space for its elements and provides member functions to access them, either directly or through iterators (reference objects with similar properties to pointers).

## Sequence containers

Sequence containers implement data structures that can be accessed sequentially.

`array` : Static contiguous array

`vector` : Dynamic contiguous array

`deque` : Double-ended queue

`forward_list` : Singly-linked list

`list` : Doubly-linked list

## Associative containers

Associative containers implement sorted data structures that can be quickly searched (O(log n) complexity).

`set` : Collection of unique keys, sorted by keys

`map` : Collection of key-value pairs, sorted by keys, keys are unique .

`multiset` : Collection of keys, sorted by keys

`multimap` : Collection of key-value pairs, sorted by keys

## Unordered associative containers

Unordered associative containers implement unsorted (hashed) data structures that can be quickly searched i.e. `O(1)` amortized and `O(n)` worst-case complexity.

`unordered_set` : Collection of unique keys, hashed by keys.

`unordered_map` : Collection of key-value pairs, hashed by keys, keys are unique.

`unordered_multiset` : Collection of keys, hashed by keys

`unordered_multimap` : Collection of key-value pairs, hashed by keys

## Container adapters

They provide a different interface for sequential containers

`stack` : Adapts a container to provide stack (LIFO data structure)

`queue` : Adapts a container to provide queue (FIFO data structure)

`priority_queue` : Adapts a container to provide priority queue

---

### Adaptive and Unordered Containers

<img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200219122316/Adaptive-and-Unordered-Containers-in-C-STL.png">

### Sequence and Ordered containers

<img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200219122358/Sequence-and-Unordered-Containers-in-C-STL.png">
