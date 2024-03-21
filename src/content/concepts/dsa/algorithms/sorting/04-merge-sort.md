---
title: Merge-sort
tags: [dsa, algorithm, sorting]
---

## Main idea

- It uses a recursive **Divide-and-Conquer** approach
  - Divide step: **Split** the array into **two halves**
  - Conquer step: **Merge** the two **sorted subarrays**
- The terminating **base case** for recursion is when the subarray contains **only one element**. We can assume then that the subarray is sorted and stop splitting
- The crucial step in the algorithm is of **merging two sorted subarrays into a combined one**

## Pseudo-code

```txt
Sorting working array:

    Keep recursively splitting current array into two halves (till only one element present)

    Merge the two sorted halves
```

```txt
Merging two sorted halves:

    Create new temporary array to accomodate the merged result of two halves

    Begin comparing from the start of both halves:

        Whichever is smaller insert, append it into the temporary array and update positions ahead

    Copy the elements fron the temporary array into original array's postions
    Delete the temporary array
```

## Code

```cpp title="C++"
// Merges the two adjacent sorted halves
// First subarray: arr[0] to arr[mid]
// Second subarray: arr[mid+1] to arr[high]
void merge(int arr[], int low, int mid, int high)
{
    int left = low;      // Tracks index in first subarray
    int right = mid + 1; // Tracks index in second subarray
    int k = 0;           // Tracks index in merged subarray (where next picked element goes)

    // Create temporary array to accomodate the merged result
    int *temp = new int[high - low + 1];

    // Bounds-checking when moving the index pointers
    while (left <= mid && right <= high)
    {
        if (arr[left] <= arr[right])
        {
            // Pick from first subarray and update indices
            temp[k++] = arr[left++];
        }
        else
        {
            // Pick from second subarray and update indices
            temp[k++] = arr[right++];
        }
    }

    // Copy remaining elements (elements could remain in either one of the subarrays)
    while (left <= mid)
    {
        temp[k++] = arr[left++];
    }
    while (right <= high)
    {
        // NOTE: Not writing this particular loop also works
        temp[k++] = arr[right++];
    }

    // After coming out of loop, the incremented k is
    // one more than last index of merged, so (i < k) in below loop

    // Copy sorted elements of temporary array into original array
    for (int i = 0; i < k; i++)
    {
        arr[low + i] = temp[i];
    }
    // De-allocate space used for temporary array
    delete[] temp;
}

void mergeSort(int arr[], int low, int high)
{
    // Current input: arr[low] to arr[high]

    // Terminating base case: Only ONE (or none) element in current array
    if (low >= high)
    {
        return;
    }

    int mid = (low + high) / 2;

    // Split work over two equal subarray halves
    mergeSort(arr, low, mid);
    mergeSort(arr, mid + 1, high);

    // Merge the two sorted halves
    merge(arr, low, mid, high);
}
```

- Each of the **subarray halves** made are **adjacent** to each other
- Not writing that third `while` loop works as the remaining elements in right half subarray can be kept untouched. We are copying them at the end in `temp[]` and then copying them back into the ending elements in `arr[]`, which is redundant.

## Algorithm Analysis

|   Metric   |          Value          | Remarks                                                  |
| :--------: | :---------------------: | -------------------------------------------------------- |
|  **Time**  | \\( O(n \cdot logn) \\) | Same work done in ALL cases (NOT Adaptive)               |
| **Space**  |      \\( O(n) \\)       | For temporary array and call stack                       |
| **Stable** |           ✅            | For equal elements, left subarray's element picked first |
| **Online** |           ❌            | Needs entire input at once                               |

### Time Complexity

```cpp
void merge(int arr[], int low, int mid, int high)
{
    // Place elements one-by-one from the two arrays into temp[] -> (n)
    // Copy temp[] into arr[]                                    -> (n)
}

void mergeSort(int arr[], int low, int high)        // T(n)
{
    // Base case check and finding mid              // (1)

    mergeSort(arr, low, mid);                       // T(n/2)
    mergeSort(arr, mid + 1, high);                  // T(n/2)

    merge(arr, low, mid, high);                     // 2n
}
```

Thus, the recurrence relation is: (note that the **work at each step is being split equally** over two halves)

\\[ T(n) = 2 \cdot T \left(\frac{n}{2}\right) + \Theta(n) \\]

It comes under **Case (2a)** of [Master Theorem for dividing functions](/code-journal/dsa/dsa/recurrence-master-thm#master-theorem-for-evaluating-dividing-functions)

On solving, we get the time complexity as:

\\[ T(n) = \Theta(n \cdot log_2 n ) \\]

This time complexity is same for ALL cases i.e. the same amount of work is done for ALL cases

### Space Complexity

- We use extra space to store the **temporary array**. The `temp[]` array will contain at most \\( n \\) elements when we are merging two subarrays of size \\( (n/2) \\) each; occuring at the topmost call in recursion tree
- Also, recursion uses call stack memory. As the work is being **split over equal halves** at each step, the recursion trace would be a **balanced binary tree** and it's height would be \\( log_2 n \\), signifying the max depth of recursion calls at any time
- So, total space \\( = O(n) + O(log_2 n) = O(n) \\)

### Stability

```cpp
while (left <= mid && right <= high)
{
    if (arr[left] <= arr[right])
        temp[k++] = arr[left++];
    else
        temp[k++] = arr[right++];
}
```

Note that **for similar value elements, we are picking the ones in left half first**, and then the ones in right half. So the relative orderin is maintained between similar elements during `merge` function and merge-sort is **STABLE**

## Applications of Merge Sort

1. **External sorting**: When the input is too large to fit into memmory, it can be sorted in chunks and those chunks can be merged later
1. **Sorting Linked Lists**: Merge-sort is suited for linked lists as there is no need to create an extra \\( O(n) \\) sized array and ths time taken \\( \Theta(n \cdot logn ) \\)
1. To find Inversion Count
