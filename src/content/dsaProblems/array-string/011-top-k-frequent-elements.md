---
title: Top K frequent elements
ds: [array, heap]
techniques: [hashing, sorting]
level: 2
links: [https://leetcode.com/problems/top-k-frequent-elements]
---

## Problem Statement

Given an integer array `nums` and an integer `k`, return the `k` **most frequent** elements. You may return the answer in **any order**.

### 1. Hashing + Sorting

```txt
Construct frequency map of numbers in input

Convert the key-value pairings into a array of 2 elements {count, number}

Sort that array descending by comparing "count" in each pair

Return "number" part of the first "k" pairs as answer
```

| Metric | Complexity                           |
| ------ | ------------------------------------ |
| Time   | \\( O(n \cdot logn ) \\) ... Sorting |
| Space  | \\( O(n) \\) ... Frequency map       |

### 2. Hashing + Heap

As **"Top K"** frequent elements asked, we should think of **heap**

The heap should be such that the highest frequency elements placed first and then the lower frequncey ones. In other words, a **max-heap** with the **comparison basis as frequency of the number** in input array

```txt
Construct frequency map of numbers in input

Create max-heap
Traverse frequency map:
    Add elements to max-heap such that they are compared by their frequencies

From the constructed heap, till "k" iterations:
    Keep popping the top-most element of heap and add to answer

Return answer
```

Assuming there are '\\(m\\)' unique elements, which is at worst '\\(n\\)'.

Also, '\\(k\\)' will be '\\(m\\)' at most

**Time:**

- \\( O(n) \\) to traverse array elements and construct frequency map
- \\( m \\) insertions into max-heap is \\( O(m \cdot logm) \\) , which will be \\( O(n \cdot logn) \\) at worst
- \\( k \\) elements popped from max-heap takes \\( O(k \cdot logm) \\) , which will be \\( O(n \cdot logn) \\) at worst

**Space:** &nbsp; \\( n \\) elements at worst in frequency map and heap and answer i.e. \\( O(2n) \\)

| Metric | Complexity                                                                            |
| ------ | ------------------------------------------------------------------------------------- |
| Time   | \\( O(n + k \cdot logm ) \\) &nbsp; which at worst is &nbsp; \\( O(n \cdot logn ) \\) |
| Space  | \\( O(n) \\)                                                                          |

<details>
<summary><strong>C++ code</strong></summary>

```cpp
vector<int> topKFrequent(vector<int> &nums, int k)
{
    // {number : count} map
    unordered_map<int, int> freq;
    // Construct frequency map
    for (int number : nums) {
        freq[number]++;
    }

    // Max-heap where elements compared by count
    priority_queue< pair<int, int> > maxHp;
    for (auto &[number, count] : freq) {
        maxHp.push({count, number});
    }

    vector<int> ans;
    // Get top K elements from heap
    while (k--) {
        // Pick off element at top of heap and add to answer
        ans.push_back(maxHp.top().second);
        maxHp.pop();
    }
    return ans;
}
```

</details>

### 3. Hashing + Buckets

The frequency count of any number in the input can range between: \\( 0 \text{ to } n \\)

> We can create \\( n \\) **buckets** where each bucket represents elements having that count. The **index** of the bucket will be the frequency count of it's elements

```txt
Construct frequency map

Create n+1 buckets (or n, ignoring the zero-count bucket)
Traverse frequency map:
    Append number to the bucket (index) representing that count

Traverse buckets from the end till "k" elements in answer:
    Add elements of bucket to answer
```

**Example**:

```txt
nums = [1,1,2,5,1,2,4], k = 2

n = 7
freqMap = { 1:3, 2:2, 5:1, 4:1 }

buckets[n + 1] array will have elements alikes: (index i.e. Count) -> Elements having that count
Here, buckets[8] will be:
    [ 0 ] -> [ ]
    [ 1 ] -> [ 5, 4 ]
    [ 2 ] -> [ 2 ]
    [ 3 ] -> [ 1 ]
    [ 4 ] -> [ ]
    [ 5 ] -> [ ]
    [ 6 ] -> [ ]
    [ 7 ] -> [ ]

Traversing from end and taking k=2 elements, ans=[1,2]
```

**Time:**

- \\( O(n) \\) to traverse array elements and construct frequency map
- \\( m \\) insertions into respective buckets is \\( O(m) \\) , which will be \\( O(n) \\) at worst
- Traverse buckets and append elements into answer: would be \\( O(n) \\) amortized

**Space:** &nbsp; \\( n \\) elements at worst in frequency map and \\( n \\) buckets and combined elements of all buckets would be \\( n \\) at worst

| Metric | Complexity   |
| ------ | ------------ |
| Time   | \\( O(n) \\) |
| Space  | \\( O(n) \\) |

<details>
<summary><strong>C++ code</strong></summary>

```cpp
vector<int> topKFrequent(vector<int> &nums, int k)
{
    // {number : count} map
    unordered_map<int, int> freq;
    for (int number : nums) {
        freq[number]++;
    }

    int n = nums.size();
    // n+1 buckets where each bucket stores numbers having
    // frequency count equal to index of bucket
    vector<vector<int>> buckets(n + 1);
    for (auto &[number, count] : freq) {
        // Add number to the bucket representing that frequency count
        buckets[count].push_back(number);
    }

    vector<int> ans;
    for (int i = n; i >= 0; i--) {
        // Skip processing bucket if it's empty
        if (buckets[i].empty())
            continue;

        // Append elemets of the bucket into answer (till k total items)
        for (int number : buckets[i])
         {
            ans.push_back(number);

            if (ans.size() == k)
                return ans;
        }
    }
    return ans;
}
```

</details>
