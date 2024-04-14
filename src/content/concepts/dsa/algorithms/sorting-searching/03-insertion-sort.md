---
title: Insertion-sort
tags: [dsa, algorithm, sorting]
---

## Main idea

- Array divided into two parts: **Sorted (left)** and **Unsorted (right)**
- In each step, we pick one element from the unsorted part and place it in it's correct position in the sorted part by shifting elements to make space for that one element
- It's like picking a card from a deck of cards and placing it at it's correct position within the cards in your hand

## Pseudo-code

```txt
While unsorted part is not empty:

    Pick one (left-most) element from unsorted part

    In sorted part, shift all elements that are greater than picked element one place ahead

    Place the picked element in that gap created (after the right-most unmoved element)

    Update unsorted and sorted parts

```

## Code

```cpp title="C++"
void insertionSort(int arr[], int n)
{
    // Assume first element arr[0] as sorted part at beginning
    int sortedUptoIdx = 0;
    while (sortedUptoIdx != n - 1)
    {
        // Currently, sorted part is arr[0] to arr[i-1]
        // And the newly picked element is arr[i]
        int newEntry = arr[sortedUptoIdx + 1];
        // Start shifting from the end of sorted part
        int j = sortedUptoIdx;
        while (j >= 0 && arr[j] > newEntry)
        {
            // Shift one place ahead
            arr[j + 1] = arr[j];
            j--;
        }
        // At end of loop, j decrements and arr[j] is the unmoved element
        // Place picked element after it
        arr[j + 1] = newEntry;
        // Update sorted and unsorted parts
        sortedUptoIdx++;
    }
}
```

The inner loop (shifting of elements) can also be written as:

```cpp
{
    // ....
    int j;
    for (j = sortedUptoIdx; j >= 0 && arr[j] > newEntry; j--)
    {
        arr[j + 1] = arr[j];
    }
    // ....
}

```

## Algorithm Analysis

|   Metric   |              Value              | Remarks                                       |
| :--------: | :-----------------------------: | --------------------------------------------- |
|  **Time**  | \\( O(n^2) \text{ to } O(n) \\) | Depends on number of shifts needed (Adaptive) |
| **Space**  |          \\( O(1) \\)           | In-place sorting                              |
| **Stable** |               ✅                | Only shifting, no swaps                       |
| **Online** |               ✅                | Processes unsorted input part by part         |

### Time Complexity

|   Case    | Time Complexity |       Occurs when       |
| :-------: | :-------------: | :---------------------: |
| **Best**  |  \\( O(n) \\)   | Sorted or nearly sorted |
| **Worst** | \\( O(n^2) \\)  |     Reverse-sorted      |
|  **Avg**  | \\( O(n^2) \\)  |        Unsorted         |

Since we are shifting all greater elements one place ahead, the worst case would be when we have to shift all the elements in sorted part ahead (at each step), i.e. each incoming element would be smaller than all elements in sorted part. So, the **worst-case** would occur when the array is **reverse-sorted**. Calculating worst case time:

- Total \\( (n-1) \\) passes at most

- For each \\(i^{th}\\) pass, we would shift \\( i \\) elements

- At most, there will be \\( 1 \\) shifts in the first pass, \\( 2 \\) in the second and so on till \\( (n-1) \\) shifts in the last pass and so on:

  \\( = 1 + 2 + ... + (n-1) = \frac{( n-1)(n)}{2} = O(n^2) \\) shifts

- So, total time \\( = O(n^2) \\)

Conversely, the **best-case** would be when there is no shifting at all, which would occur when the array is **sorted**. So, we will do \\( (n-1) \\) passes, with no shifts at any pass. So \\( O(n) \\) time

### Stability

We are only shifting greater elements ahead at each step. Similar elements would be together shifted in similar direction in same oreder. As there is no swapping, the relative order between silimar elements is maintained and insertion-sort is **STABLE**

### Online nature

At each step, we are picking one element from the unsorted part and placing it at correct position in sorted part. So, we don't need to have the entire unsorted part given to us at once for the algorithm to work; we can process the input piece-by-piece. Thus, insertion-sort is an **ONLINE** algorithm

## Recursive Insertion-sort

```cpp title="C++"
// Picks one element from unsorted part and places it
// at correct position within the sorted part
void pickAndInsert(int arr[], int n, int sortedUptoIdx)
{
    // Base case
    if (sortedUptoIdx == n - 1)
    {
        return;
    }

    int newEntry = arr[sortedUptoIdx + 1];
    int j = sortedUptoIdx;
    while (j >= 0 && arr[j] > newEntry)
    {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = newEntry;

    // Next recursive call
    pickAndInsert(arr, n, sortedUptoIdx + 1);
}

void insertionSort(int arr[], int n)
{
    // Assume sorted part as first element at beginning
    int sortedUptoIdx = 0;
    pickAndInsert(arr, n, sortedUptoIdx);
}
```

- **Time**: Same as iterative i.e. \\( O(n^2) \\)
- **Space**: \\( O(n) \\) for all the recursive calls (which can be optimised by compiler as they're _tail-recursive_)

## Optimization

We can use **Binary-search to find the position of the newly picked element** in the sorted part. It would reduce the search time from \\( O(n) \\) to \\( O(logn) \\) ; but the shifting of elements would take \\( O(n) \\) regardless, making the overall time still remain as \\( O(n^2) \\)

## Insertion-sort for Linked-Lists vs Arrays

|       Operation       | Array                                                                                            | Linked-List                                                                                  |
| :-------------------: | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| **Shifting elements** | Since we have to shift each greater element ahead one-by-one, it can take upto \\( O(n) \\) time | Since we just have to modify two links, this operation takes \\( O(1) \\) time               |
|   **Searching gap**   | Using Binary-search in sorted subarray reduces the time to \\( O(logn) \\)                       | No random element access. We have to use linear-search which can take upto \\( O(n) \\) time |

Thus, both Arrays and Linked-Lists have intermediate operations in Insertion-sort that can take \\( O(n) \\) time in worst-case, making the overall worst-case time complexity as \\( O(n^2) \\) for both
