---
title: Classes, Objects in Java & C++
tags: [oop, java, cpp]
---

In object-oriented programming (OOP), **real world entities** are represented as **objects**. Each entity will have certain properties and behaviour

## Class

- A **Class** is a **blueprint** design for creating objects of a kind
- It defines the properties (**data members** denoting **state**) and behaviour (**methods**) applicable to all instances of that class. Thus, each object will hold some data and code to manipulate that data

## Object

- Objects are runtime entities representing some real-world item
- Each **object** is an **instance** of it's class.It can also be seen as a variable of type as it's class.

We define the class once and then create as many object of it as we need. Object occupy memory as they are entities that phsically exist, while classes don't.

---

## Java example

```java
// Class definition of a person
class Person {
    private String name; // Data member

    // Constructor to initialize data member
    Person(String _name) {
        name = _name;
    };

    // Method
    void greet() {
        System.out.println("Hello " + name);
    }
}

class Demo {

    public static void main(String[] args) {
        // Creating object of "Person" class and storing reference to it
        Person p = new Person("Sam");

        // Calling "greet" method of "Person" class on object "p"
        p.greet();
        // Output: Hello Sam
    }
}
```

## C++ example

In C++, a `class` and `struct` are technically almost the same with the only difference being that the members are `private` by default inside a `class` and `public` by default inside a `struct`. But semantically, structs are used just as a combined block of data and classes are used for OOP features

```cpp
class Person
{
private:
    string name; // Data member

public:
    // Constructor to initialize data member
    Person(string _name) : name(_name) {}

    // Method
    void greet() {
        cout << "Hello " << name << endl;
    }
};

int main()
{
    // Creating object in Heap memory and storing it's reference in pointer
    Person *p1 = new Person("Sam");
    p1->greet();
    // Output: Hello Sam

    // Memory allocated on Heap has to be explicitly deallocated
    delete p1;

    // Creating object in Stack memory
    Person p2("Elon");
    p2.greet();
    // Output: Hello Elon

    return 0;
}
```
