---
title: Quick-sort
tags: [dsa, algorithm, sorting]
---

## Main Idea

- It uses a recursive **Divide-and-Conquer** approach
  - Conquer step: **Partition** current working array into two parts around a **pivot** element. (All elements smaller than it are placed to it's left and greater elements to it's right)
  - Divide step: Sort the **remaining** two parts **independently**
- The terminating **base case** for recursion is when the subarray contains **only one element** or if any **index is out-of-bounds**. We can assume then that the subarray is sorted and stop partitioning
- The crucial step in the algorithm is of **partitioning working array around the pivot element**

## Pseudo-code

```txt
Sorting working array:

    Parition array around a pivot element

    Sort the two partitions recusively independently
```

```txt
Partitioning:

    (Assuming last element of current array as pivot)

    Start traversing current array from start uptil before pivot:

        When you find an element less than pivot:

            Move left part ahead by one
            Send that element to end of left part


    At end, we will have left part, joining it is right part, and then pivot at last
    Swap pivot with first element of right part so array becomes partitioned around pivot

```

## Code

```cpp
int partition(int arr[], int low, int high)
{
    // We're picking pivot as last element of working array
    int pivot = arr[high];

    // Points to last element in left part (the one just behind partition index)
    int prev = low - 1;

    // Points to current element being evaluated
    int curr = low;

    // Traverse working array (except last element which is pivot)
    while (curr < high)
    {
        // When current element is less than pivot (it should be placed in left part)
        if (arr[curr] < pivot)
        {
            // Shift left part ahead by one and swap to fix order
            prev++;
            swap(arr[prev], arr[curr]);
        }
        // Keep moving ahead
        curr++;
    }

    // We ran through all elements of working array
    // Now, we have left, right parts as contiguous with the pivot element after them
    // Left part ends at [prev] and right part starts at [prev + 1]
    int partitionIndex = prev + 1;
    // Swap pivot with the first element of right part
    swap(arr[partitionIndex], arr[high]);
    // Array has been partitioned around the pivot. Provide that partition index
    return partitionIndex;
}

void quickSort(int arr[], int low, int high)
{
    // Terminating base case: ONE element or index out-of-bounds
    if (low >= high || low < 0)
    {
        return;
    }

    // Partition current working array around the pivot
    int partitionIndex = partition(arr, low, high);

    // Sort the remaining parts around pivot independently in next step
    quickSort(arr, low, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, high);
}
```

## Algorithm Analysis

|   Metric   |                   Value                   | Remarks                                                     |
| :--------: | :---------------------------------------: | ----------------------------------------------------------- |
|  **Time**  | \\( O(n \cdot logn) \text{ on average}\\) | Depends on pivot's partitions (Not exactly Adaptive either) |
| **Space**  |     \\( O(logn) \text{ to } O(n) \\)      | In-place sorting, but recursion uses call stack memeory     |
| **Stable** |                    ❌                     | NOT Stable by default                                       |
| **Online** |                    ❌                     | Needs entire input at once                                  |

### Time Complexity

```cpp
int partition(int arr[], int low, int high)
{
    // Traverse array to find partition index       -> n
}

void quickSort(int arr[], int low, int high)        // T(n)
{
    // Base case check                              // 1

    int p = partition(arr, low, high);              // n

    quickSort(arr,  low,  p - 1 );                  // T(x)
    quickSort(arr, p + 1, high  );                  // T(n-1-x)
}
```

Let '\\(x\\)' be the number of elements **smaller** than the pivot. The next two recursive calls cover all elements **other than pivot**, i.e. combined, they have one less element than number of total elements in current call i.e. \\( (n-1) \\)

So, time taken can be represented by recurrence relation:

\\[ T(n) = T(x) + T(n-1-x) + \Theta(n) \\]

The cases for running time of Quick-sort are:

