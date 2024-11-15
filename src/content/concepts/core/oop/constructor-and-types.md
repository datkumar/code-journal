---
title: Constructors and their types
tags: [oop, java, cpp]
---

## What are constructors?

Constructors are **non-static member functions** that are used to initialize objects of their class types. They set initial values for the object's data members or perform any necessary setup.

Constructors have the **same name as the class** name

Constructors have **no have return type**, not even `void`

> Constructors **can be overloaded**, i.e. a class can have multiple constructors with different parameter lists

Constructors aren't inherited as they are specifically tied to the initialization of an object's state within that particular class and not concerned with subclasses. Thus constructors **cannot be overriden**

## 1. Default Constructor

If no constructor is defined, Java and C++ compilers provide a **Default Constructor** that initializes the data members to their default values (such as Strings are `null` in Java and `""` in C++, while integers are `0` in Java and garbage value in C++). This default initialization happens during object creation. If any members are objects, the compiler calls the default constructors of their respective classes

However, if we explicitly define a constructor without any parameters (called **No-Args Constructor**), that constructor replaces the default constructor during object creation. You can write custom initializtion logic inside it

Although some people refer to this no-args constructor as the default constructor, it's important to distinguish it from the automatic default constructor that the compiler generates if no constructors are defined in the class.

<details>
<summary><strong>Default Constructor example in C++</strong></summary>

```cpp title="C++ Default Constructor"
class Person {
  private:
    int age;

  public:
    // The no-args constructor
    Person () {
        cout << "Initializing new Person" << endl;
        this->age = 18;
    }

    int getAge () { return this->age; }
};

int main () {
    Person p1;
    cout << "p1 age: " << p1.getAge() << endl;

    Person *p2 = new Person();
    cout << "p2 age: " << p2->getAge() << endl;

    return 0;
}
```

```txt title="Output"
Initializing new Person
p1 age: 18
Initializing new Person
p2 age: 18

```

</details>

<details>
<summary><strong>Default Constructor example in Java</strong></summary>

```java title="Java Default Constructor"
class Person {
    private int age;

    // The no-args constructor
    public Person() {
        System.out.println("Initializing new Person");
        this.age = 18;
    }

    public int getAge() { return this.age; }
}

class Demo {
    public static void main(String[] args) {
        Person p = new Person();
        System.out.println("p age: " + p.getAge());
    }
}
```

```txt title="Output"
Initializing new Person
p age: 18
```

</details>

## 2. Parameterized Constructor

We declare some parameters inside constructor definition and the data members are initialized pased on the values of these parameters. During object creation, we pass the appropriate respective arguments

> We can call a particular constructor from inside another constructor, which is known as **Constructor Chaining**. However, the call to other constructor **must be the first instruction** within it

When you define any constructor within the class, the default constructor provided by compiler is **not called** nor is there any automatic constructor chaining occuring during object creation. We have to explicitly define such beahviour

Below examples show how to call default constuctor from inside of a parameterized constructor. The vice-versa is also possible. Note the `Person(parameters):Person(){body}` syntax in C++ and `this();` call in Java

<details>
<summary>
<strong>Parameterized Constructor example in C++</strong>
</summary>

```cpp title="C++ Parameterized Constructor"
class Person {
  private:
    string name;
    int age;

  public:
    Person () {
        cout << "Inside Default Constructor" << endl;
        this->name = "Unknown";
        this->age = 18;
    }

    Person (string name, int age) {
        cout << "Inside Parameterized Constructor" << endl;
        this->name = name;
        this->age = age;
    }

    Person (string name) : Person() {
        cout << "Default constructor was called from this Parameterized Constructor" << endl;
        this->name = name;
    }

    int getAge () { return this->age; }
    string getName () { return this->name; }
};

int main () {
    Person p1;
    cout << "p1: name=" << p1.getName() << ", age=" << p1.getAge() << "\n\n";

    Person p2("Ramesh", 25);
    cout << "p2: name=" << p2.getName() << ", age=" << p2.getAge() << "\n\n";

    Person *p3 = new Person();
    cout << "p3: name=" << p3->getName() << ", age=" << p3->getAge() << "\n\n";

    Person *p4 = new Person("Suresh", 30);
    cout << "p4: name=" << p4->getName() << ", age=" << p4->getAge() << "\n\n";

    Person p5("Pankaj");
    cout << "p5: name=" << p5.getName() << ", age=" << p5.getAge() << "\n\n";

    Person *p6 = new Person("Ankit");
    cout << "p6: name=" << p6->getName() << ", age=" << p6->getAge() << "\n\n";

    return 0;
}
```

