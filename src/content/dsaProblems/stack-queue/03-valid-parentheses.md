---
title: Valid Parantheses
ds: [stack]
techniques: []
level: 1
links: [https://leetcode.com/problems/valid-parentheses]
---

## Problem Statement

Given a string `str` containing just the characters `(` , `)` , `{` , `}` , `[` and `]`, determine if the input string is valid.

An input string is valid if:

- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.
- Every close bracket has a corresponding open bracket of the same type.

```txt title="Examples"
()[]{}        Valid
(]            Invalid
[()           Invalid
[(])          Invalid
()[([]){}]    Valid
```

## Solution: Stack

> Being a **LIFO** data structure, we can know which was the **latest inserted** element. We use this property to know if there was a matching opening brace last inserted for current closing brace

- A trivial edge case is that all **odd-length** strings would be **invalid**

- Our approach is that we **only push opening braces** into the stack.

- **Whenever we encounter a closing brace, there should be a matching opening brace present at the top of stack**. Then we can clear out current matching braces. If there wasn't a matching opening brace at top of stack for current closing brace, then the input is unbalanced

- Make sure to check stack isn't empty before accessing or popping the top element

- At the end, all pairs would clear out and stack should become empty in the case of balanced pairs. If **stack isn't empty at the end, then the input is unbalanced**.

```cpp title="C++"
bool isValid (string str) {
    // Odd length strings are invalid
    if (str.size() & 1) return false;

    // Store opening brace symbol corresponding to each closing brace symbol
    unordered_map<char, char> matchingOpeningBrace{
        {')', '('},
        {']', '['},
        {'}', '{'},
    };

    stack<char> stk;  // Stack which stores opening braces
    // Iterate over string characters
    for (char c : str) {
        // Add opening brace into stack
        if (c == '(' || c == '[' || c == '{') {
            stk.push(c);
        }
        // At closing brace:
        else if (c == ')' || c == ']' || c == '}') {
            // Matching opening brace should exist at top of stack, else invalid
            if (stk.empty() || stk.top() != matchingOpeningBrace[c]) {
                return false;
            }
            // Clear out current formed bracket pair
            stk.pop();
        }
    }
    // All matching pairs would get cleared out and stack be empty, else invalid
    return (stk.empty());
}
```

**Time taken**:

We are iterating all string characters once, so \\( O(n) \\) time complexity

**Space used**:

At most, there would be \\( n \\) characters present inside stack. This would occur when all characters are opening braces. Hence, the space complexity is \\( O(n) \\)
