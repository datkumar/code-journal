---
title: C++ STL Associative Containers
tags: [cpp, stl, containers]
---

## Pair

- This container is used to club two items together
- The data types of these two items need not be similar. Custom types also allowed
- **Declaration**: `pair<Type1, Type2> myPair;`
- **Initialization**: `{item1, item2}`
- **Access**: **`.first`** , **`.second`**
- Can also use [structured binding](../modern-cpp/structured-binding.md) to access pair elements

```cpp
pair<int,char> p{5,'m'};
cout<< p.first <<" "<< p.second << endl; // 5 m

p = {3, 'z'};
auto &[item1, item2] = p; // Structured binding to get references to items
cout<< item1 <<" "<< item2 << endl;
```

- STL provides `make_pair(item1, item2)` to construct a pair. Helpful for Custom data types

  ```cpp
  struct Point{
      int x,y;
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

| `set` , `map`                         | `unordered_set` , `unordered_map`           |
| ------------------------------------- | ------------------------------------------- |
| Keys stored in **sorted** manner      | No sorting of keys                          |
| Operations take **O(logN)** time      | Operations take **O(1)** time on avg.       |
| Uses **balanced BST** internally      | Uses **Hashing** internally                 |
| Supports custom (sortable) data types | **Hash function** required for custom types |

> If the hash function is poorly defined, `unordered_set` & `unordered_map` operations can take `O(N)` time in worst case due to several collisions

---

## Sets: `set` , `unordered_set`

> Both `set` & `unordered_set` store a collection of **unique keys** of a specified type

### Look-up in sets

- **`.find(item)`** - Returns key's location if it exists; else returns `.end()`
- **`.count(item)`** - Returns `1` if key exists, else returns `0`.
  - `C++20` brings **`.contains()`** with similar functionality that returns `true`/`false`
- More functions: `.equal_range()`

### Modifiers in sets

- **`.insert()`** - Add a key entry into the set
  - `insert(item)`
  - `insert(start_pos, end_pos)`
  - `insert({ ... })` - Initializer list
- **`.erase(item)`** - Removes the given key from the set. If key not present, no change
- **`.clear()`** - Empties the set
- **`.merge(another_set)`** - Merge keys from the other set into current set. Present from `C++17`

### Size functions in sets

**`.empty()`** , **`.size()`**

### Iterators in sets

- **`.begin()`** , **`.end()`**
- (present ONLY in `set`) - **`.rbegin()`** , **`.rend()`**

### More functions in sets

- In both: `.emplace(...args)` `erase_if(condition)` , `swap(set1, set2)`
- In `set` : `.upper_bound()` , `.lower_bound()`, `.key_comp()`, `.val_comp()`
- In `unordered_set` : `.hash_function()`, `.key_eq()`

### Examples of sets

```cpp title="print_sets"
void printHashSet(unordered_set<int> &us){
    for(auto &key: us){
        cout<< key << " ";
    }
    cout<<endl;
}

void printSet(set<int> &ss){
    for(auto &key: ss){
        cout<< key << " ";
    }
    cout<<endl;
}
```

```cpp title="unordered_set_demo"
unordered_set<int> us1{10,20,30}; // init.
printHashSet(us1); // 30 20 10

vector<int> v1{42, 17, 55, 64, 25};
us1.insert(v1.begin(), v1.end()); // insert(start,end)
printHashSet(us1); // 25 64 55 42 17 30 20 10

us1.insert({1, 2, 3, 4}); // initializer list
printHashSet(us1); // 2 1 25 64 3 55 42 4 17 30 20 10

unordered_set<int> us2{100, 99, 98, 10};
us1.merge(us2); // merge keys
printHashSet(us1); // 99 98 10 20 17 4 100 42 55 3 64 25 30 1 2

unordered_set<int> us3{1,2,1,0,2}; // handles duplicates
printHashSet(us3); // 0 2 1

unordered_set<int> us4{1,2,3,4};
us4.erase(2);
us4.erase(70); // no change
printHashSet(us4); // 4 3 1
```

```cpp title="set_demo"
set<int> s1{10,20,30}; // init.
printSet(s1); // 10 20 30

vector<int> v1{42, 17, 55, 64, 25}; // insert(start,end)
s1.insert(v1.begin(), v1.end());
printSet(s1); // 10 17 20 25 30 42 55 64

s1.insert({1, 2, 3, 4}); // initializer list
printSet(s1); // 1 2 3 4 10 17 20 25 30 42 55 64

set<int> s2{100, 99, 98, 10};
s1.merge(s2); // merge keys
printSet(s1); // 1 2 3 4 10 17 20 25 30 42 55 64 98 99 100


set<int> s3{1,2,1,0,2}; // handles duplicates
printSet(s3);  // 0 1 2

set<int> s4{1,2,3,4};
s4.erase(2);
s4.erase(70); // no change
printSet(s4); // 1 3 4
```

---

## Maps: `map` , `unordered_map`

> Both `map` & `unordered_map` store a collection of **key-value pairings** where the **keys are unique**

### Look-up in maps

- More functions:

### Modifiers in maps

### Size functions in maps

### Iterators in maps

### More functions in maps

### Examples of maps

```cpp title="print_maps"
void printHashMap(unordered_map<int,string> &ump){
    cout<<"[ ";
    for(auto &[key, val] : ump){
        cout<< "{" << key << ", "<< val << "}, " ;
    }
    cout<< "]" << endl;
}


void printMap(map<int,string> &mp){
    cout<<"[ ";
    for(auto &[key, val] : mp){
        cout<< "{" << key << ", "<< val << "}, " ;
    }
    cout<< "]" << endl;
}
```

```cpp title="unordered_map_demo"
unordered_map<int,string> ump{
    {5, "aeyo"},
    {1, "bruh"},
    {9, "dawg"},
    {5, "gotem"}, // Duplicate key, so not inserted
    {4, "nope"},
};
printHashMap(ump);
// [ {4, nope}, {9, dawg}, {1, bruh}, {5, aeyo}, ]

```

```cpp title="map_demo"
map<int,string> mp{
    {5, "aeyo"},
    {1, "bruh"},
    {9, "dawg"},
    {5, "gotem"}, // Duplicate key, so not inserted
    {4, "nope"},
};
printMap(mp);
// [ {1, bruh}, {4, nope}, {5, aeyo}, {9, dawg}, ]
```

---

## Tuple

Used for clubbing multiple items of different types together

```cpp title="tuple_demo"
tuple <char,int,double> data('g',5, 3.14 );
cout<< get<0>(data) << ", " << get<1>(data) << ", " << get<2>(data) <<endl;
// Output: g, 5, 3.14

auto &[a,b,c] = data;
cout<< a << ", " << b << ", " << c <<endl;
// Output: g, 5, 3.14
```

Also refer: `make_tuple()`, `tie()`,

## Other containers

- `multiset` , `unordered_multiset` : Multiple key entries allowed
- `multimap` , `unordered_multimap`
