---
title: Valid Anagram
ds: [array]
techniques: [sorting, hashing]
level: 1
links: [https://leetcode.com/problems/valid-anagram/]
---

## Problem Statement

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Note: `s` and `t` consist of lowercase English letters

Example: `s = "anagram" , t = "nagaram"`

returns `true` as the letters of `anagram` can be rearranged to form `nagaram`

```txt title="Examples"
Input: s = "anagram", t = "nagaram"
Output: true

Input: s = "rat", t = "car"
Output: false

```

---

> **Trivial case**: When string **lengths unequal**, they are **NOT** anagrams

## Sort and Compare

When sorted, both the strings must be the same if they are anagrams

```txt
Sort both strings                                           <- 2 * O(nlogn)
Iterate character-by-character over the sorted strings:     <- O(n)
    If any mismatch found:                                  <- O(1)
        return false
return true
```

Assuming strings consist of $n$ characters,

Time Complexity $=  O(2*nlogn) + O(n) \implies O(nlogn)$

| Metric | Complexity                |
| ------ | ------------------------- |
| Time   | $O(nlogn)$                |
| Space  | $O(1)$ ... constant space |

<details>
<summary><strong>C++ Implementation Code</strong></summary>

```cpp title="Sort Both and Compare"
bool isAnagram (string s1, string s2) {
    if (s1.size() != s2.size()) {  // Trivial case: Unequal lengths
        return false;
    }
    // Sort both strings
    sort(s1.begin(), s1.end());
    sort(s2.begin(), s2.end());
    // Check character-by-character that strings match
    for (int i = 0; i < s1.size(); i++) {
        if (s1[i] != s2[i]) {  // First mismatch encountered
            return false;
        }
    }
    return true;
}
```

</details>

## Match Frequency Counts

- You can use a **HashMap** to count occurrence of each character. The **character counts** of both must be **equal**
- Since, we only have **lowercase alphabets** in strings, we can get away with just **integer array of length `26`**
- We don't even need to maintain **two** arrays/maps for frequency counts. We can just keep one where we **increment** counts during **first** string's traversal and then **decrement** during **second** string's traversal. This also prevents overflow if there are high character counts. In the end, the character count decrements should cancel out all respective increments and **each character count** in the frequency array should **become zero** for valid anagrams.

We would be iterating each of the two strings once and then the final frequency count array once. So time taken would be $O(3n)$ and we use $O(1)$ constant space i.e. `int[26]` of frequency count array for any sized input

Time $= 3 \cdot O(n) = O(n)$

| Metric | Complexity                |
| ------ | ------------------------- |
| Time   | $O(n)$                    |
| Space  | $O(1)$ ... constant space |

<details>
<summary><strong>C++ Implementation Code</strong></summary>

```cpp title="Matching Frequency counts"
bool isAnagram (const string &s1, const string &s2) {
    if (s1.size() != s2.size()) {  // Trivial case: Unequal lengths
        return false;
    }

    // Stores Frequency counts of characters
    vector<int> freq(26, 0);
    // Iterate both strings character-by-character
    // Increment counts while traversing s1 and decrement during s2 traversal
    for (const char &ch : s1) freq[ch - 'a']++;
    for (const char &ch : s2) freq[ch - 'a']--;

    // Ensure that each character count has cancelled-out and become zero to be valid anagram
    for (const char &ch : s2) {
        if (freq[ch - 'a'] != 0) return false;
    }
    return true;
}
```

</details>

---

## Variants

- If the input has `UPPERCASE` characters, we need to **convert** to `lowercase` and then check counts
- If the input has **whitespaces** too, **ignore** them. In such cases, the **lengths of strings can be different** even if they ARE anagrams
