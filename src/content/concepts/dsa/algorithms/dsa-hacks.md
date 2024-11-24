---
title: Handy DSA hacks
tags: [dsa]
---

<!-- TODO: Write content -->

Referred from [Sean Prashad tips](https://seanprashad.com/leetcode-patterns/) and the [EPI book](https://www.amazon.in/Elements-Programming-Interviews-Insiders-Guide/dp/1479274836)

## Arrays

- If array is **sorted**, try **binary-search** or **two-pointers**
- To **reduce space** usage, try to utilize the **array itself** by **swapping** corresponding elements around
- Operations at the **end** are faster than at the start or somewhere in middle
- Remember proper indexing to avoid off-by-1 errors

## Uniqueness

- When time imp., use **map/set**: `O(1)` hash check and `O(n)` space at-worst
- When space imp., use **sorting**: `O(nlogn)` time and `O(1)` space
- The **XOR** bitwise operator (`^`) might be handy when finding the **ONE element** appearing as duplicate/unique

## Strings

Strings are essentially an array of characters so most of the array hacks would also apply here. If asked for common strings, try using **map** or **trie**

## Linked Lists

- A lot of problems would involve using **two-pointers**, it could be either **fast-n-slow** moving ones or for keeping track of other two key positions
- Use a **dummy node** to make operations simpler around the head
- Remember to update all relevant pointers properly, especially in doubly-linked lists to preserve memory integrity

## Stacks and Queues

- If you're traversing in one direction and want to go back in **opposite direction** over some elements, a **Stack** would be a viable option due to it's **LIFO** nature. Also if recursion is not allowed, you can emulate that behavior with a Stack
- When you want to order of **maintain order** of operations, a **Queue** would be more suitable for it's **FIFO** nature

## Heap

- When you have to find the **K**th **largest** or **smallest** entry from given collection, use Heap. You can also pass your own comparator function
- Choose min-heap or max-heap appropriately to only do `k` operations instead of `n-k` (assuming `k << n/2` )
- Sometimes **QuickSelect** might perform better instead of Heap

## Recursion and DP

- When you have to find **ALL possible** solutions such as all valid ways (subsequences /subsets / subarrays / permutations), that is when you would traverse the **entire recursion tree**
- When you have to **optimize** by finding the **largest** or **smallest** solution out of possible ones, then you'd have to go for a **DP** methodology
- In cases where you can make a **locally optimal decision** and know it would be included without having to check with other solutions, **greedy** approaches would work well there

<!-- Pre-computation (re-arrange/sort, lookup, bit-magic) -->
<!-- Graphs & Trees -->
