---
title: Design HashSet
ds: [array, list]
techniques: [design, hashing]
level: 2
links: [https://leetcode.com/problems/design-hashset/]
---

## Problem Statement

Design a **HashSet** without using any built-in hash table libraries (`set`, `unordered_set` or even `bitset`)

Implement `MyHashSet` class:

- `void add(key)`: Inserts the value key into the HashSet.
- `bool contains(key)`: Returns whether the value key exists in the HashSet or not.
- `void remove(key)`: Removes the value key in the HashSet. If key does not exist in the HashSet, do nothing.

**Constraints**:

- $0 \leq key \leq 10^6$
- At most $10^4$ calls will be made to `add`, `remove`, and `contains`

Let $n$ be the input size and $k$ be the number of unique keys in the input

## 1. Brute

- Maintain a dynamic array i.e. `vector` of keys
- Do linear search over the array each time to check if it exists
- Append new keys at the end and removals would involve shifting elements to fill the hole

**Space and Time Complexity**:

- Each of operations `contains`, `add`, `remove` would take $O(n)$ linear time on average
- The space taken would be just that of the number of unique keys i.e. $O(k)$

We could maintain a sorted array and binary search over it in $O(logn)$ time but the shifting of elements during `add`, `remove` operations would still take be $O(n)$ time at worst

## 2. Boolean Array

Since we know that each input lies in the range $[0, 10^6]$, we can use a fixed sized array of that many booleans. Being `true` means element equal to that index exists and `false` means it doesn't. Note that `vector<bool>` does not guarantee individual element access so we'll be using `bitset<N>` and its functions

```cpp
class MyHashSet {
    bitset<1'000'001> state;
public:
    MyHashSet() {}
    bool contains(int key) {
        return state.test(key);
    }
    void add(int key) {
        state.set(key);
    }
    void remove(int key) {
        state.reset(key);
    }
};
```

Note that LeetCode does not allow `bitset` to be used for this question to be accepted as a solution. So you could use `vector<char>` with `0`/`1` character values or `vector<int>` with `0`/`1` integer values (`vector<short>` too)

**Space and Time Complexity**:

- Each of the operations `contains`,`add`, `remove` **always** take $O(1)$ constant time as we have direct access
- Regardless of how many inputs we have or how many of them are unique, we would **always** be allocating a boolean array of size $V$, which is the maximum possible individual value in our input. Thus, the space complexity is $O(V/8)$ bytes as each boolean value in `bitset` is one bit and one byte consists of 8 such booleans packed together

---

## 3. Buckets of LinkedLists

![Hashing and LinkedList buckets](/code-journal/diagrams/hashing-buckets.svg)

**Some important considerations**:

- If the number of items is more than available buckets to place them into, then by [Pigeonhole principle](https://en.wikipedia.org/wiki/Pigeonhole_principle), there are bound to be **collisions** in at least one bucket. Our job is to spread the inputs apart to reduce how often collisions occur; badly hash functions could cause collisions even for smaller number of inputs
- The hash function converts a key into a hashed value that helps to **map it to a bucket** in the array of available buckets. The hash function should always produce the **same output for the same input**
- It is recommended to choose a **prime number** as the size of mapped array to reduce chances of collisions. Choosing a composite number can lead to the multiples of its factors come in the same buckets i.e. collisions so choosing a number with very little factors such as primes helps spread them more randomly. The closest prime to the constraints $10^4$ is `10007` and to $10^6$ is `1000003`

- We maintain an array of $M$ pointers, each possibly pointing to a bucket. Each bucket contains nodes of values arranged in LinkedList manner
- The incoming input element is mapped to one of the $M$ possible buckets based on the calculated hash value of element
- It is possible that multiple input elements have the same hash value, causing a **collision**. We just chain the new element to the existing LinkedList nodes in bucket. This strategy is known as **separate chaining**.
- Each operation involves first calculating the hash value and then traversing the list elements of just that one mapped bucket

<details>
<summary><strong>C++ Implementation for HashSet via Buckets of LinkedLists</strong></summary>

```cpp title="Buckets of LinkedLists"
class MyHashSet {
  private:
    struct Node {
        int val;
        Node* next;
        Node (int _val, Node* _next = nullptr) : val(_val), next(_next) {}
    };
    const int M = 10'007;  // 10_007 or 1_000_003 are primes closest to constraints
    inline int getHash (const int x) { return x % M; }
    vector<Node*> buckets;

  public:
    // Init M buckets with each bucket ptr to null
    MyHashSet () : buckets(M, nullptr) {}

    bool contains (int key) {
        int hashedKey = getHash(key);
        Node* itr = buckets[hashedKey];
        if (!itr) {        // Empty Bucket
            return false;  // No items would be found
        }
        while (itr) {
            if (itr->val == key) return true;  // Key FOUND
            itr = itr->next;                   // Advance pointer ahead
        }
        return false;  // NOT FOUND ANYWHERE
    }

    /* Insert new item at start of bucket for fast O(1) insertion */
    void add (int key) {
        int hashedKey = getHash(key);
        if (!buckets[hashedKey]) {               // Bucket Empty
            buckets[hashedKey] = new Node(key);  // Insert at start
            return;
        }
        // Traverse bucket items to see if already exists
        Node* itr = buckets[hashedKey];
        while (itr) {
            if (itr->val == key) return;  // Key Exists. SKIP
            itr = itr->next;              // Advance pointer ahead
        }
        // Create new item and insert it at start of bucket
        Node* newEntry = new Node(key, buckets[hashedKey]);
        buckets[hashedKey] = newEntry;
    }

    void remove (int key) {
        int hashedKey = getHash(key);
        if (!buckets[hashedKey]) {  // Bucket Empty. SKIP
            return;
        }
        if (buckets[hashedKey]->val == key) {            // Key present as first item
            Node* aheadPart = buckets[hashedKey]->next;  // Track what comes after targeted deletion node
            delete buckets[hashedKey];
            buckets[hashedKey] = aheadPart;  // Update node before target node to point to next part
            return;                          // Deletion complete. EXIT
        }
        // Traverse bucket items maintaining two pointers
        Node *prev = buckets[hashedKey], *curr = buckets[hashedKey]->next;
        while (curr) {
            if (curr->val == key) {
                Node* aheadPart = curr->next;  // Track what comes after targeted deletion node
                delete curr;
                prev->next = aheadPart;  // Update node before target node to point to next part
                return;                  // Deletion complete. EXIT
            }
            // Advance pointers ahead
            prev = curr;
            curr = curr->next;
        }
    }

    /* Deallocate Heap memory allocated through "new" */
    ~MyHashSet () {
        // Iterate over each bucket ptr
        for (Node* itr : buckets) {
            // Start deleting nodes from the front of bucket till nullptr remains
            while (itr) {
                Node* aheadPart = itr->next;
                delete itr;
                itr = aheadPart;
            }
        }
    }
};
```

</details>

**Space and Time Complexity**:

- Each of the operations `contains`, `add`, `remove` take $O(n/M)$ time, assuming uniformly random spread of inputs over the buckets. It is possible that _all_ inputs map to the same hash value bucket, whereby the worst case time complexity of operations could become $O(n)$; but the chances of that many collisions happening is pretty rare
- The space occupied by the bucket pointer and input values going into list nodes is $O(M+k)$, where $k$ is the number of unique keys out of $n$ total inputs

### Load Factor and Re-Hashing

The [**load factor**](https://youcademy.org/load-factor-and-rehashing) measures how densely populated the hash table is. It is defined as the ratio of the number of unique keys stored to the number of available buckets:

$$
\alpha = \frac{k}{M}
$$

A higher load factor generally means longer bucket chains and more work during lookups, insertions, and removals. A lower load factor generally reduces collisions but requires more memory for the bucket array.

**Rehashing** involves allocating a new bucket array, typically with more buckets, and redistributing the existing keys into their appropriate buckets. This is necessary when the table becomes too densely populated according to its chosen load-factor threshold. Rehashing is an expensive operation as the entire existing table is reconstructed, so it should be done only when necessary. If the table grows geometrically (like doubling the number of buckets), the cost of rehashing can be amortized across insertions, allowing insertion to remain amortized $O(1)$ under typical hashing assumptions.

For separate chaining, the load factor can exceed (1), since multiple keys can be stored in the same bucket. The appropriate threshold depends on the implementation and its performance requirements.

## 4. Buckets of BSTs

Instead of storing the elements in each bucket as nodes of a LinkedList, we can organize them as nodes of a Binary Search Tree (BST). Hashing still determines which bucket an incoming key maps to.

The sorted nature of BST nodes in each of the buckets allows for fast lookups via binary search. If $b$ is the average number of nodes in a bucket, then all the `contains`, `add`, `remove` operations would take $O(logb)$ on average and $O(logk)$ at worst.

The space complexity is $O(M+k)$ just like in the LinkedList approach

---

## Variant: Design HashMap

LeetCode link: [Design a Hashmap](https://leetcode.com/problems/design-hashmap/)

> The boolean array approach won't work here as we need to store the **value** associated with the key too.

<details>
<summary><strong>C++ Implementation for HashMap via Buckets of LinkedLists</strong></summary>

```cpp title="Hashmap via Buckets of LinkedLists"
class MyHashMap {
    struct Node {
        int id;
        int val;
        Node* next;
        Node (int _id, int _val, Node* _next = nullptr) : id(_id), val(_val), next(_next) {}
    };
    static const int M = 10'007;  // Choose prime number as size to minimize collisions
    inline int getHash (const int x) const { return x % M; }
    vector<Node*> buckets;

  public:
    MyHashMap () : buckets(M, nullptr) {}

    int get (int key) {
        int hashedKey = getHash(key);
        if (!buckets[hashedKey]) return -1;  // Bucket Empty. NOT EXISTS
        Node* itr = buckets[hashedKey];
        // Traverse over bucket items
        while (itr) {
            if (itr->id == key) return itr->val;  // FOUND. Return VALUE
            itr = itr->next;
        }
        return -1;  // NOT FOUND
    }

    void put (int key, int value) {
        int hashedKey = getHash(key);
        if (!buckets[hashedKey]) {  // Bucket Empty
            buckets[hashedKey] = new Node(key, value);
            return;
        }
        Node* itr = buckets[hashedKey];
        while (itr) {
            if (itr->id == key) {  // Key already exists. Update Value
                itr->val = value;
                return;
            }
            itr = itr->next;
        }
        // Key nowhere found after traversing whole bucket. Insert at Start
        Node* aheadPart = buckets[hashedKey];
        buckets[hashedKey] = new Node(key, value, aheadPart);
    }

    void remove (int key) {
        int hashedKey = getHash(key);
        if (!buckets[hashedKey]) return;      // Bucket empty
        if (buckets[hashedKey]->id == key) {  // First elem is to be removed
            Node* aheadPart = buckets[hashedKey]->next;
            delete buckets[hashedKey];
            buckets[hashedKey] = aheadPart;
            return;  // Deletion complete. Exit
        }
        Node *prev = buckets[hashedKey], *curr = buckets[hashedKey]->next;
        while (curr) {
            if (curr->id == key) {
                Node* aheadPart = curr->next;
                delete curr;
                prev->next = aheadPart;
                return;  // Deletion complete. Exit
            }
            prev = curr;
            curr = curr->next;
        }
    }
};
```

</details>

---

## Explore more

- [Collision Resolution in HashTables](https://en.wikipedia.org/wiki/Hash_table#Collision_resolution)
- [Open Addressing i.e. Closed Hashing](https://en.wikipedia.org/wiki/Open_addressing)
- [Consistent Hashing](https://en.wikipedia.org/wiki/Consistent_hashing)

<!-- Load Factor, Rehashing  -->
