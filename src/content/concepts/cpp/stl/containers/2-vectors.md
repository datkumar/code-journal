---
title: Vectors in C++
tags: [cpp, stl, containers]
---

Present inside the `<vector>` header, vectors are dynamic arrays with the ability to resize itself automatically when an element is inserted or deleted

| Operation      | Time                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Element Access | **`O(1)` always**                                                                                                          |
| Insertion      | Inserting at the end is **`O(1)`** on average but `O(N)` when resizing <br> Inserting at the start or middle is **`O(N)`** |
| Deletion       | Deleting from the end is **`O(1)`** <br> Deleting at the start or middle is **`O(N)`**                                     |

<br>

## Ways to initialize a vector

**1. Declare and then `.push_back()` each time:**

```cpp
vector<int> v1;
v1.push_back(10);
v1.push_back(20);
```

**2. Specify `size` and `value` (all elements having same value):**

```cpp
vector<int> v1(4, 7);
// Creates  {7, 7, 7, 7}
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
vector<int> v2{ 10, 20, 30, 40 };
vector<int> v3(v2.begin(), v2.begin()+2);
```

**5. Using `fill()` or `fill_n()` to set values:**

```cpp
vector<int> v1(5);
// fill(start_pos, end_pos, val)
fill(v1.begin(), v1.begin()+3, 12);
// {12, 12, 12, 0, 0 }

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
- **`.resize(n, val)`** - Resizes vector to only include first `n` elements. Can also pass extra argument `val` to which the new elements will be initialized

## Modifiers

- **`.pop_back()`** - Removes last element from the vector. Takes `O(1)` time
- **`.push_back(val)`** - Appends one element having value `val` at the end of element. Takes `O(N)` time in most cases ,but `O(N)` when resizing
- **`.emplace_back(val)`** - Constructs the element in-place at the end of the vector. Same time complexity as `push_back()` but **one less copy operation**
- **`.clear()`** - Remove all elements. Takes `O(N)` time
- **`.erase()`** - Removes element(s) at specific position via `erase(pos)` or within a range via `erase(start, end)`. Takes `O(N)` time on average

<br>

**Note:**

- Generally, `emplace_back()` is slighlty faster than `push_back()` as it **constructs the element in-place** while `push_back()` creates the element and then copies it. So, prefer `emplace_back()` for complex objects
- You can also pass the appropriate list of arguments to construct the vector element during `emplace_back()` (**_variadic arguments_**). However, for `push_back()`, you need to create the object first

  ```cpp
  vector< pair<char,int> > v1;

  v1.emplace_back('x', 12);
  v1.push_back(make_pair('y', 15));

  for (auto &p: v1){
      cout << p.first << ", " << p.second << endl;
  }

  /* Output:
  x, 12
  y, 15
  */
  ```

<br>

**More:**

- `.insert()` - Inserts an element at specific position via `insert(pos,val)` or inserts an element multiple times at specified position via `insert(pos, reps, val)` or even another range of elements via `insert(pos, start_pos, end_pos)`. Takes `O(N)` time on average

  ```cpp
  vector<int> v1{10,20,30,40,50};

  v1.insert(v1.begin()+3, 101);
  v1.insert(v1.begin()+2, 3, 420);

  vector<int> v2{-1, -2, -3, -4, -5, -6};
  v1.insert(v1.begin()+2, v2.begin()+1, v2.begin()+4);

  /* Output:
  10, 20, -2, -3, -4, 420, 420, 420, 30, 101, 40, 50
  */
  ```

- `.emplace()` - Similar to `insert()` but constructs the element in-place

<br>

## Vector of custom data-type

```cpp
struct Student{
    int id;
    string name;
};

bool compareId(Student &s1, Student &s2)
{
    // Assuming unique ids
    return (s1.id < s2.id);
}

void showStudents(vector<Student> &students){
    for(auto &s: students){
        cout<< s.id << "\t" << s.name << endl;
    }
}

int main() {

    vector<Student> v1{
        Student{101, "Ramesh"},
        Student{103, "Shyam"},
        Student{102, "Pankaj"},
        Student{104, "Sai"},
    };

    showStudents(v1);

    sort(v1.begin(), v1.end(), compareId);

    cout<<"\nAfter sorting:"<<endl;
    showStudents(v1);

    return 0;
}

/* Output:
101     Ramesh
103     Shyam
102     Pankaj
104     Sai

After sorting:
101     Ramesh
102     Pankaj
103     Shyam
104     Sai
*/
```
