---
title: STL - Vectors
tags: [cpp, stl, containers]
---

**CPP Reference**: [`vector`](https://en.cppreference.com/w/cpp/container/vector)

Present inside the `<vector>` header, vectors are dynamic arrays with the ability to resize itself automatically when an element is inserted or deleted

| Operation      | Time                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Element Access | **`O(1)` always**                                                                                                          |
| Insertion      | Insertion at the end is **`O(1)`** on average but `O(N)` when resizing <br> Insertion at the start or middle is **`O(N)`** |
| Deletion       | Deletion from the end is **`O(1)`** <br> Deletion at the start or middle is **`O(N)`**                                     |

**Declaration**: `vector<Type> v1;`

## Iterators

- Forward: **`.begin()` , `.end()`**
- Reverse: **`.rbegin()` , `.rend()`**

## Element access

- **`[idx]`** - Returns reference to element at index `idx` inside the vector.
- **`.front()`** – Returns reference to first element in the vector
- **`.back()`** – Returns reference to last element in the vector

## Size functions

- **`.empty()`** - Returns whether the vector is empty or not
- **`.size()`** - Returns number of elements present inside the vector
- **`.capacity()`** - Returns number of elements worth of memory currently allocated to the vector
- **`.max_size()`** - Returns the theoretical maximum number of items that could be put in your vector
- **`.resize(n, val)`** - Resizes vector to only include first `n` elements. Can also pass extra argument `val` to which the new elements will be initialized

## Modifiers

- **`.pop_back()`** - Removes last element from the vector. Takes `O(1)` time
- **`.push_back(val)`** - Appends one element having value `val` at the end of element. Takes `O(1)` time in most cases ,but `O(N)` when resizing
- **`.emplace_back(val)`** - Constructs the element in-place at the end of the vector. Same time complexity as `push_back()` but **one less copy operation**
- **`.clear()`** - Remove all elements. Takes `O(N)` time
- **`.erase()`** - Removes element(s) at specific position via `erase(pos)` or within a range via `erase(start, end)`. Takes `O(N)` time on average

> Difference between `.emplace_back()` and `.push_back()`

- Generally, `emplace_back()` is slightly faster than `push_back()` as it **constructs the element in-place** while `push_back()` creates the element and then **copies** it. So, prefer `emplace_back()` for complex objects or fast insertion.
- You can also pass the appropriate list of arguments to construct the vector element during `emplace_back()`, but for `push_back()`, you need to create the object first.

```cpp
vector<pair<char, int>> v1;

v1.emplace_back('x', 12);
v1.push_back({'y', 15});
v1.push_back(make_pair('z', 17));

for (auto &p : v1) {
    cout << p.first << ", " << p.second << endl;
}

// x, 12
// y, 15
// z, 17
```

## Ways to initialize a vector

**1. Declare and `.push_back()` each element:**

```cpp
vector<int> v1;
v1.push_back(10);
v1.push_back(20);
```

**2. Specify `size` and `value` (all elements will have same value):**

```cpp
vector<int> v1(4, 7);
// {7, 7, 7, 7}
```

**3. List-initialization:**

```cpp
vector<int> v1{ 10, 20, 30 };
```

**4. From another array or vector via `(start_pos, end_pos)`:**

```cpp
// From another array
int arr[] = { 10, 20, 30 };
int n = sizeof(arr) / sizeof(arr[0]);
vector<int> v1(arr, arr + n);

// From another vector
vector<int> v2{10, 20, 30, 40, 50, 60};
vector<int> v3(v2.begin() + 2, v2.end());
// {30, 40, 50, 60}
```

**5. Using `fill()` or `fill_n()` to set values:**

```cpp
vector<int> v1(5);
// fill(start_pos, end_pos, val)
fill(v1.begin(), v1.begin()+3, 12);
// {12, 12, 12, 0, 0}

vector<int> v2(7);
// fill_n(start_pos, count, val)
fill_n(v2.begin()+3, 2, 4);
//  {0, 0, 0, 4, 4, 0, 0}
```

**6. Using `iota()` to set values as increments:**

```cpp
vector<int> v1(10);
// iota(start_pos, end_pos, start_val)
iota(v1.begin()+2, v1.end()-3, 20);
// { 0, 0, 20, 21, 22, 23, 24, 0, 0, 0 }
```

### Initialising 2D vector

```cpp
vector<vector<int>> mat(3, vector<int>(4, -1));
```

Above line initializes a 2D matrix `mat` of `3` rows and `4` columns with the default value `-1` at each cell

## Traversal

- Range-based loop: `for(auto &element : v1)`
- Using iterators: `for(auto itr = v1.begin(); itr != v1.end(); itr++)`
- Reverse traversal: `for(auto itr = v1.rbegin(); itr != v1.rend(); itr++)`

<details>
<summary>Traversals demo</summary>

```cpp
vector<int> v1{105, 48, 23, 6, 94, 52};

// Range-based for loop
cout << "{ ";
for (auto &x : v1) {
    cout << x << ", ";
}
cout << "}" << endl;
// { 105, 48, 23, 6, 94, 52, }

// for loop with iterators
cout << "{ ";
for (auto itr = v1.begin(); itr != v1.end(); itr++) {
    cout << *(itr) << ", ";
}
cout << "}" << endl;
// { 105, 48, 23, 6, 94, 52, }

// Reverse traversal: for loop with reverse iterators
cout << "{ ";
for (auto itr = v1.rbegin(); itr != v1.rend(); itr++) {
    cout << *(itr) << ", ";
}
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

- If the size is known at compile-time: use [`bistset<N>`](https://en.cppreference.com/w/cpp/container/vector_bool) as suggested by [CPP Reference](https://en.cppreference.com/w/cpp/utility/bitset)
- For dynamic sizes: you can use `vector<char>` or [`boost::dynamic_bitset`](https://www.boost.org/doc/libs/1_84_0/libs/dynamic_bitset/dynamic_bitset.html)

---

## Vector of custom data-type

```cpp
struct Student {
    int id;
    string name;
    Student(int _id, string _name) : id(_id), name(_name) {}
};

bool compareIds(Student &s1, Student &s2) {
    // Assuming unique ids
    return (s1.id < s2.id);
}

void showStudents(vector<Student> &students) {
    for (auto &s : students) {
        cout << s.id << "\t" << s.name << endl;
    }
}

int main() {

    vector<Student> v1{
        // List-initialization
        Student{101, "Ramesh"},
        Student{103, "Shyam"},
        // Constructing Object
        Student(102, "Pankaj"),
        Student(104, "Sai"),
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
