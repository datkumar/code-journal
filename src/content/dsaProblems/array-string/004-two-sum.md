---
title: Two Sum and Variants
ds: [array]
techniques: [hashing, 2-ptr, binary-search]
level: 1
links:
  [
    https://leetcode.com/problems/two-sum,
    https://leetcode.com/problems/two-sum-ii-input-array-is-sorted,
    https://www.geeksforgeeks.org/problems/count-pairs-with-given-sum--150253/1,
    https://www.geeksforgeeks.org/problems/count-pairs-with-given-sum5022/1,
  ]
---

## Problem Statement

- Given an array of integers `nums` and an integer `target`, return **indices** of the **two** numbers such that they **add up to target**.
- You may **not use the same element twice**. If multiple solutions exist, return the answer with **smallest indices**. If no answers exist, return `-1` index pair

```txt title="Examples"
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation:
The sum of nums[0] and nums[1] is 2 + 7 = 9, which equals the target. Therefore, the indices [0, 1] are returned.

Input: nums = [3,2,4], target = 6
Output: [1,2]
Explanation:
The sum of nums[1] and nums[2] is 2 + 4 = 6, which equals the target. Therefore, the indices [1, 2] are returned.

Input: nums = [3,3], target = 6
Output: [0,1]
Explanation:
The sum of nums[0] and nums[1] is 3 + 3 = 6, which equals the target. Therefore, the indices [0, 1] are returned.
```

> **Note**: **Sorting** elements would **change their indices**. Since we have to return indices (and not elements), this approach would NOT work

## Brute-force

```txt
For each element in array:
    Check by pairing with each element in the array AHEAD of it:
        If the pair's sum equals target:
            return pair as valid pair FOUND

return not-found result
```

For an array with $n$ elements,

Time $= (n-1) + (n-2) + ... + 1 \implies O(n^2) $

| Metric | Complexity |
| ------ | ---------- |
| Time   | $O(n^2)$   |
| Space  | $O(1)$     |

## Hashing

Use Hashmap to track elements and their index we have seen before. While traversing, check if complement exists

```txt
For each element traversed in array:
    If complementary value was already added before into map:
        Return current element and the complement indices as valid answer
    Append current element to the map

return not-found result
```

| Metric | Complexity                                    |
| ------ | --------------------------------------------- |
| Time   | $O(n)$                                        |
| Space  | $O(n)$ ... in worst case when all no solution |

<details>
<summary><strong>C++ Implementation Code</strong></summary>

```cpp title="Using HashMap"
vector<int> twoSum (const vector<int> &nums, const int target) {
    // HashMap that stores {number : index} pair mappings
    unordered_map<int, int> ump;
    // Iterate over array indices
    for (int i = 0; i < nums.size(); i++) {
        int curr = nums[i];
        int complement = target - curr;
        if (ump.find(complement) != ump.end()) {  // Valid pair FOUND
            return {ump[complement], i};          // Return indices as answer
        }
        ump.insert({curr, i});  // Append current element into map
    }
    return {-1, -1};  // No valid pair found
}
```

</details>

---

## Variant: Sorted Input Array

This is the [Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) question where input array is **1-indexed** and **sorted in non-decreasing order** as well as it is given that just one unique solution exists. We could use the previous two methods in prior question (i.e. Brute-force and Hashing) which would have similar complexities for this problem too. But let us see how we can utilize the sorted nature of input array

```txt title="Examples"
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].

Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].

Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].

```

### Binary Search

The sorted array of elements allows us to run binary-search on it for looking up if required complement exists

```txt
For each element in array:
    BinarySearch whether the required complement exists in the subarray AHEAD of current:
        return pair as result

return not-found result
```

For each element picked up from the array, we are running binarySearch on the subarray of elements ahead of the current picked one. Each binarySearch operation takes $O(logk)$ time in worst case, assuming $k$ as the size of the subarray, which goes from $(n-1)$ for first index pick to $1$ for second-last index pick. The total time required in worst case (checking all subarrays) then becomes:

$= log(n-1) + log(n-2) + ... + log(1) = log[ (n-1) \ast (n-2) ... \ast 1] $

