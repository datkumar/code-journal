---
title: Valid Palindrome - I, II
ds: [array]
techniques: [2-ptr]
level: 1
links:
  [
    https://leetcode.com/problems/valid-palindrome/,
    https://leetcode.com/problems/valid-palindrome-ii/,
  ]
---

## Problem Statement (Valid Palindrome)

A phrase is a palindrome if, after converting all uppercase letters into **lowercase** letters and **removing all non-alphanumeric** characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

```txt title="Examples"
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
```

## Using Two Pointers

- **Trivial case**: Empty or single-character strings are palindromes
- We could first convert the input string into just **lowercase alphabets and numbers** before starting our check. But that would take up $O(n)$ extra space to store the converted string. We would first traverse the input string and then the converted string, taking $O(2n)$ time
- Instead, it is better to maintain **two pointers** at the two ends of the string and keep moving them closer while checking the characters there match. This would not take up any extra space and almost $O(n/2)$ time

```txt
Maintain 2 pointers - L at start and R at end of string
Keep going till L and R don't cross past each other:
    When characters at both L,R are alphanumeric:
        If their lowercase versions do NOT match:
            return false as NOT Palindrome
        Move BOTH L,R closer when matching

    Skip over characters at any of L,R if the characters are NOT alphanumeric

return true as no mismatch encountered
```

| Metric | Complexity      |
| ------ | --------------- |
| Time   | $O(n/2) = O(n)$ |
| Space  | $O(1)$          |

```cpp title="2 Pointers solution"
bool isPalindrome (const string &str) {
    // Trivial case: empty or single-character strings are palindromes
    if (str.size() < 2) {
        return true;
    }
    // Maintain two pointers starting at the two ends of the string
    int L = 0, R = str.size() - 1;
    // Keep going till the pointers don't cross past each other
    while (L < R) {
        // Only compare when both are alphanumeric
        if (isalnum(str[L]) && isalnum(str[R])) {
            // Compare lowercase versions of characters at L vs R
            if (tolower(str[L]) != tolower(str[R])) {
                return false;
            }
            // When no mismatch, move BOTH L,R closer to each other by one step
            L++, R--;
        }
        // Skip over L or R or both when character there is NOT alphanumeric
        if (!isalnum(str[L])) L++;
        if (!isalnum(str[R])) R--;
    }
    return true; // No mismatch encountered
}
```

---

## Variant: ONE character can be Deleted

This is the [Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/) question which is slightly trickier than the first one. Given a string `s` consisting of just lowercase alphabets, return `true` if `s` can become palindrome after **deleting at most one character** from it

```txt title="Examples"
Input: s = "aba"
Output: true

Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.

Input: s = "abc"
Output: false
```

### Brute-force

```txt
First check if string is palindrome as-is (no deletions)
If not, then try this for each character of string:
    Check if the string becomes palindrome if that character gets deleted
```

| Metric | Complexity                                                                 |
| ------ | -------------------------------------------------------------------------- |
| Time   | $O(n^2)$ for each string character deletion, the `isPalindrome` check runs |
| Space  | $O(1)$ if we just pass indices or $O(n)$ for storing substring             |

### Check the 2 Substring cases on First Mismatch

- We keep moving the `L`, `R` pointers closer as we did in previous question. However, on the **first mismatch** we encounter, we have to check if **deleting the character at EITHER of `L` or `R` actually forms the palindrome**. If neither of the deletions can form a palindrome, we conclude answer as `false`
- Below example shows how illustrates how that would look like. The first big string is the input. The 2 pointers `L` and `R` have been matching up until now when we've run into our first mismatch, where the character at `s[L]` is `c` and `s[R]` is `u` . Now we need need to check whether the rest of the substring formed by deleting character at `L` or at deleting at `R` is a palindrome.

```txt
aguokepatgbnvfqmgmlcupuufxoohdfpgjdmysgvhmvffcnqxjjxqncffvmhvgsymdjgpfdhooxfuupuculmgmqfvnbgtapekouga
                   L                                                             R
aguokepatgbnvfqmgml                                                               lmgmqfvnbgtapekouga
                   c                                                             u
                    upuufxoohdfpgjdmysgvhmvffcnqxjjxqncffvmhvgsymdjgpfdhooxfuupuc
```

- The substring formed by deleting character at `L` is from `[L+1,R]` and the one by deleting character at `R` is `[L,R-1]`. If either of these substrings is a palindrome, we conclude that the whole string becomes a palindrome after deleting that one character. If neither substrings form a palindrome, we conclude that palindrome CANNOT be formed by deleting one character
- We define a `isPalindrome` helper to check those two substring cases on first mismatch. We could pass the substrings formed themselves, or a more space-efficient way would be to pass the `start` and `end` indices for those substrings over the original string

```cpp title="2-Ptr with Substrings check"
// Helper function to check whether this substring is palindrome
bool isPalindrome (const int start, const int end, const string &str) {
    int L = start, R = end;
    while (L < R) {
        if (str[L] != str[R]) { // Mismatch found within substring
            return false;       // This substring will NOT form Palindrome
        }
        L++, R--;
    }
    return true; // Valid palindrome was formed for this substring
}

bool validPalindrome (const string &str) {
    if (str.size() < 2) {
        return true;
    }
    int L = 0, R = str.size() - 1;
    while (L < R) {
        if (str[L] != str[R]) {  // FIRST MISMATCH ENCOUNTERED
            // Check if either substrings [L+1,R] or [L,R-1] are palindromes
            // Returns true if either one is palindrome else returns false
            return isPalindrome(L + 1, R, str) || isPalindrome(L, R - 1, str);
        }
        L++, R--;
    }
    return true;
}
```

| Metric | Complexity                                                     |
| ------ | -------------------------------------------------------------- |
| Time   | $O(n+2k) = O(n)$ where $k$ is length of the substring we check |
| Space  | $O(1)$ if we just pass indices                                 |
