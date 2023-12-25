# Contains Duplicate

Problem Link: [LeetCode](https://leetcode.com/problems/contains-duplicate/description/)

## Problem Statement

Given an integer array nums, return `true` if any value appears at least twice in the array, and return `false` if every element is **distinct**.

> Example:

`[1,2,3,1]` returns `true` as `1` appears more than once

## Solutions

### 1. Brute-force

```txt
for each element in array:                      <- O(N)
    for each element ahead of it in array:      <- O(N)
        if those two are same:                  <- O(1)
            return true

return false
```

| Complexity | Value                            |
| ---------- | -------------------------------- |
| Time       | $O(N^2)$                         |
| Space      | $O(1)$ ... no extra space needed |

### 2. Sorting

> [!NOTE]
> When we sort the array, the similar elements would get placed close to each other

```txt
sort the array                                              <- O(N*logN)

for each element in sorted array:                           <- O(N)
    if current element's next element is same as current:   <- O(1)
        return true

return false
```

| Complexity | Value                                       |
| ---------- | ------------------------------------------- |
| Time       | $O(N\cdot\log(N))+O(N)  = O(N\cdot\log(N))$ |
| Space      | $O(1)$ ... no extra space needed            |

### 3. Hashing

> [!NOTE]
> By using some space for the set, we can quickly check if an element was previouly added to it

```txt
create a hash-set

for each element in the array:                      <- O(N)
    if current element already exists in the set:   <- O(1) on avg.
        return true
    add current element to the set                  <- O(1) on avg.

return false
```

| Complexity | Value                                     |
| ---------- | ----------------------------------------- |
| Time       | $O(N)$ ... on avg.                        |
| Space      | $O(N)$ ... worst-case when all are unique |

> Above complexities are for `unordered_set` in C++. However, if you use `set`, the **insertion** and **find** operations would take `O(logN)` time in worst-case. So, the final complexity would be `O(N*logN)`
