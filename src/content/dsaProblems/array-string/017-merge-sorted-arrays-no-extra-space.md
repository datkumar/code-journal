---
title: Merge Two Sorted Arrays in O(1) Space
ds: [array]
techniques: [sorting]
level: 2
links:
  [https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1]
---

**Contents**:

- [Problem Statement](#problem-statement)
- [Using Extra Space](#using-extra-space)
- [Brute-force](#brute-force)
- [Separate elements then Sort](#separate-elements-then-sort)
- [Gap method](#gap-method)
  - [Procedure for Gap method](#procedure-for-gap-method)
  - [Time Complexity for Gap method](#time-complexity-for-gap-method)

## Problem Statement

Given two sorted arrays `arr[]` and `brr[]` of sizes `n` and `m` respectively, the task is to merge them in sorted order **without using any extra space**. Modify `arr[]` so that it contains the **first** `n` elements and modify `brr[]` so that it contains the **last** `m` elements.

```txt title="Examples"
Input: arr[] = [2, 4, 7, 10], brr[] = [2, 3]
Output: arr[] = [2, 2, 3, 4], brr[] = [7, 10]
Explanation: After merging the two non-decreasing arrays, we get, [2, 2, 3, 4, 7, 10]

Input: arr[] = [1, 5, 9, 10, 15, 20], brr[] = [2, 3, 8, 13]
Output: arr[] = [1, 2, 3, 5, 8, 9], brr[] = [10, 13, 15, 20]
Explanation: After merging two sorted arrays we get [1, 2, 3, 5, 8, 9, 10, 13, 15, 20].

Input: arr[] = [0, 1], brr[] = [2, 3]
Output: arr[] = [0, 1], brr[] = [2, 3]
Explanation: After merging two sorted arrays we get [0, 1, 2, 3].
```

## Using Extra Space

If we _were_ using **extra space**, the problem would become an easy one where we would use the same procedure as we did in [Merge Sort](/code-journal/dsa/dsa/sorting-searching/04-merge-sort) where we create a new array of size equal to the combined size of both arrays and then one-by-one start inserting elements into it.

This method uses $O(n+m)$ space even though it takes just $O(n+m)$ time. However, we are **violating the conditions** saying we were not allowed to use any extra space and must do it in $O(1)$ space

```cpp title="Merging via Extra Space"
void merge (int arr[], int brr[], const int n, const int m) {
    int* combined = new int[n + m];
    int left = 0, right = 0, combinedIdx = 0;

    while (left < n && right < m) {
        if (arr[left] <= brr[right]) {
            combined[combinedIdx++] = arr[left++];
        } else {
            combined[combinedIdx++] = brr[right++];
        }
    }
    while (left < n) combined[combinedIdx++] = arr[left++];
    while (right < m) combined[combinedIdx++] = arr[right++];

    // Copy combined-sorted result back into first array till filled, then into second array
    for (int i = 0; i < n + m; i++) {
        if (i < n) {
            arr[i] = combined[i];
        } else {
            brr[i - n] = combined[i];
        }
    }
    delete[] combined;
}
int main () {
    int arr[] = {1, 5, 9, 10, 15, 20};
    int brr[] = {2, 3, 8, 13};
    int n = sizeof(arr) / sizeof(int);  // 6
    int m = sizeof(brr) / sizeof(int);  // 4
    printArray(arr, n);                 // 1, 5, 9, 10, 15, 20,
    printArray(brr, m);                 // 2, 3, 8, 13,
    // Run Merge operation
    merge(arr, brr, n, m);
    printArray(arr, n);  // 1, 2, 3, 5, 8, 9,
    printArray(brr, m);  // 10, 13, 15, 20,
}
```

---

## Brute-force

The **final output** is supposed to be that all of the `n` smallest elements of the combined elements or `arr[]` and `brr[]` should go into `arr[]` in sorted order, then the remaining i.e. biggest `m` elements of both arrays should go into `brr[]` in sorted order

```txt title="Sample input-output"
BEFORE: arr = [1, 4, 8, 9] ,   brr = [2, 3, 6, 7]
AFTER:  arr = [1, 2, 3, 4] ,   brr = [6, 7, 8, 9]
```

We can start by maintaining two pointers `L` and `R` initially at the first elements of `arr[]` and `brr[]` respectively. We keep moving `L` ahead till the element pointed by `L` is `<=` the one at `R`:

```txt
Pass 1: arr = [1, 4, 8, 9],     brr = [2, 3, 6, 7]
               L                       R                (arr[L] <= arr[R]) so move L ahead
Pass 2: arr = [1, 4, 8, 9],     brr = [2, 3, 6, 7]
                  L                    R                (arr[L] > arr[R]) so SWAP them
```

At this point, the ordering is wrong as element at `L` is greater than the one at `R`. So we **swap** them to get:

```txt
After swapping:
Pass 2: arr = [1, 2, 8, 9],     brr = [4, 3, 6, 7]
                  L                    R                sort brr[] to restore ordering. Then move L ahead
```

We did this **swap** to ensure that the **smaller** of the elements being compared (i.e. `2` at `R`) goes into the **first** array. But in doing so, we have disturbed the sorted ordering of `brr` where `4` is coming before `3`

So we need to sort `brr` again before going to next pass. We can use something like the pick-n-insert step in insertion sort as we know that the element at swapped index `R` i.e. `4` is the new entry and we need to shift other elements after which we can place `4` at the appropriate gap created. This process should take around $O(m)$ time and we should get corrected sorted `brr[]` as follows. Then only move `L` ahead for next pass

```txt
After sorting brr to correct order:
Pass 2: arr = [1, 2, 8, 9],     brr = [3, 4, 6, 7]
                  L                    R                (arr[L] <= arr[R]) so move L ahead
Pass 3: arr = [1, 2, 8, 9],     brr = [3, 4, 6, 7]
                     L                 R                (arr[L] > arr[R]) so SWAP them
        arr = [1, 2, 3, 9],     brr = [8, 4, 6, 7]      sort brr[] to restore ordering
        arr = [1, 2, 3, 9],     brr = [4, 6, 7, 8]      then move L ahead
Pass 4: arr = [1, 2, 3, 9],     brr = [4, 6, 7, 8]
                     L                 R
```

We do this process for each of the $n$ elements of `arr` over which `L` iterates. In worst-case, for each such element at `L`, we would have swap it with element at `R` and then sort `brr[]` in $O(m)$ time to restore ordering. Thus, the time taken would become $O(n \cdot m)$

| Metric | Complexity     |
| ------ | -------------- |
| Time   | $O(n \cdot m)$ |
| Space  | $O(1)$         |

---

## Separate elements then Sort

In the brute-force approach, every time we pushed a larger value into `brr[]`, we immediately restored `brr[]`'s sorted order. Instead of sorting at each step to restore the order, we first **separate-out the elements that which elements belong in the two arrays respectively** and then sort each array independently.

Since `arr[]` and `brr[]` are both sorted in non-decreasing order as input:

- The **largest** elements that _might_ not belong in `arr[]` (and should go into `brr[]`), sit at the end of `arr[]`
- The **smallest** elements that _might_ belong in `arr[]` (and should go into `arr[]`), sit at the start of `brr[]`

We place two pointers:

- `L` at the **end** of **first** array i.e. at index `(n-1)` in `arr[]`
- `R` at the **start** of **second** array i.e. at index `0` in `brr[]`

Then, at each step:

- If `arr[L] > brr[R]`, swap them so that element at `R` comes into `arr[]` and at `L` comes into `brr[]` as they should be in final expected result. Then move `L` behind and `R` ahead one step.
- Else, when `arr[L] <= brr[R]`, no remaining element at or before `L` in `arr[]` is **greater** than any element at or after `R` in `brr[]`, so we **break** early as the elements have been assigned into their respective arrays as they should be in final answer

Once the loop ends, `arr[]` contains the right `n` elements and `brr[]` contains the right `m` elements, **but neither array is sorted internally**. So we sort `arr[]` and `brr[]` individually to get final sorted result as answer

Consider below example where `arr = [1, 4, 8, 10]` with `n = 4` and `brr = [2, 3, 9]` with `m = 4`:

```txt title="Dry-run of example"
Pass 1: arr = [1, 4, 8, 10],    brr = [2, 3, 9]
                        L              R            (arr[L] > brr[R]) so SWAP. Then L--, R++
Pass 2: arr = [1, 4, 8, 2],     brr = [10, 3, 9]
                     L                     R        (arr[L] > brr[R]) so SWAP. Then L--, R++
Pass 3: arr = [1, 4, 3, 2],     brr = [10, 8, 9]
                  L                           R     (arr[L] <= brr[R]) so STOP
Now Sort both arrays INDEPENDENTLY to get final sorted answer:
RESULT: arr = [1, 2, 3, 4],     brr = [8, 9, 10]
```

```cpp title="Separate elements then Sort"
void merge (int arr[], int brr[], const int n, const int m) {
    // Maintain two pointers: L at END of arr[], R at START of brr[]
    int L = (n - 1), R = 0;
    // Compare elements at pointers then move L behind and R ahead
    while (L >= 0 && R < m) {  // Only go till min(n, m) i.e. within index bounds
        // Element at arr[L] and brr[R] are present in the wrong arrays so swap them
        if (arr[L] > brr[R]) {
            swap(arr[L], brr[R]);  // swap so they switch places and assigned into different arrays
            L--, R++;
        } else {  // All elements now present within correct respective arrays
            break;
        }
    }
    // Now, elements have been correctly assigned into respective arrays
    // Sort each array independently to get final sorted answer
    sort(arr, arr + n), sort(brr, brr + m);
}
```

The loop would keep going and swapping till in worst case one array's index has been exhausted and reached beyond bounds i.e. till $O(min(m,n))$. Assuming an efficient sorting algorithm like [Quick Sort](/code-journal/dsa/dsa/sorting-searching/05-quick-sort) that doesn't use any extra memory (ignoring $logn$ the call stack space), sorting each of the $n$ and $m$ elements of `arr[]` and `brr[]` independently would take $O(nlogn)$ and $O(mlogm)$ time respectively

**Total Time**: $= O \Bigl( min(n,m) \Bigr) + O(n \cdot logn) + O(m \cdot logm) \implies O(n \cdot logn + m \cdot logm) $

| Metric | Complexity                       |
| ------ | -------------------------------- |
| Time   | $O(n \cdot logn + m \cdot logm)$ |
| Space  | $O(1)$                           |

---

## Gap method

The Gap method borrows its core idea from [Shell sort](https://en.wikipedia.org/wiki/Shellsort) (which itself generalizes [Insertion Sort](/code-journal/dsa/dsa/sorting-searching/03-insertion-sort) by comparing and moving elements across a **shrinking gap** rather than only _adjacent_ neighbors)

Instead of allocating an _extra_ array of size `(n + m)` or calling `sort()` over each of the arrays, we treat `arr[]` and `brr[]` as **one single virtual array** of length `totalCnt = (n + m)`. An index value `idx` on the combined array is mapped as:

- Virtual index `idx < n` maps to `arr[idx]`
- Virtual index `idx >= n` maps to `brr[idx - n]`

### Procedure for Gap method

1. Start with `gap` as at least half of combined array size: $\left\lceil \frac{n + m}{2} \right\rceil$ i.e. `gap = (totalCnt + 1) / 2`
2. Maintain two pointers over the combined array: pointer `L` at start i.e. `L = 0` and pointer `R` at current `gap` steps ahead of `L` i.e. `R = L + gap`
3. Each pass runs till `R` doesn't go beyond index bounds of combined array i.e. `while (R < totalCnt)` :
   - Compare the elements at virtual indices `L` and `R`. If the element at `L` is greater than the element at `R`, **swap** them so the smaller element is kept at left side of the larger element and sorted order is maintained between them.
   - Advance both pointers one step ahead
4. When the current pass of scanning across the virtual array for the current `gap` is done (as `R` reaches end):
   - If the current `gap` was `1`, it means current ended pass was the LAST one of our process. So STOP and return
   - Otherwise, shrink it by half as $\left\lceil \frac{gap}{2} \right\rceil$ i.e. `gap = (gap + 1) / 2` and continue to next pass

Because `gap` starts large and shrinks toward `1`, elements far apart being compared can **move** between `arr[]` and `brr[]` **early** in the passes, while the **final** `gap = 1` comparisons tidy up any remaining **local** inversions for adjacent elements.

Consider below example where `arr = [1, 5, 9, 10, 15, 20]` with `n = 6` and `brr = [2, 3, 8, 13]` with `m = 4`. Thereby, the combined array's size i.e. `totalCnt` would be `10`. The dry-run of the passes would be go as:

```txt title="Dry-run of example"
indices:       0  1  2  3   4   5              6  7  8  9
        arr = [1, 5, 9, 10, 15, 20],    brr = [2, 3, 8, 13]

Pass 1: gap = ceil(10 / 2) = 5
(L, R)  arr = [1, 5, 9, 10, 15, 20],    brr = [2, 3, 8, 13]
(0, 5)         L                R                               arr[L] <= arr[R] so just move ahead
(1, 6)            L                            R                arr[L] > arr[R] so SWAP and move ahead
        arr = [1, 2, 9, 10, 15, 20],    brr = [5, 3, 8, 13]
(2, 7)               L                            R             arr[L] > arr[R] so SWAP and move ahead
        arr = [1, 2, 3, 10, 15, 20],    brr = [5, 9, 8, 13]
(3, 8)                  L                            R          arr[L] > arr[R] so SWAP and move ahead
        arr = [1, 2, 3, 8, 15, 20],     brr = [5, 9, 10, 13]
(4, 9)                     L                             R      arr[L] > arr[R] so SWAP and move ahead
        arr = [1, 2, 3, 8, 13, 20],     brr = [5, 9, 10, 15]
(5, 10)                        L                             R  index R gone beyond bounds, so STOP this pass

Pass 2: gap = ceil(5 / 2) = 3
(L, R)  arr = [1, 2, 3, 8, 13, 20],     brr = [5, 9, 10, 15]
(0, 3)         L        R                                       arr[L] <= arr[R] so just move ahead
(1, 4)            L        R                                    arr[L] <= arr[R] so just move ahead
(2, 5)               L         R                                arr[L] <= arr[R] so just move ahead
(3, 6)                  L                      R                arr[L] > arr[R] so SWAP and move ahead
        arr = [1, 2, 3, 5, 13, 20],     brr = [8, 9, 10, 15]
(4, 7)                     L                      R             arr[L] > arr[R] so SWAP and move ahead
        arr = [1, 2, 3, 5, 9, 20],      brr = [8, 13, 10, 15]
(5, 8)                        L                       R         arr[L] > arr[R] so SWAP and move ahead
        arr = [1, 2, 3, 5, 9, 10],      brr = [8, 13, 20, 15]
(6, 9)                                         L          R     arr[L] <= arr[R] so just move ahead
(7, 10)                                           L          R  index R gone beyond bounds, so STOP this pass

Pass 3: gap = ceil(3 / 2) = 2
(L, R)  arr = [1, 2, 3, 5, 9, 10],      brr = [8, 13, 20, 15]
(0, 2)         L     R                                          arr[L] <= arr[R] so just move ahead
(1, 3)            L     R                                       arr[L] <= arr[R] so just move ahead
(2, 4)               L     R                                    arr[L] <= arr[R] so just move ahead
(3, 5)                  L     R                                 arr[L] <= arr[R] so just move ahead
(4, 6)                     L                   R                arr[L] > arr[R] so SWAP and move ahead
        arr = [1, 2, 3, 5, 8, 10],      brr = [9, 13, 20, 15]
(5, 7)                        L                   R             arr[L] <= arr[R] so just move ahead
(6, 8)                                         L      R         arr[L] <= arr[R] so just move ahead
(7, 9)                                            L       R     arr[L] <= arr[R] so just move ahead
(8, 10)                                               L      R  index R gone beyond bounds, so STOP this pass

Pass 4: gap = ceil(2 / 2) = 1  (as gap=1, this is the LAST pass)
(L, R)  arr = [1, 2, 3, 5, 8, 10],      brr = [9, 13, 20, 15]
(0, 1)         L  R                                             arr[L] <= arr[R] so just move ahead
(1, 2)            L  R                                          arr[L] <= arr[R] so just move ahead
(2, 3)               L  R                                       arr[L] <= arr[R] so just move ahead
(3, 4)                  L  R                                    arr[L] <= arr[R] so just move ahead
(4, 5)                     L  R                                 arr[L] <= arr[R] so just move ahead
(5, 6)                        L                R                arr[L] > arr[R] so SWAP and move ahead
        arr = [1, 2, 3, 5, 8, 9],       brr = [10, 13, 20, 15]
(6, 7)                                         L   R            arr[L] <= arr[R] so just move ahead
(7, 8)                                             L   R        arr[L] <= arr[R] so just move ahead
(8, 9)                                                 L   R    arr[L] > arr[R] so SWAP and move ahead
        arr = [1, 2, 3, 5, 8, 9],       brr = [10, 13, 15, 20]
(9, 10)                                                    L  R index R gone beyond bounds, so STOP this pass

Since gap=1 in this pass and this pass has ended, we EXIT as elements have been placed at correct sorted positions
```

```cpp title="Gap method"
void compareToSwap (int arr[], int brr[], const int L, const int R) {
    if (arr[L] > brr[R]) {     // Element at L is greater than one at R in combined array
        swap(arr[L], brr[R]);  // Swap to maintain sorted ordering between them
    }
    // We do nothing when element at L is <= element at R in combined array
}

void merge (int arr[], int brr[], const int n, const int m) {
    int totalCnt = (n + m);  // Size of combined array
    // To compare non-adjacent elements and maintain sorted ordering between them
    int gap = (totalCnt + 1) / 2;  // To get ceil(totalCnt/2) as int
    // Iterate till positive gap size
    while (gap > 0) {  // The LAST pass to be done is when (gap=1)
        // Initially L at start and R at 'gap' steps ahead of it in combined array
        int L = 0, R = (L + gap);
        // Current pass goes on till R doesn't go beyond index bounds of combined array
        while (R < totalCnt) {
            if (L < n && R < n) {  // Both L, R lie in arr[]
                compareToSwap(arr, arr, L, R);
            } else if (L < n && R >= n) {  //  L lies in arr[], R lies in brr[]
                compareToSwap(arr, brr, L, R - n);
            } else {  // Both L, R lie in brr[]
                compareToSwap(brr, brr, L - n, R - n);
            }
            L++, R++;  // Advance BOTH pointers one step ahead
        }
        if (gap == 1) {  // Current completed pass was the LAST one
            return;      // EXIT as no more passes needed to be done
        }
        // After each pass completes, half the gap (index-distance) for elements being compared
        gap = (gap + 1) / 2;  // To get ceil(gap/2) as int
    }
}
```

### Time Complexity for Gap method

Let $N = (n + m)$ be the total number of elements across the **combined** array. The total time taken comes from multiplying these two things:

1. **Number of passes (the outer loop)**:

   The `gap` value starts from $\left\lceil\frac{N}{2}\right\rceil$ and is roughly halved after each pass with as $\left\lceil\frac{gap}{2}\right\rceil$ till `gap=1` pass gets completed. Halving a number of size $N$ repeatedly takes at most $O(log_2N)$ passes, so the outer loop runs in $O(logN) = O(log(n + m))$ time

2. **Work per pass (the inner loop)**:

   For a given `gap` pass, `L` starts at index `0`, `R` starts at index `gap`, and both advance one step at a time till `R` doesn't go past index bounds of combined array. That means, at each pass, `L` runs from index `0` to index `(N-1) - gap`, doing at most $(N - \text{gap})$ **comparisons/swaps**, each one being $O(1)$ time. In the worst case, when `gap = 1` in last pass, it does $(N - 1)$ steps, which is **$O(N) = O(n+m)$**

Multiplying the two gives us the worst-case time complexity as:

**Total Time** $= O(\text{no. of passes}) \cdot O(\text{work per pass}) = O(N \cdot logN) = O\Bigl( (n + m) \cdot \log(n + m) \Bigr)$

| Metric | Complexity                            |
| ------ | ------------------------------------- |
| Time   | $O(N \cdot logN)$ , where $N = (n+m)$ |
| Space  | $O(1)$                                |
