---
title: STL - Sequence Containers and Adaptors
tags: [cpp, stl]
---

## Sequence Containers

- [`array`](https://en.cppreference.com/w/cpp/container/array) - Static arrays
- [`vector`](/code-journal/dsa/cpp/stl/3-vectors) - Dynamic arrays
- [`forward_list`](#singly-linked-list) - Singly linked-list
- [`list`](#doubly-linked-list) - Doubly linked-list
- [`deque`](#double-ended-queue) - Double-ended queue

**Common member functions** in sequential containers:

- `.begin()` - Returns an iterator pointing to the **start** of the container
- `.end()` - Returns an iterator pointing to the address **next to the last element** in the container
- `.empty()` - Returns whether the container is empty
- `.clear()` - Clear all contents present inside the container
- `.size()` - Returns number of items present inside the container (absent in `forward_list`)
- `.max_size()` - Returns theoretical maximum number of elements that the container can hold
- `.swap(other)` - Swap content of current container with `other` container of same type
- `.resize(n)` , `resize(n,val)` - Resize container to contain `n` elements. Can also pass default value `val` to set newly created elements as

> The **`emplace`** member functions (like `emplace_back`, `emplace_front`, `emplace_front`, `emplace` etc.) perform insertions slightly faster than regular `push` or `insert` functions as they construct the new element **in-place** (instead of constructing the element and then copying it to that place). These are particularly useful for bulky **composite types** where copying is expensive. They take single list of variadic arguments required for that composite object

## Adaptors for Sequence Containers

They provide a **wrapper interface** for sequential containers. These are:

- [`stack`](#stack) - provides Stack (LIFO)
- [`queue`](#queue) - provides Queue (FIFO)
- [`priority_queue`](#heap) - provides Heap (max-heap by default)

---

## Vectors

For vectors, refer [here](/code-journal/dsa/cpp/stl/3-vectors)

---

## Singly Linked-List

- C++ Reference: [`forward_list`](https://en.cppreference.com/w/cpp/container/forward_list)
- **Declaration**: `forward_list<Type> ll;`
- Supports `O(1)` **insertion/deletion** if **location specified** (only links get updated)
- Operations at the **start** are `O(1)` and `O(N)` elsewhere.
- Random access **NOT** present. Only the start i.e. _head_ accessible
- **Uni-directional access** to only forward adjacent element: `next(pos)`

**Element Access**: **`.front()`** to access **first element** in the list

**Iterators**: **`.before_begin()`**

- Returns an iterator pointing to a **placeholder element before the first** element in the list
- Trying to access it results in undefined behaviour
- Incrementing this iterator gives `.begin()`
- Generally used with `.insert_after()` , `.emplace_after()` , `.erase_after()` etc.

> The list goes in only one direction i.e. forward. So, we can only do `itr++` , but **NOT** `itr--` (where `itr` is an iterator pointing to some element in the list)

**Capacity**: Note that `.size()` function is **NOT** provided

**Modifiers**:

- **`.pop_front()`** - Remove first element from the list
- **`.push_front(item)`** , **`.emplace_front(item)`** - Insert element `item` at **start** of the list
- **`.insert_after()`** - Insertion takes `O(1)` per entry in these operations
  - `.insert_after(pos,item)` - Insert element `item` after the position `pos`
  - `.insert_after(pos,count,item)` - Insert `count` copies of `item` after position `pos`
  - `.insert(pos,start,end)` - Insert all elements within `[start,end)` after position `pos`
- **`.emplace_after(pos,...args)`** - Construct element in-place after position `pos`

<blockquote><details>
<summary>
<strong><code>forward_list</code> Demo</strong>
</summary>

```cpp title="forward_list"
void printList (forward_list<int> &ll) {
    if (ll.empty()) {
        cout << "List is empty";
    } else {
        for (auto &num : ll) cout << num << " -> ";
    }
    cout << endl;
}

int main () {
    forward_list<int> ll{7, 1, 3, 5};
    printList(ll);  // 7 -> 1 -> 3 -> 5 ->
    cout << "First element: " << ll.front() << endl;  // First element: 7

    ll.push_front(10), ll.push_front(20);
    printList(ll);  // 20 -> 10 -> 7 -> 1 -> 3 -> 5 ->
    ll.emplace_front(11), ll.emplace_front(22);
    printList(ll);  // 22 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 ->
    ll.pop_front();
    printList(ll);  // 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 ->

    // same as ll.push_front(420)
    ll.insert_after(ll.before_begin(), 420);
    printList(ll);  // 420 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 ->
    ll.insert_after(ll.begin(), 123);
    printList(ll);  // 420 -> 123 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 ->

    // Inserting at end of list: O(N) time
    // Step 1: Finding location of last element
    auto itr = ll.before_begin();  // Handles any empty list case
    while (next(itr) != ll.end()) {
        itr++;
    }
    cout << "Last element: " << *itr << endl;  // Last element: 5
    // Step 2: Insert after this last element
    ll.insert_after(itr, 99);
    printList(ll);  // 420 -> 123 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> 99 ->

    // same as ll.pop_front()
    ll.erase_after(ll.before_begin());
    printList(ll);  // 123 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> 99 ->

    ll.erase_after(ll.begin());
    printList(ll);  // 123 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> 99 ->

    // Deleting from end of list: O(N) time
    // Step 1: Find location of second-last element
    itr = ll.before_begin();
    // Check next element exists before checking next-of-next
    while (next(itr) != ll.end() && next(next(itr)) != ll.end()) {
        itr++;
    }
    cout << "Second-last element: " << *itr << endl;  // Second-last element: 5
    // Step 2: Delete the element after second-last element
    ll.erase_after(itr);
    printList(ll);  // 123 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 ->

    // insert_after(pos, count, val)
    ll.insert_after(ll.before_begin(), 3, 8);
    printList(ll);  // 8 -> 8 -> 8 -> 123 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 ->

    vector<int> v1{9, 6, 4};
    ll.insert_after(ll.before_begin(), v1.begin(), v1.end());  // insert(pos, start, end)
    printList(ll);  // 9 -> 6 -> 4 -> 8 -> 8 -> 8 -> 123 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 ->

    ll.clear();
    printList(ll);  // List is empty

    ll.emplace_front(101);
    ll.emplace_after(ll.begin(), 512);
    printList(ll);  // 101 -> 512 ->
    return 0;
}
```

</details></blockquote>

---

## Doubly-Linked List

- C++ Reference: [`list`](https://en.cppreference.com/w/cpp/container/list)
- **Declaration**: `list<Type> dll;`
- Supports `O(1)` **insertion/deletion** if **location specified** (only links get updated)
- Operations at the **start/end** are `O(1)`, but `O(N)` elsewhere
- Random access **NOT** present. Only the start and end is accessible
- **Bidirectional access** to both next and previous adjacent elements: `next(pos)` , `prev(pos)`

**Element Access**:

- **`.front()`** - Returns reference to **first element** in the list
- **`.back()`** - Returns reference to **last element** in the list

**Iterators**: `.begin()` , `.end()` , `.rbegin()`, `.rend()`

> The list goes in both directions. So, we can do `itr++` as well as `itr--` (where `itr` is an iterator pointing to some element in the list)

**Capacity**: `.size()` function is available (wasn't available in `forward_list`)

**Modifiers**:

- **`.push_front(item)`** , **`.emplace_front(item)`** - Insert element `item` at **start** of the list
- **`.push_back(item)`** , **`.emplace_back(item)`** - Insert element `item` at **end** of the list
- **`.pop_front()`** - Remove **first** element from the list
- **`.pop_back()`** - Remove **last** element from the list
- **`.erase(pos)`** - Removes element at `pos` position
- **`.insert()`** : Insertion takes `O(1)` per entry in these operations
  - `.insert(pos,item)` - Insert element `item` at position `pos`
  - `.insert(pos,count,item)` - Insert `count` copies of `item` at position `pos`
  - `.insert(pos,start,end)` - Insert all elements within `[start,end)` at position `pos`
- **`.emplace(pos,...args)`** - Construct element in-place at position `pos`

<blockquote><details>
<summary>
<strong><code>list</code> Demo</strong>
</summary>

```cpp title="list"
void printList (list<int> &dl) {
    if (dl.empty()) {
        cout << "List is empty";
    } else {
        cout << "== ";
        for (auto &num : dl) cout << num << " == ";
    }
    cout << endl;
}

int main () {
    list<int> dl{7, 1, 4, 3, 5};
    printList(dl);  // == 7 == 1 == 4 == 3 == 5 ==

    cout << "Size: " << dl.size() << endl;            // Size: 5
    cout << "First element: " << dl.front() << endl;  // First element: 7
    cout << "Last element: " << dl.back() << endl;    // Last element: 5

    cout << "Reverse: ";
    // Reverse traversal:
    for (auto itr = dl.rbegin(); itr != dl.rend(); itr++) {
        cout << *itr << ", ";
    }
    cout << endl;  // Reverse: 5, 3, 4, 1, 7,

    dl.push_front(10);
    dl.emplace_front(20);
    printList(dl);  // == 20 == 10 == 7 == 1 == 4 == 3 == 5 ==

    dl.push_back(15);
    dl.emplace_back(25);
    printList(dl);  // == 20 == 10 == 7 == 1 == 4 == 3 == 5 == 15 == 25 ==

    dl.pop_front();
    printList(dl);  // == 10 == 7 == 1 == 4 == 3 == 5 == 15 == 25 =

    dl.pop_back();
    printList(dl);  // == 10 == 7 == 1 == 4 == 3 == 5 == 15 ==

    auto thirdPosition = next(next(dl.begin()));
    dl.insert(thirdPosition, 24);
    printList(dl);  // == 10 == 7 == 24 == 1 == 4 == 3 == 5 == 15 ==

    auto thirdLastPosition = prev(prev(dl.end()));
    dl.insert(thirdLastPosition, 77);
    printList(dl);  // == 10 == 7 == 24 == 1 == 4 == 3 == 77 == 5 == 15 ==

    // insert(pos,count,val)
    dl.insert(dl.begin(), 3, 2);
    printList(dl);  // == 2 == 2 == 2 == 10 == 7 == 24 == 1 == 4 == 3 == 77 == 5 == 15 ==

    vector<int> v1{1, 2, 4};
    dl.insert(dl.begin(), v1.begin(), v1.end());  // insert(pos,start,end)
    printList(dl);
    // == 1 == 2 == 4 == 2 == 2 == 2 == 10 == 7 == 24 == 1 == 4 == 3 == 77 == 5 == 15 ==

    dl.erase(dl.begin());  // same as dl.pop_front();
    printList(dl);
    // == 2 == 4 == 2 == 2 == 2 == 10 == 7 == 24 == 1 == 4 == 3 == 77 == 5 == 15 ==

    dl.clear();
    printList(dl);  // List is empty
    return 0;
}

```

</details></blockquote>

---

## Double-ended Queue

- C++ Reference: [`deque`](https://en.cppreference.com/w/cpp/container/deque)

- **Declaration**: `deque<Type> dq;`
- Operations at the **start** and **end** are `O(1)`, but `O(N)` elsewhere
- **Random access** is supported in `O(1)` time

**How is `deque` different from `vector` or `list`** :

- Unlike `vector`, the elements are **not stored contiguously**
- Indexed access to `deque` must perform **two pointer dereferences**, compared to only one in indexed access of `vector`
- **Expansion is cheaper** than expansion of `vector` because it does not involve copying existing elements to new memory location
- See [this answer](https://stackoverflow.com/a/1436418/16365842) for difference between `deque` and `list`
- Most implementations use a sequence of **individually allocated fixed-size arrays**, with additional bookkeeping. They can also **expand/contract** as needed on **both ends**. They also have a large minimal memory cost for allocating the individual arrays

**Element Access**:

- **`.at(idx)`** - Access element at `idx` index, with bounds-checking
- **`[idx]`** - Access element at `idx` index
- **`.front()`** - Access **first** element
- **`.back()`** - Access **last** element

**Iterators**: `.begin()` , `.end()` , `.rbegin()`, `.rend()`

**Capacity**: **`.size()`** available. Also, `.shrink_to_fit()` to free-up unused space

**Modifiers**:

- **`.push_front(item)`** , **`.emplace_front(item)`** - Insert element `item` at **start** of the list
- **`.push_back(item)`** , **`.emplace_back(item)`** - Insert element `item` at **end** of the list
- **`.pop_front()`** - Remove **first** element from the list
- **`.pop_back()`** - Remove **last** element from the list
- **`.insert()`** : Inserting element(s) at given position
  - `.insert(pos,item)` - Insert element `item` at position `pos`
  - `.insert(pos,count,item)` - Insert `count` copies of `item` at position `pos`
  - `.insert(pos,start,end)` - Insert all elements within `[start,end)` at position `pos`
- **`.emplace(pos,...items)`** - Construct element in-place at position `pos`

<blockquote><details>
<summary>
<strong><code>deque</code> Demo</strong>
</summary>

```cpp title="deque"
void printDQ (deque<int> &dq) {
    if (dq.empty()) {
        cout << "DQ is empty";
    } else {
        for (auto &num : dq) cout << num << ", ";
    }
    cout << endl;
}

int main () {
    deque<int> dq{7, 1, 4, 3, 5};
    printDQ(dq);  // 7, 1, 4, 3, 5,

    cout << "Size: " << dq.size() << endl;            // Size: 5
    cout << "dq.at(2) = " << dq.at(2) << endl;        // dq.at(2) = 4
    cout << "dq[3] = " << dq[3] << endl;              // dq[3] = 3
    cout << "First element: " << dq.front() << endl;  // First element: 7
    cout << "Last element: " << dq.back() << endl;    // Last element: 5

    cout << "Reverse: ";
    for (auto itr = dq.rbegin(); itr != dq.rend(); itr++) {
        cout << *itr << ", ";
    }
    cout << endl;  // Reverse: 5, 3, 4, 1, 7,

    dq.push_front(10);
    dq.emplace_front(20);
    printDQ(dq);  // 20, 10, 7, 1, 4, 3, 5,

    dq.push_back(15);
    dq.emplace_back(25);
    printDQ(dq);  // 20, 10, 7, 1, 4, 3, 5, 15, 25,

    dq.pop_front();
    printDQ(dq);  // 10, 7, 1, 4, 3, 5, 15, 25,

    dq.pop_back();
    printDQ(dq);  // 10, 7, 1, 4, 3, 5, 15,

    auto thirdPosition = next(next(dq.begin()));
    dq.insert(thirdPosition, 24);
    printDQ(dq);  // 10, 7, 24, 1, 4, 3, 5, 15,

    auto thirdLastPosition = prev(prev(dq.end()));
    dq.insert(thirdLastPosition, 77);
    printDQ(dq);  // 10, 7, 24, 1, 4, 3, 77, 5, 15,

    // insert(pos,count,val)
    dq.insert(dq.begin(), 3, 2);
    printDQ(dq);  // 2, 2, 2, 10, 7, 24, 1, 4, 3, 77, 5, 15,

    vector<int> v1{1, 2, 4};
    // insert(pos,start,end)
    dq.insert(dq.begin(), v1.begin(), v1.end());
    printDQ(dq);  // 1, 2, 4, 2, 2, 2, 10, 7, 24, 1, 4, 3, 77, 5, 15,

    // same as dq.pop_front();
    dq.erase(dq.begin());
    printDQ(dq);  // 2, 4, 2, 2, 2, 10, 7, 24, 1, 4, 3, 77, 5, 15,

    dq.clear();
    printDQ(dq);  // DQ is empty
    return 0;
}
```

</details></blockquote>

---

## Stack

- C++ Reference: [`stack`](https://en.cppreference.com/w/cpp/container/stack)
- The `stack` adaptor provides a **Stack** data structure wrapper to the container, which has the property of **Last-in First-out** i.e. **LIFO** (also called first-in last-out)
- Supports operations **ONLY** at the **top** of Stack, which take `O(1)` time each
- It's defined as:

  ```cpp
  template<
      class T,
      class Container = deque<T>
  > class stack;
  ```

- **Declaration**: `stack<Type> stk;`

**Element Access**: **`.top()`** returns reference to first i.e. **top-most element**

**Capacity**: **`.size()`** , **`.empty()`**

**Iterators**: **NONE** provided

**Modifiers**:

- **`.pop()`** - Remove element present at the top
- **`.push(val)`** - Insert element at the top
- **`.emplace(...args)`** - Construct element in-place at the top

<blockquote><details>
<summary>
<strong><code>stack</code> Demo</strong>
</summary>

```cpp title="stack"
void printTop (stack<int> &stk) {
    if (stk.empty()) cout << "Stack is empty" << endl;
    else cout << "Top element: " << stk.top() << endl;
}

int main () {
    vector<int> v1{7, 1, 4, 3, 5};

    stack<int> stk;
    printTop(stk);  // Stack is empty

    cout << "Inserting elements..." << endl;
    for (int num : v1) {
        stk.push(num);
        printTop(stk);
    }
    // Inserting elements...
    // Top element: 7
    // Top element: 1
    // Top element: 4
    // Top element: 3
    // Top element: 5

    cout << "Size: " << stk.size() << endl;  // Size: 5

    cout << "Removing elements..." << endl;
    while (!stk.empty()) {
        printTop(stk);
        stk.pop();
    }
    // Removing elements...
    // Top element: 5
    // Top element: 3
    // Top element: 4
    // Top element: 1
    // Top element: 7
    return 0;
}
```

</details></blockquote>

---

## Queue

- C++ Reference: [`queue`](https://en.cppreference.com/w/cpp/container/queue)
- The `queue` adaptor provides a **Queue** data structure wrapper to the container, which has the property of **First-in First-out** i.e. **FIFO** (also called last-in last-out)
- **Insertion** occurs at the **back** and **Deletion** at the **front**, both taking `O(1)` time
- It's defined as:

  ```cpp
  template<
    class T,
    class Container = deque<T>
  > class queue;
  ```

- **Declaration**: `queue<Type> q;`

**Element Access**:

- **`.front()`** - returns reference to **first** i.e. starting element
- **`.back()`** - returns reference to **last** i.e. ending element

**Capacity**: **`.size()`** , **`.empty()`**

**Iterators**: **NONE** provided

**Modifiers**:

- **`.pop()`** - Remove the first i.e. starting element
- **`.push(val)`** - Insert element at the end
- **`.emplace(...args)`** - Construct element in-place at the end

<blockquote><details>
<summary>
<strong><code>queue</code> Demo</strong>
</summary>

```cpp title="queue"
void printFrontAndBack (queue<int> &q) {
    if (q.empty()) cout << "Queue is empty" << endl;
    else cout << "Front: " << q.front() << ", Back: " << q.back() << endl;
}

int main () {
    vector<int> v1{7, 1, 4, 3, 5};

    queue<int> q;
    printFrontAndBack(q);  // Queue is empty

    cout << "Inserting elements..." << endl;
    for (int num : v1) {
        q.push(num);
        printFrontAndBack(q);
    }
    // Inserting elements...
    // Front: 7, Back: 7
    // Front: 7, Back: 1
    // Front: 7, Back: 4
    // Front: 7, Back: 3
    // Front: 7, Back: 5

    cout << "Size: " << q.size() << endl;  // Size: 5

    cout << "Removing elements..." << endl;
    while (!q.empty()) {
        printFrontAndBack(q);
        q.pop();
    }
    // Removing elements...
    // Front: 7, Back: 5
    // Front: 1, Back: 5
    // Front: 4, Back: 5
    // Front: 3, Back: 5
    // Front: 5, Back: 5
    return 0;
}
```

</details></blockquote>

---

## Heap

- C++ Reference: [`priority_queue`](https://en.cppreference.com/w/cpp/container/priority_queue)
- The `priority_queue` adaptor provides a **Heap** data structure wrapper to the container
- Fast lookup of **highest-priority element** in `O(1)` time
- Insertion/Deletions take upto `O(logN)` time
- It's defined as:

  ```cpp
  template<
    class T,
    class Container = vector<T>,
    class Compare = less<typename Container::value_type>
  > class priority_queue;
  ```

- The **default** ordering is to keep the **lexicographically larger** element at the top i.e. a **Max-heap**, but you can also provide a custom `Compare` function to determine the ordering

**Declaration**:

- **Max-heap**: `priority_queue<int> maxHp;`
- **Min-heap**: `priority_queue<int, vector<int>, greater<int>> minHp;`
- You could also create handy type alias templates as below:

  ```cpp
  // Max-Heap and Min-Heap templates
  template <typename T>
  using max_heap = priority_queue<T, vector<T>, less<T>>;
  template <typename T>
  using min_heap = priority_queue<T, vector<T>, greater<T>>;
  ```

**Element access**: **`.top()`** returns reference to the **highest priority element** (stored topmost at the root of Heap tree)

**Capacity**: **`.size()`**

**Iterators**: **NONE** provided

**Modifiers**:

- **`.pop()`** - Remove the **topmost** element from the heap
- **`.push(val)`** - Insert element into the heap
- **`.emplace(...args)`** - Construct element in-place and insert into the heap

After each insertion/deletion, to **maintain the sorted Heap property**, the elements are re-organized internally by the adaptor itself.

<blockquote><details>
<summary>
<strong><code>priority_queue</code> Demo</strong>
</summary>

```cpp title="priority_queue"
// Max-Heap and Min-Heap templates
template <typename T>
using max_heap = priority_queue<T>;
template <typename T>
using min_heap = priority_queue<T, vector<T>, greater<T>>;

template <typename Type, typename Container, typename Comparator>
void printElementAtTop (priority_queue<Type, Container, Comparator>& pq) {
    if (pq.empty()) cout << "Heap is empty" << endl;
    else cout << "Top of Heap: " << pq.top() << endl;
}

int main () {
    vector<int> v1{7, 1, 4, 3, 5};

    min_heap<int> smol;
    printElementAtTop(smol);  // Heap is empty

    cout << "Inserting elements into Min-Heap..." << endl;
    for (int num : v1) {
        smol.push(num);
        printElementAtTop(smol);
    }
    // Inserting elements into Min-Heap...
    // Top of Heap: 7
    // Top of Heap: 1
    // Top of Heap: 1
    // Top of Heap: 1
    // Top of Heap: 1

    cout << "Size: " << smol.size() << endl;  // Size: 5

    cout << "Removing elements from Min-Heap..." << endl;
    while (!smol.empty()) {
        printElementAtTop(smol);
        smol.pop();
    }
    // Removing elements from Min-Heap...
    // Top of Heap: 1
    // Top of Heap: 3
    // Top of Heap: 4
    // Top of Heap: 5
    // Top of Heap: 7

    max_heap<int> big;
    printElementAtTop(big);  // Heap is empty

    cout << "Inserting elements into Max-Heap..." << endl;
    for (int num : v1) {
        big.push(num);
        printElementAtTop(big);
    }
    // Inserting elements into Max-Heap...
    // Top of Heap: 7
    // Top of Heap: 7
    // Top of Heap: 7
    // Top of Heap: 7
    // Top of Heap: 7

    cout << "Size: " << big.size() << endl;  // Size: 5

    cout << "Removing elements from Max-Heap..." << endl;
    while (!big.empty()) {
        printElementAtTop(big);
        big.pop();
    }
    // Removing elements from Max-Heap...
    // Top of Heap: 7
    // Top of Heap: 5
    // Top of Heap: 4
    // Top of Heap: 3
    // Top of Heap: 1

    return 0;
}
```

</details></blockquote>

Also refer: [`is_heap()`](https://en.cppreference.com/w/cpp/algorithm/is_heap) , [`make_heap()`](https://en.cppreference.com/w/cpp/algorithm/make_heap), [`push_heap()`](https://en.cppreference.com/w/cpp/algorithm/push_heap) , [`pop_heap()`](https://en.cppreference.com/w/cpp/algorithm/pop_heap) , [`sort_heap()`](https://en.cppreference.com/w/cpp/algorithm/sort_heap)

<!-- Can also use keyboard characters `←` , `→` , `↔` as arrows in your display functions -->
