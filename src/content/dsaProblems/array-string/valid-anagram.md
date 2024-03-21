---
title: Valid Anagram
links: [https://leetcode.com/problems/valid-anagram/]
ds: array
techniques: [sorting, hashing]
level: 1
---

## Problem Statement

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Note: `s` and `t` consist of lowercase English letters

Example: `s = "anagram" , t = "nagaram"`

returns `true` as the letters of `anagram` can be rearranged to form `nagaram`

---

## Solutions

**Edge case**: When String **lengths unequal** \\( \implies \\) **NOT** anagrams

### 1. Track Character counts

- You can use a HashMap to count occurence of each character. The **character counts** of both must be **equal**.
- Since, we only have lowercase alphabets in string, we can get away with **integer arrays of length `26`**
- We don't need to maintain two arrays/maps. We can just **increment** counts while **first string's** traversal and **decrement** them in **second string's** traversal This also prevents overflow if high character counts.

```cpp
int charCounts[26];             // <- fixed space

for(char &c: str1){             // <- O(N)
    charCounts[c-'a']++;
}
for(char &c: str2){             // <- O(N)
    charCounts[c-'a']--;
}
for(int &cnt: charCounts){      // <- O(N)
    if(cnt != 0){
        return false;
    }
}
return true;
```

Time \\( = 3 \cdot O(N) = O(N) \\)

| Metric | Complexity                   |
| ------ | ---------------------------- |
| Time   | \\( O(N) \\)                 |
| Space  | \\( O(1) \\) ... fixed space |

### 2. Sorting

When sorted, both the strings must be the same

```cpp
sort(str1);                 // O(NlogN)
sort(str2);                 // O(NlogN)
return (str1 == str2);      // O(N) for comparing character-by-character
```

Time \\( = 2 \cdot O(N \cdot logN ) + O(N) = O(N \cdot logN ) \\)

| Metric | Complexity                      |
| ------ | ------------------------------- |
| Time   | \\( O(N \cdot logN ) \\)        |
| Space  | \\( O(1) \\) ... no extra space |

The complexity depends on the underlying sorting method used. We have assumed a good sorting time of `O(NlogN)` and no extra space

### More cases

- If the input has `UPPERCASE` characters, we need to **convert** to `lowercase` and then check counts
- If the input has **whitespaces** too, **ignore** them. In such cases, the **lengths of strings can be different** even if they ARE anagrams
