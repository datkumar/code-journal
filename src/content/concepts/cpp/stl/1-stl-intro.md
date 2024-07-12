---
title: STL - Introduction
tags: [cpp, stl]
---

**Importing** the library: `#include <bits/stdc++.h>`

The **Standard Template Library** (STL) is a set of C++ template classes and functions to provide several common programming data structures and algorithms

The main components of the C++ STL include:

## 1. Containers

- A container is a holder object that stores a collection of elements. They are implemented as class templates, which allows great flexibility in the types supported as elements.
- The container manages the storage space for its elements and provides member functions to access them, either directly or through iterators (reference objects with similar properties to pointers).
- Types of Containers:
  - [Sequence Containers and Adaptors](/code-journal/cpp/cpp/stl/4-sequence-containers)
  - [Associative Containers](/code-journal/cpp/cpp/stl/5-associative-containers)

## 2. Algorithms

Algorithms are functions that operate over the data stored in containers. The STL provides a wide range of algorithms for tasks such as sorting, searching, and modifying elements in containers. See [STL Algorithms](/code-journal/cpp/cpp/stl/6-algorithms)

## 3. Iterators

Iterators are objects that provide a way to access the elements of a container. They act as a generalization of **pointers** and allow algorithms to operate on different types of containers without knowing their implementation details

## 4. Function Objects

Function objects, also known as **functors**, are objects that can be used as function arguments to algorithms. They provide a way to pass a function to an algorithm, allowing you to customize its behavior