1. **Best Case**: Pivot is **median** at each partition for **balanced partitioning**

   When the chosen pivot is median of working array at each step, the array gets partitioned into equal subarrays for next recursive calls with the pivot placed at exact middle. The next two recursive calls will have equal depth and the binary tree of function calls will be a balanced one. Mathematically:

   \\[ x \approx (n-1-x) \implies x \approx \frac{n}{2} \\]

   And so, the recurrence relation becomes (resembling that of merge sort):

   \\[ T(n) = 2 \cdot T \left(\frac{n}{2}\right) + \Theta(n) \\]

   By **Case (2a)** of [Master Theorem for dividing functions](/code-journal/dsa/dsa/recurrence-master-thm#master-theorem-for-evaluating-dividing-functions), it comes out to be:

   \\[ T(n) = O(n \cdot log_2 n) \\]

2. **Worst Case**: Pivot's placed at **either end** of current array, causing **unbalanced partitioning**

   Say we're taking the last element of working array as pivot. Now, if the input array given to us is **sorted or reverse-sorted**, the pivot's sorted position at each step would be at either end of working array. The partition array's sizes would be an empty subarray and the other subarray containing all elements excluding pivot. The tree of recursion calls in this unbalanced partitioning would be like a linked-list. Mathematically, one of the two terms will be empty, and the other one would take up all of remaining work:

   \\[ T(n) = T(0) + T(n-1) + \Theta(n) \\]

   \\[ \therefore \space T(n) = T(n-1) + \Theta(n) \\]

   By **Case (2)** of [Master Theorem for decreasing functions](/code-journal/dsa/dsa/recurrence-master-thm#master-theorem-for-evaluating-decreasing-functions), it comes out to be:

   \\[ T(n) = O(n^2) \\]

3. **Average Case**:

   See [proof from Wikipedia](https://en.wikipedia.org/wiki/Quicksort#Using_recurrences) to know how we get the average case performance of quick-sort as:

   \\[ 2n \cdot ln(n) \approx 1.39 n \cdot log_2 (n) \\]

   This means that, on average, quicksort performs only about **39%** worse than in its best case. In this sense, it is **closer to the best case** than the worst case

|   Case    |     Time Complexity      | Occurs when             |
| :-------: | :----------------------: | ----------------------- |
| **Best**  | \\( O(n \cdot log n) \\) | Balanced Partitioning   |
| **Worst** |      \\( O(n^2) \\)      | Unbalanced partitioning |
|  **Avg**  | \\( O(n \cdot log n) \\) | Random partitioning     |

### Space Complexity

No auxiliary space required for any temporary arrays i.e. **in-place** sorting. However, recursion uses call stack memory:

- **Best case**: The next recursive calls after partitioning are balanced with max tree depth as \\( O(logn) \\)
- **Worst case**: The next recursive calls after partitioning are unbalanced (like a linked-list) with max tree depth as \\( O(n) \\)

So, the worst-case space used by Quick-sort (albeit just for call-stack) is \\( O(n) \\)

We can optimize the tail calls where we make a recursive call only for the smaller part after partition such as:

```cpp
void quickSort(int arr[], int low, int high)
{
    while (low < high)
    {
        int p = partition(arr, low, high);
        if (p - low < high - p){
            quickSort(arr, low, p - 1);
            low = p + 1;
        }
        else{
            quickSort(arr, p + 1, high);
            high = p - 1;
        }
    }
}
```

If left part becomes smaller, then we make recursive call for left part. Else for the right part. In worst case (for space), when both parts are of equal sizes in all recursive calls, we use \\( O(logn) \\) extra space.

### Stability

Note that we are placing all elements less tha pivot in left part, then swapping pivot with first element in right part. If that swapped element was equal to pivot, the relative ordering between them would change. Thus, quick-sort is **NOT stable**. If two elements with the same value appear in different orders in the input array, there's no guarantee that they will maintain that order in the sorted array. There are a few ways it can be made stable but most of them involve using **extra space** such as: 3-way (smaller, equal, larger) partitions, storing indices etc.

```cpp
// The element with the lower index is considered smaller and gets swapped first.
// This preserves the original order of elements with equal values
if (arr[j].val < pivot ||
    (arr[j].val == pivot && arr[j].index < arr[high].index))
{
    i++;
    swap(arr[i], arr[j]);
}
```
