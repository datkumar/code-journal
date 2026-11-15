---
title: Merge Sort
tags: [dsa, algorithm, sorting]
---

<figure>
    <img alt="Merge Sort illustration" height="350px" src="https://www.w3schools.com/dsa/img_mergesort_long.png">
  <figcaption>
    Credits : <a href="https://www.w3schools.com/dsa/dsa_algo_mergesort.php">W3Schools DSA Merge Sort</a>
  </figcaption>
</figure>

## Main idea

- It uses a recursive **Divide-and-Conquer** approach:
  - Divide step: **Split** the current working subarray into **two halves**
  - Conquer step: **Merge** the two **sorted subarrays** into a **combined sorted** array
- The terminating **base-case** for recursive splitting calls is when current working subarray contains **only one element**. We assume the single-element subarray as sorted in that case and stop making any further recursive splitting calls
- The crucial step in this algorithm is **merging two sorted subarrays into a combined sorted one**

```txt title="PseudoCode"
Merging two sorted subarray halves () {
    Create new temporary array to accommodate the merged result
    The size of merged array is combined sizes of both halves

    Begin comparing from the start of both subarrays:
        Whichever is smaller:
            Insert and append it into the merged array and
            Update that pointer one step ahead

    If either pointer goes out of its index bounds first:
        Copy over the remaining elements of other pointer's subarray into merged array

    Copy the elements of the temporary merged result back into original array's elements
    Delete the temporary array (deallocate its space)
}

Sorting working subarray() {
    If current working subarray contains just one element:
        Assume it as sorted and EXIT to stop further recursive calls

    Else keep recursively split current working subarray into two halves
    The split is done by finding midpoint 'mid' of current working subarray
    The first half is of indices    [low to mid]
    The second half is of indices   [mid+1 to high]

    Merge those two sorted subarray halves ()
}
```

## Code

- Each of the **subarray halves** made are **adjacent** to each other
- Skipping the third `while` loop in `merge()` function works because the remaining elements in right half subarray are already in their corrected sorted place. If that `while` loop is included, we would be appending them into `combined[]` and then copying them back into the ending elements of `arr[]` in last step, which would be redundant.

```cpp title="Merge Sort"
// Helper function to merge the two adjacent sorted subarray halves into a continuously-sorted one
void merge (const int low, const int mid, const int high, vector<int> &arr) {
    // The first subarray is from index [low to mid] and second from index [mid+1 to high]
    vector<int> combined;              // Temporary array to store the combined continuously-sorted result
    combined.reserve(high - low + 1);  // Reserve capacity as total combined elements count
    // Maintain 2 pointers initially pointing to first element of both subarrays
    int left = low, right = mid + 1;

    // Iterate by picking one element (smaller one) from the pointed ones at each comparison
    // Insert that picked element into combined result and move the picked pointer one step ahead
    while (left <= mid && right <= high) {        // Check both pointers are within their subarray index bounds
        if (arr[left] <= arr[right]) {            // First subarray's pointer has smaller element (or both equal values)
            combined.emplace_back(arr[left++]);   // Pick from FIRST subarray
        } else {                                  // Second subarray's pointer has smaller element
            combined.emplace_back(arr[right++]);  // Pick from SECOND subarray
        }
    }
    // If either subarray's elements have been exhaustively picked, then
    // append copy the other subarray's remaining elements into the combined result
    while (left <= mid) combined.emplace_back(arr[left++]);
    while (right <= high) combined.emplace_back(arr[right++]);  // This line could be omitted

    // Copy combined-sorted elements of temporary array back into original array positions
    for (int i = 0; i < combined.size(); i++) {
        arr[low + i] = combined[i];
    }
}

void splitAndSort (const int low, const int high, vector<int> &arr) {
    if (low >= high) {  // Base-case: Current working subarray is single-element
        return;         // Assume it as sorted and stop making further calls (return back)
    }
    // Find midpoint of current working subarray to make the split
    int mid = low + (high - low) / 2;
    // Split work of current working subarray over two equal halves of it
    splitAndSort(low, mid, arr);       // First subarray half is from index [low to mid]
    splitAndSort(mid + 1, high, arr);  // Second subarray half from index [mid+1 to high]

    // Merge the two adjacent sorted subarray halves into a continuously-sorted one
    merge(low, mid, high, arr);
}

void mergeSort (vector<int> &arr) {
    if (arr.size() <= 1) {  // Trivial case: empty or single-element arrays
        return;             // Assume as sorted and return as-is
    }
    // Start splitting and merging with first initial call of ENTIRE array
    int low = 0, high = arr.size() - 1;
    splitAndSort(low, high, arr);
}
```

<details>
<summary>We can create the temporary array just <strong>once</strong> and <strong>reuse</strong> it in the recursive calls</summary>

