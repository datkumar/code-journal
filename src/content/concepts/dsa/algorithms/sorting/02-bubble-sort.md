---
title: Bubble-sort
tags: [dsa, algorithm, sorting]
---

## Main idea

- Compare adjacent elements and place the larger one ahead (by swapping if needed)
- Thus, in each pass, the **largest** element in the working subarray **bubbles towards it's end** until the whole array is sorted

## Pseudo-code

```txt
For each element in array:

    Go comparing two adjacent elements till the end of working array:

        If the second element smaller than first:
            Swap the two

    Update working array as one less element from right

```

## Code

- After each \\(i^{th}\\) pass, the \\(i^{th}\\) **maximum** element gets placed at it's correct **sorted position**
- At last pass, since working array is only first one minimum element (which is in it's correct position), no need to process that pass

```cpp title="C++"
void bubbleSort(int arr[], int n)
{
    // n-1 passes
    for (int i = 0; i < n - 1; i++)
    {
        // Working subarray is arr[0] to arr[n-1-i]
        int lastWorkingIdx = n - 1 - i;

        // Comparing arr[j] with arr[j+1] and keeping loop index in bounds
        for (int j = 0; j <= lastWorkingIdx - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}
```

### Optimization

> If there were **no swaps** during a pass, it means the working subarray is **sorted**. So, we can stop processing

Thus, if the array is completely or nearly sorted, then we will need one or very few passes via this optimization

```cpp
void bubbleSort(int arr[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        // Inside (i+1)th pass
        int lastWorkingIdx = n - 1 - i;
        // To track whether swaps occured during this pass
        bool swapped = false;
        for (int j = 0; j <= lastWorkingIdx - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                swap(arr[j], arr[j + 1]);
                swapped = true; // Update flag
            }
        }
        if (!swapped)
        {
            // Sorted, so exit (no more passes needed)
            return;
        }
    }
}
```

## Algorithm Analysis

|   Metric   |              Value              | Remarks                                                  |
| :--------: | :-----------------------------: | -------------------------------------------------------- |
|  **Time**  | \\( O(n^2) \text{ to } O(n) \\) | Using flag optimises for nearly-sorted arrays (Adaptive) |
| **Space**  |          \\( O(1) \\)           | In-place sorting                                         |
| **Stable** |               ✅                | No swapping for similar adjacent elements                |
| **Online** |               ❌                | Needs entire input at once                               |

### Time Complexity

- Total \\( (n-1) \\) passes at most

- For each \\(i^{th}\\) element in array, we are traversing and comparing with next \\((n-i)\\) elements

- At most, there will be \\( (n-1) \\) comparisions in the first pass, \\( (n-2) \\) in the second and so on till only \\(1\\) comparison in the last pass and so on:

  \\( = (n-1) + (n-2) + ... + 2 + 1 = \frac{( n-1)(n)}{2} = O(n^2) \\) comparisons

- At most, a swap will occur at each comparison, so in total \\( = O(n^2) \\) swaps

- So, total time \\( = O(n^2) + O(n) = O(n^2) \\)

- In best case, the array is completely sorted. We will do one pass, with \\( (n-1) \\) comparisons, the flag will become true and then we'll exit. So \\( O(n) \\) time

|   Case    | Time Complexity | Occurs when             |
| :-------: | :-------------: | ----------------------- |
| **Best**  |  \\( O(n) \\)   | Sorted or nearly sorted |
| **Worst** | \\( O(n^2) \\)  | Reverse-sorted          |
|  **Avg**  | \\( O(n^2) \\)  | Unsorted                |

### Stability

**When similar elements are adjacent, there is no swapping**. And for larger or smaller elements, they would be placed away in respective sorted order. Thus, the relative order between similar elements is maintained and bubble-sort is **STABLE**
