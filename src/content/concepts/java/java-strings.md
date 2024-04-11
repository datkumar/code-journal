---
title: Strings in Java
tags: [java]
---

Strings in java might not be you expect:

- Strings in Java are **objects** of `String` class
- The objects created of `String` class are **immutable**.

When we create a string as `String str = "hello"`, an object of `String` class gets created in Heap with it's location being stored in stack reference variable `str`. The object holds the string literal "hello"

In Java, all such string literal objects are stored in a **String Constants Pool (SCP)** on the heap. When we create another string of same value, only a new reference variable is created and it points to the old existing literal in SCP. In other words, **new `String` objects are not created**.

However, when we create `String` object via `new` keyword explicitly as `String str2 = new String("hello")`, a new object is created and stored on the **Heap but NOT stored in SCP**. A separate object is created for each such string creation

Java `String` class also provides the `intern()` method that can be used to **create or refer to string objects guarenteed to be in the SCP** when we create string via the `new` keyword. Such a string can be created as `String str3 = new String("hello").intern()`

```java
String s1 = "abc";
String s2 = "abc";
String s3 = new String("abc");
String s4 = new String("abc").intern();
String s5 = new String("abc");

if (s2 == s1) System.out.println("s1 and s2 point to SAME location");
else System.out.println("s1 and s2 point to DIFFERENT location");
// Output: s1 and s2 point to SAME location

if (s3 == s1) System.out.println("s1 and s3 point to SAME location");
else System.out.println("s1 and s3 point to DIFFERENT location");
// Output: s1 and s3 point to DIFFERENT location

if (s4 == s1) System.out.println("s1 and s4 point to SAME location");
else System.out.println("s1 and s4 point to DIFFERENT location");
// Output: s1 and s4 point to SAME location

if (s5 == s3) System.out.println("s3 and s5 point to SAME location");
else System.out.println("s3 and s5 point to DIFFERENT location");
// Output: s3 and s5 point to DIFFERENT location
```

![Java String Pool](/code-journal/diagrams/java-string-creation.svg)

When we **change the value** of a string variable, a **new `String` object is created** (if value wasn't created before) and stored in the SCP. The reference variable that was pointing to old string object now points to the newly created object in SCP. The **old object is later deleted by garbage collector** as nothing is referencing it

![Java String Pool](/code-journal/diagrams/java-string-reassign.svg)

```java
String name = "Sam";
name = "Elon";
```

Thus, strings are said to be immutable in Java as the objects, once created, cannot be modidifed. A new object is created while changing it's value. The benefits of this approach are:

- **Efficient memory usage**: We avoid creting duplicate string objects when the value they hold is the same
- **Security**: The data in string object cannot be modified by malicious code
- **Thread-safety**: The various running threads can only access the string data not modify it
- **Performance**: JVM can do some optimizations

---

For mutable strings, use the [`StringBuffer`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html) or [`StringBuilder`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html) class
