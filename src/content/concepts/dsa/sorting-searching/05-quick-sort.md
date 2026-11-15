---
title: Quick Sort
tags: [dsa, algorithm, sorting]
---

- [Main Idea](#main-idea)
- [Code](#code)
- [Algorithm Analysis](#algorithm-analysis)
  - [Time Complexity](#time-complexity)
  - [Space Complexity](#space-complexity)
  - [Stability](#stability)
  - [Further Improvements](#further-improvements)
- [Quick-Select](#quick-select)
  - [Analysis of Quick-Select](#analysis-of-quick-select)
    - [Time Complexity of Quick-Select](#time-complexity-of-quick-select)
    - [Space Complexity of Quick-Select](#space-complexity-of-quick-select)

## Main Idea

- It uses a recursive **Divide-and-Conquer** approach developed by Tony Hoare:
  - **Divide step**: **Partition** the current working subarray around a **pivot** element so elements **smaller** than the pivot sit to its **left** and elements **greater** than or equal to pivot sit to its **right**
  - **Conquer step**: Recursively sort the left and right partitions **independently** (no separate merge/combine step is needed because the pivot ends up in its final correct sorted position)
- The terminating **base-case** for recursion is when the current working subarray contains **at most one element** or if any **index is out-of-bounds**. We assume in that case that the subarray is sorted and stop partitioning
- The crucial step in this algorithm is of **partitioning current working subarray around the chosen pivot**

```txt title="PseudoCode"
Sorting working subarray () {
    If subarray has fewer than 2 elements:
        Assume it as sorted and EXIT to stop further recursive calls

    Partition array around a pivot element -> gives us partitioned pivot index 'p'

    Recursively sort part to the LEFT of pivot [low...(p-1)]
    Recursively sort part to the RIGHT of pivot [(p+1)...high]
}

Partitioning current working subarray () {
    Pick last element of current working subarray as pivot

    Start traversing current array from start till the place before pivot:
        When you find an element LESS than pivot:
            (new element less than pivot should go to the left of it)
            Increase left part's right-end boundary ahead by one
            Send current compared element to end of left part

    After traversal, we will have Left-part, then Right-part immediately next, with pivot after it
    Swap pivot with first element of Right-part so array becomes partitioned around pivot
    Return this partitioned pivot index as answer
}
```

## Code

> Picking **last** element of working subarray as pivot at each step is known as the [Lomuto partition scheme](https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme) but there are other schemes too like Hoare scheme or randomized pivot selection

```cpp title="Quick Sort"
int partition (const int low, const int high, vector<int> &arr) {
    // Assume pivot as last element of current working subarray
    int pivot = arr[high];
    // Points to last element in left part (the one just behind partition index)
    int leftNbrIdx = low - 1;
    // Points to current element being evaluated
    int currIdx = low;

    // Traverse working subarray (do NOT process last element at it is the pivot)
    while (currIdx < high) {         // we only go till (high-1) index
        if (arr[currIdx] < pivot) {  // Current element is smaller than pivot
            // Current element should go in the part to the left of pivot
            leftNbrIdx++;                         // Shift left part ahead by one
            swap(arr[leftNbrIdx], arr[currIdx]);  // Place current element in updated left part
        }
        currIdx++;  // Move ahead to compare next element with pivot
    }

    // Now, we have the Left and Right parts as contiguous (adjacent) and then pivot element after it:
    // Left-part (elements LESS than pivot) spans indices [low...leftNbrIdx]
    // Right-part (elements EQUAL to or GREATER than pivot) spans indices [leftNbrIdx+1...high-1]
    int partitionIdx = leftNbrIdx + 1;

    // Swap pivot element at index [high] with the first element of Right part at index [leftNbrIdx+1]
    swap(arr[partitionIdx], arr[high]);

    // Now pivot has been placed at its correct sorted position in the working subarray
    return partitionIdx;  // return partitioned pivot's index
}

void sortSubarray (const int low, const int high, vector<int> &arr) {
    if (low >= high) {  // Base-case: ONE element subarray or index out-of-bounds
        return;         // Assume as sorted and stop further partition calls
    }

    // Partition current working subarray around a pivot element chosen from it
    int partitionIdx = partition(low, high, arr);

    // Now that pivot element has been placed at its correct sorted position
    // Make recursive calls to sort the remaining Left and Right parts around pivot independently
    sortSubarray(low, partitionIdx - 1, arr);
    sortSubarray(partitionIdx + 1, high, arr);
}

void quickSort (vector<int> &arr) {
    if (arr.size() <= 1) {  // Trivial case: empty or single-element arrays
        return;             // Assume as sorted and return as-is
    }
    // First initial call to sort subarray as the entire input array
    int low = 0, high = arr.size() - 1;
    sortSubarray(low, high, arr);
}
```

## Algorithm Analysis

|   Metric   |                  Value                   | Remarks                                                     |
| :--------: | :--------------------------------------: | ----------------------------------------------------------- |
|  **Time**  | $O(n \cdot logn)$ avg. to $O(n^2)$ worst | Depends on pivot's partitions (Not exactly Adaptive either) |
| **Space**  |      $O(logn)$ avg. to $O(n)$ worst      | In-place sorting, but recursion uses call stack memory      |
| **Stable** |                  No ❌                   | NOT Stable by default                                       |
| **Online** |                  No ❌                   | Needs entire input at once                                  |

### Time Complexity

|   Case    |  Time Complexity   | Occurs when                                |
| :-------: | :----------------: | ------------------------------------------ |
| **Best**  | $O(n \cdot log n)$ | Balanced Partitioning                      |
| **Worst** |      $O(n^2)$      | Unbalanced partitioning                    |
|  **Avg**  | $O(n \cdot log n)$ | Uniformly random input or randomized pivot |

```cpp
int partition(int low, int high, int arr[]) {
    // Traverse array to find partition index       // Theta(n)
}

void sortSubarray(int low, int high, int arr[]) {   // T(n)
    // Base case check                              // O(1)

    int p = partition(low, high, arr);              // Theta(n)

    quickSort(arr,  low,  p - 1 );                  // T(x)
    quickSort(arr, p + 1, high  );                  // T(n-1-x)
}
```

Let $x$ be the number of elements placed in the left partition (strictly smaller than the pivot). Excluding the pivot itself, the remaining elements across both subproblems total $(n - 1)$. So, time taken can be represented by recurrence relation:

$$
\boxed{
    T(n) = T(x) + T(n-1-x) + \Theta(n)
}
$$

The cases for running time of Quick-sort are:

1. <u><b>Best Case</b></u>: Pivot is **median** at each partition for **Balanced partitioning**

   When the chosen pivot is **median** of working subarray at each step, the working subarray gets partitioned into **equal parts** for next recursive calls with the pivot placed at exact middle of current subarray. The next two recursive calls will have equal depth and the binary tree of recursive function calls will be a **balanced tree**. Mathematically:

   $$
   x \approx (n-1-x) \implies x \approx \frac{n}{2}
   $$

   And so, the recurrence relation becomes similar to that of [Merge Sort](/code-journal/dsa/dsa/sorting-searching/04-merge-sort):

   $$
   T(n) = 2 \cdot T \Bigl(\frac{n}{2}\Bigr) + \Theta(n)
   $$

   By **Case (2a)** of [Master Theorem for evaluating Dividing functions](/code-journal/dsa/dsa/recursion/4-recurrence-master-thm#master-theorem-for-evaluating-dividing-functions), it comes out to be:

   $$
   \boxed{
       T(n) = O(n \cdot log_2 n)
   }
   $$

2. <u><b>Worst Case</b></u>: Pivot's placed at **either end** of current array, causing **Unbalanced partitioning**

   We're taking the last element of working subarray as pivot. Now, if the input array given to us is **sorted or reverse-sorted**, the pivot's sorted position at each step would be at **either end of working subarray**. The partitioned subarray's sizes would be an **empty** subarray and the other subarray containing all elements excluding pivot. The tree of recursion calls in this unbalanced partitioning would be a **skewed tree** like a linked-list. Mathematically, one of the two terms will be empty, and the other one would take up all of remaining work:

   $$
   T(n) = T(0) + T(n-1) + \Theta(n)
   $$

   $$
   \therefore \space T(n) = T(n-1) + \Theta(n)
   $$

   By **Case (2)** of [Master Theorem for evaluating Decreasing functions](/code-journal/dsa/dsa/recursion/4-recurrence-master-thm#master-theorem-for-evaluating-decreasing-functions), it comes out to be:

   $$
   \boxed{
       T(n) = O(n^2)
   }
   $$

3. <u><b>Average Case</b></u>:

   See [proof from Wikipedia](https://en.wikipedia.org/wiki/Quicksort#Using_recurrences) to know how we get the average case performance of quick-sort as:

   $$
   T(n) = 2n \cdot log_e(n) \approx (1.39) \cdot \Bigl(n \cdot log_2 (n) \Bigr)
   $$

   $$
   \therefore \space \boxed{
       T(n) = O(n \cdot \log n)
   }
   $$

   This means that, on average, quicksort performs only about $39\%$ worse than in its best case. In this sense, it is **closer to the best case** than the worst case

### Space Complexity

No extra space required for any temporary arrays i.e. **in-place** sorting. However, the recursive calls in quick-sort use call-stack memory:

- **Best case (balanced partitions)**: The next recursive calls after partitioning are balanced with max tree depth as $O(logn)$
- **Worst case (skewed partitions)**: The next recursive calls after partitioning are unbalanced like a linked-list with max tree depth reaching $O(n)$

You can bound worst-case stack space to $O(logn)$ even on skewed partitions by **recursing** on the **smaller** partition and **looping** on the **larger** one (bounded tail-call elimination):

```cpp
void sortSubarray(int low, int high, vector<int> &arr) {
    while (low < high) {
        int p = partition(arr, low, high);
        int leftPartSize = (p - low), rightPartSize = (high - p);

        // Recurse on the smaller part first so stack depth never exceeds O(log n)
        if (leftPartSize < rightPartSize) {
            sortSubarray(low, p - 1, arr);
            low = p + 1;
        } else {
            sortSubarray(p + 1, high, arr);
            high = p - 1;
        }
    }
}
```

### Stability

Because `partition()` only moves elements **strictly less than** pivot `(arr[currIdx] < pivot)` into the left region and then swaps `arr[high]` i.e. pivot with `arr[partitionIdx]`, **equal elements** can have their **relative order reversed**, making standard quick-sort as **NOT STABLE**.

To preserve stability, you either need extra space/metadata (such as attaching original **indices** or using extra buffers) or a specialized approach. For example, if each item stores `{val, index}`:

```cpp
// Assuming each element has {val,index} to break ties by original order
if (arr[j].val < pivot ||
    (arr[j].val == pivot && arr[j].index < arr[high].index)) {
    i++;
    swap(arr[i], arr[j]);
}
```

### Further Improvements

**Many duplicate values** are a classic hidden trap in standard two-way quick-sort. If an array has lots of duplicates (or all identical elements) and partitions don't isolate equal keys, recursion can still degrade toward $O(n^2)$ comparisons/swaps instead of staying near $\Theta(n \cdot logn)$.

- **Avoiding $O(n^2)$ on sorted inputs**: Picking a random element, using **median-of-three** (median of first, middle, and last elements), or shuffling first makes worst-case triggers rare in practice.
- **3-way partitioning (Dutch National Flag)**: Helpful when arrays contain many duplicate keys, grouping `< pivot`, `== pivot`, and `> pivot` together.
- **Hoare vs Lomuto partitioning**: Lomuto partition scheme is easy to read and always places chosen pivot at its sorted position, while Hoare's two-pointer scheme is a bit unintuitive but typically performs fewer swaps on average.
- **Hybridization & Introsort**: Standard library implementations like C++ STL's `std::sort` rarely use pure quick-sort alone:
  - **Insertion Sort cutoff**: For small subarrays (typically $n \le 16$), switching to insertion-sort avoids recursive call overhead and runs faster due to cache locality.
  - **Introsort (Introspective Sort)**: Starts with Quick Sort, switches to **heap-sort** if recursion depth exceeds $2\cdot\lfloor log_2 n \rfloor$, guaranteeing $O(n \log n)$ worst-case time, and finishes small partitions with insertion-sort.

**Further reading**:

- [Hoare's vs Lomuto partition scheme in QuickSort - GFG](https://www.geeksforgeeks.org/dsa/hoares-vs-lomuto-partition-scheme-quicksort/)
- [3-Way Partition QuickSort (Dutch National Flag) - GFG](https://www.geeksforgeeks.org/dsa/3-way-quicksort-dutch-national-flag/)
- [IntroSort - GFG](https://www.geeksforgeeks.org/dsa/introsort-or-introspective-sort/)
- [Multi-threaded Quick Sort](https://www.geeksforgeeks.org/dsa/quick-sort-using-multi-threading/)

---

## Quick-Select

Quick-Select, also known as Hoare's selection algorithm, is a direct adaptation of quick-sort used to find the [$k^\text{th}$ order statistic](https://en.wikipedia.org/wiki/Order_statistic) i.e. the $k^\text{th}$ smallest element (or $k^\text{th}$ largest) from an array of **unsorted elements** without fully sorting it.

In Quick Sort, after `partition()` places the pivot at its final sorted index `p`, we recursively process **both** sides. In Quick-Select however, we compare `p` with our target index and **discard the half that cannot contain our answer**

Before starting our search, we convert the $k^\text{th}$ order element requirement, which is 1-indexed, into a 0-indexed **target position** `targetIdx` in sorted order. So, given an unsorted array of $n$ elements, the index of elements would be from $[0]$ to $[n-1]$. Thereby, if the array were sorted in non-decreasing order, the index of $k^\text{th}$ **smallest** element would be at index $[k-1]$ and of $k^\text{th}$ **largest** element at index $[n-k]$

The procedure of Quick-Select algorithm to find $k^\text{th}$ largest element is:

```txt title="PseudoCode"
QuickSelect(arr[], k) {
    Set "targetIdx" to search for i.e. (n-k) here
    Initially working subarray is the entire input array
    Keep going until working subarray is not empty:
        Pick pivot and partition current subarray around it -> gives 'p' partition index
        if targetIdx EQUALS p: k-th largest FOUND so EXIT
        if targetIdx < p: partition over the the left part i.e. [low...p-1]
        if targetIdx > p: partition over the the right part i.e. [p+1...high]
}
```

Because we only recurse into **one** partitioned side at each step i.e. **tail-recursion**, we can implement it **iteratively** with $O(1)$ extra space on call-stack.

```cpp title="Quick Select for K-th Largest element"
int partition (const int low, const int high, vector<int> &arr) {
    /* same as before */
}

// Function to find k-th LARGEST element from an Unsorted array
int quickSelect (vector<int> &arr, const int k) {
    const int n = arr.size();
    if (k < 1 || k > n) return INT_MIN;  // Invalid 'k' value

    // Set index of k-th largest element in sorted array (0-indexed) to look for
    const int targetIdx = (n - k);

    int low = 0, high = n - 1;  // initially working subarray is entire input array
    while (low <= high) {       // Continue till working subarray isn't empty
        // Partition current working subarray around pivot chosen from it
        int partitionIdx = partition(low, high, arr);
        // Compare partitionIdx with required targetIdx
        if (targetIdx == partitionIdx) {  // Target index same as currently partitioned pivot
            return arr[partitionIdx];     // return element at this index as k-th largest
        }
        if (targetIdx < partitionIdx) {  // Target index lies in part to LEFT of pivot
            high = partitionIdx - 1;     // Shrink working subarray to LEFT part BEFORE pivot
        } else {                         // Target index lies in part to RIGHT of pivot
            low = partitionIdx + 1;      // Shrink working subarray to RIGHT part AFTER pivot
        }
    }
    return INT_MIN;  // Unreachable when provided 'k' is valid
}
```

<details>
<summary>See recursive implementation of Quick-Select too</summary>

```cpp title="Recursive Quick-Select for K-th largest"
int partition (const int low, const int high, vector<int> &arr) {
    /* same as before */
}

int quickSelect (const int low, const int high, const int targetIdx, vector<int> &arr) {
    if (low > high) {  // Working subarray is empty (unreachable for valid targetIdx)
        return INT_MIN;
    }
    // Partition current working subarray around pivot chosen from it
    int partitionIdx = partition(low, high, arr);
    if (partitionIdx == targetIdx) {  // Found the target k-th largest element
        return arr[partitionIdx];
    }
    if (targetIdx < partitionIdx) {  // Target lies in the LEFT partition
        return quickSelect(low, partitionIdx - 1, targetIdx, arr);
    }
    // Target lies in the RIGHT partition
    return quickSelect(partitionIdx + 1, high, targetIdx, arr);
}

int findKthLargest (vector<int> &arr, const int k) {
    const int n = arr.size();
    if (k < 1 || k > n) return INT_MIN; // invalid 'k' value

    // Convert k-th largest into its equivalent 0-based sorted index
    const int targetIdx = (n - k);
    int low = 0, high = n - 1;
    return quickSelect(low, high, targetIdx, arr);
}
```

</details>

### Analysis of Quick-Select

|    Metric    |                  Value                   | Remarks                                             |
| :----------: | :--------------------------------------: | --------------------------------------------------- |
|   **Time**   |      $O(n)$ avg. to $O(n^2)$ worst       | Processes only **one** part after each partitioning |
|  **Space**   | $O(1)$ iterative and $O(logn)$ recursive | Iterative loop avoids call-stack overhead           |
| **In-Place** |                  Yes ✅                  | **Modifies** the input array directly in-place      |

#### Time Complexity of Quick-Select

```cpp
int quickSelect(vector<int> &arr, int k) {          // T(n)
    while (low <= high) {
        int p = partition(low, high, arr);          // Theta(n)

        // Only ONE of these two branches executes:
        // Left branch:                             // T(x),  where x = (p - low)
        // Right branch:                            // T(n - 1 - x)
    }
}
```

Unlike Quick Sort which makes two recursive calls doing the work $T(x) + T(n - 1 - x)$, Quick-Select discards one partition completely and only continues on one side. Let $x$ be the size of the chosen partition; the general recurrence is:

$$
\boxed{
    T(n) = T(x) + \Theta(n)
}
$$

- **Best Case**: Pivot lands directly on `targetIdx` on the very first partition

  In the absolute best case, the very first `partition()` call places the pivot at `targetIdx`, terminating immediately after a single linear scan of the array:

  $$
  \boxed{
      T(n) = \Theta(n)
  }
  $$

- **Average Case**: **Balanced partitioning** cuts the search space in **half** each step

  When partitions are reasonably balanced (like via randomized pivot selection), each step reduces the remaining subarray size by roughly half ($x \approx \frac{n}{2}$) so:

  $$
  T(n) = T\Bigl(\frac{n}{2}\Bigr) + \Theta(n)
  $$

  Expanding the recurrence gives a decreasing geometric series:

  $$
  T(n) = c \cdot n + c \cdot \frac{n}{2} + c \cdot \frac{n}{4} + c \cdot \frac{n}{8} + \dots = c \cdot n \sum_{i=0}^{\log_2 n} \frac{1}{2^i} < 2cn
  $$

  By Case (3) of the [Master Theorem for evaluating Dividing functions](/code-journal/dsa/dsa/recursion/4-recurrence-master-thm#master-theorem-for-evaluating-dividing-functions),

  $$
  a = 1, \quad b = 2, \quad f(n) = \Theta(n) \implies n^{\log_2 1} = n^0 = 1
  $$

  so $f(n)$ dominates at the root

  $$
  \therefore \space \boxed{
      T(n) = \Theta(n)
  }
  $$

  **Intuition**: Quick Sort does $\Theta(n)$ work at every level across all branches while Quick-Select halves the total remaining work at every step, so the sum of work across all steps converges to **at most** $2n$

- **Worst Case**: Pivot consistently lands at either **extreme end**

  If the chosen pivot is always the minimum or maximum element (for instance, deterministic last-element pivot on a sorted array when searching for the smallest element), the **subarray shrinks by only one element per iteration** $(x = n - 1)$:

  $$
  T(n) = T(n - 1) + \Theta(n)
  $$

  Expanding the recurrence yields an arithmetic series:

  $$
  T(n) = c \cdot n + c \cdot (n - 1) + c \cdot (n - 2) + \dots + c \cdot (1) = c \cdot \frac{n(n + 1)}{2}
  $$

  $$
  \therefore \space \boxed{
      T(n) = O(n^2)
  }
  $$

#### Space Complexity of Quick-Select

- **Iterative Implementation**: Uses only a fixed number of index variables and mutates `arr[]` in-place, achieving $O(1)$ extra space
- **Recursive Implementation**: Since Quick-Select is **tail-recursive** (at most one recursive call per frame), a compiler without tail-call optimization uses $O(logn)$ call-stack space on average and $O(n)$ in the worst case while enabling the tail-call optimization converts it into the iterative version
