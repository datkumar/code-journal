---
title: Contains Duplicate
ds: [array]
techniques: [sorting, hashing]
level: 0
links: [https://leetcode.com/problems/contains-duplicate/description/]
---

## Problem Statement

Given an integer array `nums`, return `true` if any value **appears at least twice** in the array, and return `false` if every element is **distinct**.

**Example:** `[1,2,3,1]` returns `true` as `1` appears more than once

---

## Solutions

### 1. Brute-force

```txt
for each element in array:                      <- O(N)
    for each element ahead of it in array:      <- O(N)
        if those two are same:                  <- O(1)
            return true

return false
```

| Metric | Complexity                      |
| ------ | ------------------------------- |
| Time   | \\( O(N^2) \\)                  |
| Space  | \\( O(1) \\) ... no extra space |

### 2. Sorting

When we sort the array, the similar elements would get placed close to each other

```txt
sort the array                                              <- O(N*logN)

for each element in sorted array:                           <- O(N)
    if current element's next element is same as current:   <- O(1)
        return true

return false
```

<details>
<summary><strong>C++ code</strong></summary>

```cpp
bool containsDuplicate(vector<int> &nums) {
    sort(nums.begin(), nums.end());

    for (int i = 0; i < nums.size() - 1; i++) {
        if (nums[i] == nums[i + 1]) {
            return true;
        }
    }
    return false;
}
```

</details>

Time Complexity: \\( = O(N \cdot logN) + O(N) = O(N \cdot logN) \\)

| Metric | Complexity                      |
| ------ | ------------------------------- |
| Time   | \\( O(N \cdot logN ) \\)        |
| Space  | \\( O(1) \\) ... no extra space |

### 3. Hashing

By using some space for the set, we can quickly check if an element was previouly added to it

```txt
create a hash-set

for each element in the array:                      <- O(N)
    if current element already exists in the set:   <- O(1) on avg.
        return true
    add current element to the set                  <- O(1) on avg.

return false
```

<details>
<summary>
    <strong>C++ code</strong>
</summary>

```cpp
bool containsDuplicate (vector<int> &nums) {
    unordered_set<int> uniqueNums;
    for (auto &curr : nums) {
        // Duplicate found
        if (uniqueNums.find(curr) != uniqueNums.end()) {
            return true;
        }
        uniqueNums.insert(curr);
    }
    return false;
}
```

</details>

<br>

| Metric | Complexity                                       |
| ------ | ------------------------------------------------ |
| Time   | \\( O(N) \\) ... on avg.                         |
| Space  | \\( O(N) \\) ... worst-case, when all are unique |

Above time complexity is for `unordered_set` in C++. However, if you use `set`, the **insertion** and **find** operations would take `O(logN)` time in **worst-case**. So, the final complexity would be `O(N*logN)`
