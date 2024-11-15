---
title: Types of Polymorphism
tags: [oop, java, cpp]
---

<!-- TODO: Operator & Method overloading, method overriding (Java,C++)-->

**Polymorphism**, at its core, allows for flexible code in object-oriented programming. It essentially means "having many forms" and **lets objects or functions exhibit different behaviors in various contexts**. It enables code to be written in a more generic and flexible manner, allowing for more modular and extensible designs

Polymorphism is mainly of two types:

## 1. Compile-time polymorphism (Static binding)

Since the **compiler can definitively determine which function to call** based on the information available at the time of compilation, it's called static polymorphism. Static polymorphism is achieved via method overloading or operator overloading

### (a) Method Overloading

We can have multiple methods with the exact **same name** but **different signatures** and the compiler is able to decide which method to call.

```cpp
// Calculates Area of Rectangle
double calculateArea (int length, int breadth) {
    return length * breadth;
}

// Calculates Area of Circle
double calculateArea (int radius) {
    return M_PI * radius * radius;
}

int main () {
    int l = 5, b = 7;
    cout << "Area of Rectangle: " << calculateArea(l, b) << endl;
    int r = 6;
    cout << "Area of Circle: " << calculateArea(r) << endl;
    return 0;
}

/* Output:
Area of Rectangle: 35
Area of Circle: 113.097
*/
```

The method signature includes:

- **number** of parameters
- **data types** of respective parameters
- **order** of the parameters

Note that the method **return type** is **NOT** a part of it's signature

```cpp
// Although return-type different, signatures same. So NOT ALLOWED
void add(int a, int b) { cout << a + b << endl; }
int add(int a, int b) { return a + b; }
```

There is typically no inheritance of classes involved in overloading

### (b) Operator Overloading (C++)

```cpp
class Point {
  private:
    int x, y;

  public:
    Point (int _x = 0, int _y = 0) : x(_x), y(_y) {}

    bool operator==(const Point &other) const {
        return (this->x == other.x && this->y == other.y);
    }

    bool operator!=(const Point &other) const {
        return !(*this == other);
    }

    friend ostream &operator<<(ostream &out, const Point &p) {
        out << "(" << p.x << ", " << p.y << ")";
        return out;
    }
};

int main () {
    Point p1(9, 3), p2(9, 3), p3(6, 2);

    cout << "Point p1 is " << p1 << endl;  // Point p1 is (9, 3)
    cout << "Point p2 is " << p2 << endl;  // Point p2 is (9, 3)
    cout << "Point p3 is " << p3 << endl;  // Point p3 is (6, 2)

    cout << (p1 == p2) << endl;  // 1
    cout << (p1 == p3) << endl;  // 0
    cout << (p1 != p3) << endl;  // 1

    return 0;
}
```

## 2. Runtime polymorphism (Dynamic binding)

### Method Overriding
