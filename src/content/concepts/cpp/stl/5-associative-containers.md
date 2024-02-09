---
title: STL - Associative Containers
tags: [cpp, stl, containers]
---

Commonly used associative containers are:

- [**Sets**](#sets) : `set` and `unordered_set`
- [**Maps**](#maps) : `map` and `unordered_map`

[`pair`](#pair) and [`tuple`](#tuple) being similar to these, have been placed in this section

## Pair

The `pair` container is used to **club two items together**

- **Declaration**: `pair<Type1, Type2> myPair;`
- The data types of these two items need not be similar. Custom types also allowed
- **Initialization**: `{item1, item2}`
- **Access**: **`.first`** , **`.second`**
- Can also use [structured binding](/code-journal/cpp/cpp/modern-cpp#structured-binding) to access pair elements

  ```cpp
  pair<int,char> p{5,'m'};
  cout<< p.first <<" "<< p.second << endl; // 5 m

  p = {3, 'z'};
  // Structured binding
  auto &[item1, item2] = p;
  cout<< item1 <<" "<< item2 << endl;
  ```

- STL provides function `make_pair(item1, item2)` to construct a pair. Helpful for custom data-types

  ```cpp
  struct Point{
      int x, y;
      Point(int n1, int n2) : x(n1), y(n2) {}
  };

  int main(){
      auto myPair = make_pair( Point(2,3), 'z');

      auto &[myPoint, alphabet] = myPair; // Structured binding
      cout<< myPoint.x <<" "<< myPoint.y <<" "<< alphabet <<endl;
      // 2 3 z

      return 0;
  }
  ```

---

## Ordered vs Unordered associative containers

| Metric      | `set` , `map`                         | `unordered_set` , `unordered_map`           |
| ----------- | ------------------------------------- | ------------------------------------------- |
| Keys        | Elements are **sorted by keys**       | No sorting of elements                      |
| Operations  | Operations take `O(logN)` time        | Operations take `O(1)` avg. time            |
| Internals   | Uses **balanced BST** internally      | Uses **Hashing** internally                 |
| Custom-type | Supports custom (sortable) data types | **Hash function** required for custom types |

> If the hash function is poorly defined, operations in `unordered_set` & `unordered_map` can take `O(N)` time in worst case due to several collisions

---

## Sets

> Both **`set`** and **`unordered_set`** store a collection of **unique keys** of a specified type

**CPP Reference**: [`set`](https://en.cppreference.com/w/cpp/container/set), [`unordered_set`](https://en.cppreference.com/w/cpp/container/unordered_set)

**Declaration**: `set<Type>` , `unordered_set<Type>`

### Look-up in sets

- **`.find(item)`** - Returns iterator that points to **key's location** (if it exists) or to `.end()`
- **`.count(item)`** - Returns `1` if key exists, else returns `0`.
- In `set` **ONLY**: `.upper_bound(val)` , `.lower_bound(val)`

### Size functions in sets

**`.empty()` , `.size()` , `max_size()`**

### Iterators in sets

- **`.begin()`** , **`.end()`**
- In `set` **ONLY**: **`.rbegin()`** , **`.rend()`**

### Modifiers in sets

- **`.insert()`** - Add elements into the set. If already present, the new entry is not inserted
  - `insert(item)` - Insert an element `item` into set
  - `insert(start_pos, end_pos)` - Insert all elements within `[start_pos,end_pos)` into set
  - `insert({...})` i.e. Initializer list
- **`.erase()`** - Remove element(s) from the set (if exists)
  - `erase(key)` or `erase(itr)` - Removes that element from the set
  - `erase(start_pos,end_pos)` - Removes elements within `[start_pos,end_pos)` from the set. Better used with `set`
- **`.clear()`** - Empties the set
- **`.merge(another_set)`** - Merge keys from the other set into current set

### Examples of sets

<details>
<summary><code>unordered_set</code> demo</summary>

```cpp title="unordered_set_demo"
void printHashSet(unordered_set<int> &us)
{
    for(auto &key: us){
        cout<< key << " ";
    }
    cout<<endl;
}

// Lookup using find()
void lookupViaFind(unordered_set<int> &us, int key){
    if(us.find(key) != us.end()){
        cout << key << " found in set" << endl;
    }else{
        cout << key << " NOT found in set" << endl;
    }
}

// Lookup using count()
void lookupViaCount(unordered_set<int> &us, int key){
    if(us.count(key)){
        cout << key << " found in set" << endl;
    }else{
        cout << key << " NOT found in set" << endl;
    }
}

int main()
{
    // declare, initialize
    unordered_set<int> us1{10,20,30};
    printHashSet(us1); // 30 20 10

    // Lookup
    lookupViaFind(us1, 10);  // 10 present in set
    lookupViaCount(us1, 20); // 20 present in set

    // insert(key)
    us1.insert(999);
    us1.insert(888);
    printHashSet(us1);

    vector<int> v1{42, 17, 55, 64, 25};
    // insert(start,end)
    us1.insert(v1.begin(), v1.end());
    printHashSet(us1); // 25 64 55 42 17 30 20 10

    // initializer list
    us1.insert({1, 2, 3, 4});
    printHashSet(us1); // 2 1 25 64 3 55 42 4 17 30 20 10

    unordered_set<int> us2{100, 99, 98, 10};
    // merge keys
    us1.merge(us2);
    printHashSet(us1); // 99 98 10 20 17 4 100 42 55 3 64 25 30 1 2

    unordered_set<int> us3{1,2,1,0,2}; // handles duplicates
    printHashSet(us3); // 0 2 1

    unordered_set<int> us4{1,2,3,4};
    us4.erase(2);
    us4.erase(70); // no change
    printHashSet(us4); // 4 3 1

    return 0;
}
```

</details>

```cpp title="set_demo"
void printSet(set<int> &ss)
{
    cout << "[ ";
    for (auto &key : ss)
    {
        cout << key << ", ";
    }
    cout << "]" << endl;
}

int main()
{
    // declare, initialize
    set<int> s1{10, 20, 30};
    printSet(s1);
    // [ 10, 20, 30, ]

    set<int> s2{1, 2, 1, 0, 2}; // duplicate keys not inserted
    printSet(s2);
    // [ 0, 1, 2, ]

    const int TARGET = 20;

    // Lookup via find()
    if (s1.find(TARGET) != s1.end())
    {
        cout << "Key " << TARGET << " found" << endl;
        // Key 20 found
    }

    // Lookup via count()
    if (s1.count(TARGET))
    {
        cout << "Key " << TARGET << " found" << endl;
        // Key 20 found
    }

    // insert(key)
    s1.insert(999);
    s1.insert(888);
    printSet(s1);
    // [ 10, 20, 30, 888, 999, ]

    vector<int> v1{42, 17, 55, 64, 25};
    // insert(start,end)
    s1.insert(v1.begin(), v1.end());
    printSet(s1);
    // [ 10, 17, 20, 25, 30, 42, 55, 64, 888, 999, ]

    // insert({...})
    s1.insert({3, 1, 2, 3});
    printSet(s1);
    // [ 1, 2, 3, 10, 17, 20, 25, 30, 42, 55, 64, 888, 999, ]

    auto moreThan20 = s1.upper_bound(20);
    cout << "Key > 20: " << *moreThan20 << endl;
    // Key > 20: 25

    auto atLeast55 = s1.lower_bound(55);
    cout << "Key >= 55: " << *atLeast55 << endl;
    // Key >= 55: 55

    set<int> s3{100, 99, 98, 10};
    s1.merge(s3); // merge keys
    printSet(s1);
    // [ 1, 2, 3, 10, 17, 20, 25, 30, 42, 55, 64, 98, 99, 100, 888, 999, ]

    // erase(key)
    s1.erase(3);
    s1.erase(70); // key doesn't exist, so no removal
    auto itr = s1.find(99);
    // erase(itr)
    s1.erase(itr);
    // erase(start,end) removes keys within [start,end)
    s1.erase(moreThan20, atLeast55);
    printSet(s1);
    // [ 1, 2, 10, 17, 20, 55, 64, 98, 100, 888, 999, ]

    return 0;
}
```

---

## Maps

> Both `map` & `unordered_map` store a collection of pairs of **key-value mappings** with **unique keys**

**C++ Reference**: [`map`](https://en.cppreference.com/w/cpp/container/map) , [`unordered_map`](https://en.cppreference.com/w/cpp/container/unordered_map)

**Declaration**: `map<keyType,valueType>` , `unordered_map<keyType,valueType>`

### Look-up in maps

- **`.find(k)`** - Returns iterator that points to **location of key `k`** (if it exists) or to `.end()`
- **`.count(k)`** - Returns `1` if key `k` exists, else returns `0`.
- **Access value from key**:
  - **`.at(k)`** operator - Returns the value at key `k` if it exists, else throws `std::out_of_range` exception
  - **`[k]`** operator - Returns the value at key `k`. If key doesn't exist, it **creates new key** and assigns it default value.
- In `map` **ONLY**: `.upper_bound(val)` , `.lower_bound(val)`

### Size functions in maps

**`.empty()` , `.size()` , `max_size()`**

### Iterators in maps

- **`.begin()`** , **`.end()`**
- In `map` **ONLY**: **`.rbegin()`** , **`.rend()`**

### Modifiers in maps

- **`.insert()`** - Add elements into the set. If that key already present, the entry not inserted
  - `insert(item)` - Insert an element `item` into set
  - `insert(start_pos, end_pos)` - Insert all elements within `[start_pos,end_pos)` into set
  - `insert({...})` i.e. Initializer list
- **`.erase()`** - Remove one/more entries from the map (if exists)
  - `erase(key)` or `erase(itr)` - Removes that entry from the map
  - `erase(start_pos,end_pos)` - Removes elements within `[start_pos,end_pos)` from the set. Better used with `map`
- **`.clear()`** - Empties the map
- **`.merge(another_set)`** - Merge keys from the other set into current set

### Examples of maps

<details>
    <summary> Other ways of traversing maps</summary>

```cpp
unordered_map<int, char> ump{ {3,'r'}, {1,'p'}, {4,'w'} };

cout << "[ ";
// Range-based loop WITHOUT structured binding
for (auto &p : ump)
{
    cout << "{" << p.first << ", " << p.second << "}, ";
}
cout << "]" << endl;
// Output: [ {4, w}, {1, p}, {3, r}, ]

cout << "[ ";
// Normal for loop with iterators
for (auto itr = ump.begin(); itr != ump.end(); itr++)
{
    cout << "{" << itr->first << ", " << itr->second << "}, ";
    // Below line also does the same thing
    // cout << "{" << (*itr).first << ", " << (*itr).second << "}, ";
}
cout << "]" << endl;
// Output: [ {4, w}, {1, p}, {3, r}, ]
```

**Reverse traversal**: It is more suited with `map`

```cpp
map<int, char> mp{{3, 'r'}, {1, 'p'}, {4, 'w'}};

cout << "[ ";
for (auto itr = mp.rbegin(); itr != mp.rend(); itr++)
{
    cout << "{" << itr->first << ", " << itr->second << "}, ";
}
cout << "]" << endl;

// Output: [ {4, w}, {3, r}, {1, p}, ]
```

</details>

<details>
    <summary><code>unordered_map</code> demo</summary>

```cpp title="unordered_map_demo"
void printHashMap(unordered_map<int, string> &ump)
{
    cout << "[ ";
    for (auto &[key, val] : ump)
    {
        cout << "{" << key << ", " << val << "}, ";
    }
    cout << "]" << endl;
}

int main()
{
    unordered_map<int, string> ump{
        {5, "aaa"},
        {1, "bbb"},
        {9, "cc"},
        {5, "dddd"}, // Duplicate key, so NOT inserted
        {4, "eeee"},
    };
    printHashMap(ump);
    // [ {4, eeee}, {9, cc}, {1, bbb}, {5, aaa}, ]

    const int TARGET = 9;

    // Lookup via find()
    auto keyPtr = ump.find(TARGET);
    if (keyPtr != ump.end())
    {
        cout << "Key " << TARGET << " found" << endl;
        // Key 9 found

        // Can also do: auto &[key,val] = *(keyPtr);
        int key = keyPtr->first;
        string val = keyPtr->second;

        cout << "The entry is {" << key << ", " << val << "}" << endl;
        // The entry is {9, cc}
    }

    // Lookup via count()
    if (ump.count(TARGET))
    {
        cout << "Key " << TARGET << " found" << endl;
        // Key 9 found
    }

    // Access via [] operator
    cout << "Value at key " << TARGET << " is " << ump[TARGET] << endl;
    // Value at key 9 is cc
    int newKey = 100;
    cout << "Value at key " << newKey << " is " << ump[newKey] << endl;
    // Value at key 100 is
    ump[newKey] = "WOW";
    cout << "Value at key " << newKey << " is " << ump[newKey] << endl;
    // Value at key 100 is WOW

    // Access via at()
    cout << "Value at key " << newKey << " is " << ump.at(newKey) << endl;
    // Value at key 100 is WOW

    vector<pair<int, string>> v1{
        {99, "nn"},
        {100, "oh"}, // key already present, so not inserted
        {101, "oho"},
    };

    // insert()
    ump.insert(make_pair(20, "xyz"));
    ump.insert({10, "pqr"});
    ump.insert({
        {30, "abc"},
        {20, "def"} // key already present, so not inserted
    });
    ump.insert(v1.begin(), v1.end());
    printHashMap(ump);
    // [ {99, nn}, {101, oho}, {10, pqr}, {20, xyz}, {30, abc}, {4, eeee}, {100, WOW}, {9, cc}, {1, bbb}, {5, aaa}, ]

    ump.erase(99); // erase(key)
    auto itr = ump.find(100);
    mp.erase(itr);   // erase(itr)
    ump.erase(1234); // Key not present, so not removed
    printHashMap(ump);
    // [ {101, oho}, {10, pqr}, {20, xyz}, {30, abc}, {4, eeee}, {9, cc}, {1, bbb}, {5, aaa}, ]

    unordered_map<int, string> ump2{
        {-1, "AAA"},
        {-2, "BBB"},
        {1, "CCC"}, // key already present, so not merged
    };
    ump.merge(ump2);
    printHashMap(ump);
    // [ {-1, AAA}, {101, oho}, {10, pqr}, {20, xyz}, {30, abc}, {4, eeee}, {9, cc}, {-2, BBB}, {1, bbb}, {5, aaa}, ]

    return 0;
}
```

</details>

```cpp title="maps_demo"
void printMap(map<int, string> &mp)
{
    cout << "[ ";
    for (auto &[key, val] : mp)
    {
        cout << "{" << key << ", " << val << "}, ";
    }
    cout << "]" << endl;
}

int main()
{
    map<int, string> mp{
        {5, "aaa"},
        {1, "bbb"},
        {9, "cc"},
        {5, "dddd"}, // Duplicate key, so NOT inserted
        {4, "eeee"},
    };
    printMap(mp);
    // [ {1, bbb}, {4, eeee}, {5, aaa}, {9, cc}, ]

    const int TARGET = 9;

    // Lookup via find()
    auto keyPtr = mp.find(TARGET);
    if (keyPtr != mp.end())
    {
        cout << "Key " << TARGET << " found" << endl;
        // Key 9 found

        // Can also do: auto &[key,val] = *(keyPtr);
        int key = keyPtr->first;
        string val = keyPtr->second;

        cout << "The entry is {" << key << ", " << val << "}" << endl;
        // The entry is {9, cc}
    }

    // Lookup via count()
    if (mp.count(TARGET))
    {
        cout << "Key " << TARGET << " found" << endl;
        // Key 9 found
    }

    // Access via [] operator
    cout << "Value at key " << TARGET << " is " << mp[TARGET] << endl;
    // Value at key 9 is cc
    int newKey = 100;
    cout << "Value at key " << newKey << " is " << mp[newKey] << endl;
    // Value at key 100 is
    mp[newKey] = "WOW";
    cout << "Value at key " << newKey << " is " << mp[newKey] << endl;
    // Value at key 100 is WOW

    // Access via at()
    cout << "Value at key " << newKey << " is " << mp.at(newKey) << endl;
    // Value at key 100 is WOW

    vector<pair<int, string>> v1{
        {99, "nn"},
        {100, "oh"}, // key already present, so not inserted
        {101, "oho"},
    };

    // insert()
    mp.insert(make_pair(10, "xyz"));
    mp.insert({20, "pqr"});
    mp.insert({
        {30, "abc"},
        {20, "def"} // key already present, so not inserted
    });
    mp.insert(v1.begin(), v1.end());
    printMap(mp);
    // [ {1, bbb}, {4, eeee}, {5, aaa}, {9, cc}, {10, xyz}, {20, pqr}, {30, abc}, {99, nn}, {100, WOW}, {101, oho}, ]

    mp.erase(99);
    auto itr = mp.find(100);
    mp.erase(itr);  // erase(itr)
    mp.erase(1234); // Key not present, so not removed
    printMap(mp);
    // [ {1, bbb}, {4, eeee}, {5, aaa}, {9, cc}, {10, xyz}, {20, pqr}, {30, abc}, {101, oho}, ]

    auto moreThanZero = mp.upper_bound(0);
    cout << "Entry with key > 0 is {" << moreThanZero->first << ", " << moreThanZero->second << "}\n";
    // Entry with key > 0 is {1, bbb}

    auto uptoTen = mp.lower_bound(10);
    cout << "Entry with key <= 10 is {" << uptoTen->first << ", " << uptoTen->second << "}\n";
    // Entry with key <= 10 is {10, xyz}

    // erase(start,end) removes key in [start,end)
    mp.erase(moreThanZero, uptoTen);
    printMap(mp);
    // [ {10, xyz}, {20, pqr}, {30, abc}, {101, oho}, ]

    map<int, string> mp2{
        {-101, "AAA"},
        {20, "CCC"}, // Key already present in mp, so not merged
        {-102, "BBB"},
    };
    mp.merge(mp2);
    printMap(mp);
    // [ {-102, BBB}, {-101, AAA}, {10, xyz}, {20, pqr}, {30, abc}, {101, oho}, ]

    return 0;
}
```

---

## Tuple

Used for clubbing multiple items of different types together

```cpp title="tuple_demo"
tuple <char, int, double> data('g', 5, 3.14 );

cout<< get<0>(data) << ", " << get<1>(data) << ", " << get<2>(data) <<endl;
// g, 5, 3.14

auto &[a, b, c] = data;
cout<< a << ", " << b << ", " << c <<endl;
// g, 5, 3.14
```

Also refer: `make_tuple()`, `tie()`,

## Other associative containers

`multiset` , `unordered_multiset` , `multimap` , `unordered_multimap`

These allow multiple entries of a key