```txt title="Output"
Inside Default Constructor
p1: name=Unknown, age=18

Inside Parameterized Constructor
p2: name=Ramesh, age=25

Inside Default Constructor
p3: name=Unknown, age=18

Inside Parameterized Constructor
p4: name=Suresh, age=30

Inside Default Constructor
Default constructor was called from this Parameterized Constructor
p5: name=Pankaj, age=18

Inside Default Constructor
Default constructor was called from this Parameterized Constructor
p6: name=Ankit, age=18

```

</details>

<details>
<summary>
<strong>Parameterized Constructor example in Java</strong>
</summary>

```java title="Java Parameterized Constructor"
class Person
{
    private String name;
    private int age;

    public Person() {
        System.out.println("Inside Default Constructor");
        this.name = "Unknown";
        this.age = 18;
    }

    public Person(String name, int age) {
        System.out.println("Inside Parameterized Constructor");
        this.name = name;
        this.age = age;
    }

    public Person(String name) {
        this(); // Calling Default constructor from Parameterized constructor
        System.out.println("Default constructor was called from the Parameterized Constructor");
        this.name = name;
    }

    public int getAge() { return this.age; }
    public String getName() { return this.name; }
}

class Demo {
    public static void main(String[] args) {
        Person p1 = new Person();
        System.out.println("p1: name=" + p1.getName() + ", age=" + p1.getAge() + "\n");

        Person p2 = new Person("Ramesh", 25);
        System.out.println("p2: name=" + p2.getName() + ", age=" + p2.getAge() + "\n");

        Person p3 = new Person("Pankaj");
        System.out.println("p3: name=" + p3.getName() + ", age=" + p3.getAge() + "\n");
    }
}
```

```txt title="Output"
Inside Default Constructor
p1: name=Unknown, age=18

Inside Parameterized Constructor
p2: name=Ramesh, age=25

Inside Default Constructor
Default constructor was called from the Parameterized Constructor
p3: name=Pankaj, age=18

```

</details>

## 3. Copy Constructor

It creates a new object by copying the attributes of another existing object. It is particularly useful when you want to create a new object with the same state as an existing object without modifying the original one

