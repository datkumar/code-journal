---
title: Longest Consecutive Sequence
ds: [array]
techniques: [sorting, hashing]
level: 2
links: [https://leetcode.com/problems/longest-consecutive-sequence/]
---

Given an unsorted array of integers `nums`, return the **length** of the **longest consecutive sequence** that can be formed. A consecutive sequence is a list of numbers where each element is one more than it's previous one (no duplicates)

For example, if input array is `[4,5,9,3,10,4,7,6,1,9,5]` , the longest consecutive sequence is `[3,4,5,6,7]` and return it's length `5` as answer

## Sorting

> Sorting would bring the **equal/consecutive elements closer** to each other

```cpp
bool equalOrOneMore(int first, int second) {
    return (second == first || second == first + 1);
}

int longestConsecutive(vector<int>& nums)
{
    int n = nums.size();

    // Edge-case (one or no elements)
    if(n <= 1)  return n;

    // Sort array elements
    sort(nums.begin(), nums.end());

    int i = 0;
    int maxSeqLength = 1;
    // Traverse array elements
    while(i < n-1)
    {
        // Sequence possible
        if(equalOrOneMore(nums[i], nums[i+1]))
        {
            int seqLength = 1;
            // Start exploring sequence ahead
            while(i < n-1 && equalOrOneMore(nums[i], nums[i+1]))
            {
                // Consecutive next element (value is one more than last seen)
                if(nums[i+1] == nums[i] + 1) {
                    // Include the element into consecutive sequence
                    seqLength++;
                }
                i++; // Move exploration ahead in current sequence
            }
            // Sequence formed. Compare and update max length
            maxSeqLength = max(seqLength, maxSeqLength);
        }
        i++; // Keep traversing ahead
    }
    return maxSeqLength;
}
```

Time taken is \\( O(n \cdot logn) \\) for sorting + \\( O(n) \\) for traversing array elements

| Metric | Complexity               |
| ------ | ------------------------ |
| Time   | \\( O(N \cdot logN ) \\) |
| Space  | \\( O(1) \\)             |

## Union-Find approach

Consider input `nums=[4,5,9,3,10,4,7,6,1,9,5]`

The set of unique elements would be: `{4,5,9,3,10,7,6,1}`

The consecutive sequences formed are:

```txt
1
3 ↔ 4 ↔ 5 ↔ 6 ↔ 7
9 ↔ 10
```

> **All elements** in a sequence have a **predecessor** on the left (whose value is one lesser than element), **except for the first** element (starting value of sequence)

```cpp
int longestConsecutive(vector<int> &nums)
{
    // Store unique numbers of input in a set
    unordered_set<int> uniqueNums(nums.begin(), nums.end());

    int maxSeqLength = 0;
    for(int val: uniqueNums)
    {
        // Non-predecessor element (starting of sequence)
        if(!uniqueNums.count(val - 1))
        {
            int seqLength = 1;
            int curr = val;
            // Keep finding next consecutive element to append into sequence
            while(uniqueNums.count(curr + 1))
            {
                curr++;
                seqLength++;
            }
            // Sequence formed. Update max length
            maxSeqLength = max(seqLength, maxSeqLength);
        }
    }
    return maxSeqLength;
}
```

**Time**:

- To construct set, there are \\( n \\) insertions, each taking \\( O(1) \\) time on average i.e. \\( O(n) \\) for all insertions
- We are starting the inner sequence-exploratory loop only when we find the start of a sequence and it goes on till end of that sequence. Thus, each array element is traversed once by the outer loop and once when it's respective sequence is explored i.e. \\( O(2n) \\)

| Metric | Complexity               |
| ------ | ------------------------ |
| Time   | \\( O(N ) \\)            |
| Space  | \\( O(N) \\) ... for set |
