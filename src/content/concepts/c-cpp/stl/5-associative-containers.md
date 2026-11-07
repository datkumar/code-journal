---
title: STL - Associative Containers
tags: [cpp, stl, containers]
---

Commonly used associative containers are follows. These allow only single instance of a _key_ i.e. **duplicates NOT allowed**

- [**Sets**](#sets) : `set` and `unordered_set`
- [**Maps**](#maps) : `map` and `unordered_map`

Other associative containers which allow multiple entries of a _key_ i.e. **duplicates allowed** are:

- [`multiset`](https://en.cppreference.com/w/cpp/container/multiset) and [`unordered_multiset`](https://en.cppreference.com/w/cpp/container/unordered_multiset)
- [`multimap`](https://en.cppreference.com/w/cpp/container/multimap) and [`unordered_multimap`](https://en.cppreference.com/w/cpp/container/unordered_multimap)

> [`pair`](#pair) and [`tuple`](#tuple) being similar to these, have been written within this page

---

## Ordered vs Unordered Associative containers

| Metric           | `set` , `map`                                     | `unordered_set` , `unordered_map`                         |
| ---------------- | ------------------------------------------------- | --------------------------------------------------------- |
| Internals        | Uses **balanced BST** (Red-Black tree) internally | Uses **Hashing** internally                               |
| Keys             | Elements are **sorted by keys**                   | No sorting of elements                                    |
| Operations       | Operations take $O(logN)$ time                    | Operations take $O(1)$ on average                         |
| Custom Data-type | Supports custom (sortable) data-types             | We need to define **Hash function** for custom data-types |

> If the hash function is poorly defined, operations in `unordered_set` & `unordered_map` can take $O(N)$ time in worst case due to several collisions

Also refer these posts for writing better hash functions:

- [C++ `unordered_map` using a custom class type as the key](https://stackoverflow.com/questions/17016175/c-unordered-map-using-a-custom-class-type-as-the-key)
- [Blowing up `unordered_map`, and how to stop getting hacked on it](https://codeforces.com/blog/entry/62393)
- [C++ STL: Order of magnitude faster hash tables with Policy Based Data Structures](https://codeforces.com/blog/entry/60737)

---

## Pair

- CPP Reference: [`pair`](https://en.cppreference.com/w/cpp/utility/pair)
- It is used to **club two items together**
- **Declaration**: `pair<Type1, Type2> myPair;`
- The data types of these two items need not be similar. Custom types also allowed
- **Initialization**: `{item1, item2}`
- **Access items**: **`.first`** , **`.second`**
- You can also use [structured binding](/code-journal/c-cpp/c-cpp/modern-cpp#structured-binding) to access pair elements:

  ```cpp
  pair<int, char> p{5, 'm'};
  cout << p.first << " " << p.second << "\n";  // 5 m

  p = {3, 'z'};
  // Structured binding
  auto &[item1, item2] = p;
  cout << item1 << " " << item2 << "\n";  // 3 z
  ```

- STL provides function [`make_pair`](https://en.cppreference.com/w/cpp/utility/pair/make_pair) to construct a pair. Helpful for custom data-types:

  ```cpp
  struct Point {
      int x, y;
      Point(int n1, int n2) : x(n1), y(n2) {}
  };

  int main() {
      auto myPair = make_pair(Point(2, 3), 'z');
      auto &[myPoint, alphabet] = myPair;
      cout << myPoint.x << " " << myPoint.y << " " << alphabet << "\n";
      // 2 3 z
      return 0;
  }
  ```

---

## Tuple

- CPP Reference: [`tuple`](https://en.cppreference.com/w/cpp/utility/tuple)
- Used for clubbing multiple items of different types together

```cpp title="tuple"
tuple<char, int, double> data('g', 5, 3.14);

char ch = get<0>(data);
int num1 = get<1>(data);
double num2 = get<2>(data);
cout << ch << " " << num1 << " " << num2 << "\n";  // g 5 3.14

auto &[a, b, c] = data;
cout << a << " " << b << " " << c << "\n";  // g 5 3.14
```

Also refer: [`make_tuple()`](https://en.cppreference.com/w/cpp/utility/tuple/make_tuple), [`tie()`](https://en.cppreference.com/w/cpp/utility/tuple/tie),

---

## Sets

> **`set`** and **`unordered_set`** store a collection of **unique keys** of a specified type

CPP Reference: [`set`](https://en.cppreference.com/w/cpp/container/set), [`unordered_set`](https://en.cppreference.com/w/cpp/container/unordered_set)

**Declaration**: `set<Type> s1;` , `unordered_set<Type> us1;`

**Look-up**:

- **`.find(item)`** - Returns iterator that points to **key's location** (if it exists) or to `.end()`
- **`.count(item)`** - Returns `1` if key exists, else returns `0`.
- **`.upper_bound(val)`** , **`.lower_bound(val)`** are available in `set` ONLY

**Iterators**:

- **`.begin()`** , **`.end()`**
- **`.rbegin()`**, **`.rend()`** are available in `set` ONLY

**Capacity**: **`.empty()` , `.size()` , `max_size()`**

**Modifiers**:

- **`.insert()`** - Add elements into the set. If already present, the new entry is not inserted
  - `insert(item)` - Insert an element `item` into set
  - `insert(start_pos, end_pos)` - Insert all elements within `[start_pos,end_pos)` into set
  - `insert({...})` i.e. Initializer list
- **`.erase()`** - Remove element(s) from the set (if exists)
  - `erase(key)` or `erase(itr)` - Removes that element from the set
  - `erase(start_pos,end_pos)` - Removes elements within `[start_pos,end_pos)` from the set. Better used with `set`
- **`.clear()`** - Empties the set
- **`.merge(another_set)`** - Merge keys from the other set into current set

<blockquote>
<details>
<summary><strong><code>unordered_set</code> Demo</strong></summary>

```cpp title="unordered_set demo"
void printHashSet (const unordered_set<int> &hs) {
    if (hs.empty()) {
        cout << "Set is empty\n";
        return;
    }
    cout << "[";
    for (const int &key : hs) cout << key << ", ";
    cout << "]\n";
}

// Lookup using find()
void lookupViaFind (const unordered_set<int> &hs, const int key) {
    if (hs.find(key) != hs.end()) cout << key << " FOUND in set\n";
    else cout << key << " NOT FOUND in set\n";
}
// Lookup using count()
void lookupViaCount (const unordered_set<int> &hs, const int key) {
    if (hs.count(key)) cout << key << " FOUND in set\n";
    else cout << key << " NOT FOUND in set\n";
}

int main () {
    unordered_set<int> hs1{20, 10, 30};     // Declare, Initialize
    printHashSet(hs1);                      // [30, 10, 20, ]
    cout << "Size: " << size(hs1) << "\n";  // Size: 3

    // Lookup:
    lookupViaFind(hs1, 10);   // 10 FOUND in set
    lookupViaFind(hs1, 75);   // 75 NOT FOUND in set
    lookupViaCount(hs1, 10);  // 10 FOUND in set
    lookupViaCount(hs1, 75);  // 75 NOT FOUND in set

    hs1.insert(999), hs1.insert(888);  // insert(key)
    printHashSet(hs1);                 // [999, 888, 30, 10, 20, ]

    vector<int> v1{42, 17, 55, 64, 25};
    // insert(start,end)
    hs1.insert(v1.begin(), v1.end());
    printHashSet(hs1);  // [25, 64, 55, 42, 999, 17, 888, 30, 10, 20, ]
    // insert({ ... })
    hs1.insert({1, 2, 3, 4});
    printHashSet(hs1);  // [4, 20, 10, 888, 17, 999, 42, 55, 3, 64, 25, 30, 1, 2, ]

    unordered_set<int> hs2{100, 99, 98, 10};
    // merge(another_set)
    hs1.merge(hs2);
    printHashSet(hs1);  // [99, 98, 4, 20, 10, 888, 17, 100, 999, 42, 55, 3, 64, 25, 30, 1, 2, ]

    unordered_set<int> hs3{1, 2, 1, 0, 2};  // handles duplicates
    printHashSet(hs3);                      // [0, 2, 1, ]

    unordered_set<int> hs4{1, 2, 3, 4};
    // erase(key)
    hs4.erase(2);       // key exists, so removed
    hs4.erase(70);      // key not existing, so no change
    printHashSet(hs4);  // [4, 3, 1, ]
    // erase(itr)
    auto itr = hs4.find(3);
    hs4.erase(itr);
    printHashSet(hs4);  // [4, 1, ]

    hs4.clear();
    cout << "Size: " << hs4.size() << "\n";  // Size: 0
    printHashSet(hs4);                       // Set is empty
}
```

</details>
</blockquote>

<blockquote>
<details>
<summary><strong><code>set</code> Demo</strong></summary>

```cpp title="set demo"
void printSet (const set<int> &s) {
    if (s.empty()) {
        cout << "Set is empty\n";
        return;
    }
    cout << "[";
    for (const int &key : s) cout << key << ", ";
    cout << "]\n";
}

// Lookup using find()
void lookupViaFind (const set<int> &s, const int key) {
    if (s.find(key) != s.end()) cout << key << " FOUND in set\n";
    else cout << key << " NOT FOUND in set\n";
}
// Lookup using count()
void lookupViaCount (const set<int> &s, const int key) {
    if (s.count(key)) cout << key << " FOUND in set\n";
    else cout << key << " NOT FOUND in set\n";
}

int main () {
    set<int> s1{20, 10, 30};               // Declare, Initialize
    printSet(s1);                          // [10, 20, 30, ]
    cout << "Size: " << size(s1) << "\n";  // Size: 3

    set<int> s2{1, 2, 1, 0, 2};  // Duplicate keys NOT inserted
    printSet(s2);                // [0, 1, 2, ]

    // Lookup:
    lookupViaFind(s1, 10);   // 10 FOUND in set
    lookupViaFind(s1, 75);   // 75 NOT FOUND in set
    lookupViaCount(s1, 10);  // 10 FOUND in set
    lookupViaCount(s1, 75);  // 75 NOT FOUND in set

    // insert(key)
    s1.insert(999), s1.insert(888);
    printSet(s1);  // [10, 20, 30, 888, 999, ]
    vector<int> v1{42, 17, 55, 64, 25};
    // insert(start,end)
    s1.insert(v1.begin(), v1.end());
    printSet(s1);  // [10, 17, 20, 25, 30, 42, 55, 64, 888, 999, ]
    // insert({...})
    s1.insert({3, 1, 2, 3});
    printSet(s1);  // [1, 2, 3, 10, 17, 20, 25, 30, 42, 55, 64, 888, 999, ]

    auto atLeast55 = s1.lower_bound(55);
    auto moreThan20 = s1.upper_bound(20);
    cout << "First item >= 55 is: " << *atLeast55 << "\n";  // First item >= 55 is: 55
    cout << "First item > 20 is: " << *moreThan20 << "\n";  // First item > 20 is: 25

    set<int> s3{100, 99, 98, 10};
    // merge(another_set)
    s1.merge(s3);
    printSet(s1);  // [1, 2, 3, 10, 17, 20, 25, 30, 42, 55, 64, 98, 99, 100, 888, 999, ]

    // erase(key)
    s1.erase(3);   // key exists, so removed
    s1.erase(70);  // key not existing, so no change
    printSet(s1);  // [1, 2, 10, 17, 20, 25, 30, 42, 55, 64, 98, 99, 100, 888, 999, ]
    // erase(itr)
    auto itr = s1.find(99);
    s1.erase(itr);
    printSet(s1);  // [1, 2, 10, 17, 20, 25, 30, 42, 55, 64, 98, 100, 888, 999, ]
    // erase(start,end)
    s1.erase(moreThan20, atLeast55);
    printSet(s1);  // [1, 2, 10, 17, 20, 55, 64, 98, 100, 888, 999, ]

    // Reverse Traversal:
    cout << "[";
    for (auto itr = s1.rbegin(); itr != s1.rend(); itr++) cout << *itr << ", ";
    cout << "]\n";  // [999, 888, 100, 98, 64, 55, 20, 17, 10, 2, 1, ]

    s1.clear();
    printSet(s1);  // Set is empty
}
```

</details>
</blockquote>

---

## Maps

> `map` and `unordered_map` store a collection of pairs of **key-value mappings** with **unique keys**

CPP Reference: [`map`](https://en.cppreference.com/w/cpp/container/map) , [`unordered_map`](https://en.cppreference.com/w/cpp/container/unordered_map)

**Declaration**: `map<keyType,valueType>` , `unordered_map<keyType,valueType>`

We can pass our custom hash function as: `unordered_map<keyType, valueType, hashFunction>`

**Look-up**:

- **`.find(k)`** - Returns iterator that points to **location of key `k`** if exists, else to `.end()`
- **`.count(k)`** - Returns `1` if key `k` exists, else returns `0`.
- **`.upper_bound(val)`** , **`.lower_bound(val)`** are available in `map` ONLY

**Access value at key**:

- **`.at(k)`** operator - Returns the value at key `k` if it exists, else throws `out_of_range` exception
- **`[k]`** operator - Returns the value at key `k`. If key doesn't exist, it **inserts new key** and assigns it default value.

**Capacity**: **`.empty()`** , **`.size()`** , **`max_size()`**

**Iterators**:

- **`.begin()`** , **`.end()`**
- **`.rbegin()`** , **`.rend()`** are available in `map` ONLY

**Modifiers**:

- **`.insert()`** - Add elements into the set. If that key already present, the entry not inserted
  - `insert(item)` - Insert an element `item` into set
  - `insert(start_pos, end_pos)` - Insert all elements within `[start_pos,end_pos)` into set
  - `insert({...})` i.e. Initializer list
- **`.erase()`** - Remove one/more entries from the map (if exists)
  - `erase(key)` or `erase(itr)` - Removes that entry from the map
  - `erase(start_pos,end_pos)` - Removes elements within `[start_pos,end_pos)` from the set. Better used with `map`
- **`.clear()`** - Empties the map
- **`.merge(another_set)`** - Merge keys from the other set into current set

<blockquote>
<details>
<summary><strong><code>unordered_map</code> Demo</strong></summary>

```cpp title="unordered_map demo"
void printHashMap (const unordered_map<int, string> &hmp) {
    if (hmp.empty()) {
        cout << "Map is Empty\n";
        return;
    }
    cout << "[ ";
    for (const auto &[key, val] : hmp) {
        cout << "{" << key << "," << val << "}, ";
    }
    cout << "]\n";
}

// Lookup using count()
void lookupViaCount (const unordered_map<int, string> &hmp, const int key) {
    size_t keyCnt = hmp.count(key);
    if (keyCnt) cout << key << " key EXISTS in Map\n";
    else cout << key << " key DOES NOT EXIST in Map\n";
}
// Lookup using find()
void lookupViaFind (const unordered_map<int, string> &hmp, const int key) {
    auto searchResult = hmp.find(key);
    if (searchResult != hmp.end()) {
        const int storedKey = searchResult->first;
        const string storedVal = searchResult->second;
        // We can also do it as below:
        // const auto &[storedKey, storedVal] = *(searchResult);
        cout << storedKey << " key FOUND in Map. Value stored is: " << storedVal;
    } else {
        cout << key << " key NOT FOUND in Map";
    }
    cout << "\n";
}

int main () {
    // Declare, Initialize
    unordered_map<int, string> hmp{
        {5, "aaa"}, {1, "bbb"}, {9, "cc"}, {5, "dddd"}, {4, "eeee"},
    };
    // Duplicate keys don't get inserted
    printHashMap(hmp);  // [ {4,eeee}, {9,cc}, {1,bbb}, {5,aaa}, ]

    // Lookup:
    lookupViaCount(hmp, 47);  // 47 key DOES NOT EXIST in Map
    lookupViaCount(hmp, 5);   // 5 key EXISTS in Map
    lookupViaFind(hmp, 47);   // 47 key NOT FOUND in Map
    lookupViaFind(hmp, 5);    // 5 key FOUND in Map. Value stored is: aaa

    /* ---- Access via [key] operator ---- */
    // on key that EXISTS in map:
    cout << "Value at key 9: " << hmp[9] << "\n";  // Value at key 9: cc

    // on key that does NOT exist in map - new entry added
    // The value at the added key entry is default-value of data-type ("" for string)
    cout << "Value at key 100: " << hmp[100] << "\n";  // Value at key 100:

    // Set/Update value at key:
    hmp[100] = "WOW";
    cout << "Value at key 100: " << hmp[100] << "\n";  // Value at key 100: WOW

    /* ---- Access value via .at(key) ---- */
    // on key that EXISTS in map:
    cout << "Value at key 4: " << hmp.at(4) << "\n";  // Value at key 4: eeee

    // on key that does NOT exist in map - throws exception std::out_of_range
    try {
        cout << "Value at key 75: " << hmp.at(75) << "\n";
    } catch (std::out_of_range) {
        cout << "\nException std::out_of_range: Key does NOT exist in Map\n";
    }
    // Value at key 75:
    // Exception std::out_of_range: Key does NOT exist in Map

    /* ---- Insertion ---- */
    hmp.insert(make_pair(20, "xyz"));
    hmp.insert({10, "pqr"});
    hmp.insert({{30, "abc"}, {20, "def"}, {40, "ghi"}});  // Duplicate key 20 ignored
    vector<pair<int, string>> v1{{99, "nn"}, {100, "oh"}, {101, "oho"}};
    hmp.insert(v1.begin(), v1.end());
    printHashMap(hmp);
    // [ {99,nn}, {101,oho}, {10,pqr}, {20,xyz}, {30,abc}, {4,eeee}, {100,WOW}, {9,cc}, {40,ghi}, {1,bbb}, {5,aaa}, ]

    /* ---- Deletion ---- */
    // erase(key)
    hmp.erase(99);    // Key exists, so entry removed
    hmp.erase(1234);  // Key does NOT exist, so no removed
    // erase(itr)
    auto itr = hmp.find(100);
    hmp.erase(itr);
    printHashMap(hmp);
    // [ {101,oho}, {10,pqr}, {20,xyz}, {30,abc}, {4,eeee}, {9,cc}, {40,ghi}, {1,bbb}, {5,aaa}, ]

    /* ---- Merging two Maps ---- */
    unordered_map<int, string> hmp2{{-1, "AAA"}, {-2, "BBB"}, {1, "CCC"}};
    hmp.merge(hmp2);  // .merge(another_map)
    printHashMap(hmp);
    // [ {-1,AAA}, {101,oho}, {10,pqr}, {20,xyz}, {30,abc}, {4,eeee}, {9,cc}, {-2,BBB}, {40,ghi}, {1,bbb}, {5,aaa}, ]

    cout << "Size: " << hmp.size() << "\n";  // Size: 11
    hmp.clear();
    printHashMap(hmp);  // Map is Empty
}
```

</details>
</blockquote>

<blockquote>
<details>
<summary><strong><code>map</code> Demo</strong></summary>

```cpp title="map demo"
void printMap (const map<int, string> &mp) {
    if (mp.empty()) {
        cout << "Map is Empty\n";
        return;
    }
    cout << "[ ";
    for (const auto &[key, val] : mp) {
        cout << "{" << key << "," << val << "}, ";
    }
    cout << "]\n";
}

// Lookup using count()
void lookupViaCount (const map<int, string> &mp, const int key) {
    size_t keyCnt = mp.count(key);
    if (keyCnt) cout << key << " key EXISTS in Map\n";
    else cout << key << " key DOES NOT EXIST in Map\n";
}
// Lookup using find()
void lookupViaFind (const map<int, string> &mp, const int key) {
    auto searchResult = mp.find(key);
    if (searchResult != mp.end()) {
        const int storedKey = searchResult->first;
        const string storedVal = searchResult->second;
        // We can also do it as below:
        // const auto &[storedKey, storedVal] = *(searchResult);
        cout << storedKey << " key FOUND in Map. Value stored is: " << storedVal;
    } else {
        cout << key << " key NOT FOUND in Map";
    }
    cout << "\n";
}

int main () {
    // Declare, Initialize
    map<int, string> mp{
        {5, "aaa"}, {1, "bbb"}, {9, "cc"}, {5, "dddd"}, {4, "eeee"},
    };
    // Duplicate keys don't get inserted
    printMap(mp);  // [ {1,bbb}, {4,eeee}, {5,aaa}, {9,cc}, ]

    // Lookup:
    lookupViaCount(mp, 47);  // 47 key DOES NOT EXIST in Map
    lookupViaCount(mp, 5);   // 5 key EXISTS in Map
    lookupViaFind(mp, 47);   // 47 key NOT FOUND in Map
    lookupViaFind(mp, 5);    // 5 key FOUND in Map. Value stored is: aaa

    /* ---- Access via [key] operator ---- */
    // on key that EXISTS in map:
    cout << "Value at key 9: " << mp[9] << "\n";  // Value at key 9: cc

    // on key that does NOT exist in map - new entry added
    // The value at the added key entry is default-value of data-type ("" for string)
    cout << "Value at key 100: " << mp[100] << "\n";  // Value at key 100:

    // Set/Update value at key:
    mp[100] = "WOW";
    cout << "Value at key 100: " << mp[100] << "\n";  // Value at key 100: WOW

    /* ---- Access via .at(key) operator ---- */
    // on key that EXISTS in map:
    cout << "Value at key 4: " << mp.at(4) << "\n";  // Value at key 4: eeee

    // on key that does NOT exist in map - throws exception std::out_of_range
    try {
        cout << "Value at key 75: " << mp.at(75) << "\n";
    } catch (std::out_of_range) {
        cout << "\nException std::out_of_range: Key does NOT exist in Map\n";
    }
    // Value at key 75:
    // Exception std::out_of_range: Key does NOT exist in Map

    /* ---- Insertion ---- */
    mp.insert(make_pair(20, "xyz"));
    mp.insert({10, "pqr"});
    mp.insert({{30, "abc"}, {20, "def"}, {40, "ghi"}});  // Duplicate key 20 ignored
    vector<pair<int, string>> v1{{99, "nn"}, {100, "oh"}, {101, "oho"}};
    mp.insert(v1.begin(), v1.end());
    printMap(mp);
    // [ {1,bbb}, {4,eeee}, {5,aaa}, {9,cc}, {10,pqr}, {20,xyz}, {30,abc}, {40,ghi}, {99,nn}, {100,WOW}, {101,oho}, ]

    /* ---- Upper and Lower Bounds ---- */
    auto uptoTen = mp.lower_bound(10);
    auto moreThanFour = mp.upper_bound(4);
    cout << "First entry with key >= 10: {" << uptoTen->first << ", " << uptoTen->second << "}\n";
    cout << "First entry with key > 4: {" << moreThanFour->first << ", " << moreThanFour->second << "}\n";
    // First entry with key >= 10: {10, pqr}
    // First entry with key > 4: {5, aaa}

    /* ---- Deletion ---- */
    // erase(key)
    mp.erase(99);    // Key exists, so entry removed
    mp.erase(1234);  // Key does NOT exist, so no removed
    // erase(itr)
    auto itr = mp.find(100);
    mp.erase(itr);
    printMap(mp);  // [ {1,bbb}, {4,eeee}, {5,aaa}, {9,cc}, {10,pqr}, {20,xyz}, {30,abc}, {40,ghi}, {101,oho}, ]
    // erase(start,end)
    mp.erase(moreThanFour, uptoTen);
    printMap(mp);  // [ {1,bbb}, {4,eeee}, {10,pqr}, {20,xyz}, {30,abc}, {40,ghi}, {101,oho}, ]

    /* ---- Merging two Maps ---- */
    map<int, string> mp2{{-1, "AAA"}, {-2, "BBB"}, {1, "CCC"}};
    mp.merge(mp2);  // .merge(another_map)
    printMap(mp);
    // [ {-2,BBB}, {-1,AAA}, {1,bbb}, {4,eeee}, {10,pqr}, {20,xyz}, {30,abc}, {40,ghi}, {101,oho}, ]

    cout << "Size: " << mp.size() << "\n";  // Size: 9
    mp.clear();
    printMap(mp);  // Map is Empty
}
```

</details>
</blockquote>

<details>
<summary><strong>Map Traversals Demo</strong></summary>

```cpp
unordered_map<int, char> hmp{{3, 'r'}, {1, 'p'}, {4, 'w'}};

// Range-based loop WITH structured-binding
cout << "[ ";
for (const auto &[key, val] : hmp) cout << "{" << key << ", " << val << "}, ";
cout << "]\n";
// [ {4, w}, {1, p}, {3, r}, ]

// Range-based loop WITHOUT structured-binding
cout << "[ ";
for (const auto &pr : hmp) cout << "{" << pr.first << ", " << pr.second << "}, ";
cout << "]\n";
// [ {4, w}, {1, p}, {3, r}, ]

// Normal For-loop with iterators
cout << "[ ";
for (auto itr = hmp.begin(); itr != hmp.end(); itr++) cout << "{" << itr->first << ", " << itr->second << "}, ";
cout << "]\n";
// [ {4, w}, {1, p}, {3, r}, ]
cout << "[ ";
for (auto itr = hmp.begin(); itr != hmp.end(); itr++) cout << "{" << (*itr).first << ", " << (*itr).second << "}, ";
cout << "]\n";
// [ {4, w}, {1, p}, {3, r}, ]

map<int, char> mp{{3, 'r'}, {1, 'p'}, {4, 'w'}};
cout << "Forward: [ ";
for (const auto &[key, val] : mp) cout << "{" << key << ", " << val << "}, ";
cout << "]\n";
// Forward: [ {1, p}, {3, r}, {4, w}, ]

// Reverse traversal - ONLY in map, NOT in unordered_map
cout << "Reverse: [ ";
for (auto itr = mp.rbegin(); itr != mp.rend(); itr++) cout << "{" << itr->first << ", " << itr->second << "}, ";
cout << "]\n";
// Reverse: [ {4, w}, {3, r}, {1, p}, ]
```

</details>