```cpp title="Allocate temporary array ONCE and reuse"
void merge (const int low, const int mid, const int high, vector<int> &temp, vector<int> &arr) {
    // Copy elements of arr[] into temp[] for indices [low..high] i.e. elements of both subarray halves
    for (int i = low; i <= high; i++) temp[i] = arr[i];
    // Now temp[] contains the two subarrays and we use arr[] as the final combined result

    int left = low, right = mid + 1, combinedIdx = low;

    while (left <= mid && right <= high) {
        if (temp[left] <= temp[right]) {  // Pick from first subarray into combined
            arr[combinedIdx++] = temp[left++];
        } else {
            arr[combinedIdx++] = temp[right++];  // Pick from second subarray into combined
        }
    }
    // If indices of first subarray remain (but second is exhausted), copy remaining elements
    // of first subarray into combined (nothing needed when first subarray gets exhausted)
    while (left <= mid) arr[combinedIdx++] = temp[left++];
}

void splitAndSort (const int low, const int high, vector<int> &temp, vector<int> &arr) {
    if (low >= high) return;

    int mid = low + (high - low) / 2;
    splitAndSort(low, mid, temp, arr);
    splitAndSort(mid + 1, high, temp, arr);

    merge(low, mid, high, temp, arr);
}

void mergeSort (vector<int> &arr) {
    if (arr.size() <= 1) return;
    const int n = arr.size();
    // Allocate array ONCE at start and REUSE within recursive calls
    vector<int> temp(n);
    int low = 0, high = (n - 1);
    splitAndSort(low, high, temp, arr);
}
```

</details>

## Algorithm Analysis

|   Metric   |         Value          | Remarks                                                      |
| :--------: | :--------------------: | ------------------------------------------------------------ |
|  **Time**  | $\Theta(n \cdot logn)$ | Same work done in ALL cases (NOT Adaptive)                   |
| **Space**  |         $O(n)$         | For temporary `combined[]` array and recursive call-stack    |
| **Stable** |         Yes ✅         | For equal elements, left subarray's element is picked first  |
| **Online** |         No ❌          | Requires the full input sequence before spliting and merging |

### Time Complexity

```cpp
void merge(int low, int mid, int high, int arr[]) {
    // Pick elements one-by-one from the two subarrays into combined[]  -> O(n)
    // Copy combined[] elements back into arr[]                         -> O(n)
}

void splitAndSort(int low, int high, int arr[]) {       // T(n)
    // Base-case check and calculating midpoint         // O(1)

    splitAndSort(arr, low, mid);                        // T(n/2)
    splitAndSort(arr, mid + 1, high);                   // T(n/2)

    merge(arr, low, mid, high);                         // Theta(n)
}
```

Note that the **work at each step is being split equally** over two **halves**. Thus, the recurrence relation becomes:

$$
T(n) = 2 \cdot T \left(\frac{n}{2}\right) + \Theta(n)
$$

It falls under **Case (2a)** of [Master Theorem for evaluating Dividing functions](/code-journal/dsa/dsa/recursion/4-recurrence-master-thm#master-theorem-for-evaluating-dividing-functions)

Solving the recurrence gives us the time complexity as:

$$
\boxed{
T(n) = \Theta(n \cdot log_2 (n) )
}
$$

This time complexity is the **same across all cases** (best, average, and worst), because splitting the array at the midpoint and merging subarrays takes the same asymptotic work regardless of initial order of input elements

### Space Complexity

- We use extra space to store the **temporary array** `combined[]` at each step. This temporary array will take at max $O(n)$ space for storing elements when merging two subarray halves roughly of size $(n/2)$ each at the top-level `merge()` call.
- The recursive calls being made use call-stack memory. As the work at each step is being **split over equal halves**, the recursion trace would be a **balanced Binary Tree** and it's height would be $log_2(n)$, signifying the max depth of recursion calls being made at any time

**Total Space** $= O(n) + O(log_2(n)) \implies \boxed{O(n)}$

### Stability

When two elements have equal values `(arr[left] == arr[right])`, using `<=` picks from the **left** subarray first. Because elements from the left half already precede those from the right half in the original array, their **relative order is preserved**, making merge-sort a STABLE algorithm

```cpp
while (left <= mid && right <= high) {
    if (arr[left] <= arr[right]) {
        combined.emplace_back(arr[left++]);
    } else {
        combined.emplace_back(arr[right++]);
    }
}
```

## Applications of Merge Sort

1. **External Sorting**: When the input is too large to fit into memory, it can be sorted in **chunks** and those chunks can be **merged** later

2. **Sorting Linked-Lists**: Merge-sort is well-suited for linked-lists because nodes can be split and merged by **relinking pointers** without needing an extra $O(n)$ space for temporary array or random access, while still achieving $\Theta(n \log n)$ time. There is still $O(logn)$ space used for recursion stack, or $O(1)$ space iteratively.

3. **Counting Inversions**: During `merge()`, whenever `arr[left] > arr[right]` (assuming `left <= mid`), all remaining elements `arr[left...mid]` are also greater than `arr[right]`, allowing you to count inversions (`mid - left + 1`) at once instead of scanning pairwise. Refer [Inversion Count via Merge Sort](https://www.geeksforgeeks.org/dsa/inversion-count-in-array-using-merge-sort/)

**Further reading**:

- [Iterative Merge Sort (GFG)](https://www.geeksforgeeks.org/dsa/iterative-merge-sort/)
- [Merge Sort for Linked Lists (GFG)](https://www.geeksforgeeks.org/dsa/merge-sort-for-linked-list/)
- [Iterative Merge Sort for Linked List (GFG)](https://www.geeksforgeeks.org/dsa/iterative-merge-sort-for-linked-list/)
- [Multi-threaded Merge Sort (AlgoMaster)](https://algomaster.io/learn/concurrency-interview/multi-threaded-merge-sort)
