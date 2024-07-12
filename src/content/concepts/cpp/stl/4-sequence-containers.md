---
title: STL - Sequence Containers & Adaptors
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
- `.swap(other)` - Swap content of current container with similar `other` container
- `.resize(n)`, `resize(n,val)` - Resize container to contain `n` elements. Can also pass default value `val` to set newly created elements as

**Note**: The `*emplace*` member functions perform insertions a bit faster than `*push*` or `*insert*` functions as they construct the new element **in-place** (instead of creating and then copying them)

## Adaptors for Sequence Containers

They provide a **wrapper interface** for Sequential containers

- [`stack`](#stack) - provides Stack (LIFO)
- [`queue`](#queue) - provides Queue (FIFO)
- [`priority_queue`](#heap) - provides Heap (Max-Heap by deafult)

---

## Singly Linked-List

- **Declaration**: `forward_list<Type> ll;`
- Supports `O(1)` insertion/deletion if **location specified** (only links updated)
- Operations at the **start** are `O(1)` and `O(N)` elsewhere.
- Random access **NOT** present. Only the start (i.e. head) accessible
- **Uni-directional access** to only forward adjacent element: `next(pos)`
- **CPP Reference**: [`forward_list`](https://en.cppreference.com/w/cpp/container/forward_list)

**Element Access**:

**`.front()`** - Access **first element** in the list

**Iterators**:

**`.before_begin()`**

- Returns an iterator pointing to a **placeholder element before the first** element in the list
- Trying to access it results in undefined behaviour
- Generally used with: `.insert_after()` , `.emplace_after()` , `.erase_after()` etc.
- Incrementing this iterator gives `.begin()`

**Note**: The list goes in only one direction i.e. forward. So, we can only do `itr++` , but **NOT** `itr--` (where `itr` is an iterator pointing to some element in the list)

**Capacity**: Note that `.size()` function is **NOT provided**

**Modifiers**:

- **`.pop_front()`** - Remove first element from the list
- **`.push_front(item)`** , **`.emplace_front(item)`** - Insert element `item` at **start** of the list
- **`.insert_after()`**: Insertion takes `O(1)` per entry in these operations
  - `.insert_after(pos,val)` - Insert element `item` after the position `pos`
  - `.insert_after(pos,count,item)` - Insert `count` copies of `item` after position `pos`
  - `.insert(pos,start,end)` - Insert all elements within `[start,end)` after position `pos`
- **`.emplace_after(pos,...args)`** - Construct element in-place after position `pos`

<blockquote><details>
<summary><code>forward_list</code> demo</summary>

```cpp title="forward_list_demo"
void printList(forward_list<int> &ll)
{
  for (auto &num : ll)
  {
      cout << num << " -> ";
  }
  cout << "X" << endl;
}

int main()
{
    forward_list<int> ll{7, 1, 3, 5};
    printList(ll);
    // 7 -> 1 -> 3 -> 5 -> X

    cout << "First element: " << ll.front() << endl;
    // First element: 7

    ll.push_front(10), ll.push_front(20);
    printList(ll);
    // 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> X

    ll.emplace_front(11), ll.emplace_front(22);
    printList(ll);
    // 22 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> X

    ll.pop_front();
    printList(ll);
    // 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> X

    // same as ll.push_front(420)
    ll.insert_after(ll.before_begin(), 420);
    printList(ll);
    // 420 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> X

    ll.insert_after(ll.begin(), 111);
    printList(ll);
    // 420 -> 111 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> X

    // Inserting at end of list: O(N) time
    // Step 1: Finding location of last element
    auto itr = ll.before_begin(); // handles empty list case
    while (next(itr) != ll.end())
    {
        itr++;
    }
    cout << "Last element: " << *itr << endl;
    // Last element: 5
    // Step 2: Insert after the last element
    ll.insert_after(itr, 999);
    printList(ll);
    // 420 -> 111 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> 999 -> X

    // same as ll.pop_front()
    ll.erase_after(ll.before_begin());
    printList(ll);
    // 111 -> 11 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> 999 -> X

    ll.erase_after(ll.begin());
    printList(ll);
    // 111 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> 999 -> X

    // Deleting from end of list: O(N) time
    // Step 1: Find location of second-last element
    itr = ll.before_begin();
    while (next(next(itr)) != ll.end())
    {
        itr++;
    }
    cout << "Second-last element: " << *itr << endl;
    // Step 2: Delete the element after second-last element
    ll.erase_after(itr);
    printList(ll);

    // insert_after(pos, count, val)
    ll.insert_after(ll.before_begin(), 3, 69);
    printList(ll);
    // 69 -> 69 -> 69 -> 111 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> X

    vector<int> v1{-5, -2, -8};
    // insert(pos, start, end)
    ll.insert_after(ll.before_begin(), v1.begin(), v1.end());
    printList(ll);
    // -5 -> -2 -> -8 -> 69 -> 69 -> 69 -> 111 -> 20 -> 10 -> 7 -> 1 -> 3 -> 5 -> X

    ll.clear();
    ll.emplace_front(101);
    ll.emplace_after(ll.begin(), 512);
    printList(ll);
    // 101 -> 512 -> X

    return 0;
}
```

</details></blockquote>

## Doubly-Linked List

- **Declaration**: `list<Type> dll;`
- Supports `O(1)` insertion/deletion if **location specified** (only links updated)
- Operations at the **start** and **end** are `O(1)`, but `O(N)` elsewhere
- Random access **NOT** present. Only the start and end is accessible
- **Bidirectional access** to both forward & backward adjacent elements: `next(pos)` , `prev(pos)`
- **CPP Reference**: [`list`](https://en.cppreference.com/w/cpp/container/list)

**Element Access**:

- **`.front()`** - Returns reference to **first element** in the list
- **`.back()`** - Returns reference to **last element** in the list

**Iterators**: `.begin()` , `.end()` , `.rbegin()`, `.rend()`

**Note**: The list goes in both directions. So, we can only do `itr++` as well as `itr--` (where `itr` is an iterator pointing to some element in the list)

**Capacity**: `.size()` function provided

**Modifiers**:

- **`.push_front(item)`** , **`.emplace_front(item)`** - Insert element `item` at **start** of the list
- **`.push_back(item)`** , **`.emplace_back(item)`** - Insert element `item` at **end** of the list
- **`.pop_front()`** - Remove **first** element from the list
- **`.pop_back()`** - Remove **last** element from the list
- **`.insert()`**: Insertion takes `O(1)` per entry in these operations
  - `.insert(pos,item)` - Insert element `item` at position `pos`
  - `.insert(pos,count,item)` - Insert `count` copies of `item` at position `pos`
  - `.insert(pos,start,end)` - Insert all elements within `[start,end)` at position `pos`
- **`.emplace(pos,...args)`** - Construct element in-place at position `pos`
- **`.erase(pos)`** - Removes element at `pos` position

<blockquote><details>

<summary>
<code>list</code> demo
</summary>

```cpp title="list_demo"
void printList(list<int> &dl)
{
    cout << "X <-> ";
    for (auto &num : dl)
    {
        cout << num << " <-> ";
    }
    cout << "X" << endl;
}

int main()
{
    list<int> dl{7, 1, 4, 3, 5};
    printList(dl);
    // X <-> 7 <-> 1 <-> 4 <-> 3 <-> 5 <-> X

    cout << "First element: " << dl.front() << endl;
    // First element: 7
    cout << "Last element: " << dl.back() << endl;
    // Last element: 5

    cout << "Reverse: ";
    // Reverse traversal
    for (auto itr = dl.rbegin(); itr != dl.rend(); itr++)
    {
        cout << *itr << ", ";
    }
    cout << endl;
    // Reverse: 5, 3, 4, 1, 7,

    dl.push_front(10);
    dl.emplace_front(20);
    printList(dl);
    // X <-> 20 <-> 10 <-> 7 <-> 1 <-> 4 <-> 3 <-> 5 <-> X

    dl.push_back(100);
    dl.emplace_back(200);
    printList(dl);
    // X <-> 20 <-> 10 <-> 7 <-> 1 <-> 4 <-> 3 <-> 5 <-> 100 <-> 200 <-> X

    dl.pop_front();
    printList(dl);
    // X <-> 10 <-> 7 <-> 1 <-> 4 <-> 3 <-> 5 <-> 100 <-> 200 <-> X

    dl.pop_back();
    printList(dl);
    // X <-> 10 <-> 7 <-> 1 <-> 4 <-> 3 <-> 5 <-> 100 <-> X

    auto thirdPosition = next(next(dl.begin()));
    dl.insert(thirdPosition, 55);
    printList(dl);
    // X <-> 10 <-> 7 <-> 55 <-> 1 <-> 4 <-> 3 <-> 5 <-> 100 <-> X

    auto secondLastPosition = prev(prev(dl.end()));
    dl.insert(secondLastPosition, 77);
    printList(dl);
    // X <-> 10 <-> 7 <-> 55 <-> 1 <-> 4 <-> 3 <-> 77 <-> 5 <-> 100 <-> X

    // insert(pos,count,val)
    dl.insert(dl.begin(), 3, -8);
    printList(dl);
    // X <-> -8 <-> -8 <-> -8 <-> 10 <-> 7 <-> 55 <-> 1 <-> 4 <-> 3 <-> 77 <-> 5 <-> 100 <-> X

    vector<int> v1{128, 64, 256};
    // insert(pos,start,end)
    dl.insert(dl.begin(), v1.begin(), v1.end());
    printList(dl);
    // X <-> 128 <-> 64 <-> 256 <-> -8 <-> -8 <-> -8 <-> 10 <-> 7 <-> 55 <-> 1 <-> 4 <-> 3 <-> 77 <-> 5 <-> 100 <-> X

    dl.erase(dl.begin());
    // above line same as dl.pop_front();
    printList(dl);
    // X <-> 64 <-> 256 <-> -8 <-> -8 <-> -8 <-> 10 <-> 7 <-> 55 <-> 1 <-> 4 <-> 3 <-> 77 <-> 5 <-> 100 <-> X

    return 0;
}
```

</details></blockquote>

## Double-ended Queue

- **Declaration**: `deque<Type> dq;`
- Operations at the **start** and **end** are `O(1)`, but `O(N)` elsewhere
- **Random access** is supported in `O(1)` time
- How is `deque` different from `vector` ?
  - Unlike `vector`, the elements are **not stored contiguously**
  - Indexed access to `deque` must perform **two pointer dereferences**, compared to only one in indexed access of `vector`
  - **Expansion is cheaper** than expansion of `vector` because it does not involve copying existing elements to new memory location
- See [this answer](https://stackoverflow.com/a/1436418/16365842) for difference between `deque` and `list`
- Most implementations use a sequence of individually allocated fixed-size arrays, with additional bookkeeping. They can also expand/contract as needed on both the ends. They also have a large minimal memory cost for allocating the individual arrays
- **CPP Reference**: [`deque`](https://en.cppreference.com/w/cpp/container/deque)

**Element Access**:

- **`.at(idx)`** - Access element at `idx` index, with bounds-checking
- **`[idx]`** - Access element at `idx` index
- **`.front()`** - Access **first element**
- **`.back()`** - Access **last element**

**Iterators**: `.begin()` , `.end()` , `.rbegin()`, `.rend()`

**Capacity**: **`.size()`** provided, `.shrink_to_fit()` (free ununsed space)

**Modifiers**:

- **`.push_front(item)`** , **`.emplace_front(item)`** - Insert element `item` at **start** of the list
- **`.push_back(item)`** , **`.emplace_back(item)`** - Insert element `item` at **end** of the list
- **`.pop_front()`** - Remove **first** element from the list
- **`.pop_back()`** - Remove **last** element from the list
- **`.insert()`**: Insertion element(s) at given postition
  - `.insert(pos,item)` - Insert element `item` at position `pos`
  - `.insert(pos,count,item)` - Insert `count` copies of `item` at position `pos`
  - `.insert(pos,start,end)` - Insert all elements within `[start,end)` at position `pos`
- **`.emplace(pos,...items)`** - Construct element in-place at position `pos`

## Stack

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
- **CPP Reference**: [`stack`](https://en.cppreference.com/w/cpp/container/stack)

**Element Access**: **`.top()`** returns reference to first i.e. **top-most element**

**Capacity**: **`.size()`** , **`.empty()`**

**Iterators**: **NONE** provided

**Modifiers**:

- **`.pop()`** - Remove element present at the top
- **`.push(val)`** - Insert element at the top
- **`.emplace(...args)`** - Construct element in-place at the top

## Queue

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
- **CPP Reference**: [`queue`](https://en.cppreference.com/w/cpp/container/queue)

**Element Access**:

- **`.front()`** - returns reference to **first** i.e. starting element
- **`.back()`** - returns reference to **last** i.e. ending element

**Capacity**: **`.size()`** , **`.empty()`**

**Iterators**: **NONE** provided

**Modifiers**:

- **`.pop()`** - Remove the first i.e. starting element
- **`.push(val)`** - Insert element at the end
- **`.emplace(...args)`** - Construct element in-place at the end

## Heap

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

- The default ordering is to keep the lexicographically larger element at the top i.e. a **Max-heap**, but you can also provide a custom `Compare` function to determine the ordering
- **CPP Reference**: [`priority_queue`](https://en.cppreference.com/w/cpp/container/priority_queue)
- **Declaration**:
  - **Max-heap**: `priority_queue< int > maxHp;`
  - **Min-heap**: `priority_queue< int, vector<int>, greater<int> > minHp;`

**Element Access**: **`.top()`** returns reference to the **highest priority element** (stored topmost at the root of Heap tree)

**Capacity**: **`.size()`** , **`.empty()`**

**Iterators**: **NONE** provided

**Modifiers**:

- **`.pop()`** - Remove the **topmost** element from the heap
- **`.push(val)`** - Insert element into the heap
- **`.emplace(...args)`** - Construct element in-place and insert into the heap

> **Note**: After each insertion/deletion, to **maintain the sorted Heap property**, the elements are re-organized internally by the adaptor itself.

Also refer: [`is_heap()`](https://en.cppreference.com/w/cpp/algorithm/is_heap) , [`make_heap()`](https://en.cppreference.com/w/cpp/algorithm/make_heap), [`push_heap()`](https://en.cppreference.com/w/cpp/algorithm/push_heap) , [`pop_heap()`](https://en.cppreference.com/w/cpp/algorithm/pop_heap) , [`sort_heap()`](https://en.cppreference.com/w/cpp/algorithm/sort_heap)

Can also use keyboard characters `←` , `→` , `↔` as arrows in display functions
