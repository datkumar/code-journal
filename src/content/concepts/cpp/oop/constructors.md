---
title: Constructors in C++
tags: [cpp, oop]
---

In C++, constructors are special member functions that are used for initializing objects of a class. Constructors are called automatically when an object is created, and they ensure that the object is in a valid state.

## Types of constructors in C++

1. **Default Constructor:**

   - A default constructor is one that takes no arguments.
   - It is automatically provided by the C++ compiler if you don't define any constructor for your class.
   - It initializes the members of the class to default values (e.g., `0` for numeric types, `nullptr` for pointers).

   Example:

   ```cpp
   class MyClass {
   public:
       MyClass() {
           // Default constructor
       }
   };
   ```

2. **Parameterized Constructor:**

   - A parameterized constructor takes one or more parameters/arguments, allowing you to initialize the object with specific values at the time of creation.
   - You define parameterized constructors based on the needs of your class.

   Example:

   ```cpp
   class Student {
   public:
       Student(string name, int age) {
           this->name = name;
           this->age = age;
       }
   private:
       string name;
       int age;
   };
   ```

3. **Copy Constructor:**

   - A copy constructor is used to create a new object as a copy of an existing object.
   - It takes a single argument of the same class type as the object being copied.
   - The copy constructor is invoked when an object is initialized with another object of the same class.

   Example:

   ```cpp
   class Point {
   public:
       Point(int x, int y) {
           this->x = x;
           this->y = y;
       }
       Point(const Point& other) {
           this->x = other.x;
           this->y = other.y;
       }
   private:
       int x;
       int y;
   };
   ```

4. **Constructor Overloading:**

   - C++ allows you to define multiple constructors for a class with different parameter lists. This is called constructor overloading.
   - Overloaded constructors provide flexibility when creating objects, as you can choose which constructor to use based on your needs.

   Example:

   ```cpp
   class Rectangle {
   public:
       Rectangle() {
           // Default constructor
       }
       Rectangle(int width, int height) {
           this->width = width;
           this->height = height;
       }
   private:
       int width;
       int height;
   };
   ```

5. **Copy Assignment Operator:**

   - While not technically a constructor, the copy assignment operator (`operator=`) is closely related to constructors.
   - It is used to assign the contents of one object to another after they have both been initialized.

   Example:

   ```cpp
   class String {
   public:
       // Constructor
       String(const char* str) {
           // Initialize from a C-style string
       }

       // Copy assignment operator
       String& operator=(const String& other) {
           // Assign the contents of 'other' to this object
           // ...
           return *this;
       }
   };
   ```

These are the main types of constructors in C++. By defining and using these constructors appropriately, you can control how objects of your class are initialized and ensure they are in a valid state for further operations.

---

> In C++, a **parameterized constructor does not automatically call the default constructor**. Each constructor in a C++ class is separate, and they are not automatically chained together. If you want to reuse the code of the default constructor within a parameterized constructor, you can do so explicitly by calling the default constructor from the parameterized constructor's member initializer list.

Here's an example:

```cpp
class MyClass {
public:
    // Default constructor
    MyClass() {
        // Default constructor code
    }

    // Parameterized constructor
    MyClass(int value) : MyClass() {
        // Call the default constructor explicitly
        // Additional parameterized constructor code
        this->value = value;
    }

private:
    int value;
};
```

---

## Member Initialization

In C++, there is no specific "shorthand" constructor syntax, but there is a convenient feature called the **member initializer list** that allows you to initialize class members directly within the constructor's declaration.

This is often considered a more efficient and cleaner way to initialize class members than using assignment statements in the constructor body. Here's how it works:

Consider a class with members `x` and `y`. You can initialize these members directly in the constructor using the member initializer list:

```cpp
class Point {
public:
    int x, y;

    Point(int n1, int n2) : x(n1), y(n2) {
        // Constructor body (if needed)
    }
};
```

In the above code, the `Point` constructor initializes the `x` and `y` members using the member initializer list, where `x(n1)` initializes `x` with the value of `n1`, and `y(n2)` initializes `y` with the value of `n2`.

This member initializer list syntax is a concise way to set the initial values of class members during object construction, and it's often preferred because it can lead to more efficient code since it avoids unnecessary default construction and assignment of members.

> **Use Member Initialization as it is faster than assignment inside the body of Constructor**

Refer [this question](https://stackoverflow.com/questions/1711990/what-is-this-weird-colon-member-syntax-in-the-constructor)

---
