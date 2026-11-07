---
title: STL - Algorithms
tags: [cpp, stl, algorithms]
---

## References

Note that I'm using `C++17`

- [`<algorithm>` library CPP Reference](https://en.cppreference.com/w/cpp/algorithm)
- [GFG: Algorithm Library Functions in C++ STL](https://www.geeksforgeeks.org/algorithms-library-c-stl/)

---

## Sorting operations

|                                     Function                                     | Use                                                                              |
| :------------------------------------------------------------------------------: | -------------------------------------------------------------------------------- |
|            [`sort`](https://en.cppreference.com/w/cpp/algorithm/sort)            | Sorts a range (ascending order by default)                                       |
|     [`stable_sort`](https://en.cppreference.com/w/cpp/algorithm/stable_sort)     | Sorts a range of elements while preserving order between equal elements          |
|    [`partial_sort`](https://en.cppreference.com/w/cpp/algorithm/partial_sort)    | Sorts the first **N** elements of a range                                        |
|       [`is_sorted`](https://en.cppreference.com/w/cpp/algorithm/is_sorted)       | Check whether range is sorted                                                    |
| [`is_sorted_until`](https://en.cppreference.com/w/cpp/algorithm/is_sorted_until) | Finds the largest sorted subrange                                                |
|     [`nth_element`](https://en.cppreference.com/w/cpp/algorithm/nth_element)     | Partially sorts the range making sure that it's partitioned by the given element |

### Comparison functions

|                                             Function                                             | Use                                                                         |
| :----------------------------------------------------------------------------------------------: | --------------------------------------------------------------------------- |
|           [`greater<T>`](https://en.cppreference.com/w/cpp/utility/functional/greater)           | Checks whether the first argument is _greater_ than the second              |
|              [`less<T>`](https://en.cppreference.com/w/cpp/utility/functional/less)              | Checks whether the first argument is _lesser_ than the second               |
| [`lexicographical_compare`](https://en.cppreference.com/w/cpp/algorithm/lexicographical_compare) | Check whether the first range is _lexicographically lesser_ than the second |

<details>
<summary><strong>Sorting examples</strong></summary>

```cpp
void printVector (const vector<int> &arr) {
    cout << "[ ";
    for (const int &x : arr) cout << x << ", ";
    cout << "]\n";
}

bool compareAbsValue (const int a, const int b) {
    return abs(a) < abs(b);  // Compares absolute values
}

struct Player {
    string name;
    int score;
    Player (string _username, int _score = 0) : name(_username), score(_score) {}
    void printInfo () const { cout << "{name:" << name << ", score:" << score << "}\n"; }
};
bool comparePlayers (const Player &p1, const Player &p2) {
    return p1.score > p2.score;  // Compares scores
}
void printPlayerBoard (const vector<Player> &players) {
    for (const Player &p : players) p.printInfo();
}

int main () {
    vector<int> nums{5, 2, 8, 1, 9, 3};
    // Sort Default (Ascending)
    sort(nums.begin(), nums.end());
    printVector(nums);  // [ 1, 2, 3, 5, 8, 9, ]
    // Sort Descending via greater<T>
    sort(nums.begin(), nums.end(), greater<int>());
    printVector(nums);  // [ 9, 8, 5, 3, 2, 1, ]

    // Sort as per custom Comparator
    vector<int> vals{-4, 1, -2, 3};
    sort(vals.begin(), vals.end(), compareAbsValue);
    printVector(vals);  // [ 1, -2, 3, -4, ]

    vector<Player> players{{"John", 50}, {"Elon", 70}, {"Roy", 50}, {"Thor", 20}, {"Anna", 50}};
    stable_sort(players.begin(), players.end(), comparePlayers);  // Stable Sort
    printPlayerBoard(players);
    // {name:Elon, score:70}
    // {name:John, score:50}
    // {name:Roy, score:50}
    // {name:Anna, score:50}
    // {name:Thor, score:20}
}
```

</details>

### Minimum/Maximum operations

|                                    Function                                    | Use                                             |
| :----------------------------------------------------------------------------: | ----------------------------------------------- |
|            [`min`](https://en.cppreference.com/w/cpp/algorithm/max)            | Return smaller of given values                  |
|            [`max`](https://en.cppreference.com/w/cpp/algorithm/max)            | Returns larger of given values                  |
|         [`minmax`](https://en.cppreference.com/w/cpp/algorithm/minmax)         | Returns lowest and the greatest of given values |
|    [`min_element`](https://en.cppreference.com/w/cpp/algorithm/min_element)    | Returns smallest element in range               |
|    [`max_element`](https://en.cppreference.com/w/cpp/algorithm/max_element)    | Returns largest element in range                |
| [`minmax_element`](https://en.cppreference.com/w/cpp/algorithm/minmax_element) | Returns smallest and largest elements in range  |

<details>
<summary><strong>min-max examples</strong></summary>

```cpp
cout << max(4, 7) << "\n";                        // 7
cout << min(4, 7) << "\n";                        // 4
cout << max({4, -1, 9, 2, -3, 1, 8, 5}) << "\n";  // 9
cout << min({4, -1, 9, 2, -3, 1, 8, 5}) << "\n";  // -3
auto [smallest, largest] = minmax({4, -1, 9, 2, -3, 1, 8, 5});
cout << smallest << ", " << largest << "\n";      // -3, 9

vector<int> nums = {4, -1, 9, 2, -3, 1, 8, 5};
// The min and max element positions are found via Linear scan i.e. O(1)
auto minPtr1 = min_element(nums.begin(), nums.end());
auto maxPtr1 = max_element(nums.begin(), nums.end());
cout << "Min=" << *minPtr1 << " at index " << (minPtr1 - nums.begin()) << "\n"; // Min=-3 at index 4
cout << "Max=" << *maxPtr1 << " at index " << (maxPtr1 - nums.begin()) << "\n"; // Max=9 at index 2

auto [minPtr2, maxPtr2] = minmax_element(nums.begin(), nums.end());
cout << *minPtr2 << ", " << *maxPtr2 << "\n";  // -3, 9
```

</details>

---

## Binary search (on partitioned/sorted ranges)

|                                   Function                                   | Use                                                                          |
| :--------------------------------------------------------------------------: | ---------------------------------------------------------------------------- |
| [`binary_search`](https://en.cppreference.com/w/cpp/algorithm/binary_search) | Determines if an element exists in a partially-ordered range                 |
|   [`lower_bound`](https://en.cppreference.com/w/cpp/algorithm/lower_bound)   | Returns iterator pointing to the first element not less than the given value |
|   [`upper_bound`](https://en.cppreference.com/w/cpp/algorithm/upper_bound)   | Returns iterator pointing to the first element greater than a certain value  |
|   [`equal_range`](https://en.cppreference.com/w/cpp/algorithm/equal_range)   | Returns range of elements matching a specific key                            |

<details>
<summary><strong>Binary Search examples</strong></summary>

```cpp
// Sample SORTED vector:
vector<int> nums{2, 5, 5, 5, 8, 12, 12, 17, 23, 23, 31, 46};

bool isFound = binary_search(nums.begin(), nums.end(), 12);
cout << isFound << "\n";  // 1 (true)

// Lower Bound: First item >= key
auto lbPtr1 = lower_bound(nums.begin(), nums.end(), 15);
auto lbPtr2 = lower_bound(nums.begin(), nums.end(), 12);
cout << "lb(15)=" << *lbPtr1 << " at index " << (lbPtr1 - nums.begin()) << "\n";  // lb(15)=17 at index 7
cout << "lb(12)=" << *lbPtr2 << " at index " << (lbPtr2 - nums.begin()) << "\n";  // lb(12)=12 at index 5

// Upper Bound: First item > key
auto ubPtr1 = upper_bound(nums.begin(), nums.end(), 15);
auto ubPtr2 = upper_bound(nums.begin(), nums.end(), 12);
cout << "ub(15)=" << *ubPtr1 << " at index " << (ubPtr1 - nums.begin()) << "\n";  // ub(15)=17 at index 7
cout << "ub(12)=" << *ubPtr2 << " at index " << (ubPtr2 - nums.begin()) << "\n";  // ub(12)=17 at index 7

// Occurrence count of an item = Distance between its LB and UB
auto lb = lower_bound(nums.begin(), nums.end(), 5);
auto ub = upper_bound(nums.begin(), nums.end(), 5);
int count = distance(ub);
cout << "Occurrence count of 5: " << count << "\n";  // Occurrence count of 5: 3
```

</details>

---

## Heap operations

- The default ordering is **Max-Heap**, using the `less<T>` comparator. You can pass custom comparator in the operations to change the ordering
- Constructing a heap from the existing elements of a container (like `vector`) via `make_heap` takes $O(n)$ time. This is faster than individally inserting elements via `push_heap()` or inserting individually into a `priority_queue` as both of those could take $O(nlogn)$ time in worst case.

|                                   Function                                   | Use                                                                      |
| :--------------------------------------------------------------------------: | ------------------------------------------------------------------------ |
|     [`make_heap`](https://en.cppreference.com/w/cpp/algorithm/make_heap)     | Make heap from given range (default max-heap)                            |
|     [`push_heap`](https://en.cppreference.com/w/cpp/algorithm/push_heap)     | Insert element into heap                                                 |
|      [`pop_heap`](https://en.cppreference.com/w/cpp/algorithm/pop_heap)      | Pop topmost element from heap                                            |
|     [`sort_heap`](https://en.cppreference.com/w/cpp/algorithm/sort_heap)     | Turns the heap into a range of sorted elements (default ascending order) |
|       [`is_heap`](https://en.cppreference.com/w/cpp/algorithm/is_heap)       | Checks if given range is a heap (default checks max-heap)                |
| [`is_heap_until`](https://en.cppreference.com/w/cpp/algorithm/is_heap_until) | Finds the largest subrange that is a heap (default checks max-heap)      |

<details>
<summary><strong>Heap operations example</strong></summary>

```cpp
vector<int> nums = {3, 2, 4, 2, 5, 9};
// Init Heap, (default is Max-Heap) from of ALL vector elements - O(N)
make_heap(nums.begin(), nums.end());
cout << "Top of Heap: " << nums.front() << "\n";  // Top of Heap: 9
printVector(nums);                                // [ 9, 5, 4, 2, 2, 3, ]

// Insert single element at end of vector. Then re-heapify to maintain heap property - O(logN)
nums.emplace_back(12);
push_heap(nums.begin(), nums.end());
cout << "Top of Heap: " << nums.front() << "\n";  // Top of Heap: 12
nums.emplace_back(6);
push_heap(nums.begin(), nums.end());
cout << "Top of Heap: " << nums.front() << "\n";  // Top of Heap: 12
printVector(nums);                                // [ 12, 6, 9, 5, 2, 3, 4, 2, ]

// Pop top element of Heap - O(logN). Popped element gets moved to the end of vector (NOT removed)
cout << "Top of Heap (before pop): " << nums.front() << "\n";  // Top of Heap (before pop): 12
pop_heap(nums.begin(), nums.end());
cout << "Top of Heap (after pop): " << nums.front() << "\n";  // Top of Heap (after pop): 9
printVector(nums);                                            // [ 9, 6, 4, 5, 2, 3, 2, 12, ]
// To actually remove element from vector, pop from the end of vector
nums.pop_back();

// Convert Heap into Sorted list of elements - O(NlogN)
sort_heap(nums.begin(), nums.end());
printVector(nums);  // [ 2, 2, 3, 4, 5, 6, 9, ]

// Constructing a Min-Heap:
vector<int> arr = {3, 12, 4, 2, 5, 9, 6};
make_heap(arr.begin(), arr.end(), greater<int>());
cout << "Top of Heap: " << arr.front() << "\n";  // Top of Heap: 2
printVector(arr);                                // [ 2, 3, 4, 12, 5, 9, 6, ]
```

</details>

---

## Permutation operations

|                                      Function                                      | Use                                                                         |
| :--------------------------------------------------------------------------------: | --------------------------------------------------------------------------- |
| [`next_permutation`](https://en.cppreference.com/w/cpp/algorithm/next_permutation) | Generates the next greater lexicographic permutation of a range of elements |
| [`prev_permutation`](https://en.cppreference.com/w/cpp/algorithm/prev_permutation) | Generates the next smaller lexicographic permutation of a range of elements |
|   [`is_permutation`](https://en.cppreference.com/w/cpp/algorithm/is_permutation)   | Checks if a sequence is a permutation of another sequence                   |

<details>
<summary><strong>Permutation operations example</strong></summary>

```cpp
string str = "adam";
cout << "Permutations of " << str << " are:\n";
do {
    cout << str << "\n";
} while (next_permutation(str.begin(), str.end()));
/*
adam
adma
amad
amda
daam
dama
dmaa
maad
mada
mdaa
*/

// Checking if two sequences are permutations of each other
vector<int> v1{1, 2, 3, 1, 4}, v2{4, 1, 1, 3, 2};
string s1("silent"), s2("listen");
bool similarVectors = is_permutation(v1.begin(), v1.end(), v2.begin());
bool similarStrings = is_permutation(s1.begin(), s1.end(), s2.begin());
cout << "Is v2 a permutation of v1:  " << similarVectors << "\n";  // 1 (true)
cout << "Is s2 a permutation of s1:  " << similarStrings << "\n";  // 1 (true)

vector<int> nums = {1, 2, 3};
next_permutation(nums.begin(), nums.end()), printVector(nums);  // [ 1, 3, 2, ]
next_permutation(nums.begin(), nums.end()), printVector(nums);  // [ 2, 1, 3, ]
prev_permutation(nums.begin(), nums.end()), printVector(nums);  // [ 1, 3, 2, ]
```

</details>

---

## Partitioning Operations

|                                      Function                                      | Use                                                                    |
| :--------------------------------------------------------------------------------: | ---------------------------------------------------------------------- |
|        [`partition`](https://en.cppreference.com/w/cpp/algorithm/partition)        | Divides a range of elements into two groups                            |
|   [`partition_copy`](https://en.cppreference.com/w/cpp/algorithm/partition_copy)   | Copies a range dividing the elements into two groups                   |
| [`stable_partition`](https://en.cppreference.com/w/cpp/algorithm/stable_partition) | Divides elements into two groups while preserving their relative order |
|   [`is_partitioned`](https://en.cppreference.com/w/cpp/algorithm/is_partitioned)   | Test whether range is partitioned by the given predicate               |
|  [`partition_point`](https://en.cppreference.com/w/cpp/algorithm/partition_point)  | Locates the partition point of a partitioned range                     |

<details>
<summary><strong>Partition operations example</strong></summary>

```cpp
vector<int> nums = {1, 7, 4, 2, 9, 3, 6, 8};
auto isEven = [] (int num) -> bool { return !(num & 1); };

// Partition elements so EVEN numbers come FIRST (first all evens then odds)
// partition() returns an iterator to the first element of the second group i.e. odds
auto pivotPtr = partition(nums.begin(), nums.end(), isEven);
printVector(nums);  // [ 8, 6, 4, 2, 9, 3, 7, 1, ]

cout << "Even elements: [ ";
for (auto itr = nums.begin(); itr != pivotPtr; ++itr) cout << *itr << ", ";
cout << "]\n";
// Even elements:  [ 8, 6, 4, 2, ]

cout << "Odd elements: [";
for (auto itr = pivotPtr; itr != nums.end(); ++itr) cout << *itr << ", ";
cout << "]\n";
// Odd elements: [9, 3, 7, 1, ]

// Locate partition point in an already partitioned range
bool partitioned = is_partitioned(nums.begin(), nums.end(), isEven);
if (partitioned) {
    auto pivotLoc = partition_point(nums.begin(), nums.end(), isEven);
    cout << "First odd element: " << *pivotLoc << "\n";
}
// First odd element: 9
```

</details>

---

## Set, Merge operations (on sorted ranges)

|                                              Function                                              | Use                                                |
| :------------------------------------------------------------------------------------------------: | -------------------------------------------------- |
|                 [`includes`](https://en.cppreference.com/w/cpp/algorithm/includes)                 | Checks if one sequence is a subsequence of another |
|                [`set_union`](https://en.cppreference.com/w/cpp/algorithm/set_union)                | Computes the union of two sets                     |
|         [`set_intersection`](https://en.cppreference.com/w/cpp/algorithm/set_intersection)         | Computes the intersection of two sets              |
|           [`set_difference`](https://en.cppreference.com/w/cpp/algorithm/set_difference)           | Computes the difference between two sets           |
| [`set_symmetric_difference`](https://en.cppreference.com/w/cpp/algorithm/set_symmetric_difference) | Computes the symmetric difference between two sets |
|                    [`merge`](https://en.cppreference.com/w/cpp/algorithm/merge)                    | Merges two sorted ranges                           |
|            [`inplace_merge`](https://en.cppreference.com/w/cpp/algorithm/inplace_merge)            | Merges two ordered ranges in-place                 |

<details>
<summary><strong>Set and Merge operations example</strong></summary>

```cpp
vector<int> first = {1, 2, 4, 5, 7};
vector<int> second = {2, 4, 6};
vector<int> third = {1, 2, 3, 4, 5, 6};

// Check if one set is subset of another:
bool firstIncludesSecond = includes(first.begin(), first.end(), second.begin(), second.end());
bool thirdIncludesSecond = includes(third.begin(), third.end(), second.begin(), second.end());
cout << "Does first set include the second one: " << firstIncludesSecond << "\n";  // 0 (false)
cout << "Does third set include the second one: " << thirdIncludesSecond << "\n";  // 1 (true)

vector<int> unionResult, intersectionResult, diffResult, symDiffResult;
// Union and Intersection of two sets:
set_union(first.begin(), first.end(), second.begin(), second.end(), back_inserter(unionResult));
printVector(unionResult);  // [ 1, 2, 4, 5, 6, 7, ]
set_intersection(first.begin(), first.end(), second.begin(), second.end(), back_inserter(intersectionResult));
printVector(intersectionResult);  // [ 2, 4, ]
// Set Difference and Symmetric Set Difference between two sets:
set_difference(first.begin(), first.end(), second.begin(), second.end(), back_inserter(diffResult));
printVector(diffResult);  // [ 1, 5, 7, ]
set_symmetric_difference(first.begin(), first.end(), second.begin(), second.end(), back_inserter(symDiffResult));
printVector(symDiffResult);  // [ 1, 5, 6, 7, ]

// Merge two consecutive sorted parts within the same container
vector<int> combined = {3, 6, 8, 11, 16, 8, 10, 14, 17};
// First part is index 0 to 4:          [3, 6, 8, 11, 16]
// Second part is from index 5 onwards: [8, 10, 14, 17]
inplace_merge(combined.begin(), combined.begin() + 5, combined.end());
printVector(combined);  // [3, 6, 8, 8, 10, 11, 14, 16, 17, ]
```

</details>

## Non-modifying sequence operations

|                                           Function                                           | Use                                                                                   |
| :------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------- |
|              [`for_each`](https://en.cppreference.com/w/cpp/algorithm/for_each)              | Apply function to a range of elements                                                 |
|            [`for_each_n`](https://en.cppreference.com/w/cpp/algorithm/for_each_n)            | Apply function to first **N** elements of a sequence                                  |
| [`all_of`, `any_of`, `none_of`](https://en.cppreference.com/w/cpp/algorithm/all_any_none_of) | Check if condition is true for all/any/none of the elements in a range                |
|     [`find`, `find_if`, `find_if_not`](https://en.cppreference.com/w/cpp/algorithm/find)     | Find the first element satisfying specific criteria                                   |
|              [`find_end`](https://en.cppreference.com/w/cpp/algorithm/find_end)              | Find last sequence of elements in a certain range                                     |
|         [`find_first_of`](https://en.cppreference.com/w/cpp/algorithm/find_first_of)         | Searches for any one of a set of elements                                             |
|         [`adjacent_find`](https://en.cppreference.com/w/cpp/algorithm/adjacent_find)         | Finds the first two adjacent items that are equal (or satisfy given condition)        |
|           [`count`, `count_if`](https://en.cppreference.com/w/cpp/algorithm/count)           | Returns number of elements satisfying specific criteria                               |
|              [`mismatch`](https://en.cppreference.com/w/cpp/algorithm/mismatch)              | Finds the first position where two ranges differ                                      |
|                 [`equal`](https://en.cppreference.com/w/cpp/algorithm/equal)                 | Checks if two sets of elements are the same                                           |
|                [`search`](https://en.cppreference.com/w/cpp/algorithm/search)                | Searches for first occurrence of a range of elements                                  |
|              [`search_n`](https://en.cppreference.com/w/cpp/algorithm/search_n)              | Searches for first occurrence of a number consecutive copies of an element in a range |

## Modifying sequence operations

|                                           Function                                            | Use                                                                                |
| :-------------------------------------------------------------------------------------------: | ---------------------------------------------------------------------------------- |
|             [`copy`, `copy_if`](https://en.cppreference.com/w/cpp/algorithm/copy)             | Copies a range of elements to a new location                                       |
|                [`copy_n`](https://en.cppreference.com/w/cpp/algorithm/copy_n)                 | Copies a number of elements to a new location                                      |
|         [`copy_backward`](https://en.cppreference.com/w/cpp/algorithm/copy_backward)          | Copy range of elements backward                                                    |
|                  [`move`](https://en.cppreference.com/w/cpp/algorithm/move)                   | Moves a range of elements to a new location                                        |
|         [`move_backward`](https://en.cppreference.com/w/cpp/algorithm/move_backward)          | Moves a range of elements to a new location in backwards order                     |
|                  [`swap`](https://en.cppreference.com/w/cpp/algorithm/swap)                   | Swaps the values of two objects                                                    |
|           [`swap_ranges`](https://en.cppreference.com/w/cpp/algorithm/swap_ranges)            | Swaps two ranges of elements                                                       |
|             [`iter_swap`](https://en.cppreference.com/w/cpp/algorithm/iter_swap)              | Swaps the elements pointed to by two iterators                                     |
|             [`transform`](https://en.cppreference.com/w/cpp/algorithm/transform)              | Applies a function to a range, storing results in a destination range              |
|        [`replace`, `replace_if`](https://en.cppreference.com/w/cpp/algorithm/replace)         | Replaces all values satisfying specific criteria with another value                |
| [`replace_copy`, `replace_copy_if`](https://en.cppreference.com/w/cpp/algorithm/replace_copy) | Copies a range, replacing elements satisfying specific criteria with another value |
|                  [`fill`](https://en.cppreference.com/w/cpp/algorithm/fill)                   | Copy-assigns the given value to every element in a range                           |
|                [`fill_n`](https://en.cppreference.com/w/cpp/algorithm/fill_n)                 | Copy-assigns the given value to **N** elements in a range                          |
|              [`generate`](https://en.cppreference.com/w/cpp/algorithm/generate)               | Assigns the results of successive function calls to every element in range         |
|            [`generate_n`](https://en.cppreference.com/w/cpp/algorithm/generate_n)             | Assigns the results of successive function calls to **N** elements in range        |
|          [`remove`, `remove_if`](https://en.cppreference.com/w/cpp/algorithm/remove)          | Removes elements satisfying specific criteria                                      |
|  [`remove_copy`, `remove_copy_if`](https://en.cppreference.com/w/cpp/algorithm/remove_copy)   | Copies a range of elements omitting those that satisfy specific criteria           |
|                [`unique`](https://en.cppreference.com/w/cpp/algorithm/unique)                 | Removes consecutive duplicate elements in range                                    |
|           [`unique_copy`](https://en.cppreference.com/w/cpp/algorithm/unique_copy)            | Creates a copy of some range of elements that contains no consecutive duplicates   |
|               [`reverse`](https://en.cppreference.com/w/cpp/algorithm/reverse)                | Reverses the order of elements in a range                                          |
|          [`reverse_copy`](https://en.cppreference.com/w/cpp/algorithm/reverse_copy)           | Creates a copy of a range that is reversed                                         |
|                [`rotate`](https://en.cppreference.com/w/cpp/algorithm/rotate)                 | Rotates the order of elements in a range                                           |
|           [`rotate_copy`](https://en.cppreference.com/w/cpp/algorithm/rotate_copy)            | Copies and rotate a range of elements                                              |
|            [`shuffle`](https://en.cppreference.com/w/cpp/algorithm/random_shuffle)            | Randomly re-orders elements in a range                                             |
|                [`sample`](https://en.cppreference.com/w/cpp/algorithm/sample)                 | Selects **N** random elements from a sequence                                      |
