---
title: Insertion Sort
tags: [dsa, algorithm, sorting]
---

<figure>
    <img alt="Insertion Sort illustration" height="350px" src="https://i0.wp.com/studyalgorithms.com/wp-content/uploads/2014/01/insertion_srot.jpg?ssl=1">
  <figcaption>
    Source : <a href="https://studyalgorithms.com/array/insertion-sort/">Study Algorithms</a>
  </figcaption>
</figure>

## Main idea

- Array divided into two parts: **Sorted (left)** and **Unsorted (right)**
- In each step, we **pick** the leftmost element from the unsorted part and place it in it's correct position in the sorted part by **shifting** larger elements one position to the right
- It's like picking a new card from a deck and inserting it at its correct position among the cards already in your hand.

```txt title="PseudoCode"
Assume first element as the Sorted part and all elements after it as the Unsorted part
While Unsorted part is not empty:
    Pick the first element from Unsorted part
    In Sorted part, SHIFT all elements that are GREATER than picked element one place AHEAD
    Place the picked element in that GAP created (immediately after the last unshifted element in Sorted part)
    Update boundaries. Sorted part grows and Unsorted parts shrinks by one element
```

## Code

```cpp title="Insertion Sort"
void insertionSort (vector<int> &arr) {
    const int n = arr.size();
    // Assume first element arr[0] as Sorted part at beginning
    // Iterate by picking one element (first) from the Unsorted part and process it
    for (int pickIdx = 1; pickIdx < n; pickIdx++) {
        // At this pass, Sorted part is from index 0 to (pickIdx-1)
        // and Unsorted part is from "pickIdx" till end of array

        // First entry from Unsorted part PICKED to be processed
        int pickedEntry = arr[pickIdx];

        // Stores index of the rightmost unshifted element less than or equal to the picked element
        // This would become left-side neighbor of new entry when it is placed it at correct sorted position
        int leftNbrIdx = pickIdx - 1;

        // SHIFT elements of Sorted part that are GREATER than key one step AHEAD
        while (leftNbrIdx >= 0 && arr[leftNbrIdx] > pickedEntry) {  // bounds-check before accessing index
            arr[leftNbrIdx + 1] = arr[leftNbrIdx];
            leftNbrIdx--;
        }
        // All elements from '0' to 'leftNbrIdx' were NOT shifted. The currently picked entry's
        // correct sorted position is right AFTER this last-unshifted index. So place it there
        arr[leftNbrIdx + 1] = pickedEntry;

        // At end of this pass, array is Sorted from index '0' to 'pickIdx'
    }
}
```

<details>
<summary>Some other ways to write above function are shown here</summary>

```cpp title="Using while as outer loop"
void insertionSort (vector<int> &arr) {
    const int n = arr.size();
    // Assume first element arr[0] as sorted part at beginning
    int sortedUptoIdx = 0;
    while (sortedUptoIdx != n - 1) {
        // Currently, Sorted part is from index '0' till 'sortedUptoIdx'
        // Everything after 'sortedUptoIdx' index is the Unsorted part

        // We pick first entry of Unsorted part to be processed
        int newEntry = arr[sortedUptoIdx + 1];

        // Shift elements greater than newEntry one step AHEAD
        int leftNbrIdx = sortedUptoIdx;
        while (leftNbrIdx >= 0 && arr[leftNbrIdx] > newEntry) {  // bounds-check before accessing decremented index
            arr[leftNbrIdx + 1] = arr[leftNbrIdx];
            leftNbrIdx--;
        }

        // At end of loop, arr[leftNbrIdx] is the last unshifted element
        // Place picked element after it as this is its corrected sorted position
        arr[leftNbrIdx + 1] = newEntry;

        // Mark Sorted part as one extra element
        sortedUptoIdx++;
    }
}
```

The inner loop (shifting of elements) can also be written as:

```cpp
int leftNbrIdx;
for (leftNbrIdx = sortedUptoIdx; (leftNbrIdx >= 0 && arr[leftNbrIdx] > newEntry); leftNbrIdx--) {
    arr[leftNbrIdx + 1] = arr[leftNbrIdx];
}
```

</details>

## Algorithm Analysis

|   Metric   |          Value          | Remarks                                        |
| :--------: | :---------------------: | ---------------------------------------------- |
|  **Time**  | $O(n^2)$ to $\Omega(n)$ | Depends on number of shifts needed (Adaptive)  |
| **Space**  |         $O(1)$          | In-place sorting                               |
| **Stable** |         Yes ✅          | Only shifting greater elements ahead, no swaps |
| **Online** |         Yes ✅          | Processes unsorted input part by part          |

### Time Complexity

|   Case    | Time Complexity | Occurs when input array is             |
| :-------: | :-------------: | -------------------------------------- |
| **Best**  |     $O(n)$      | Already Sorted                         |
| **Worst** |    $O(n^2)$     | Reverse-Sorted i.e. Decreasing ordered |
|  **Avg**  |    $O(n^2)$     | Random or generally unsorted           |

Since we are shifting all greater elements one place ahead, the worst case would be when we have to shift all the elements in sorted part ahead (at each step), i.e. each incoming element would be smaller than all elements in sorted part. So, the **worst-case** would occur when the array is **reverse-sorted**. For reverse-sorted input, every newly picked element is smaller than all the elements in the sorted part; so every element in sorted part needs to be shifted and this would happen for each new pick. Calculating the worst case time complexity:

