---
title: Group Anagrams
ds: [array]
techniques: [hashing, sorting]
level: 2
links: [https://leetcode.com/problems/group-anagrams/]
---

## Problem Statement

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once

For example,

Input: `strs = ["eat","tea","tan","ate","nat","bat"]`

An acceptable output could be like:

```cpp
[
    ["bat"],
    ["nat","tan"],
    ["ate","eat","tea"]
]
```

> **Note**: All anagrams would have the same **frequency count**. Thus, their sorted letters would also be the same

## Hashing + Sorting

We'll use Hashmap with **keys** as the **sorted letters of word**. All anagrams present in input array that match it will be grouped together as value of that key

If input contains '\\(n\\)' strings of average length '\\(m\\)' and let '\\(k\\)'
be the number of groups, which is \\(n\\) at worst

**Time taken**:

- \\( O(n) \\) to iterate through input strings
- \\( O(m \cdot logm) \\) to sort each word i.e. \\( O(n \cdot m \cdot logm) \\) to sort all words
- \\( O(1) \\) for appending word entry into map
- When we construct answer at end, we will iterate through the constructed map with anagram groups of all elements of input i.e. \\( O(k) = O(n) \\) at worst

Total time \\( = O(n) + O(n \cdot m \cdot logm) + O(1) + O(n) = O(n \cdot m \cdot logm) \\)

| Metric | Complexity                      |
| ------ | ------------------------------- |
| Time   | \\( O(n \cdot m \cdot logm) \\) |
| Space  | \\( O(n) \\) ... Frequency map  |

```cpp
vector<vector<string>> groupAnagrams(vector<string> &strs)
{
    // { sorted_anagram : entries_which_match_that }
    unordered_map<string, vector<string>> ump;
    for (string &word : strs)
    {
        // Sort characters of current word to get sortedAnagram
        string sortedAnagram = word;
        sort(sortedAnagram.begin(), sortedAnagram.end());

        // Add word to sortedAnagram key's entries
        ump[sortedAnagram].push_back(word);
    }

    // Construct answer as array of all values of map
    vector<vector<string>> ans;
    for (auto &[anagram, words] : ump)
        ans.push_back(words);
    return ans;
}
```

> **Optimization**: Instead of sorting letters to form key, use **hashing function**

Regardless of the order in which characters are processed within the loop, the **final hash value `H` will be the same for all anagrams**. This is because the **order of multiplication doesn't affect the final result** when dealing with modulo operations.

Hash functions are provided by deafult in Java, but in C++, we need to provide our own hash function where the data-type of key is not a primitive data-type

The step of sorting letters of word in first method has been replaced with calculating the hash value of the word. In our `getHash()` function below, we are iterating over the letters of word i.e. \\( O(m) \\) time to calculate hash of a word, and thereby \\( O(n \cdot m) \\) time to calculate hash of all words

| Metric | Complexity               |
| ------ | ------------------------ |
| Time   | \\( O(n \cdot m ) \\)    |
| Space  | \\( O(n) \\) ... Hashmap |

```cpp
const int BASE = 997;
const long long MOD = 101103107109113LL;

// Rolling-hash function with predefined base and modulo
long long getHash(string &s)
{
    long long H = 1;
    for (char c : s)
    {
        H *= (BASE + c);
        if (H >= MOD)
            H %= MOD;
    }
    return H;
}

vector<vector<string>> groupAnagrams(vector<string> &strs)
{
    unordered_map<long long, vector<string>> ump;
    for (string &word : strs)
    {
        // Calculate hash value of word
        long long hash = getHash(word);

        // Use that hash value as key to index anagrams of that word
        ump[hash].push_back(word);
    }

    vector<vector<string>> ans;
    for (auto &[hash, words] : ump)
        ans.push_back(words);
    return ans;
}
```
