---
title: Two Sum
ds: [array]
techniques: [hashing, 2-ptr, binary-search]
level: 1
links:
  [
    https://leetcode.com/problems/two-sum,
    https://www.interviewbit.com/problems/2-sum/,
  ]
---

## Problem Statement

- Given an array of integers `nums` and an integer `target`, return **indices** of the **two** numbers such that they **add up to target**.
- You may **not use the same element twice**. If multiple solutions exist, return the answer with **smallest indices**

**Note**: Sorting elements would change their indices. Since we have to return indices (and not elements), this approach would not work

### 1. Brute

```txt
For each element in array:
    Check by pairing with each element ahead of it:
        If sum of pair is target:
            return pair
```

Time \\( = (N-1) + (N-2) + ... + 1 = O(N^2) \\)

| Metric | Complexity     |
| ------ | -------------- |
| Time   | \\( O(N^2) \\) |
| Space  | \\( O(1) \\)   |

### 2. Hashing

> Using Hashmap to track elements seen before. While traversing, check if complement exists

```txt
For each element traversed in array:
    If complementary value has been added before into map:
        Return pair {complement, current} as answer.
    Add current element to map.
```

| Metric | Complexity                  |
| ------ | --------------------------- |
| Time   | \\( O(N) \\)                |
| Space  | \\( O(N)\\) ... for Hashmap |

<details>
<summary><strong>Implementation Code</strong></summary>

```cpp title="C++"
vector<int> twoSum(vector<int> &nums, int target) {
    // {number : index} map
    unordered_map<int, int> ump;
    for (int i = 0; i < nums.size(); i++) {
        int curr = nums[i];
        int complement = target - curr;
        // Answer pair FOUND
        if (ump.find(complement) != ump.end()) {
            return {ump[complement], i};
        }
        // Insert current element into map
        ump.insert({curr, i});
    }
    return {};  // No answer found
}
```

</details>

---

## Variant 1

> **Multiple** occurences and solutions. **Count** how many solutions: [GFG](https://www.geeksforgeeks.org/problems/count-pairs-with-given-sum5022/1)

Since the same value element can be present at multiple indices and we only have to return total number of pairs, we can maintain a **frequency-count map** that tracks how how many places one value exists in array

The cases we need to handle are:

1. Picking **same value twice** to form sum pair

   When the target value is twice that of a value present in array, we need number of ways we can select 2 items from total frequency of that value. Let \\(a\\) be the frequency count of the element

   \\[ \therefore \text{ways to select } = {^a}{C_2} = a(a-1)/2 \\]

   **Note**: If \\( a < 2 \\) , then **zero** ways to select as there won't be any pair formed. At \\( a = 1, \space a(a-1)/2 = 0 \\) . Thus, that edge-case gets handled. If count < 1, it's even not even added into frequency map

2. Picking **two diffent values** to form sum pair

   Let \\( \space a, b \space \\) be the frequencies of the elements that add up to target

   \\[ \therefore \text{ways to select } = {^a}{C_1} \cdot {^b}{C_1} = a \cdot b \\]

| Metric | Complexity                                                |
| ------ | --------------------------------------------------------- |
| Time   | \\( O(2 \cdot N) \\) ... Traversing array & frequency map |
| Space  | \\( O(N)\\) ... for Hashmap                               |

<details>
<summary><strong>Implementation Code</strong></summary>

```cpp title="C++"
int getPairsCount (int arr[], int n, int target) {
    // {number : count} map
    unordered_map<int, int> freq;
    // Construct frequency counts over all values present in array
    for (int i = 0; i < n; i++) {
        freq[arr[i]]++;
    }
    // Total count of valid pairs
    int ans = 0;
    // Keep traversing and emptying the map
    while (!freq.empty()) {
        // Take starting entrry of present map
        int curr = freq.begin()->first;
        int complement = target - curr;
        int f1 = 0, f2 = 0;
        int ways = 0;

        // Case 1: Selecting same value (curr) twice in pair
        if (target == curr * 2) {
            if (freq[curr] < 2) {
                freq.erase(curr);
                continue;
            }
            f1 = freq[curr];
            ways = f1 * (f1 - 1) / 2;
        }

        // Case 2: Selecting two different values (curr, complement)
        else if (freq.find(complement) != freq.end()) {
            f1 = freq[curr], f2 = freq[complement];
            ways = f1 * f2;
        }

        // Update answer and remove entry
        ans += ways;
        freq.erase(curr);
        freq.erase(complement);  // removed if exists
    }
    return ans;
}
```

</details>

---

## Variant 2

> Input array is **sorted**, with one solution: [LeetCode](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/)

### 1. Binary search

```txt
For each element in array:
    Search if complement exists among the elements ahead:
        return pair if found
```

In worst case, we have to go till last pair. So the time taken:

\\( = log(n-1) + log(n-2) + ... + log(1) \\)

\\( = log[ (n-1) \ast (n-2) ... \ast 1] \\)

\\( = log[(n-1)!] \approx O(n \cdot logn) \\) ... refer [here](/code-journal/dsa/dsa/algorithm-complexity#asymptotic-notations)

| Metric | Complexity              |
| ------ | ----------------------- |
| Time   | \\( O(N \cdot logN) \\) |
| Space  | \\( O(1) \\)            |

<details>
<summary><strong>Implementation Code</strong></summary>

```cpp title="C++"
// Return index if key found, else -1
int binarySearch (vector<int> &arr, int key, int low, int high) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == key) {
            return mid;  // FOUND
        }
        if (arr[mid] < key) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}
vector<int> twoSum (vector<int> &nums, int target) {
    int n = nums.size();
    for (int i = 0; i < n - 1; i++) {
        int curr = nums[i];
        int complement = target - curr;

        // Search complement among elements ahead
        int searchResult = binarySearch(nums, complement, i + 1, n - 1);
        if (searchResult != -1)  // FOUND
            return {i, searchResult};
    }
    return {-1, -1};  // No pair found
}
```

</details>

### 2. Two-Pointer

```txt
Maintain two pointers intially at two ends of array.

While they are within bounds:

    If the sum elements at the two indices equals target:
        return pair as solution.

    If smaller sum needed:
        move RIGHT pointer BEHIND by one.

    Else i.e. larger sum needed:
        move LEFT pointer AHEAD by one.

```

At each step, one of the two pointers is moving closer to the other. At worst, they will meet, thereby covering all elements once i.e. \\( O(n) \\) time

| Metric | Complexity   |
| ------ | ------------ |
| Time   | \\( O(N) \\) |
| Space  | \\( O(1) \\) |

<details>
<summary><strong>Implementation Code</strong></summary>

```cpp title="C++"
vector<int> twoSum (vector<int> &nums, int target) {
    int n = nums.size();
    int left = 0, right = n - 1;
    while (left < right) {
        int currSum = nums[left] + nums[right];
        if (target == currSum) {
            return {left, right};
        }
        if (target < currSum) {
            right--;
        } else {
            left++;
        }
    }
    return {-1, -1};
}
```

</details>