$= log[(n-1)!] \approx O(log(n!)) \implies O(n \cdot logn) $ ... refer [here](/code-journal/dsa/dsa/algorithm-complexity#notable-comparisons)

| Metric | Complexity                |
| ------ | ------------------------- |
| Time   | $O(n \cdot logn)$         |
| Space  | $O(1)$ ... no extra space |

<details>
<summary><strong>C++ Implementation Code</strong></summary>

```cpp title="BinarySearch approach"
// Helper function to binary-search index of complement key in subarray
// Returns index if found in subarray from indices "lo" to "hi" else -1 for not-found
int binarySearch (const int key, int lo, int hi, const vector<int> &nums) {
    while (lo <= hi) {                      // Keep going till working subarray not empty
        int mid = lo + (hi - lo) / 2;       // Find midpoint
        if (key == nums[mid]) return mid;   // Key FOUND
        if (key < nums[mid]) hi = mid - 1;  // Key smaller. Search left-half
        else lo = mid + 1;                  // Key bigger. Search right-half
    }
    return -1;
}

vector<int> twoSum (const vector<int> &nums, int target) {
    int n = nums.size();
    // Iterate till second-last element index
    for (int i = 0; i < nums.size() - 1; i++) {
        int complement = target - nums[i];
        // BinarySearch our required complement in the subarray ahead of current element
        int resIdx = binarySearch(complement, i + 1, n - 1, nums);
        if (resIdx != -1) {              // Complement was FOUND. Return answer
            return {i + 1, resIdx + 1};  // question mentions 1-indexed array
        }
    }
    return {-1, -1};  // No valid pair was found
}
```

</details>

### Two-Pointer

```txt
Maintain two pointers L,R at the two ends of array
While the pointers don't meet or cross past each other:
    If sum of elements at the two indices EQUALS target:
        return that pair as solution
    If Smaller sum needed:
        move R one step BEHIND
    Else (i.e. Larger sum needed):
        move L one step AHEAD

return not-found result
```

At each step, one of the two pointers is moving closer to the other. At worst, they will meet, thereby covering all elements once i.e. $ O(n) $ time

| Metric | Complexity                                   |
| ------ | -------------------------------------------- |
| Time   | $O(n)$ moving pointers covering all elements |
| Space  | $O(1)$ ... no extra space                    |

<details>
<summary><strong>C++ Implementation Code</strong></summary>

```cpp title="2-Ptr approach"
vector<int> twoSum (const vector<int> &nums, const int target) {
    // Maintain two pointers starting at the ends of the array
    int L = 0, R = nums.size() - 1;
    // Keep going till the pointers don't cross past each other
    while (L < R) {
        int currSum = nums[L] + nums[R];  // Sum of elements currently at L,R indices
        if (target == currSum) {          // Valid sum pair FOUND
            return {L + 1, R + 1};        // question mentions 1-indexed array
        }
        if (target > currSum) L++;  // Need LARGER sum. Move L ahead
        else R--;                   // Need SMALLER sum. Move R behind
    }
    return {-1, -1};  // No valid sum pair found
}
```

</details>

---

## Variant: Count all possible index pairings

This is the [Count Pairs with Target Sum](https://www.geeksforgeeks.org/problems/count-pairs-with-given-sum--150253/1) question. The array can have multiple occurrences of one value. We have to return the **count** of all such **unique** `[i,j]` pairings where `i != j` and `arr[i] = arr[j] == target`

> While looping through elements of array and building the HashMap, we know about existence/frequencies of all the entries to the **LEFT of the current element** in the array that we have encountered before

To prevent **double counting**, we only check to the left of current element which element exists and how many of it and then update current entry in the map. This prevents counting same index twice (if `target` is double of current element) as well as it prevent counting `[j,i]` pair if `[i,j]` had already been considered in the answer

```txt
Maintain answer count and a frequency map
As you iterate through the array elements:
    If the required complement value was ever encountered previously (i.e. to the left of current element):
        Increment the frequency of that complement value to the answer count
        This was done considering that the pair formed was all such {prevIdx, currIdx} for those occurrences

return final answer count
```

| Metric | Complexity                                    |
| ------ | --------------------------------------------- |
| Time   | $O(n)$ for processing each array element once |
| Space  | $O(n)$ when all elements are unique           |

<details>
<summary><strong>C++ Implementation Code</strong></summary>

```cpp title="Frequency-Map checks over previous elements"
int countPairs (const vector<int> &arr, const int target) {
    unordered_map<int, int> freq;  // Stores frequency count of a value of array
    int ansCnt = 0;                // Stores final count of valid pairs
    for (const int &curr : arr) {
        int complement = target - curr;
        // Check if complementary element was even encountered previously to the left of current
        if (freq.count(complement)) {  // One or more such complements encountered before
            // Add to answer count the frequencies of that complement seen before to the left
            ansCnt += freq[complement];
        }
        // Update the current element's frequency for future picks
        freq[curr]++;
    }
    return ansCnt;
}
```

</details>

---

## Variant: ALL possible UNIQUE VALUE pairs in SORTED order

This is the [Find All Pairs with Zero Sum](https://www.geeksforgeeks.org/problems/count-pairs-with-given-sum5022/1)

### Brute-force pairs check with Set for ordering

The `set` maintains ordering and avoids duplicate pair value entries. Our order of trying to pair current element with only those AHEAD of it prevent double-counting `[j,i]` pair if `[i,j]` valid pair had been taken before

```txt
Maintain ordered Set
For each element picked from array:
    Check by pairing current with all elements AHEAD of it if they sum up to target:
        If matched, add that pair into Set by ordering it as {smaller, bigger} before inserting
```

The two nested loops lead to $O(n^2)$ pairings being evaluated. Inserting each valid pair into the ordered set would take $O(logk)$ time where $k$ is the number of elements already present in the set. The total valid possible pairs in the set could grow to $O(n^2)$ in worst case. Thereby:

Total time $ = O(n^2 \cdot log(n^2)) = o(n^2 \cdot 2nlogn) \implies O(n^2 logn)$

| Metric | Complexity                                                                      |
| ------ | ------------------------------------------------------------------------------- |
| Time   | $O(n^2 logn)$ in worst case                                                     |
| Space  | $O(n^2)$ in worst case (when most of the pairings checked are valid and unique) |

<details>
<summary><strong>C++ Implementation Code</strong></summary>

```cpp title="Frequency-map check over previously-seen elements"
inline pair<int, int> getSortedPair (const int &n1, const int &n2) {
    if (n1 > n2) {        // First number is greater than second
        return {n2, n1};  // return pair in reverse order
    }
    return {n1, n2};  // return pair as-is
}

vector<vector<int>> getPairs (const vector<int> &arr) {
    const int n = arr.size();
    set<pair<int, int>> uniquePairs;  // Stores unique pairings
    // Pick each array element upto second-last one
    for (int i = 0; i < n - 1; i++) {
        // Pair current picked element with all elements AHEAD of it in array
        for (int j = i + 1; j < n; j++) {
            if (arr[i] + arr[j] == 0) {  // This is a valid sum pairing
                // Append pair to set in sorted order as {smallerVal, biggerVal}
                // This is done to prevent double counting of pairs {a,b}, {b,a} in set
                uniquePairs.insert(getSortedPair(arr[i], arr[j]));
            }
        }
    }
    // Build answer from the uniquePairs set
    vector<vector<int>> ans;
    for (const auto &[n1, n2] : uniquePairs) {
        ans.push_back({n1, n2});
    }
    return ans;
}
```

</details>

### Sort + 2 Pointers

```txt
Sort array elements to bring duplicates adjacent to each other
Maintain two pointers L,R starting at the two ends of array
While they don't meet or cross past each other:
    If current pairing's sum is NOT equal to target:
        Either move L ahead or R back as needed to get valid sum
    When the pairing's sum is EQUAL to target:
        Add current pair to answer
        Skip L forward and R behind over their respective duplicates if they exist
```

The time taken is $O(nlogn)$ for sorting the array plus $O(n)$ for traversing either of the two pointers over each array element once

| Metric | Complexity                       |
| ------ | -------------------------------- |
| Time   | $O(nlogn + n) \implies O(nlogn)$ |
| Space  | $O(1)$ ... no extra space        |

<details>
<summary><strong>C++ Implementation Code</strong></summary>

```cpp title="Sort + 2-Ptr"
vector<vector<int>> getPairs (vector<int> &arr) {
    const int target = 0;
    vector<vector<int>> ans;
    // Sort to maintain order of elements so duplicates are brought adjacent
    // and we can skip over them while iterating
    sort(arr.begin(), arr.end());

    int L = 0, R = arr.size() - 1;
    while (L < R) {
        if (target > arr[L] + arr[R]) L++;
        else if (target < arr[L] + arr[R]) R--;

        else {  // Current pair has Valid Sum
            // Add current pair to answer
            ans.push_back({arr[L], arr[R]});
            // Skip L and R over duplicate elements having same value as them
            // Maintain bounds checking to ensure they don't meet or go past each other
            int oldL = L, oldR = R;
            while (L < R && arr[L] == arr[oldL]) L++;
            while (L < R && arr[R] == arr[oldR]) R--;
        }
    }
    return ans;
}
```

</details>