Refer [Copy-initialization](https://en.cppreference.com/w/cpp/language/copy_initialization)

<details>
<summary><strong>Copy Constructor example in C++</strong></summary>

```cpp title="C++ Copy Constructor"
class Person {
  private:
    string name;
    int age;

  public:
    Person (string name, int age) {
        cout << "Inside Parameterized Constructor" << endl;
        this->name = name;
        this->age = age;
    }

    Person (const Person &obj) {
        cout << "Inside Reference Copy Constructor" << endl;
        this->name = obj.name;
        this->age = obj.age;
    }

    Person (const Person *objPtr) {
        cout << "Inside Pointer Copy Constructor" << endl;
        this->name = objPtr->name;
        this->age = objPtr->age;
    }

    int getAge () { return this->age; }
    string getName () { return this->name; }
};

int main () {
    Person p1("Ramesh", 25);
    cout << "p1: name=" << p1.getName() << ", age=" << p1.getAge() << "\n\n";

    Person *p2 = new Person("Suresh", 30);
    cout << "p2: name=" << p2->getName() << ", age=" << p2->getAge() << "\n\n";

    // Create copy from Object Reference
    Person p3(p1);
    cout << "p3: name=" << p3.getName() << ", age=" << p3.getAge() << "\n\n";
    Person *p4 = new Person(p1);
    cout << "p4: name=" << p4->getName() << ", age=" << p4->getAge() << "\n\n";

    // Create copy from Object Pointer
    Person p5(p2);
    cout << "p5: name=" << p5.getName() << ", age=" << p5.getAge() << "\n\n";
    Person *p6 = new Person(p2);
    cout << "p6: name=" << p6->getName() << ", age=" << p6->getAge() << "\n\n";

    return 0;
}
```

```txt title="Output"
Inside Parameterized Constructor
p1: name=Ramesh, age=25

Inside Parameterized Constructor
p2: name=Suresh, age=30

Inside Reference Copy Constructor
p3: name=Ramesh, age=25

Inside Reference Copy Constructor
p4: name=Ramesh, age=25

Inside Pointer Copy Constructor
p5: name=Suresh, age=30

Inside Pointer Copy Constructor
p6: name=Suresh, age=30

```

</details>

<details>
<summary><strong>Copy Constructor example in Java</strong></summary>

```java title="Java Copy Constructor"
class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        System.out.println("Inside Parameterized Constructor");
        this.name = name;
        this.age = age;
    }

    public Person(Person obj) {
        System.out.println("Inside Copy Constructor");
        this.name = obj.name;
        this.age = obj.age;
    }

    public int getAge() { return this.age; }
    public String getName() { return this.name; }
}

class Demo {
    public static void main(String[] args) {
        Person p1 = new Person("Ramesh", 25);
        System.out.println("p1: name=" + p1.getName() + ", age=" + p1.getAge() + "\n");

        Person p2 = new Person(p1);
        System.out.println("p2: name=" + p2.getName() + ", age=" + p2.getAge() + "\n");
    }
}
```

```txt title="Output"
Inside Parameterized Constructor
p1: name=Ramesh, age=25

Inside Copy Constructor
p2: name=Ramesh, age=25

```

</details>

### Copy assignment operator (C++)

You can overload the assignment operator (`=`) to create a copy of an object similar to what a copy constructor does.

```cpp
// Assignment Operator Overload
MyClass& operator=(const MyClass& obj) {
    if (this != &obj) {
        // Assign data member values of 'obj' to current object i.e. 'this' fields
    }
    return *this;
}
```

</details>

<details>
<summary><strong>C++ Copy assignment operator example</strong></summary>

```cpp
class Person {
  private:
    string name;
    int age;

  public:
    Person (string name, int age) : name(name), age(age) {
        cout << "Inside Parameterized Constructor" << endl;
    }

    // Reference Copy Constructor
    Person (const Person &obj) : name(obj.name), age(obj.age) {
        cout << "Inside Reference Copy Constructor" << endl;
    }

    // Assignment Operator Overload
    Person &operator=(const Person &obj) {
        cout << "Inside Assignment Operator Overload" << endl;
        if (this != &obj) {  // Avoid self-assignment
            this->name = obj.name;
            this->age = obj.age;
        }
        return *this;
    }

    int getAge () const { return this->age; }
    string getName () const { return this->name; }
};

int main () {
    Person p1("Ramesh", 25);
    cout << "p1: Address=" << &p1 << ", name=" << p1.getName() << ", age=" << p1.getAge() << "\n\n";
    Person p2("Suresh", 30);
    cout << "p2: Address=" << &p2 << ", name=" << p2.getName() << ", age=" << p2.getAge() << "\n\n";

    Person p3 = p2;  // Copy constructor when newly created object
    cout << "p3: Address=" << &p3 << ", name=" << p3.getName() << ", age=" << p3.getAge() << "\n\n";

    p3 = p1;  // Assignment operator overload when re-assignement
    cout << "p3: Address=" << &p3 << ", name=" << p3.getName() << ", age=" << p3.getAge() << "\n\n";

    return 0;
}
```

```txt title="Output"
Inside Parameterized Constructor
p1: Address=0x7ffda325f6f0, name=Ramesh, age=25

Inside Parameterized Constructor
p2: Address=0x7ffda325f720, name=Suresh, age=30

Inside Reference Copy Constructor
p3: Address=0x7ffda325f750, name=Suresh, age=30

Inside Assignment Operator Overload
p3: Address=0x7ffda325f750, name=Ramesh, age=25

```

</details>

## Member Initializer List (C++)

In C++, member initialization lists are a powerful and preferred way to initialize member variables during object creation, especially within constructors.

It is often considered a more efficient and cleaner way to initialize class members than using assignment statements in the constructor body. Also, it **prevents unnecessary calling the default constructors and then reassignment** of members.

Note that the **order of initializing** members in the should be the **same as** the order in which the data members have been **declared**

```cpp
class Person {
  private:
    string name;
    int age;

  public:
    Person () : name("Unknown"), age(18) {  // Default values
        cout << "Default Constructor body" << endl;
    }

    Person (string name, int age) : name(name), age(age) {  // Parameter values
        cout << "Parameterized Constructor body" << endl;
    }

    // ... other methods
};
```

Notice that the constructor parameter variable names and data member variable names can have the same name without causing any conflicts in the initializer list. However, doing so inside method body would lead to name conflicts, which is why we use the `this` keyword to refer to class members.

The reason for no conflict is that the scope of method parameters and method body is the same, but the initialzer list has a separate special scope. Even though we can technically have the same paramter names and initializer list variables, it's good practice to give separate names for parameters

<details>
<summary><strong>C++ Member Initializer List example </strong></summary>

```cpp title="Member Initializer List example"
class Person {
  private:
    string name;
    int age;

  public:
    Person () : name("Unknown"), age(18) {
        cout << "Default Constructor body" << endl;
    }

    Person (string name, int age) : name(name), age(age) {
        cout << "Parameterized Constructor body" << endl;
    }

    int getAge () const { return this->age; }
    string getName () const { return this->name; }
};

int main () {
    // Default Constructor + Stack allocation:
    Person p1;
    cout << "p1: name=" << p1.getName() << ", age=" << p1.getAge() << "\n\n";
    // Person p2(); <- INVALID
    Person p3{};
    cout << "p1: name=" << p3.getName() << ", age=" << p3.getAge() << "\n\n";

    // Default Constructor + Heap allocation:
    // Person *p4 = new Person; <- INVALID
    Person *p5 = new Person();
    cout << "p5: name=" << p5->getName() << ", age=" << p5->getAge() << "\n\n";
    Person *p6 = new Person{};
    cout << "p6: name=" << p6->getName() << ", age=" << p6->getAge() << "\n\n";

    // Parameterized Constructor + Stack allocation:
    Person p7("Ankit", 35);
    cout << "p7: name=" << p7.getName() << ", age=" << p7.getAge() << "\n\n";
    Person p8{"Deepak", 29};
    cout << "p8: name=" << p8.getName() << ", age=" << p8.getAge() << "\n\n";

    // Parameterized Constructor + Heap allocation:
    Person *p9 = new Person("Larry", 48);
    cout << "p9: name=" << p9->getName() << ", age=" << p9->getAge() << "\n\n";
    Person *p10 = new Person{"Frank", 17};
    cout << "p10: name=" << p10->getName() << ", age=" << p10->getAge() << "\n\n";

    return 0;
}
```

```txt title="Output"
Default Constructor body
p1: name=Unknown, age=18

Default Constructor body
p1: name=Unknown, age=18

Default Constructor body
p5: name=Unknown, age=18

Default Constructor body
p6: name=Unknown, age=18

Parameterized Constructor body
p7: name=Ankit, age=35

Parameterized Constructor body
p8: name=Deepak, age=29

Parameterized Constructor body
p9: name=Larry, age=48

Parameterized Constructor body
p10: name=Frank, age=17

```

</details>

---

## Private constructors

When constructors are made `private`, then objects cannot be instantiated from outside the class. This is useful in cases where we want to control the number of objects being created, such as implementing a **Singleton** class

---

**Further reading**:

- [Move constructors in C++](https://en.cppreference.com/w/cpp/language/move_constructor) , which can be used to efficiently transfer ownership of resources from one object to another, especially when dealing with expensive or scarce resources like memory or file handles
- [The rule of three/five/zero](https://en.cppreference.com/w/cpp/language/rule_of_three) , which are rules of thumb in C++ for managing resources and ensuring exception-safe code, especially when dealing with object ownership and memory management
