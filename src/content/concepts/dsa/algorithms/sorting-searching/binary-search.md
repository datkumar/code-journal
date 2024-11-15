---
title: Binary-search
tags: [dsa, algorithm, binary-search]
---

Binary search is an algorithm is used to find a key in a **sorted search space**

## Algorithm

```txt
Till working array exists:
    Pick the middle element of working array.
    If key equal to middle element:
        return answer.
    If key smaller:
        Search in LEFT half of working array (before middle element).
    If key larger:
        Search in RIGHT half of working array (after middle element).
```

While **calculating midpoint** of working array:

Technically, `mid = (low + high) / 2` . But value of `low + high` might cause integer **overflow**, so we calculate it as: `mid = low + (high - low) / 2`

## Iterative Binary Search

```cpp
int binarySearch(int const arr[], int low, int high, const int &key) {
    // Check working array size is 1 or more
    while (low <= high) {
        // Calculate midpoint of working array
        int mid = low + (high - low) / 2;

        if (key == arr[mid])  // KEY FOUND:
            return mid;       // Return index position

        if (key < arr[mid])  // Key is smaller:
            high = mid - 1;  //  Look back in smaller part
        else                 // Key is bigger:
            low = mid + 1;   //  Look ahead in larger part
    }
    return -1;  // KEY NOT FOUND
}
```

Both functions called like: `int result = binarySearch(nums, 0, n-1, 57)`

## Recursive Binary Search

```cpp
int binarySearch(
    int arr[], int n,
    const int low, const int high,
    const int &key
) {
    // Terminating base-case: Working array size < 1
    if (low > high) return -1;  // NOT FOUND

    // Calculate midpoint of working array
    int mid = low + (high - low) / 2;

    // KEY FOUND: Return index position
    if (key == arr[mid]) return mid;

    // Key is smaller. Need to search in left-side
    if (key < arr[mid]) return binarySearch(arr, n, key, low, mid - 1);

    // Key is larger. Need to search in right-side
    return binarySearch(arr, n, key, mid + 1, high);
}
```

Some validations we assume:

- Given input array **is sorted**
- Array isn't empty. A valid array exists at given input location

## Algorithm Analysis

| Metric | Complexity       |
| ------ | ---------------- |
| Time   | \\( O(logN ) \\) |
| Space  | \\( O(1) \\)     |

**After each step, the working array size is halved**. We will keep on iterating till either the element is found or the working array becomes empty

1. **Best Case**

   In **best case**, the key is found at first pass itself, i.e. when the **key is present at midpoint** of input array. The time taken would be \\(O(1)\\) in best case

2. **Worst Case**

   In **worst case**, we will exhaust our working array to **single element**. It would occur at elements that would never be midpoints in the passses such as the **first and last element** of input array as the keys

   The working array size shrinks as: \\( n, (n/2), (n/4), (n/8), ..., 1 \\)

   Let the process go on till `k` passes. The search space sizes would be: \\( \frac{n}{2^0} , \frac{n}{2^1}, \frac{n}{2^2}, \frac{n}{2^3}, ... , \frac{n}{2^k} \\)

   \\(\therefore \frac{n}{2^k} = 1 \implies n = 2^k \\)

   \\(\therefore log_2(n) = k \text{ ... apply log base 2 on both sides } \\)

3. **Average Case**

   See [GFG article](https://www.geeksforgeeks.org/complexity-analysis-of-binary-search/) to know how we get average case complexity as \\( O(log(n)) \\)

### Recurrence relation

The recurrence relation would be:

\\[ T(n) = T(n/2) + \Theta(1) \\]

Solving it via [Master Theorem for Dividing functions](/code-journal/dsa/dsa/recurrence-master-thm#master-theorem-for-evaluating-dividing-functions) gives us:

\\[ T(n) = \Theta(log(n)) \\]

### Space

Binary search doesn't need any auxiliary space i.e. \\( O(1) \\) but the stack space can be upto the max depth of recurion, which is upto \\( O(logN) \\)

---

C++ STL's [`std::binary_search`](https://en.cppreference.com/w/cpp/algorithm/binary_search) has function signature as `binary_search(start_pos, end_pos, key)` which returns `bool` (true/false) answer as whether key exists or not