- Total $(n-1)$ passes
- In worst case, we shift $1$ element during first pass, $2$ elements during the second passs, and so on, until the last pass where we shift all remaining $(n-1)$ elements. Thereby, the total shifts done are:

  **Total Shifts** $= 1 + 2 + \cdots + (n-1) = \dfrac{(n-1)n}{2} \implies O(n^2)$

- In addition, we perform **comparisons** to determine which elements need shifting. In worst case, these are comparisons are also $O(n^2)$

- Thereby, **total time** $= O(n^2) + O(n^2) \implies O(n^2)$

Conversely, the **best-case** of Insertion Sort would occur when there is no shifting done at all, which would be when the input array is **sorted**. We will do $(n-1)$ passes, where no shifts happen at any pass as the last element of sorted part would not be greater than picked element (we would never inter the inner `while` block). So best-case time would be $O(n)$

### Stability

We only shift elements for values that are strictly greater than current picked element i.e. `arr[leftNbrIdx] > pickedEntry`. Equal elements are never shifted past one another and thus, their relative order is preserved. So, Insertion Sort **is Stable**.

### Online nature

At each step, we are picking one element from the unsorted part and placing it at correct position in sorted part. So, we don't need to have the entire unsorted part given to us at once for the algorithm to work; we can **process the input piece-by-piece** as new elements come. Thus, Insertion Sort is an [**Online algorithm**](https://en.wikipedia.org/wiki/Online_algorithm)

### Binary Search optimization

We could use **Binary search** to find the position of the newly picked element in the sorted part. To preserve stability, the insertion position must be after existing elements equal to the picked element (equivalent to `upper_bound`), rather than before them. This optimization reduces the number of comparisons, but it does not eliminate the cost of shifting elements. It would reduce the search time from $O(n)$ to $O(logn)$. However, the shifting of elements would still take $O(n)$ in worst case, making the overall time still come to $O(n^2)$

## Recursive Insertion Sort

We wrap the work of the inner nested loop into a recursive helper function `pickFromUnsorted` that takes the currently picked entry's index as argument and then processes it. The terminating base-case happens when we have gone beyond end of array. The next recursive call is made at the end when prior call has fully finished processing current pick, i.e. there is _tail-recursion_ pattern of recursive calls.

- **Time**: Same as iterative i.e. $O(n^2)$
- **Space**: $O(n)$ for all the recursive calls, which _could_ be optimized by the compiler as they're tail-recursive

```cpp title="Recursive Insertion Sort"
// Picks given index element from Unsorted part and places it into its correct sorted position
void pickFromUnsorted (int pickIdx, vector<int> &arr) {
    // Terminating Base-case: Index reached beyond array bounds
    if (pickIdx >= arr.size()) {  // No more elements left in Unsorted part
        return;                   // All elements before are in sorted state. So exit
    }

    // Sorted part is from index 0 to (pickIdx-1) and Unsorted part from "pickIdx" till end

    // First entry from Unsorted part PICKED to be processed
    int pickedEntry = arr[pickIdx];

    // Stores index of the first element less than or equal to the picked element
    int leftNbrIdx = pickIdx - 1;

    // SHIFT elements of Sorted part that are GREATER than key one step AHEAD
    while (leftNbrIdx >= 0 && arr[leftNbrIdx] > pickedEntry) {  // bounds-check before accessing index
        arr[leftNbrIdx + 1] = arr[leftNbrIdx];
        leftNbrIdx--;
    }
    // All elements from '0' to 'leftNbrIdx' were NOT shifted. The currently picked entry's
    // correct sorted position is right AFTER this last-unshifted index. So place it there
    arr[leftNbrIdx + 1] = pickedEntry;

    // Now array is Sorted from index '0' to 'pickIdx'
    // Make recursive call to pick next element from Unsorted part
    pickFromUnsorted(pickIdx + 1, arr);
}

void insertionSort (vector<int> &arr) {
    if (arr.size() <= 1) return;  // no sorting needed. return as-is

    // Assume Sorted part as first element arr[0] at beginning
    // Initial recursive call is to start from second element of array
    // as the first picked entry from Unsorted part
    pickFromUnsorted(1, arr);
}
```

## Insertion Sort for Linked-Lists vs Arrays

|        Operation        | Array                                                                    | Linked List                                                                                   |
| :---------------------: | :----------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
|  **Shifting elements**  | Shifting greater elements one position ahead can take up to $O(n)$ time. | Once the insertion position is found, we can insert a node by modifying links in $O(1)$ time. |
| **Searching Gap index** | Binary Search can find the insertion position in $O(logn)$ time.         | No random access; we need linear traversal, which can take up to $O(n)$ time.                 |

- **Array**: Even with Binary Search, shifting elements can take $O(n)$ time per insertion, making the overall worst-case time as $O(n^2)$
- **Linked List**: Insertion itself takes $O(1)$ once the position is found, but finding that position can take $O(n)$ per insertion. Hence, the overall worst-case time is also $O(n^2)$

Thus, both Arrays and Linked-Lists have intermediate operations in Insertion-sort that can take $ O(n) $ time in worst-case, making the overall worst-case time complexity as $ O(n^2) $ for both
