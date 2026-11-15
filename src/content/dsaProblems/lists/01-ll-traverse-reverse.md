---
title: Linked-List Traversals and Reversals
ds: [list]
techniques: [recursion, 2-ptr]
level: 0
links: [https://leetcode.com/problems/reverse-linked-list/]
---

**Contents**:

- [Print List in Forward and Reverse](#print-linkedlist-in-forward-and-reverse)
  - [Iterative Printing](#iterative-printing)
  - [Recursive Printing](#recursive-printing)
- [Reversing a LinkedList](#reversing-a-linkedlist)
  - [Iteratively Reversing LinkedList](#iteratively-reversing-linkedlist)
  - [Recursively Reversing LinkedList](#recursively-reversing-linkedlist)
  - [Analysis of Iterative and Recursive Reversal](#analysis-of-iterative-and-recursive-reversal)

Definition of a Linked-List node assuming character as data-type for values:

```cpp title="Linked-List Node definition"
struct Node {
    char val;
    Node* next;
    Node (char _val, Node* _next = nullptr) : val(_val), next(_next) {}
};
```

The four main types of cases for linked-list questions are: empty list, single-element list and then lists containing odd versus even number of elements

```cpp title="Boilerplate for ListList cases"
int main () {
    // Empty or Single element list cases:
    Node* empty = nullptr;         // Empty list []
    Node* single = new Node('A');  // Single element [A]
    // Odd and Even element count list cases:
    Node* odd = new Node('A', new Node('B', new Node('C')));                  // 3 (odd) elements [A,B,C]
    Node* even = new Node('A', new Node('B', new Node('C', new Node('D'))));  // 4 (even) elements [A,B,C,D]
}

```

## Print LinkedList in Forward and Reverse

All list traversals take $O(n)$ time for $n$ node in list. For reverse traversals, we while printing in **reverse**, we might need to store nodes which might be storing $O(n)$ nodes in worst case (on stack) at one point of time

### Iterative Printing

- While printing in reverse, we might store the nodes traversed during forward order within a `vector` and print those vector elements in reverse
- Another way, that is similar to how recursion works under-the-hood, is to use a `stack` where we insert into it during forward traversal; then keep popping & printing from it to get reverse ordered output
- Forward traversal takes $O(n)$ time $O(1)$ extra space while reverse traversal takes $O(2n)$ time and $O(n)$ extra space for `stack`/`vector`

```cpp title="Iteratively Print List in Forward and Reverse"
void printFwdIter (const Node* head) {
    if (!head) {
        cout << "List is Empty\n";
        return;
    }
    // Both "head" and "itr" are pointers to a "const Node" (not modifying contents)
    const Node* itr = head;
    while (itr) {
        cout << itr->val << " -> ";
        itr = itr->next;
    }
    cout << "\n";
}

void printRevIter (const Node* head) {
    if (!head) {
        cout << "List is Empty\n";
        return;
    }
    stack<const Node*> stk;
    const Node* itr = head;
    // Traverse forward and keep pushing elements into stack
    while (itr) {
        stk.push(itr);
        itr = itr->next;
    }
    // Keep popping and printing from the stack
    while (!stk.empty()) {
        char currTop = stk.top()->val;
        cout << currTop << ", ";
        stk.pop();
    }
    cout << "\n";
}

int main () {
    // ...cases boilerplate
    cout << "FORWARD Traversals ITERATIVE:\n";
    printFwdIter(empty);   // List is Empty
    printFwdIter(single);  // A ->
    printFwdIter(odd);     // A -> B -> C ->
    printFwdIter(even);    // A -> B -> C -> D ->
    cout << "\nREVERSE Traversals ITERATIVE:\n";
    printRevIter(empty);   // List is Empty
    printRevIter(single);  // A,
    printRevIter(odd);     // C, B, A,
    printRevIter(even);    // D, C, B, A,
}
```

### Recursive Printing

```cpp title="Recursively Print List in Forward and Reverse"
// Recursively Print FORWARD
void printFwdRecurHelper (const Node* curr) {
    if (!curr) {
        cout << "\n";
        return;
    }
    // Print current node then make recursive call to next node
    cout << curr->val << ", ";
    printFwdRecurHelper(curr->next);
}
void printFwdRecur (const Node* head) {
    if (!head) {
        cout << "List is Empty\n";
        return;
    }
    printFwdRecurHelper(head);
}

// Recursively Print REVERSE
void printRevRecurHelper (const Node* curr) {
    if (!curr) {
        cout << "\n";
        return;
    }
    // Make recursive call to next node. Print current node after that call finishes
    printRevRecurHelper(curr->next);
    cout << curr->val << ", ";
}
void printRevRecur (const Node* head) {
    if (!head) {
        cout << "List is Empty\n";
        return;
    }
    printRevRecurHelper(head);
}

int main () {
    // ...cases boilerplate
    cout << "FORWARD Traversals RECURSIVE:\n";
    printFwdRecur(empty);   // List is Empty
    printFwdRecur(single);  // A,
    printFwdRecur(odd);     // C, B, A,
    printFwdRecur(even);    // D, C, B, A,
    cout << "\nREVERSE Traversals RECURSIVE:\n";
    printRevRecur(empty);   // List is Empty
    printRevRecur(single);  // A,
    printRevRecur(odd);     // C, B, A,
    printRevRecur(even);    // D, C, B, A,
}
```

---

## Reversing a LinkedList

> **Trivial case**: When list **empty** or contains **one node**, return the list **as-is** as head of the reversed list

### Iteratively Reversing LinkedList

```txt
Maintain 2 pointers - CURR pointing to FIRST node in list and PREV not pointing to anything

Keep going as long as CURR is pointing to something i.e. there are remaining nodes in list to reverse:
    Track the next part of current node in a LATER pointer as we'll process those after CURR link is reversed
    Make the  next pointer of CURR node point to what PREV is pointing to (we have reversed the next pointer link)
    Make PREV point to CURR (this is the head of the new reverse list)
    Shift CURR to point to the ahead part that LATER was tracking

Return final answer as PREV which points to head (first node) in the reversed list
```

The `curr` pointer tracks the node we are currently reversing links of. The `prev` pointer tracks the head i.e. first node in the new reversed list that we keep updating the next link of `curr` to point to (i.e. we are appending to newly reversed link from the front)

<details>
<summary><strong>C++ Implementation Code</strong></summary>

```cpp title="Iteratively Reversing a LinkedList"
Node* reverseListIter (Node* head) {
    if (!head || !head->next) {  // Trivial case: Empty or Single node
        return head;
    }
    // Maintain two pointers. "prev" denotes last-processed node
    // and it is head of the reversed list at each step i.e. newHead
    Node *prev = nullptr, *curr = head;
    while (curr) {
        Node* later = curr->next;  // Track ahead part of current
        curr->next = prev;         // Reverse "next" link of current to point to prev (i.e. to head of reversed list)
        prev = curr;               // Update prev (i.e. newHead) to point to the current reversed-link node
        curr = later;              // Shift current to the tracked aheadPart to be processed in upcoming pass
    }
    return head = prev;  // Return final answer as prev i.e. head of the reversed list
}
int main () {
    // ...cases boilerplate
    printFwdIter(empty);  // List is Empty
    empty = reverseListIter(empty);
    printFwdIter(empty);  // List is Empty

    printFwdIter(single);  // A ->
    single = reverseListIter(single);
    printFwdIter(single);  // A ->

    printFwdIter(odd);  // A -> B -> C ->
    odd = reverseListIter(odd);
    printFwdIter(odd);  // C -> B -> A ->

    printFwdIter(even);  // A -> B -> C -> D ->
    even = reverseListIter(even);
    printFwdIter(even);  // D -> C -> B -> A ->
}
```

The trivial case doesn't even need to be written explicitly, it gets handled by our core logic:

```cpp
Node* reverseListIter (Node* head) {
    Node *newHead = nullptr, *curr = head;
    while (curr) {
        Node* later = curr->next;
        curr->next = newHead;
        newHead = curr;
        curr = later;
    }
    return head = newHead;
}
```

</details>

Below diagram shows dry-run of the 5 passes in reversing a linked list with 4 nodes:

![Reverse LinkedList Iteratively](/code-journal/diagrams/ll-reverse-iter.svg)

---

### Recursively Reversing LinkedList

The **trivial case** of zero or one nodes in list also becomes the **base-case** for stopping our recursive calls from going further.

```txt
func (Node *curr) {
    BASE_CASE i.e. Last node or no nodes present:
        return "curr" node as-is as head of the new reversed list

    Make recursive call to the node after "curr" and store result of that call

    Flip the "next" link of the node after "curr" node to point back to the current node
    Make "curr" node as last node and not pointing to anything

    Keep returning the head of the new reversed list upwards as result of prior calls
}
```

<details>
<summary><strong>C++ Implementation Code</strong></summary>

```cpp title="Recursively Reversing LinkedList"
Node* reverseListRecur (Node* curr) {
    if (!curr || !curr->next) {  // Base-case: Zero or one nodes
        // When last node reached, stop recursive calls and return that last node as-is
        return curr;
    }

    // Make recursive function call on next node and store result of it
    // This result is the new head of the reversed list (its just last node for base-case)
    Node* newHead = reverseListRecur(curr->next);

    // Reverse the "next" link of the node that exists AFTER the current node:
    Node* later = curr->next;  // Track what node is ahead of current node
    later->next = curr;        // Make the "next" link of that node point to current node
    curr->next = nullptr;      // Make current not point to anything
    // Now, the current node does not point to anything (its "next" of it is NULL)
    // But the node that was earlier ahead of it now points in reverse back to the current node

    // Keep returning the new head of the reversed list upwards (from last call upto first)
    return newHead;
}
```

</details>

Below diagram shows dry-run of executing steps within the recursive calls for reversing a linked-list with 4 nodes. The pink arrow indicates a further recursive call on the node next to `curr` node and the purple arrow indicates returning-back the result after the current call has finished. The red box denotes the base-case for terminating recursive calls when we have reached the last node in the list; that last node is returned as-is as the head of the new reversed list.

![Reverse LinkedList Recursively](/code-journal/diagrams/ll-reverse-recur.svg)

### Analysis of Iterative and Recursive Reversal

- Both iterative and recursive reversals of linked-list visit every node only once so the time complexity for both of them is $O(n)$
- However, the iterative reversal uses just 2-3 pointers to track nodes at each step while operating on them, so its space complexity is $O(1)$, while the recursive reversal involves making a function call on the next node at every node, leading to $O(n)$ space-complexity for call-stack in case of recursive approach
