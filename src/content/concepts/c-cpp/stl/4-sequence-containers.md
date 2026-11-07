---
title: STL - Sequence Containers and Adaptors
tags: [cpp, stl]
---

## Sequence Containers

- [`<array>`](https://en.cppreference.com/w/cpp/container/array) - Static arrays
- [`<vector>`](/code-journal/dsa/c-cpp/stl/3-vectors) - Dynamic arrays
- [`<forward_list>`](#singly-linked-list) - Singly linked-list
- [`<list>`](#doubly-linked-list) - Doubly linked-list
- [`<deque>`](#double-ended-queue) - Double-ended queue

**Common member functions** in sequential containers are:

- `.begin()` - Returns an iterator pointing to the **start** of the container
- `.end()` - Returns an iterator pointing to the address **next to the last element** in the container
- `.empty()` - Returns whether the container is empty
- `.clear()` - Clear all contents present inside the container
- `.size()` - Returns number of items present inside the container (absent in `forward_list`)
- `.max_size()` - Returns theoretical maximum number of elements that the container can hold
- `.swap(other)` - Swap content of current container with `other` container of same type
- `.resize(n)` , `resize(n,val)` - Resize container to contain `n` elements. Can also pass default value `val` to set newly created elements as

> The **`emplace`** member functions (like `emplace_back`, `emplace_front`, `emplace_front`, `emplace` etc.) perform insertions slightly faster than regular `push` or `insert` functions as they construct the new element **in-place** (instead of constructing the element and then **copying** it to that place). They take single list of **variadic arguments** required to construct the object. These are particularly useful for bulky **composite types** where copying is expensive.

### Adaptors for Sequence Containers

They provide a **wrapper interface** for sequential containers. These are:

- [`<stack>`](#stack) - provides Stack (LIFO)
- [`<queue>`](#queue) - provides Queue (FIFO)
- [`<priority_queue>`](#priority-queue) - provides Heap (max-heap by default)

---

## Singly Linked-List

- CPP Reference: [`forward_list`](https://en.cppreference.com/w/cpp/container/forward_list)
- **Declaration**: `forward_list<Type> ll;`
- Supports $O(1)$ **insertion/deletion** if **location specified** (only links get updated)
- Operations at the **start** are $O(1)$ and $O(N)$ elsewhere.
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
- **`.insert_after()`** - Insertion takes $O(1)$ per entry in these operations
  - `.insert_after(pos,item)` - Insert element `item` after the position `pos`
  - `.insert_after(pos,count,item)` - Insert `count` copies of `item` after position `pos`
  - `.insert(pos,start,end)` - Insert all elements within `[start,end)` after position `pos`
- **`.emplace_after(pos,...args)`** - Construct element in-place after position `pos`

<blockquote>
<details>
<summary><strong><code>forward_list</code> Demo</strong></summary>

```cpp title="forward_list demo"
void printList (const forward_list<int> &ll) {
    if (ll.empty()) {
        cout << "List is empty\n";
        return;
    }
    for (const int &num : ll) cout << num << " -> ";
    cout << "\n";
}

int main () {
    forward_list<int> l1{3};
    printList(l1);  // 3 ->

    forward_list<int> l2(3, 2);
    printList(l2);  // 2 -> 2 -> 2 ->

    forward_list<int> ll{7, 1, 3, 5};
    printList(ll);                                    // 7 -> 1 -> 3 -> 5 ->
    cout << "First element: " << ll.front() << "\n";  // First element: 7

    ll.push_front(10), ll.push_front(20);
    printList(ll);  // 20 -> 10 -> 7 -> 1 -> 3 -> 5 ->
    ll.emplace_front(11), ll.emplace_front(22);
    printList(ll);  // 22 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 ->
    ll.pop_front();
    printList(ll);  // 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 ->

    ll.insert_after(ll.before_begin(), 420);  // it is same as ll.push_front(420)
    printList(ll);                            // 420 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 ->
    ll.insert_after(ll.begin(), 123);
    printList(ll);  // 420 -> 123 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 ->

    // Inserting at end of list: O(N) time
    // Step 1: Finding location of last element
    auto itr = ll.before_begin();  // Handles any empty list case
    while (next(itr) != ll.end()) {
        itr++;
    }
    cout << "Last element: " << *itr << "\n";  // Last element: 5
    // Step 2: Insert AFTER this last element
    ll.insert_after(itr, 99);
    printList(ll);  // 420 -> 123 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> 99 ->

    ll.erase_after(ll.before_begin());  // is is same as ll.pop_front()
    printList(ll);                      // 123 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> 99 ->

    ll.erase_after(ll.begin());
    printList(ll);  // 123 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> 99 ->

    // Deleting from end of list: O(N) time
    // Step 1: Find location of second-last element
    itr = ll.before_begin();
    // Check next element exists before checking next-of-next
    while (next(itr) != ll.end() && next(next(itr)) != ll.end()) {
        itr++;
    }
    cout << "Second-last element: " << *itr <<  "\n";  // Second-last element: 5
    // Step 2: Delete the element AFTER this second-last element
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
}
```

</details>
</blockquote>

---

## Doubly-Linked List

- CPP Reference: [`list`](https://en.cppreference.com/w/cpp/container/list)
- **Declaration**: `list<Type> dll;`
- Supports $O(1)$ **insertion/deletion** if **location specified** (only links get updated)
- Operations at the **start/end** are $O(1)$, but $O(N)$ elsewhere
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
- **`.insert()`** : Insertion takes $O(1)$ per entry in these operations
  - `.insert(pos,item)` - Insert element `item` at position `pos`
  - `.insert(pos,count,item)` - Insert `count` copies of `item` at position `pos`
  - `.insert(pos,start,end)` - Insert all elements within `[start,end)` at position `pos`
- **`.emplace(pos,...args)`** - Construct element in-place at position `pos`

<blockquote>
<details>
<summary><strong><code>list</code> Demo</strong></summary>

```cpp title="list demo"
void printList (const list<int> &dl) {
    if (dl.empty()) {
        cout << "List is empty\n";
        return;
    }
    auto itr = dl.begin();
    if (next(itr) == dl.end()) {  // SINGLE element list
        cout << "<- " << *itr << " -> \n";
        return;
    }
    for (itr = dl.begin(); itr != dl.end(); itr++) {
        if (itr == dl.begin()) cout << "<- " << *itr << " <-> ";  // FIRST element
        else if (next(itr) == dl.end()) cout << *itr << " -> ";   // LAST element
        else cout << *itr << " <-> ";                             // INTERMEDIATE element
    }
    cout << "\n";
}

int main () {
    list<int> l1{3};
    printList(l1);  // <- 3 ->

    list<int> l2(3, 2);
    printList(l2);  // <- 2 <-> 2 <-> 2 ->

    list<int> dl{7, 1, 4, 3, 5};
    printList(dl);  // <- 7 <-> 1 <-> 4 <-> 3 <-> 5 ->

    // We can iterate "list" items via Range-based loop:
    cout << "[ ";
    for (const int &x : dl) cout << x << ", ";
    cout << "]\n";
    // [ 7, 1, 4, 3, 5, ]

    cout << "Size: " << dl.size() << endl;            // Size: 5
    cout << "First element: " << dl.front() << endl;  // First element: 7
    cout << "Last element: " << dl.back() << endl;    // Last element: 5

    // Reverse traversal:
    cout << "Reverse: [";
    for (auto itr = dl.rbegin(); itr != dl.rend(); itr++) cout << *itr << ", ";
    cout << "] \n";
    // Reverse: [5, 3, 4, 1, 7, ]

    dl.push_front(10);
    dl.emplace_front(20);
    printList(dl);  // <- 20 <-> 10 <-> 7 <-> 1 <-> 4 <-> 3 <-> 5 ->

    dl.push_back(15);
    dl.emplace_back(25);
    printList(dl);  // <- 20 <-> 10 <-> 7 <-> 1 <-> 4 <-> 3 <-> 5 <-> 15 <-> 25 ->

    dl.pop_front();
    printList(dl);  // <- 10 <-> 7 <-> 1 <-> 4 <-> 3 <-> 5 <-> 15 <-> 25 ->

    dl.pop_back();
    printList(dl);  // <- 10 <-> 7 <-> 1 <-> 4 <-> 3 <-> 5 <-> 15 ->

    auto thirdPosition = next(next(dl.begin()));
    dl.insert(thirdPosition, 24);
    printList(dl);  // <- 10 <-> 7 <-> 24 <-> 1 <-> 4 <-> 3 <-> 5 <-> 15 ->

    auto thirdLastPosition = prev(prev(dl.end()));
    dl.insert(thirdLastPosition, 77);
    printList(dl);  // <- 10 <-> 7 <-> 24 <-> 1 <-> 4 <-> 3 <-> 77 <-> 5 <-> 15 ->

    // insert(pos,count,val)
    dl.insert(dl.begin(), 3, 2);
    printList(dl);  // <- 2 <-> 2 <-> 2 <-> 10 <-> 7 <-> 24 <-> 1 <-> 4 <-> 3 <-> 77 <-> 5 <-> 15 ->

    vector<int> v1{1, 2, 4};
    dl.insert(dl.begin(), v1.begin(), v1.end());  // insert(pos,start,end)
    printList(dl);
    // <- 1 <-> 2 <-> 4 <-> 2 <-> 2 <-> 2 <-> 10 <-> 7 <-> 24 <-> 1 <-> 4 <-> 3 <-> 77 <-> 5 <-> 15 ->

    dl.erase(dl.begin());  // same as dl.pop_front();
    printList(dl);
    // <- 2 <-> 4 <-> 2 <-> 2 <-> 2 <-> 10 <-> 7 <-> 24 <-> 1 <-> 4 <-> 3 <-> 77 <-> 5 <-> 15 ->

    dl.clear();
    printList(dl);  // List is empty
}
```

</details>
</blockquote>

---

## Double-Ended Queue

- CPP Reference: [`deque`](https://en.cppreference.com/w/cpp/container/deque)
- Operations at the **start** and **end** are $O(1)$, but $O(N)$ elsewhere
- **Random access** is supported in $O(1)$ time
- **Declaration**: `deque<Type> dq;`

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

<blockquote>
<details>
<summary><strong><code>deque</code> Demo</strong></summary>

```cpp title="deque demo"
void printDEQ (const deque<int> &dq) {
    if (dq.empty()) {
        cout << "DEQ is empty\n";
        return;
    }
    for (const int &num : dq) cout << num << ", ";
    cout << "\n";
}

int main () {
    deque<int> l1{3};
    printDEQ(l1);  // 3,

    deque<int> l2(3, 2);
    printDEQ(l2);  // 2, 2, 2,

    deque<int> dq{7, 1, 4, 3, 5};
    printDEQ(dq);  // 7, 1, 4, 3, 5,

    cout << "Size: " << dq.size() << endl;            // Size: 5
    cout << "dq.at(2): " << dq.at(2) << endl;         // dq.at(2): 4
    cout << "dq[3]: " << dq[3] << endl;               // dq[3]: 3
    cout << "First element: " << dq.front() << endl;  // First element: 7
    cout << "Last element: " << dq.back() << endl;    // Last element: 5

    cout << "Reverse: ";
    for (auto itr = dq.rbegin(); itr != dq.rend(); itr++) {
        cout << *itr << ", ";
    }
    cout << endl;  // Reverse: 5, 3, 4, 1, 7,

    dq.push_front(10);
    dq.emplace_front(20);
    printDEQ(dq);  // 20, 10, 7, 1, 4, 3, 5,

    dq.push_back(15);
    dq.emplace_back(25);
    printDEQ(dq);  // 20, 10, 7, 1, 4, 3, 5, 15, 25,

    dq.pop_front();
    printDEQ(dq);  // 10, 7, 1, 4, 3, 5, 15, 25,

    dq.pop_back();
    printDEQ(dq);  // 10, 7, 1, 4, 3, 5, 15,

    auto thirdPosition = next(next(dq.begin()));
    dq.insert(thirdPosition, 24);
    printDEQ(dq);  // 10, 7, 24, 1, 4, 3, 5, 15,

    auto thirdLastPosition = prev(prev(dq.end()));
    dq.insert(thirdLastPosition, 77);
    printDEQ(dq);  // 10, 7, 24, 1, 4, 3, 77, 5, 15,

    // insert(pos,count,val)
    dq.insert(dq.begin(), 3, 2);
    printDEQ(dq);  // 2, 2, 2, 10, 7, 24, 1, 4, 3, 77, 5, 15,

    vector<int> v1{1, 2, 4};
    // insert(pos,start,end)
    dq.insert(dq.begin(), v1.begin(), v1.end());
    printDEQ(dq);  // 1, 2, 4, 2, 2, 2, 10, 7, 24, 1, 4, 3, 77, 5, 15,

    dq.erase(dq.begin());  // same as dq.pop_front();
    printDEQ(dq);          // 2, 4, 2, 2, 2, 10, 7, 24, 1, 4, 3, 77, 5, 15,

    dq.clear();
    printDEQ(dq);  // DEQ is empty
}
```

</details>
</blockquote>

> How is `deque` different from `vector` or `list`?

- Unlike `vector`, the elements are **not stored contiguously** in memory.
- Most `deque` implementations use a sequence of **individually allocated fixed-size arrays**, with additional bookkeeping. They can also **expand/contract** as needed on **both ends**. They also have a large minimal memory cost for allocating the individual arrays
- Indexed access to `deque` must perform **two pointer dereferences**, compared to only one in indexed direct access to `vector`
- **Expansion is cheaper** in `deque` than expansion of `vector` because it does not involve copying existing elements to new memory location
- Also see [this StackOverflow answer](https://stackoverflow.com/a/1436418/16365842) for difference between `deque` and `list`

| Criteria               | `vector`                                   | `list`                                      | `deque`                                          |
| ---------------------- | ------------------------------------------ | ------------------------------------------- | ------------------------------------------------ |
| Implementation         | Contiguous array                           | Doubly-linked list                          | Dynamic array of fixed-size memory chunks        |
| Random Access          | $O(1)$ fastest                             | $O(n)$ traverse                             | $O(1)$; slower than `vector` as two dereferences |
| Add/Del. at **Back**   | $O(1)$ amortized                           | $O(1)$                                      | $O(1)$                                           |
| Add/Del. at **Front**  | $O(n)$ shifting                            | $O(1)$                                      | $O(1)$                                           |
| Add/Del. in **Middle** | $O(n)$ shifting                            | $O(1)$ via pointer                          | $O(n)$ shifting                                  |
| Extra Memory           | Low (only extra capacity ahead)            | High (`prev`, `next` pointers at each node) | Medium (chunk tracking pointers)                 |
| Memory Growth          | Reallocates and copies entire capacity     | Allocates element-by-element                | Allocates a new fixed-size chunk                 |
| Cache friendly         | Excellent (all contiguous)                 | Poor (scattered over memory)                | Good (contiguous within chunks)                  |
| Iterator Invalidation  | High (Invalidates on reallocations/shifts) | Low (Iterators remain valid unless deleted) | High (Invalidates on most modifications)         |

---

> **Note**: The **Adaptors** for Sequence Containers i.e. `stack`, `queue`, `heap` are wrapper interfaces that enforce policies like LIFO/FIFO. They do NOT manage raw memory by themselves and offer fewer restricted operations (like `push`,`pop`) without any direct iterator access for traversal. The Adaptors do NOT support initializer list like the Sequence Containers

## Stack

- CPP Reference: [`stack`](https://en.cppreference.com/w/cpp/container/stack)
- The `stack` adaptor provides a **Stack** data structure wrapper to the container, which has the property of **Last-in First-out** i.e. **LIFO** (also called first-in last-out)
- Supports operations **ONLY** at the **top** of Stack, which take $O(1)$ time each
- It's defined as shown below. The underlying `Container` can be `deque` (default) or `vector` or `list`

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

<blockquote>
<details>
<summary><strong><code>stack</code> Demo</strong></summary>

```cpp title="stack demo"
void printTop (const stack<int> &stk) {
    if (stk.empty()) cout << "Stack is empty";
    else cout << "Top element: " << stk.top();
    cout << "\n";
}
void printTop (const stack<int, vector<int>> &stk) {
    if (stk.empty()) cout << "Stack is empty";
    else cout << "Top element: " << stk.top();
    cout << "\n";
}

int main () {
    stack<int> stk;
    printTop(stk);  // Stack is empty

    vector<int> v1{7, 1, 4, 3, 5};
    cout << "Inserting elements...\n";
    for (int num : v1) {
        stk.push(num);  // Insert element on top of stack
        printTop(stk);  // Print current top element
    }
    /*
        Inserting elements...
        Top element: 7
        Top element: 1
        Top element: 4
        Top element: 3
        Top element: 5
    */
    cout << "Size: " << stk.size() << "\n";  // Size: 5

    cout << "Removing elements...\n";
    while (!stk.empty()) {
        printTop(stk);  // Print current top element
        stk.pop();      // Pop element from top of stack
    }
    /*
        Removing elements...
        Top element: 5
        Top element: 3
        Top element: 4
        Top element: 1
        Top element: 7
    */

    /* ---- OTHER WAYS TO INITIALIZE STACK ---- */

    // Approach 1: Passing a deque (Fastest, matches default container type)
    cout << "Initialize Stack from deque container:\n";
    stack<int> s1(deque<int>{1, 2, 3});
    while (!s1.empty()) {
        printTop(s1);
        s1.pop();
    }
    /*
        Initialize Stack from deque container:
        Top element: 3
        Top element: 2
        Top element: 1
    */

    // Approach 2: Passing a container like vector (or list)
    cout << "Initialize Stack from vector container:\n";
    stack<int, vector<int>> s2(vector<int>{10, 20, 30});
    while (!s2.empty()) {
        printTop(s2);
        s2.pop();
    }
    /*
        Initialize Stack from vector container:
        Top element: 30
        Top element: 20
        Top element: 10
    */

    // Approach 3: Using C++17 Class Template Argument Deduction
    cout << "Initialize Stack with deduced deque container:\n";
    deque<int> dq = {100, 200, 300};
    stack s3(dq);  // Automatically deduces stack<int, deque<int>>
    while (!s3.empty()) {
        printTop(s3);
        s3.pop();
    }
    /*
        Initialize Stack with deduced deque container:
        Top element: 300
        Top element: 200
        Top element: 100
    */
}
```

</details>
</blockquote>

---

## Queue

- CPP Reference: [`queue`](https://en.cppreference.com/w/cpp/container/queue)
- The `queue` adaptor provides a **Queue** data structure wrapper to the container, which has the property of **First-in First-out** i.e. **FIFO** (also called last-in last-out)
- **Insertion** occurs at the **back** and **Deletion** at the **front**, both taking $O(1)$ time
- It's defined as shown below. The underlying `Container` can be `deque` (default) or `list` but NOT `vector` as it doesn't support quick $O(1)$ deletion at front

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
void printBothEnds (const queue<int> &q) {
    if (q.empty()) cout << "Queue is empty";
    else cout << "Front: " << q.front() << ", Back: " << q.back();
    cout << "\n";
}

void printBothEnds (const queue<int, list<int>> &q) {
    if (q.empty()) cout << "Queue is empty";
    else cout << "Front: " << q.front() << ", Back: " << q.back();
    cout << "\n";
}

int main () {
    queue<int> q;
    printBothEnds(q);  // Queue is empty

    vector<int> v1{7, 1, 4, 3, 5};
    cout << "Inserting elements...\n";
    for (const int &num : v1) {
        q.push(num);       // Insert element at back of queue
        printBothEnds(q);  // Print current first and last element
    }
    /*
        Inserting elements...
        Front: 7, Back: 7
        Front: 7, Back: 1
        Front: 7, Back: 4
        Front: 7, Back: 3
        Front: 7, Back: 5
    */
    cout << "Size: " << q.size() << "\n";  // Size: 5

    cout << "Removing elements...\n";
    while (!q.empty()) {
        printBothEnds(q);  // Print current first and last element
        q.pop();           // Pop element from front of queue
    }
    /*
        Removing elements...
        Front: 7, Back: 5
        Front: 1, Back: 5
        Front: 4, Back: 5
        Front: 3, Back: 5
        Front: 5, Back: 5
    */

    /* ---- OTHER WAYS TO INITIALIZE QUEUE ---- */

    // Approach 1: Passing a deque (Fastest, matches default container type)
    cout << "Initialize Queue from deque container:\n";
    queue<int> q1(deque<int>{1, 2, 3});
    while (!q1.empty()) {
        printBothEnds(q1);
        q1.pop();
    }
    /*
        Initialize Queue from deque container:
        Front: 1, Back: 3
        Front: 2, Back: 3
        Front: 3, Back: 3
    */

    // Approach 2: Passing a list (vector NOT supported)
    cout << "Initialize Queue from list container:\n";
    queue<int, list<int>> q2(list<int>{10, 20, 30});
    while (!q2.empty()) {
        printBothEnds(q2);
        q2.pop();
    }
    /*
        Initialize Queue from list container:
        Front: 10, Back: 30
        Front: 20, Back: 30
        Front: 30, Back: 30
    */

    // Approach 3: Using C++17 Class Template Argument Deduction
    cout << "Initialize Queue with deduced deque container:\n";
    deque<int> dq = {100, 200, 300};
    queue q3(dq);  // Automatically deduces queue<int, deque<int>>
    while (!q3.empty()) {
        printBothEnds(q3);
        q3.pop();
    }
    /*
        Initialize Queue with deduced deque container:
        Front: 100, Back: 300
        Front: 200, Back: 300
        Front: 300, Back: 300
    */
}
```

</details></blockquote>

---

## Priority Queue

- CPP Reference: [`priority_queue`](https://en.cppreference.com/w/cpp/container/priority_queue)
- The `priority_queue` adaptor provides a **Heap** data structure wrapper to the container
- The **default ordering** is to keep the **lexicographically larger** at the top via `less<T>` comparator i.e. a **Max-heap**. You can also provide a custom `Compare` function to determine the ordering
- Priority Queue supports fast **lookup** of **highest-priority** element in $O(1)$ time
- Insertion/Deletions take up to $O(logN)$ time
- Priority Queue **allows inserting duplicates**, but there is no guarantee of stable order i.e. strict FIFO between the duplicates
- It's defined as shown below. The underlying `Container` can be either `vector` (default) or `deque`

  ```cpp
  template<
    class T,
    class Container = vector<T>,
    class Compare = less<typename Container::value_type>
  > class priority_queue;
  ```

- The adaptor internally uses the [Heap operation algorithms](/code-journal/dsa/c-cpp/stl/6-algorithms#heap-operations) like `make_heap()`, `push_heap()`, `pop_heap()` defined in `<algorithm>` header over the `Container` elements
- Even though both `vector` and `deque` support $O(1)$ random access, the fast direct access in `vector` allows for more efficient pointer arithmetic calculations to calculate child and parent indices as compared to the two-step dereferencing in `deque`. Thereby,

**Declaration**:

- **Max-heap**: `priority_queue<int> maxHp;`
- **Min-heap**: `priority_queue<int, vector<int>, greater<int>> minHp;`
- You could also create handy type template aliases as below:

  ```cpp
  // Define Max-Heap and Min-Heap template aliases:
  template <typename T> using max_heap = priority_queue<T, vector<T>, less<T>>;
  template <typename T> using min_heap = priority_queue<T, vector<T>, greater<T>>;
  ```

**Element access**: **`.top()`** returns reference to the **highest priority element** (at the root of Heap tree)

**Capacity**: **`.size()`**

**Iterators**: **NONE** provided

**Modifiers**:

- **`.pop()`** - Remove the **topmost** element from the heap
- **`.push(val)`** - Insert element into the heap
- **`.emplace(...args)`** - Construct element in-place and insert into the heap

After each insertion/deletion, to **maintain the sorted Heap property**, the elements are re-organized internally by the adaptor itself.

<blockquote>
<details>
<summary><strong><code>priority_queue</code> Demo</strong></summary>

```cpp title="priority_queue demo"
// Define Max-Heap and Min-Heap template aliases for convenience:
template <typename T = int> using max_heap = priority_queue<T>;
template <typename T = int> using min_heap = priority_queue<T, vector<T>, greater<T>>;

template <typename T = int, typename Container = vector<T>, typename Comparator>
void printHeapInfo (const priority_queue<T, Container, Comparator> &pq) {
    if (pq.empty()) cout << "Heap is empty (size is zero)";
    else cout << "Top element in Heap: " << pq.top() << ", Size: " << pq.size();
    cout << "\n";
}

int main () {
    vector<int> v1{4, 1, 3, 7, 4, 5};

    /* ---- MAX HEAP ---- */
    cout << "MAX-HEAP Usage:\n";
    max_heap<int> scoreboard;
    printHeapInfo(scoreboard);  // Heap is empty (size is zero)
    cout << "Inserting elements into Max-Heap\n";
    for (const int &num : v1) {
        scoreboard.push(num);
        printHeapInfo(scoreboard);
    }
    /*
        Inserting elements into Max-Heap
        Top element in Heap: 4, Size: 1
        Top element in Heap: 4, Size: 2
        Top element in Heap: 4, Size: 3
        Top element in Heap: 7, Size: 4
        Top element in Heap: 7, Size: 5
        Top element in Heap: 7, Size: 6
    */
    cout << "Removing elements from Max-Heap...\n";
    while (!scoreboard.empty()) {
        printHeapInfo(scoreboard);
        scoreboard.pop();
    }
    /*
        Removing elements from Max-Heap...
        Top element in Heap: 7, Size: 6
        Top element in Heap: 5, Size: 5
        Top element in Heap: 4, Size: 4
        Top element in Heap: 4, Size: 3
        Top element in Heap: 3, Size: 2
        Top element in Heap: 1, Size: 1
    */
    printHeapInfo(scoreboard);  // Heap is empty (size is zero)

    /* ---- MIN HEAP ---- */
    cout << "\nMIN-HEAP Usage:\n";
    min_heap<int> costs;
    printHeapInfo(costs);  // Heap is empty (size is zero)
    cout << "Inserting elements into Min-Heap...\n";
    for (const int &num : v1) {
        costs.push(num);
        printHeapInfo(costs);
    }
    /*
        Inserting elements into Min-Heap...
        Top element in Heap: 4, Size: 1
        Top element in Heap: 1, Size: 2
        Top element in Heap: 1, Size: 3
        Top element in Heap: 1, Size: 4
        Top element in Heap: 1, Size: 5
        Top element in Heap: 1, Size: 6
    */
    cout << "Removing elements from Min-Heap...\n";
    while (!costs.empty()) {
        printHeapInfo(costs);
        costs.pop();
    }
    /*
        Removing elements from Min-Heap...
        Top element in Heap: 1, Size: 6
        Top element in Heap: 3, Size: 5
        Top element in Heap: 4, Size: 4
        Top element in Heap: 4, Size: 3
        Top element in Heap: 5, Size: 2
        Top element in Heap: 7, Size: 1
    */
    printHeapInfo(costs);  // Heap is empty (size is zero)

    /* ---- Initialize HEAP with VECTOR as Container ---- */
    vector<int> v{3, 7, 1, 2};

    priority_queue<int> maxVectHp(v.begin(), v.end());
    printHeapInfo(maxVectHp);  // Top element in Heap: 7, Size: 4

    priority_queue<int, vector<int>, greater<int>> minVectminVectHeapHp(v.begin(), v.end());
    printHeapInfo(minVectHp);  // Top element in Heap: 1, Size: 4

    /* ---- Initialize HEAP with DEQUE as Container ---- */
    deque<int> dq{3, 7, 1, 2};

    priority_queue<int, deque<int>> maxDqHp(dq.begin(), dq.end());
    printHeapInfo(maxDqHp);  // Top element in Heap: 7, Size: 4

    priority_queue<int, deque<int>, greater<int>> minDqHp(dq.begin(), dq.end());
    printHeapInfo(minDqHp);  // Top element in Heap: 1, Size: 4
}
```

</details>
</blockquote>

<!--  -->

<details>
<summary><strong><code>priority_queue</code> with Custom Data-type</strong></summary>

We create a custom Comparator struct with `()` operator overload to compare two objects of our custom data-type. We could also just overload the `<` operator within `Employee` struct to define comparison of two `Employee` objects but that is not generally extensible to more complex types and operations

```cpp title="priority_queue with Custom Data-type and Comparator"
struct Employee {
    string name;
    int score;
    Employee (string _name, int _score) : name(_name), score(_score) {}
};

struct BetterEmployeeComparator {
    bool operator()(const Employee &e1, const Employee &e2) { return e1.score < e2.score; }
};
struct WorseEmployeeComparator {
    bool operator()(const Employee &e1, const Employee &e2) { return e1.score > e2.score; }
};

int main () {
    vector<Employee> employees{
        {"John", 52}, {"Sam", 26}, {"Roy", 85}, {"Jamie", 67}, {"Adam", 95}, {"Elon", 48}, {"Carl", 52}, {"Derek", 74},
    };

    priority_queue<Employee, vector<Employee>, BetterEmployeeComparator> toPromote(employees.begin(), employees.end());
    auto firstBest = toPromote.top();
    toPromote.pop();
    auto secondBest = toPromote.top();
    cout << "The top two Best performing employees are:\n";
    cout << firstBest.name << " with score " << firstBest.score << "\n";
    cout << secondBest.name << " with score " << secondBest.score << "\n";
    /*
        The top two Best performing employees are:
        Adam with score 95
        Roy with score 85
    */

    priority_queue<Employee, vector<Employee>, WorseEmployeeComparator> toFire(employees.begin(), employees.end());
    auto firstWorst = toFire.top();
    toFire.pop();
    auto secondWorst = toFire.top();
    cout << "The top two Worst performing employees are:\n";
    cout << firstWorst.name << " with score " << firstWorst.score << "\n";
    cout << secondWorst.name << " with score " << secondWorst.score << "\n";
    /*
        The top two Worst performing employees are:
        Sam with score 26
        Elon with score 48
    */
}
```

</details>
