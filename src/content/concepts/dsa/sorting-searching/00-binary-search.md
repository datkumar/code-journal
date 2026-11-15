---
title: Binary Search
tags: [dsa, algorithm, binary-search]
---

> Binary search is an algorithm is used to find a **key** in a **SORTED search space**

## Algorithm

```txt
Till working array exists:
    Pick the MIDDLE element of working array

    If key EQUAL to middle element -> return answer as FOUND
    If key SMALLER -> search in LEFT half of working array (before middle element)
    If key BIGGER -> search in RIGHT half of working array (after middle element)

    return answer as NOT FOUND
```

Some validations we assume are:

- Given input array is **sorted** in **non-decreasing** order (duplicates could exist)
- Input array is non-empty with valid elements

We are currently assuming an array of simple integer data types and returning the search-result as the **index** of the element in array if key is found, else `-1` in case of not-found. However, when the array consists of objects of complex custom data-types, we could return the search-result as a pointer to the element if found and `nullptr` in case of not-found.

### Calculating midpoint safely

We could naively calculate **midpoint** of working array at each step as `mid = (low + high) / 2`:

$$
mid = \left\lfloor \frac{(low + high)}{2} \right\rfloor
$$

But value of `(low + high)` might cause integer **overflow** for large index numbers, so we calculate the midpoint safely as `mid = low + ((high - low) / 2)`:

$$
mid = low + \left\lfloor \frac{(high - low)}{2} \right\rfloor
$$

## Iterative Binary Search

```cpp
int binarySearchIter (const vector<int> nums, const int key) {
    int low = 0, high = nums.size() - 1;      // Start at the two ends of input array
    while (low <= high) {                     // Check working array size of size 1 or more
        int mid = low + ((high - low) / 2);   // Calculate midpoint of working array
        if (key == nums[mid]) return mid;     // Key FOUND, return midpoint index as answer
        if (key < nums[mid]) high = mid - 1;  // Key is smaller, continue search in left-side half
        else low = mid + 1;                   // Key is bigger, continue search in right-side half
    }
    return -1;  // return answer as Key NOT FOUND
}
```

## Recursive Binary Search

```cpp
// Helper recursive function to binary-search in one of the halves at each step
int func (int low, int high, const int &key, const vector<int> &nums) {
    if (low > high) {  // Terminating base-case: Working array size < 1
        return -1;     // return answer as key NOT FOUND
    }
    // Calculate midpoint of working array
    int mid = low + (high - low) / 2;

    if (key == nums[mid]) {  // Key FOUND
        return mid;          // return midpoint index as answer
    }
    if (key < nums[mid]) {                     // Key is smaller
        return func(low, mid - 1, key, nums);  // Continue search in left-side half
    }
    // Key is bigger, continue search in right-side half
    return func(mid + 1, high, key, nums);
}

int binarySearchRecur (const vector<int> &nums, const int key) {
    int low = 0, high = nums.size() - 1;  // Start at the two ends of input array
    return func(low, high, key, nums);    // First starting recursive call
}
```

### Output

```cpp
int main () {
    // Index positions:     0   1   2  3  4  5  6  7  8  9  10  11  12
    const vector<int> nums{-10, -5, -1, 0, 2, 3, 4, 4, 5, 8, 9, 11, 12};
    // Key exists at unique index case:
    cout << binarySearchIter(nums, 9) << "\n";   // 10
    cout << binarySearchRecur(nums, 9) << "\n";  // 10
    // Key not exists case:
    cout << binarySearchIter(nums, 1) << "\n";   // -1  (not found)
    cout << binarySearchRecur(nums, 1) << "\n";  // -1  (not found)
    // Key exists at multiple indices (duplicate elements case):
    cout << binarySearchIter(nums, 4) << "\n";   // 6
    cout << binarySearchRecur(nums, 4) << "\n";  // 6
}
```

## Algorithm Analysis

For an input array with $n$ elements,

| Metric | Complexity                                       |
| ------ | ------------------------------------------------ |
| Time   | $O(logn)$                                        |
| Space  | $O(1)$ for iterative and $O(logn)$ for recursive |

**After each step, the working array size is halved**. We will keep on iterating till either the element is found or the working array becomes empty

1. **Best Case**:

   In **best case**, the key is found at first pass itself, i.e. when the **key is present at midpoint** of input array. The time taken would be $\boxed{O(1)}$ in best case

2. **Worst Case**:

   In **worst case**, we will exhaust our working array to **single element**. It would occur at elements that would never be midpoints in the passses such as the **first and last element** of input array as the keys

   The working array size shrinks by halving as: $n, (n/2), (n/4), (n/8), ..., 1$

   Let the process go on till $k$ passes. The search space size shrinks as:

   $$
   \frac{n}{2^0} , \frac{n}{2^1}, \frac{n}{2^2}, \frac{n}{2^3}, ... , \frac{n}{2^k}
   $$

   $$
   \therefore \frac{n}{2^k} = 1 \implies n = 2^k
   $$

   By applying $log_2$ on both sides,

   $$
   \boxed{k = log_2(n) }
   $$

3. **Average Case**:

   See [GFG article](https://www.geeksforgeeks.org/complexity-analysis-of-binary-search/) to know how we get average case time complexity as $\boxed{ O(logn) }$

### Recurrence relation

At each step, we are checking equality in $\Theta(1)$ and the next call is on working array half of the current one i.e. $T(n/2)$. So the recurrence relation for time required becomes:

$$
T(n) = T \left( \frac{n}{2} \right) + \Theta(1)
$$

Solving it via [Master Theorem for Dividing functions](/code-journal/dsa/dsa/recursion/4-recurrence-master-thm#master-theorem-for-evaluating-dividing-functions) gives us:

$$
\boxed{
    T(n) = \Theta(\log n)
}
$$

### Space

Binary search doesn't require any extra auxiliary space i.e. $O(1)$ constant space but the stack space for recursive binary search can grow upto the max depth of recursion, i.e. upto $O(logn)$ in worst case
