---
title: STL - Vectors
tags: [cpp, stl, containers]
---

C++ Reference: [`vector`](https://en.cppreference.com/w/cpp/container/vector)

Present inside the `<vector>` header, vectors are dynamic arrays with the ability to resize itself automatically when an element is inserted or deleted

| Operation      | Time                                                                                                                        |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Element Access | **`O(1)` always**                                                                                                           |
| Insertion      | Insertion at the **end** is **`O(1)`** on average but `O(N)` when resizing <br> Insertion at the start/middle is **`O(N)`** |
| Deletion       | Deletion from the **end** is **`O(1)`** <br> Deletion at the start/middle is **`O(N)`**                                     |

**Declaration**: `vector<Type> v1;`

## Iterators

- Forward: **`.begin()` , `.end()`**
- Reverse: **`.rbegin()` , `.rend()`**

## Element access

- **`[idx]`** - Access element at index `idx`
- **`.at(idx)`** - Access element at index `idx`, with bounds-checking
- **`.front()`** – Access **first** element
- **`.back()`** – Access **last** element

## Size functions

- **`.empty()`** - Returns whether the vector is empty or not
- **`.size()`** - Returns number of elements present inside the vector
- **`.capacity()`** - Returns number of elements worth of memory currently allocated to the vector
- **`.max_size()`** - Returns the theoretical maximum number of items that could be put in your vector
- **`.resize(n, val)`** - Resizes vector to only include first `n` elements. Can also pass extra argument `val` to which the new elements will be initialized

## Modifiers

- **`.pop_back()`** - Removes last element from the vector. Takes `O(1)` time
- **`.push_back(val)`** - Appends one element having value `val` at the end of vector. Takes `O(1)` time in most cases, but `O(N)` when resizing
- **`.emplace_back(val)`** - Constructs the element in-place at the end of the vector. Same time complexity as `push_back()` but **one less copy** operation
- **`.clear()`** - Remove all elements. Takes `O(N)` time
- **`.erase()`** - Removes element(s) at specific position via `erase(pos)` or within a range via `erase(start, end)`. Takes `O(N)` time on average

## Ways to initialize a vector

**1. Declare and `.push_back()` each element:**

```cpp
vector<int> v1;
v1.push_back(10);
v1.push_back(20);
// { 10, 20 }
```

**2. Specify `size` and `value` (all elements will have same value):**

```cpp
vector<int> v1(4, 7);
// { 7, 7, 7, 7 }
```

**3. List-initialization:**

```cpp
vector<int> v1{ 10, 20, 30 };
// { 10, 20, 30 }
```

**4. From another array or vector via `(start_pos, end_pos)`:**

```cpp
// From another array
int arr[] = { 10, 20, 30 };
int n = sizeof(arr) / sizeof(arr[0]);
vector<int> v1(arr, arr + n);
// { 10, 20, 30 }

// From another vector
vector<int> v2{10, 20, 30, 40, 50, 60};
vector<int> v3(v2.begin() + 2, v2.end());
// { 30, 40, 50, 60 }
```

**5. Using `fill()` or `fill_n()` to set values:**

```cpp
vector<int> v1(5);
// fill(start_pos, end_pos, val)
fill(v1.begin(), v1.begin() + 3, 12);
printVector(v1);
// { 12, 12, 12, 0, 0 }

vector<int> v2(7);
// fill_n(start_pos, count, val)
fill_n(v2.begin() + 3, 2, 4);
printVector(v2);
//  { 0, 0, 0, 4, 4, 0, 0 }
```

**6. Using `iota()` to set values as increments:**

```cpp
vector<int> v1(10);
// iota(start_pos, end_pos, start_val)
iota(v1.begin() + 2, v1.end() - 3, 20);
// { 0, 0, 20, 21, 22, 23, 24, 0, 0, 0 }
```

### `fill()` vs `memset()` in C++

|  Criteria | `memset()`                                                                                                  | `fill()`                                                                                     |
| --------: | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Signature | `memset(void *obj, int ch, size_t N)`                                                                       | `<Itr,T> void fill(Itr first, Itr last, const T& val)`                                       |
|   Meaning | Sets `N` bytes of `obj` to `ch`                                                                             | Assigns the value `val` to all elements in range `[first, last)`                             |
|    Values | Used when ALL bytes of element can be the same byte, such as `0` or `-1`                                    | Accepts all valid values of the data-type                                                    |
| Data-type | Mostly used with `int` or `char` arrays                                                                     | Portable for vectors of various data types                                                   |
| Execution | Works at the byte level, setting each byte present to the given byte value. Thus no type-safety per element | Has an underlying loop initializing each element to the given value. So type-safe assignment |
|    Import | `#include <cstring>`                                                                                        | `#include <vector>`                                                                          |
|     Speed | It's slightly faster as it's written in assembler                                                           | Basic looping, so slightly slower than `memset`                                              |
|   Example | `memset(arr, -1, n * sizeof(int));`                                                                         | `fill(arr.begin(), arr.end(), 42);`                                                          |

Below picture would illustrate why `memset` makes sense for values `0` or `-1` when we want to set a certain number of bytes as the same byte-value

![`int` value representation for `memset`](/code-journal/diagrams/memset-int.svg)

### Initializing a 2D vector

```cpp
// Creates 2D vector of 3 rows with 4 columns per row
// and all row values initialized to -1
vector<vector<int>> mat(3, vector<int>(4, -1));
```

## Traversal

- Range-based loop: `for(auto &element : v1)`
- Using iterators: `for(auto itr = v1.begin(); itr != v1.end(); itr++)`
- Reverse traversal: `for(auto itr = v1.rbegin(); itr != v1.rend(); itr++)`

<details>
<summary>Traversals demo:</summary>

```cpp
vector<int> v1{105, 48, 23, 6, 94, 52};

// Range-based for loop
cout << "{ ";
for (auto &x : v1) cout << x << ", ";
cout << "}" << endl;
// { 105, 48, 23, 6, 94, 52, }

// For-loop with iterators
cout << "{ ";
for (auto itr = v1.begin(); itr != v1.end(); itr++) cout << *(itr) << ", ";
cout << "}" << endl;
// { 105, 48, 23, 6, 94, 52, }

// Reverse traversal: For-loop with reverse iterators
cout << "{ ";
for (auto itr = v1.rbegin(); itr != v1.rend(); itr++) cout << *(itr) << ", ";
cout << "}" << endl;
// { 52, 94, 6, 23, 48, 105, }
```

</details>

**More functions:**

- `.insert()`: Inserts element(s) at specific postition. Takes `O(N)` time on average

  - `.insert(pos,val)`: Inserts element `val` at position `pos`
  - `.insert(pos,reps,val)`: Inserts `reps` number of copies of `val` starting from position `pos`
  - `.insert(pos,start,end)`: Inserts all elements of `[start, end)` at position `pos`

  ```cpp
  vector<int> v1{10, 20, 30, 40, 50};
  vector<int> v2{-1, -2, -3, -4, -5, -6};

  v1.insert(v1.begin() + 3, 101);
  // 10 20 30 101 40 50

  v1.insert(v1.begin() + 2, 3, 420);
  // 10 20 420 420 420 30 101 40 50

  v1.insert(v1.begin() + 2, v2.begin() + 1, v2.begin() + 4);
  // 10 20 -2 -3 -4 420 420 420 30 101 40 50
  ```

- `.emplace(pos,...args)` - Inserts a new element into the container directly before `pos` by constructing it in-place.

---

## Beware of `vector<bool>`

`vector<bool>` in C++ is a specialization of the standard `vector` container class that allows you to store a sequence of boolean values. Unlike a regular `vector<T>` where `T` can be any data type, `vector<bool>` doesn't store each `bool` value as a full byte in memory. Instead, it utilizes bit manipulation techniques to **pack multiple boolean values (typically 8) into a single byte**. Due to the bit-packing optimization, operations like element access and modification are not as straightforward as with other types:

- **No Direct Element Access**: You cannot directly access individual elements via `[]`. Instead, you need to use member functions like `at()` or iterators.
- **No References**: The reference type returned by `std::vector<bool>::operator[]` is a proxy class (often called `std::vector<bool>::reference`), which behaves like a `bool&` but **is not actually a reference to a single bool value**. This can lead to confusion and unexpected behavior. You cannot take the address of a bool element in a `std::vector<bool>`, as each element is not stored as a separate byte in memory.

**Better alternatives**:

- If the size is known at compile-time: use [`bistset<N>`](https://en.cppreference.com/w/cpp/container/vector_bool) as suggested by [C++ Reference](https://en.cppreference.com/w/cpp/utility/bitset)
- For dynamic sizes: you can use `vector<char>` or [`boost::dynamic_bitset`](https://www.boost.org/doc/libs/1_84_0/libs/dynamic_bitset/dynamic_bitset.html)

---

## Vector of custom data-type

```cpp
void printVector (vector<int> &v) {
    if (v.empty()) {
        cout << "Vector is empty";

    } else {
        cout << "{ ";
        for (int &num : v) cout << num << ", ";
        cout << "}";
    }
    cout << endl;
}

struct Student {
    int id;
    string name;
    Student(int _id, string _name) : id(_id), name(_name) {}
};

bool compareIds (Student &s1, Student &s2) {
    return (s1.id < s2.id);  // Assuming unique ids
}

void showStudents (vector<Student> &students) {
    for (auto &s : students) cout << s.id << "\t" << s.name << endl;
}

int main () {
    // Constructor as well as List Initialization
    vector<Student> v1{
        Student(104, "Sai"),
        Student{101, "Ramesh"},
        Student(102, "Pankaj"),
        Student{103, "Shyam"},
    };

    showStudents(v1);
    // 101     Ramesh
    // 103     Shyam
    // 102     Pankaj
    // 104     Sai

    sort(v1.begin(), v1.end(), compareIds);

    showStudents(v1);
    // 101     Ramesh
    // 102     Pankaj
    // 103     Shyam
    // 104     Sai

    return 0;
}
```

> Difference between `.emplace_back()` and `.push_back()`

- Generally, `emplace_back()` is slightly faster than `push_back()` as it **constructs the element in-place** while `push_back()` creates the element and then **copies** it. So, prefer `emplace_back()` for complex objects or fast insertion.
- You can also pass the appropriate list of arguments to construct the vector element during `emplace_back()`, but for `push_back()`, you need to create the object first:

  ```cpp
  struct Student {
      string name;
      int roll;
      float marks;
      Student(string _name, int _roll, float _marks) : name(_name), roll(_roll), marks(_marks) {}
  };

  int main () {
      vector<pair<char, int>> v1;
      v1.emplace_back('x', 12);
      v1.push_back({'y', 15});
      v1.push_back(make_pair('z', 17));
      for (auto &p : v1) cout << p.first << ", " << p.second << endl;
      // x, 12
      // y, 15
      // z, 17

      vector<Student> students;
      students.push_back(Student("Ram", 101, 87.25));
      students.emplace_back("Jack", 102, 65.81);
      students.push_back(Student{"Shyam", 103, 75.34});
      students.emplace_back(Student{"John", 104, 65.32});
      students.emplace_back(Student("Joe", 105, 35.26));
      for (auto &st : students) {
          cout << st.roll << ". " << st.name << " got " << st.marks << endl;
      }
      // 101. Ram got 87.25
      // 102. Jack got 65.81
      // 103. Shyam got 75.34
      // 104. John got 65.32
      // 105. Joe got 35.26
  }
  ```
