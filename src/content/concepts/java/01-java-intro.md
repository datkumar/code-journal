---
title: Java Introduction
tags: [java]
---

## Brief history

It was created by **James Gosling** and Patrick Naughton, employees of **Sun Microsystems**, with support from Bill Joy, co-founder of Sun Microsystems. Sun officially presented the Java language at SunWorld on May 23, 1995. Then, in 2009, the **Oracle** company bought the Sun company, which explains why the language now belongs to Oracle.

## Features of Java

### 1. Platform-indepedent

Java source code is compiled into bytecode and that same bytecode can be run on any machine having a JVM. Thus, java is **write-once, run anywhere**.

### 2. Object-oriented

Java supports all OOP features. Everything is java is treated as an object of some class. In fact, all classes in Java inherit from the `java.lang.Object` class directly or inderectly (single-root hierarchy).

### 3. Compiled + Interpreted

The Java compiler compiles Java source code to bytecode and that bytecode is then interpreted by the JVM

### 4. Secure

The following characteristics of java make it secure:

- There is no manual memory management (like with pointers in C++), thereby reducing memory leaks or invalid memory access
- Java provides **garbage collector** to clean up variables that are no longer being used
- Static type-checking and extensive exception-handling

### 5. Distributed

We can create distributed applications in Java using tools like Remote Method Invocation and Enterprise Java Beans. It makes us able to access files and call methods from any machine connected over the network.

### 6. Multi-threaded

Java supports concurrent execution of two or more parts of a program for efficient CPU utilization. We can deal with many tasks at once by defining multiple threads. The main advantage of multi-threading is that it doesn't occupy memory for each thread.

### 7. Dynamic

The classes, interfaces, methods etc. are loaded dynamically by the JVM as required

### More features

- Simple and verbose
- Performant than other interpreted languages
- Robust and Portable

## JDK

The Java Development Kit (JDK) provides all the tools required for developing a Java application. It comes loaded with the Java compiler (`javac`), debugger (`jdb`), archiver (`jar`), documentation-generator (`javadoc`) and other useful tools. The JRE, which is required for running Java applications, is bundled as a part of JDK too.

## JVM

The Java Virtual MAchine (JVM) is an abstract machine i.e. it doesn't physically exist. It's a specification for providing a runtime environment in which bytecode can be executed. It is the heart of Java language. JVM loads, verifies and executes code in a runtime. It's main components are Class Loader, Memory areas and Execution Engine

## JRE

The Java Runtime Environment (JRE) is an implementation of JVM. It provides a runtime environment for executing bytecode. It consists of JVM, libraries and other packages required for execution

> **Note**: **JRE, JDK, JVM are platform-dependent** but Java is platform-independent. The bytecode once produced, can then be run on any platform having a JVM

## How Java code executes

![Java Architecture](/code-journal/diagrams/java-architecture.png)

### Sample Java program

```java title="Demo.java"
public class Demo {

    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

```sh title="bash"
javac Demo.java
# Compiles source code file Demo.java and generates Demo.class bytecode file

java Demo
# Loads an instance of JVM which then starts execution from psvm() method of Demo class
```

---

## Memory allocation in Java

- Primitive types (except arrays of them), local variables, method parameter (references) and reference variables can be stored in the Stack memory
- Strings, Arrays and Objects are stored in the Heap memeory with their reference being stored in the Stack (there is no explicit memory management via pointers in Java). The allocated data in heap is deallocated by the garbage collector when it is no longer being used

Also refer [memory layout of C/C++ program execution](/code-journal/cpp/cpp/memory-layout)

Helpful articles: [Baeldung](https://www.baeldung.com/java-stack-heap), [DigitalOcean](https://www.digitalocean.com/community/tutorials/java-heap-space-vs-stack-memory)

---

Futher Reading:

- [Baeldung: JVM vs JRE vs JDK](https://www.baeldung.com/jvm-vs-jre-vs-jdk)
- [GFG: JVM Architecture](https://www.geeksforgeeks.org/jvm-works-jvm-architecture/)
- [DZone: The JVM Architecture Explained](https://dzone.com/articles/jvm-architecture-explained)
- [javatpoint: JVM Architecture](https://www.javatpoint.com/jvm-java-virtual-machine)
- [DZone: Java Memory Management](https://dzone.com/articles/java-memory-management)
