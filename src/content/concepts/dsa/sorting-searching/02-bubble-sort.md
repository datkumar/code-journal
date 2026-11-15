---
title: Bubble Sort
tags: [dsa, algorithm, sorting]
---

## Main idea

- Compare **adjacent** elements and **swap** them if the left element is greater than the right element.
- Thus, in each pass, the **largest** element in the working subarray **bubbles** towards its **end**, eventually reaching its correct **sorted position**.

```txt title="PseudoCode"
For each of the (n-1) total passes on working subarray:
    Iterate through working subarray elements comparing two adjacent ones at a time:
        If the second element is lesser than first in the pair being compared:
            Swap them
    Shrink working subarray as one less element from the right
```

## Code

```cpp title="Naive Bubble Sort"
void bubbleSort (vector<int> &arr) {
    const int n = arr.size();
    // Ignore last element's pass, so (n-1) passes
    for (int i = 0; i < (n - 1); i++) {
        // Current working subarray is from arr[0] to arr[n-1-i]
        int lastWorkingIdx = (n - 1) - i;
        // Iterate through working subarray comparing two adjacent elements at a time
        for (int j = 0; j <= lastWorkingIdx - 1; j++) {
            // Swap when left element is greater than right in the pair being compared
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
        // At end of this pass, the LAST (i+1) elements of array are in their correct sorted position
    }
}
```

- After each $i^{th}$ pass (0-indexed), the $(i+1)^{th}$ **largest** element gets placed at its correct **sorted** position.
- At last pass, since working subarray is only first one minimum element (which is in it's correct position), no need to process that pass.

### Optimizing Comparisons

> If there were **no swaps** made during a pass, it means the entire array is **already sorted** at that point

At the beginning of each pass, the elements beyond the working subarray's right boundary are already in their correct sorted positions. If no swaps occur while traversing the working subarray, it means that subarray is also sorted. Therefore, the entire array is sorted.

We maintain a **flag** to check whether any swaps were made during a pass. If no swaps were made, the array is in sorted state and we can stop our processing. For arrays that are **completely sorted**, we will need one or very few passes via this optimization

```cpp title="Better Bubble Sort"
void bubbleSortBetter (vector<int> &arr) {
    const int n = arr.size();
    for (int i = 0; i < (n - 1); i++) {
        int lastWorkingIdx = (n - 1) - i;
        // Maintain flag to track whether any swaps occurred during this pass
        bool didAnySwap = false;
        for (int j = 0; j <= lastWorkingIdx - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);  // We are swapping elements in working subarray
                if (!didAnySwap) {         // Update flag to true if it was false before
                    didAnySwap = true;
                }
            }
        }
        if (!didAnySwap) {  // No swaps happened during this pass
            return;         // Array is Sorted so exit (no more passes needed)
        }
    }
}
```

## Algorithm Analysis

|   Metric   |          Value          | Remarks                                              |
| :--------: | :---------------------: | ---------------------------------------------------- |
|  **Time**  | $O(n^2)$ to $\Omega(n)$ | Using flag optimizes for sorted arrays i.e. Adaptive |
| **Space**  |         $O(1)$          | In-place sorting                                     |
| **Stable** |         Yes ✅          | No swapping done for equal adjacent elements         |
| **Online** |          No ❌          | Needs entire input at once                           |

Unlike [Selection Sort](/code-journal/dsa/dsa/sorting-searching/01-selection-sort), Bubble Sort can **reduce** the amount of work depending on the initial arrangement of elements. With the swapped flag optimization, if no swaps occur during a pass, the array is already sorted and we can terminate early. This makes Bubble Sort **Adaptive**.

Bubble Sort is also **NOT Online**, as it needs to process the input array to determine the sorted order.

### Time Complexity

- Total $(n-1)$ passes _at-most_

- During each pass, we traverse the current working subarray and comparing adjacent elements. The first pass has $(n-1)$ comparisons, the second has $(n-2)$, and so on until only $1$ comparison remains in the last pass.

  **Total Comparisons** $= (n-1) + (n-2) + ... + 1 = \dfrac{(n-1)(n)}{2} \implies O(n^2)$ comparisons

- At each comparison, a swap may occur. In the **worst** case, **every comparison results in a swap**, giving us at most $O(n^2)$ swaps
- Thereby, **worst-case total time** $= O(n^2) + O(n^2) \implies O(n^2)$.
- In the **best case**, the array is **already sorted**. We perform just one pass with $(n-1)$ comparisons and **no swaps**. Since the swapped flag remains false, we exit early. Thus, time complexity for best-case is $O(n)$

|   Case    | Time Complexity | Occurs when input array is             |
| :-------: | :-------------: | -------------------------------------- |
| **Best**  |     $O(n)$      | Already Sorted                         |
| **Worst** |    $O(n^2)$     | Reverse-Sorted i.e. Decreasing ordered |
|  **Avg**  |    $O(n^2)$     | Random or generally unsorted           |

Without the optimization flag i.e. naive Bubble Sort, we **always** perform all $(n-1)$ passes, even if the array had become sorted earlier. Therefore, its best, average, and worst-case time complexities are all $O(n^2)$ as we are doing the same work in any case

### Stability

When two equal elements are adjacent, they are never swapped, since we **only swap** when the left element is **strictly greater** than the right element. The relative order between equal elements is therefore maintained throughout the sorting process. Therby, Bubble Sort **is Stable**
