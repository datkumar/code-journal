---
title: Templates in C++
tags: [cpp]
---

## What are templates

With the help of templates, we can write generic code and then specify the data type which we want to apply it on. Thereby, the same code can be reused to work with multiple data types

Like macros, templates are expanded at compile-time, however, **type-checking** is also performed before expansion. The `template` and `typename` keywords are used

Consider below `greaterOne` is our generic template function

```cpp
template <typename T>
T greaterOne (T a, T b) {
    return (a > b) ? a : b;
}
```

And we call the generic function passing different data types each time, `int` and `char` as:

```cpp
int main () {
    int n1 = 15, n2 = 8;
    char c1 = 'C', c2 = 'K';
    cout << greaterOne<int>(n1, n2) << endl;   // 15
    cout << greaterOne<char>(c1, c2) << endl;  // K
    return 0;
}
```

Then, during compilation, the compiler internally type-checks and generates two functions as below for the executable:

```cpp
int greaterOne (int a, int b) {
    return (a > b) ? a : b;
}

char greaterOne (char a, char b) {
    return (a > b) ? a : b;
}
```

### Type argument deduction

When calling template functions or instantiating template class objects, we can get away with just passing those values and not explicitly specifying type argument on which we are calling the template

For example, calling the `add` generic function as `add(3,4)` instead of `add<int>(3,4)`. Also, we can create `ListNode` object as `ListNode(4)` instead of `ListNode<int>(4)`

Note that both of these are available in modern standards like `C++17` and above. This deduction is applicable to STL containers too:

```cpp
vector<int> arr{1, 2, 3};
vector brr{4, 5, 6};
```

---

## Function templates

```cpp
template <typename T>
T add (T x, T y) {
    return x + y;
}

int main () {
    int n1 = 15, n2 = 8;
    float f1 = 3.14, f2 = 2.71;
    string s1 = "abc", s2 = "def";
    cout << add<int>(n1, n2) << endl;     // 23
    cout << add<float>(f1, f2) << endl;   // 5.85
    cout << add<string>(s1, s2) << endl;  // abcdef
    // With template argument deduction:
    cout << add(3, 4) << endl;  // 7
    string s3 = "pqr", s4 = "xyz";
    cout << add(s3, s4) << endl;  // pqrxyz
    // Just passing string literals inside add() gets deduced as "const char*"
    return 0;
}
```

Here, `add` is a generic _function_ template on type `T` that:

- takes two parameters of type `T`
- returns a value of type `T`

## Class templates

You can also use `struct` instead of `class` and it would work:

```cpp
template <typename T>
class ListNode {
  public:
    T val;
    ListNode* next;
    ListNode (T _val) : val(_val), next(nullptr) {}
};

template <typename T>
void printList (ListNode<T>* head) {
    if (!head) {
        cout << "List empty";
    } else {
        ListNode<T>* itr = head;
        while (itr) {
            cout << itr->val << " -> ";
            itr = itr->next;
        }
    }
    cout << endl;
}

int main () {
    ListNode<int>* h1 = new ListNode<int>(1);
    h1->next = new ListNode<int>(2);
    h1->next->next = new ListNode(3);  // <int> type argument deduced
    printList<int>(h1);                // 1 -> 2 -> 3 ->

    ListNode<char>* h2 = new ListNode<char>('a');
    h2->next = new ListNode<char>('b');
    // <char> deduced:
    h2->next->next = new ListNode('c');
    printList(h2);  // a -> b -> c ->

    ListNode<int>* h3 = new ListNode(10);  // <int> deduced on r-value

    ListNode<string>* h4 = nullptr;
    printList(h4);  // List empty

    return 0;
}
```

## Multiple types as arguments

```cpp
template <typename T, typename U>
class MyPair {
  private:
    T first;
    U second;
  public:
    MyPair (T _first, U _second) : first(_first), second(_second) {}
    T getFirst () { return first; }
    U getSecond () { return second; }
};

int main () {
    MyPair<int, string> pr1(5, "Hello");
    cout << pr1.getFirst() << ", " << pr1.getSecond() << endl;
    // 5, Hello

    MyPair pr2(3.14, 't');  // <double, char> type argument deduced
    cout << pr2.getFirst() << ", " << pr2.getSecond() << endl;
    // 3.14, t

    return 0;
}
```

### Default value for template argument

Syntax: `template <typename T=int>`

### Non-type parameters to templates

Syntax: `template <typename T, int>`

Consider example of how `priority_queue` is declared with 3 type arguments in C++ STL : -

- type argument `T`,
- type argument `Container` defaulting to `vector<T>`
- type argument `Compare` defaulting to `less<Container>`

```cpp
template<
  class T,
  class Container = vector<T>,
  class Compare = less<typename Container::value_type>
> class priority_queue;
```
