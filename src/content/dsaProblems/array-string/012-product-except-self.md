---
title: Product of Array except self
ds: [array]
techniques: [precompute]
level: 2
links: [https://leetcode.com/problems/product-of-array-except-self/]
---

## Problem Statement

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of nums except `nums[i]`.

The product of any prefix or suffix of `nums` is **guaranteed to fit in a 32-bit integer**. Try solving it without using the division operation `/`

## 1. Using Division operation (violating instructions)

### Cases to observe

1. **Two or more zero elements**: All products will be zero
2. **One zero element**: All products will be zero except at the zero element's position
3. **No zero elements**: The product at each postition will be combined product of all elements divided by current element (we'll use the division operator)

<details>
<summary><strong>C++ code</strong></summary>

```cpp
vector<int> productExceptSelf(vector<int> &nums)
{
    int n = nums.size();
    // Find the zero element (stop when zero count reaches 2)
    vector<int> zeroValueIndices;
    for (int i = 0; i < n; i++) {
        if (zeroValueIndices.size() >= 2)
            break;
        if (nums[i] == 0)
            zeroValueIndices.push_back(i);
    }
    // Case 1: Two or more zero elements present
    if (zeroValueIndices.size() > 1) {
        // All products will be zero
        return vector<int>(n, 0);
    }
    // Case 2: One zero element present
    if (zeroValueIndices.size() == 1) {
        int zeroIndex = zeroValueIndices.front();
        // All products will be zero except for the one at zero element
        int productAtZeroElement = 1;
        // Multiplying elements present on the left
        for (int i = 0; i < zeroIndex; i++) {
            productAtZeroElement *= nums[i];
        }
        // Multiplying elements present on the right
        for (int i = zeroIndex + 1; i < n; i++) {
            productAtZeroElement *= nums[i];
        }
        vector<int> temp(n, 0);
        // Set the product at zero element
        temp[zeroIndex] = productAtZeroElement;
        return temp;
    }
    // Case 3: No zero element present
    int productOfAll = 1;
    // Get the product of all elements
    for (int curr : nums) {
        productOfAll *= curr;
    }
    vector<int> ans(n, 1);
    // The product at each element will be
    // the overall product divided by current element
    for (int i = 0; i < n; i++) {
        // Using the division operator here
        ans[i] = productOfAll / nums[i];
    }
    return ans;
}
```

</details>

<br>

| Metric | Complexity                             |
| ------ | -------------------------------------- |
| Time   | \\( O(N) \\) ... 3 traversals at worst |
| Space  | \\( O(1) \\)                           |

## 2. Maintain Prefix and Suffix product arrays

Product of all elements except self means product of elements to it's left multiplied by the product of elements to it's right

```txt
Create 2 arrays of size 'n'

Traverse array left to right (skipping one element) and calculate PREFIX products

Traverse array right to left (skipping one element) and calculate SUFFIX products

Create answer array
Each element in answer array will be the product of corresponding values in prefix and suffix product arrays
```

- The **first** element of **prefix** array and **last** element of **suffix** array will be `1` (as their prefix and suffix are nothing i.e. empty arrays). So, `prefix[0] = 1 = suffix[n-1]`.
- The remaining values are calucated during traversals as:
  - `prefix[i] = prefix[i-1] * nums[i-1]`
  - `suffix[i] = suffix[i+1] * nums[i+1]`

| Metric | Complexity                                               |
| ------ | -------------------------------------------------------- |
| Time   | \\( O(N) \\) ... 3 traversals                            |
| Space  | \\( O(N) \\) ... Extra space for `prefix[]` , `suffix[]` |

<details>
<summary><strong>C++ code</strong></summary>

```cpp
vector<int> productExceptSelf(vector<int> &nums)
{
    int n = nums.size();

    vector<int> prefix(n, 1);
    // Calculate prefix product values starting from second element
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] * nums[i - 1];
    }

    vector<int> suffix(n, 1);
    // Calculate prefix product values starting from second-last element
    for (int i = n - 2; i >= 0; i--) {
        suffix[i] = suffix[i + 1] * nums[i + 1];
    }

    vector<int> ans(n, 1);
    // Construct answer value as product of prefix and suffix values
    for (int i = 0; i < n; i++) {
        ans[i] = prefix[i] * suffix[i];
    }
    return ans;

}
```

</details>

> **Optimization**: The **multiplications** can be done **in-place** right within the **answer array**

```txt
Create answer array of size n

Traverse input array from left:
    Fill answer values as prefix product values

Traverse input array from right:
    Calculate suffix product value
    Multiply the existing prefix value in answer with the suffix product value
```

| Metric | Complexity                                     |
| ------ | ---------------------------------------------- |
| Time   | \\( O(N) \\) ... 2 traversals                  |
| Space  | \\( O(1) \\) ... Only `ans[]` , no extra space |

<details>
<summary><strong>C++ code</strong></summary>

```cpp
vector<int> productExceptSelf(vector<int> &nums)
{
    int n = nums.size();

    vector<int> ans(n, 1);
    for (int i = 1; i < n; i++) {
        // Set prefix product values in answer
        ans[i] = ans[i - 1] * nums[i - 1];
    }

    int suffix = 1;
    for (int i = n - 2; i >= 0; i--) {
        // Calculate suffix product
        suffix *= nums[i + 1];

        // Multiply existing prefix product with calculated suffix product
        ans[i] *= suffix;
    }

    return ans;
}
```
