---
title: Valid Palindrome
ds: [array]
techniques: [2-ptr]
level: 1
links: [https://leetcode.com/problems/valid-palindrome/]
---

A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `str`, return `true` if it is a palindrome, or `false` otherwise.

```txt
Maintain 2 pointers (one at start and one at end of string)

While they don't meet:
    Skip comparison if non-alphanumeric character.

    Compare if the lower-case form of the two characters are same:
        if not, return answer as NOT Palindromes.

    Move both pointers closer.

```

| Metric | Complexity                                         |
| ------ | -------------------------------------------------- |
| Time   | \\( O(n) \\) ... one-pass over string's characters |
| Space  | \\( O(1) \\)                                       |

```cpp
bool isPalindrome (string str) {
    int n = str.size();
    int left = 0, right = n - 1;
    // While the two pointers don't meet
    while (left < right) {
        // Skipping comparison for non-alphanumeric characters
        if (!isalnum(str[left])) {
            left++;
            continue;
        }
        if (!isalnum(str[right])) {
            right--;
            continue;
        }
        // Lower-case form of the two characters not same
        if (tolower(str[left]) != tolower(str[right])) {
            return false;
        }
        // Move both pointers closer
        left++, right--;
    }
    return true;
}
```
