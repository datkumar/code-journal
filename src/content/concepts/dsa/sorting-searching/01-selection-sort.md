---
title: Selection Sort
tags: [dsa, algorithm, sorting]
---

## Main idea

- We **select** the **minimum** element and **swap** it with the **first element** in current **working subarray**
- At each pass, traverse the current working subarray to find the next minimum element and place it at the start of working subarray

```txt title="PseudoCode"
For each element in array:
    Locate SMALLEST element among working subarray elements from that positionAHEAD till the end
    Place this SMALLEST element of working subarray at START of it i.e. its correct sorted position
    Shrink working subarray as one less element from the left
```

## Code

```cpp title="Selection Sort"
void selectionSort (vector<int> &arr) {
    const int n = arr.size();
    // Ignore last element's pass, so (n-1) passes
    for (int i = 0; i < (n - 1); i++) {  // Current working subarray is from arr[i] to arr[n-1]
        // Tracks index of minimum element in working subarray, initially i-th element
        int nextMinElemIdx = i;
        // Iterate through elements AHEAD in working subarray to find smallest
        for (int j = i + 1; j < n; j++) {
            // Update min-element index whenever a smaller element is found
            if (arr[j] < arr[nextMinElemIdx]) {
                nextMinElemIdx = j;
            }
        }
        // Place the smallest of current working subarray at start of subarray
        swap(arr[i], arr[nextMinElemIdx]);
        // At end of this pass, the FIRST (i+1) elements of array are in their correct sorted position
    }
}
```

- After each $i^{th}$ pass (0-indexed), the $(i+1)^{th}$ **smallest** element gets placed at its correct **sorted** position.
- At the last index, the working subarray contains only one element, which must already be in its correct sorted position. Therefore, no pass is necessary for it.

## Algorithm Analysis

|   Metric   |  Value   | Remarks                                  |
| :--------: | :------: | ---------------------------------------- |
|  **Time**  | $O(n^2)$ | Same work in ALL cases i.e. NOT Adaptive |
| **Space**  |  $O(1)$  | In-place sorting                         |
| **Stable** |  No ❌   | Can be made stable by shifting           |
| **Online** |  No ❌   | Needs entire input at once               |

We are doing the same amount of work in all the cases i.e. the number of comparisons and swaps remains exactly the same regardless of the initial arrangement of input elements. This is why Selection Sort is said to be **NOT Adaptive**.

Selection Sort needs to scan the entire unsorted elements ahead before determining which element belongs at the start of current working subarray; thereby Selection Sort is **NOT Online**.

### Time Complexity

- Total $(n-1)$ passes

- During each pass, we traverse the remaining elements AHEAD in working subarray to find minimum element of subarray. There are $(n-1)$ comparisons in first pass, $(n-2)$ in second and so on till only $1$ comparison in the last pass:

  **Total Comparisons** $= (n-1) + (n-2) + ... + 1 = \dfrac{(n-1)(n)}{2} \implies O(n^2)$

- Also, $1$ swap after each pass and thereby total $(n-1)$ swaps $\implies O(n)$

So, total time $= O(n^2) + O(n) \implies O(n^2)$

### Stability

Consider input array `[4a, 5, 3, 2, 4b, 1]`

- After first pass, it would become `[1, 5, 3, 2, 4b, 4a]` when `1` is swapped with `4a`
- At the end of sorting, the array would be `[1, 2, 3, 4b, 4a, 5]`

Thus, the relative order between similar elements isn't maintained and selection-sort is **NOT Stable**

We can make it stable by **shifting** the relevant elements ahead one position instead of swapping two elements
