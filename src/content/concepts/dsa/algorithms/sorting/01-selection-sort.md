---
title: Selection-sort
tags: [dsa, algorithm, sorting]
---

## Main idea

- We **select** the **minimum** element and **swap** it with the **first element** in current working subarray
- At each pass, traverse the current working subarray to find the next minimum element and place it at the start of working subarray

## Pseudo-code

```txt
For each element in array:

    Locate smallest element among elements from that position to end

    Place that minimum element at start (correct sorted position)

    Update working array as one less element from left

```

## Code

- After each \\(i^{th}\\) pass, the \\(i^{th}\\) **minimum** element gets placed at it's correct **sorted position**
- At last index's pass, since working array is only last one element (which is also minimum itself), no need to process that pass

```cpp title="C++"
void selectionSort(int arr[], int n)
{
    // Ignore last element's pass, so (n-1) passes
    for (int i = 0; i < (n - 1); i++)
    {
        // Working subarray is arr[i] to arr[n-1]

        // Tracks index of minimum element in working subarray
        int nextMinElemIdx = i;

        // Traverse the working subarray
        for (int j = i + 1; j < n; j++)
        {
            // Update position whenever smaller element found
            if (arr[j] < arr[i])
            {
                nextMinElemIdx = j;
            }
        }

        // Place the smallest of current subarray at it's start
        swap(arr[i], arr[nextMinElemIdx]);
    }
}
```

## Algorithm Analysis

|   Metric   |     Value      | Remarks                               |
| :--------: | :------------: | ------------------------------------- |
|  **Time**  | \\( O(n^2) \\) | Same work in ALL cases (NOT Adaptive) |
| **Space**  |  \\( O(1) \\)  | In-place sorting                      |
| **Stable** |       ❌       | Can be made stable by shifting        |
| **Online** |       ❌       | Needs entire input at once            |

### Time Complexity

- Total \\( (n-1) \\) passes

- For each \\(i^{th}\\) element in array, we are traversing and comparing with next \\((n-i)\\) elements

- Thus, the **same work** is done in **ALL cases** (best, worst, average)

- There are \\( (n-1) \\) comparisions in the first pass, \\( (n-2) \\) in the second and so on till only \\(1\\) comparison in the last pass and so on:

  \\( = (n-1) + (n-2) + ... + 2 + 1 = \frac{( n-1)(n)}{2} = O(n^2) \\) comparisons

- Also, \\(1\\) swap after each pass and thereby total \\( (n-1) = O(n) \\) swaps

So, total time \\( = O(n^2) + O(n) = O(n^2) \\)

### Stability

Consider input array `[4a, 5, 3, 2, 4b, 1]`

- After first pass, it would become `[1, 5, 3, 2, 4b, 4a]` when `1` is swapped with `4a`
- At the end of sorting, the array would be `[1, 2, 3, 4b, 4a, 5]`

Thus, the relative order between similar elements isn't maintained and selection-sort is **NOT Stable**

We can make it stable by _pushing_ the elements forward instead of swapping two elements
