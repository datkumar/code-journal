---
title: Contains Duplicate
ds: [array]
techniques: [sorting, hashing]
level: 0
links: [https://leetcode.com/problems/contains-duplicate/description/]
---

## Problem Statement

Given an integer array `nums`, return `true` if any value **appears at least twice** in the array, and return `false` if every element is **distinct**.

```txt title="Examples"
nums = [1,2,3,1]
Output: true
Explanation:
The element 1 occurs at the indices 0 and 3.

Example 2:
Input: nums = [1,2,3,4]
Output: false
Explanation:
All elements are distinct.

Example 3:
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

---

> **Trivial case**: When array contains **zero or one elements**, we know there are **no duplicates** present

## Brute-force

```txt
for each element in array:                      <- O(n)
    for each element ahead of it in array:      <- O(n-1)
        if both of them are equal:              <- O(1)
            return true
return false
```

Assuming array of $n$ elements,

Time Complexity $= (n-1) + (n-2) + ... + 2 + 1 + 0 = \dfrac{(n-1)(n)}{2} \implies O(n^2) $

| Metric | Complexity                |
| ------ | ------------------------- |
| Time   | $O(n^2)$                  |
| Space  | $O(1)$ ... no extra space |

## Sorting

When we sort the array, the similar elements would get placed close to each other

```txt
sort the array                                              <- O(nlogn)
take first element and start from second element            <- O(1)
for each element picked from sorted array:                  <- O(n)
    if current element is same as previous one:             <- O(1)
        return true
return false
```

Time Complexity $= O(nlogn) + O(n) \implies O(nlogn)$

| Metric | Complexity                |
| ------ | ------------------------- |
| Time   | $O(nlogn) $               |
| Space  | $O(1)$ ... no extra space |

<details>
<summary><strong>C++ Implementation Code</strong></summary>

```cpp title="Sorting and Adjacent pairs check"
bool containsDuplicate (vector<int> &nums) {
    if (nums.size() < 2) {  // Trivial case: Empty or single element
        return false;
    }
    // Sort to bring similar value elements next to each other
    sort(nums.begin(), nums.end());
    // Iterate sorted array checking each pair of adjacent elements
    for (int i = 1; i < nums.size(); i++) {
        // When the two adjacent elements are equal, we have found duplicate
        if (nums[i] == nums[i - 1]) {
            return true;
        }
    }
    return false;
}
```

</details>

## Hashing

By using some space for the set, we can quickly check if an element was previouly added to it

```txt
create hashSet                                              <- O(1)
Iterating over each array element:                          <- O(n)
    if current element already exists in the hashSet:       <- O(1) on avg.
        return true
    add current element to the hashSet                      <- O(1) on avg.
return false
```

| Metric | Complexity                                          |
| ------ | --------------------------------------------------- |
| Time   | $O(n)$ on avg.                                      |
| Space  | $O(n)$ ... worst-case, when all elements are unique |

Above time complexity is considering hash-set i.e. `unordered_set` in C++. However, if you use `set` (which is an ordered set that uses balanced BST internally), the **insertion** and **lookup** operations would take $O(logn)$ time. So, the final time complexity would become $O(nlogn)$

<details>
<summary><strong>C++ Implementation Code</strong></summary>

```cpp title="Using HashSet"
bool containsDuplicate (const vector<int> &nums) {
    unordered_set<int> uniqueNums;  // HashSet to store unique elements
    // Iterate over array elements
    for (const int &curr : nums) {
        // When current element was already encountered before i.e. duplicate FOUND
        if (uniqueNums.count(curr)) {  // Check if current element exists in HashSet
            return true;
        }
        // Add current element into uniques HashSet
        uniqueNums.insert(curr);
    }
    return false;  // No duplicates were found during array  traversal
}
```

</details>
