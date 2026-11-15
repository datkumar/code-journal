---
title: Singly Linked-List basics
ds: [list]
techniques: [design, 2-ptr]
level: 0
links:
  [
    https://leetcode.com/problems/delete-node-in-a-linked-list/,
    https://leetcode.com/problems/remove-linked-list-elements/,
    https://leetcode.com/problems/remove-duplicates-from-sorted-list/,
  ]
---

**Contents**:

- [Node Representation](#node-representation)
- [Insertion](#insertion)
  - [Insert at Start](#insert-at-start)
  - [Insert at End](#insert-at-end)
  - [Insert After Given node](#insert-after-given-node)
- [Deletion](#deletion)
  - [Delete First node](#delete-first-node)
  - [Delete Last node](#delete-last-node)
  - [Delete Given node](#delete-given-node)
  - [Delete All occurrences of Value](#delete-all-occurrences-of-value)
- [Search](#search)

## Node Representation

```cpp title="Linked-List Node"
struct Node {
    int val;
    Node* next;
    // Paramterized Constructor with member initializer list. Default value of "next" is NULL
    Node (int _val, Node* _next = nullptr) : val(_val), next(_next) {}
};
```

- For non-modifying operations like printing list nodes, we are keeping a pointer to constant node i.e. `void print(const Node* head){...}` in function parameters (which does not modify node contents) and keeping return-type as `void`
- For modifying operations like insertion or deletion, we are passing a modifiable pointer in function parameters as `Node* someOperation(Node *head){...}` and also returning the head of the list as `Node*` return-type after the operation completes. When calling these functions we would have to re-assign `head` of the list after each such operation as `head = someOperation(head);`
- We could also pass the `head` by reference in function parameters for modifying operations as `void someOperation(Node* &head){...}` and keep `void` as return-type. It would update the original `head` instead of a copied value of it. In this case, we wouldn't need to re-assign `head` after each such operation and it would simply just be `someOperation(head);`
- We could also pass **C-style** pointer-to-pointer for accessing `head` node reference in function parameters as `void someOperation(Node** head){...}`. C has everything pass-by-value and does not support references like C++ does. So we use a pointer-to-pointer to achieve pass-by-reference behavior and modify things in-place

Here is the function to iterate over list nodes and print them:

```cpp
void printList (const Node* const head) {
    if (!head) {
        cout << "List is Empty\n";
        return;
    }
    // Both "head" and "itr" are pointers to a "const Node" (don't modify contents)
    // Keep moving forward till current node is not NULL
    // We can also write middle condition as just "itr;"
    for (const Node* itr = head; (itr != nullptr); itr = itr->next) {
        cout << itr->val << " -> ";
    }
    cout << "\n";
}
```

The cases for linked-list questions are usually: empty list, single-node list, two-node list, odd node count, even node count. You can use following boilerplate for it:

```cpp
int main () {
    // Empty, Single and Double element list cases:
    Node* empty = nullptr;                 // Empty list []
    Node* single = new Node(1);            // Single element [1]
    Node* two = new Node(1, new Node(2));  // Two elements [1,2]
    // Odd and Even element count list cases:
    Node* odd = new Node(1, new Node(2, new Node(3)));                // 3 (odd) elements [1,2,3]
    Node* even = new Node(1, new Node(2, new Node(3, new Node(4))));  // 4 (even) elements [1,2,3,4]
}
```

## Insertion

Insertion is fast at the start or at given node taking $O(1)$ time as it just involves editing few pointers. However, inserting at end requires traversing all nodes in the list, taking $O(n)$ time for $n$ nodes

### Insert at Start

The only two cases need to handle are whether list is empty or some node exists at start. Insertion at start does not require traversing all the nodes so it takes just $O(1)$ time

```cpp title="Insert at Start"
Node* insertAtStart (Node* head, const int value) {
    if (!head) {                        // Empty List
        return head = new Node(value);  // Create new node and return it as head
    }
    Node* oldHead = head;  // Track first node in existing list
    // Create new node with "next" as old first node. Make head as new node and return it
    return head = new Node(value, oldHead);
}
```

The above code can be shortened by clubbing the empty-list case with general case as follows:

```cpp
Node* insertAtStart (Node* head, const int value) {
    return head = new Node(value, head);
}
```

<details>
<summary>See output of running <code>insertAtStart</code> over the cases</summary>

```cpp title="insertAtStart over the cases"
int main () {
    // cases boilerplate...
    printList(empty);  // List is Empty
    empty = insertAtStart(empty, 25);
    printList(empty);  // 25 ->

    printList(single);  // 1 ->
    single = insertAtStart(single, 25);
    printList(single);  // 25 -> 1 ->

    printList(two);  // 1 -> 2 ->
    two = insertAtStart(two, 25);
    printList(two);  // 25 -> 1 -> 2 ->

    printList(odd);  // 1 -> 2 -> 3 ->
    odd = insertAtStart(odd, 25);
    printList(odd);  // 25 -> 1 -> 2 -> 3 ->

    printList(even);  // 1 -> 2 -> 3 -> 4 ->
    even = insertAtStart(even, 25);
    printList(even);  // 25 -> 1 -> 2 -> 3 -> 4 ->
}
```

</details>

### Insert at End

The only two cases need to handle are whether list is empty or some node exists as last node. Insertion at end requires **traversing all the nodes** to reach last node so it takes $O(n)$ time for $n$ nodes

```cpp title="Insert at End"
Node* insertAtEnd (Node* head, const int value) {
    if (!head) {                       // Empty List
        return new Node(value, head);  // Create new node and return it as head
    }
    // Traverse list till we reach the last node in list:
    Node* curr = head;
    while (curr->next) {    // Keep moving till there exists a node ahead of current
        curr = curr->next;  // Move ahead to next node
    }
    // Now we have reached last node whose "next" is NULL
    curr->next = new Node(value);  // Create new node and append it to the last node
    return head;                   // Head of list doesn't change
}
```

<details>
<summary>See output of running <code>insertAtEnd</code> over the cases</summary>

```cpp title="insertAtEnd over the cases"
int main () {
    // cases boilerplate...
    printList(empty);  // List is Empty
    empty = insertAtEnd(empty, 25);
    printList(empty);  // 25 ->

    printList(single);  // 1 ->
    single = insertAtEnd(single, 25);
    printList(single);  // 1 -> 25 ->

    printList(two);  // 1 -> 2 ->
    two = insertAtEnd(two, 25);
    printList(two);  // 1 -> 2 -> 25 ->

    printList(odd);  // 1 -> 2 -> 3 ->
    odd = insertAtEnd(odd, 25);
    printList(odd);  // 1 -> 2 -> 3 -> 25 ->

    printList(even);  // 1 -> 2 -> 3 -> 4 ->
    even = insertAtEnd(even, 25);
    printList(even);  // 1 -> 2 -> 3 -> 4 -> 25 ->
}
```

</details>

### Insert After Given node

We cannot insert after an empty node so the given node _must_ be an **existing node** in the list. We would never be changing `head` of the list as we are insert AFTER the `target` node, even if target was `head`. Thereby, we don't need to pass `head` parameter nor do we need to return any pointer i.e. `void` return-type. Insertion after given node does not require traversing over the nodes; only editing given node's pointer, so it takes just $O(1)$ time

```cpp title="Insert after Given node"
void insertAfter (Node* target, const int value) {
    if (!target) {  // Safety check: cannot insert after nothing
        return;
    }
    // Track what lies next after this node
    Node* aheadPart = target->next;
    // Create new node after target whose next is the part ahead of target
    target->next = new Node(value, aheadPart);
}
```

The short-hand version of above code is:

```cpp
void insertAfter (Node* target, const int value) {
    if (!target) return;
    target->next = new Node(value, target->next);
}
```

<details>
<summary>See output of running <code>insertAfter</code> over list nodes</summary>

```cpp title="insertAfter examples"
int main(){
    Node* head = new Node(1, new Node(2, new Node(3, new Node(4))));
    printList(head);                    // 1 -> 2 -> 3 -> 4 ->
    insertAfter(head, 25);              // after first node
    printList(head);                    // 1 -> 25 -> 2 -> 3 -> 4 ->
    insertAfter(head->next->next, 47);  // i.e. after node "2"
    printList(head);                    // 1 -> 25 -> 2 -> 47 -> 3 -> 4 ->
}
```

</details>

---

## Deletion

### Delete First node

The only two cases need to handle are whether list is empty or some node exists at start. Deletion at start does not require traversing all the nodes so it takes just $O(1)$ time

```cpp title="Delete First node"
Node* deleteFirst (Node* head) {
    if (!head) {  // Empty list, so skip deletion
        cout << "List is Empty. Nothing to delete\n";
        return head;
    }
    Node* nodeToDelete = head;  // Track first node, which we will be deleting
    head = head->next;          // Update head to point to what lies after first node
    delete nodeToDelete;        // De-allocate memory of i.e. delete first node
    nodeToDelete = nullptr;     // Make pointer null to avoid referencing deleted memory
    return head;                // Return updated head of list
}
```

<details>
<summary>See output of running <code>deleteFirst</code> over the cases</summary>

```cpp title="deleteFirst over the cases"
int main () {
    // cases boilerplate...
    printList(empty);           // List is Empty
    empty = deleteFirst(empty); // List is Empty. Nothing to delete
    printList(empty);           // List is Empty

    printList(single);  // 1 ->
    single = deleteFirst(single);
    printList(single);  // List is Empty

    printList(two);  // 1 -> 2 ->
    two = deleteFirst(two);
    printList(two);  // 2 ->

    printList(odd);  // 1 -> 2 -> 3 ->
    odd = deleteFirst(odd);
    printList(odd);  // 2 -> 3 ->

    printList(even);  // 1 -> 2 -> 3 -> 4 ->
    even = deleteFirst(even);
    printList(even);  // 2 -> 3 -> 4 ->
}
```

</details>

### Delete Last node

You need to handle three cases: empty list, single-element list and multi-element list. In the general multi-element list case, we maintain two pointers `prev` and `curr` and traverse till the last node in list before deleting the last node and updating second-last node. This takes $O(n)$ time overall

```cpp title="Delete Last node"
Node* deleteLast (Node* head) {
    if (!head) {  // Empty list, so skip deletion
        cout << "List is Empty. Nothing to delete\n";
        return head;
    }
    if (!head->next) {  // Single element list
        // Delete first node, make head null and return it
        delete head;
        return head = nullptr;
    }
    // Maintain two pointers. Traverse till last node of list
    Node *prev = nullptr, *curr = head;
    while (curr->next) {    // Keep moving till there exists a node ahead of current
        prev = curr;        // First move the previous element pointer to current
        curr = curr->next;  // Then move current pointer ahead
    }
    // Now "prev" points to second-last and "curr" points to last node in list
    // We have to delete "curr" node and make "prev" as last node pointing to NULL
    delete curr;
    prev->next = curr = nullptr;
    // First node not modified so return head as-is
    return head;
}
```

<details>
<summary>See output of running <code>deleteLast</code> over the cases</summary>

```cpp title="deleteLast over the cases"
int main () {
    // cases boilerplate...
    printList(empty);           // List is Empty
    empty = deleteLast(empty);  // List is Empty. Nothing to delete
    printList(empty);           // List is Empty

    printList(single);  // 1 ->
    single = deleteLast(single);
    printList(single);  // List is Empty

    printList(two);  // 1 -> 2 ->
    two = deleteLast(two);
    printList(two);  // 1 ->

    printList(odd);  // 1 -> 2 -> 3 ->
    odd = deleteLast(odd);
    printList(odd);  // 1 -> 2 ->

    printList(even);  // 1 -> 2 -> 3 -> 4 ->
    even = deleteLast(even);
    printList(even);  // 1 -> 2 -> 3 ->
}
```

</details>

### Delete Given node

Deleting the head node is takes just $O(1)$ time but deleting a node anywhere else requires traversing the list till we reach the `target` node as we need to edit links of the node BEFORE given `target` node too. IN worst-case, we might end up traversing whole list till last node if `target` node doesn't exist in list, resulting in $O(n)$ time

```cpp title="Delete Given node"
Node* deleteGivenNode (Node* head, Node* target) {
    if (!head) {  // Empty list, so skip deletion
        cout << "List is Empty. Nothing to delete\n";
        return head;
    }
    if (!target) {  // Empty target node, so skip deletion
        cout << "Given target node to delete is Empty\n";
        return head;
    }
    if (target == head) {  // Target is the first node of list
        head = head->next;
        delete target;
        return head;
    }
    // Maintain two pointers. Traverse till target node reached. Else till last node in list
    Node *prev = nullptr, *curr = head;
    while (curr != target && curr->next) {  // Stop when target node found or reached last node
        prev = curr;
        curr = curr->next;
    }
    if (!curr->next && curr != target) {  // Reached last node but target node not found
        cout << "Given target node to delete does NOT EXIST in this list\n";
        return head;
    }
    // Now "curr" is at "target" node to be deleted
    prev->next = curr->next;
    delete target;
    return head;
}
```

<details>
<summary>See output of running <code>deleteGivenNode</code> over the cases</summary>

```cpp title="deleteGivenNode over the cases"
int main() {
    // cases boilerplate...
    Node* dummyTarget = new Node(75);

    printList(empty);                             // List is Empty
    empty = deleteGivenNode(empty, dummyTarget);  // List is Empty. Nothing to delete
    printList(empty);                             // List is Empty

    printList(single);                          // 1 ->
    single = deleteGivenNode(single, nullptr);  // Given target node to delete is Empty
    printList(single);                          // 1 ->
    single = deleteGivenNode(single, single);   // deleting the first and only element of list
    printList(single);                          // List is Empty

    printList(two);                         // 1 -> 2 ->
    two = deleteGivenNode(two, two->next);  // deleting second node in list
    printList(two);                         // 1 ->

    printList(odd);                         // 1 -> 2 -> 3 ->
    odd = deleteGivenNode(odd, odd->next);  // deleting second node in list
    printList(odd);                         // 1 -> 3 ->

    printList(even);                                 // 1 -> 2 -> 3 -> 4 ->
    even = deleteGivenNode(even, dummyTarget);       // Given target node to delete does NOT EXIST in this list
    printList(even);                                 // 1 -> 2 -> 3 -> 4 ->
    even = deleteGivenNode(even, even->next->next);  // deleting third node in list
    printList(even);                                 // 1 -> 2 -> 4 ->
    even = deleteGivenNode(even, even->next->next);  // deleting third i.e. last node "4" in list
    printList(even);                                 // 1 -> 2 ->
}
```

</details>

> There is also a clever way to delete given node from List, with the help of `**indirect` pointer-to-pointer to the node we wish to delete. Linus Torvalds mentions it in a [Ted talk](https://youtu.be/o8NPllzkFhE?si=yjLA7JLl3Lk4Xw17&t=860s) when talking about _taste_ in code. Refer [this article](https://felipec.github.io/good-taste/parts/1.html) for more

```cpp title="Traditional way to delete given node"
void remove_list_entry (Node** head, Node* target) {
   if (!head || !*head || !target) {  // Safety guards
        return;
    }
    Node *prev = nullptr, *curr = *head;
    // Walk the list with a bounds check
    while (curr && curr != target) {
        prev = curr;
        curr = curr->next;
    }
    if (!curr) {  // If target was not found, exit safely
        return;
    }
    // Remove the entry by updating the head or the previous entry i.e. unlink the node
    if (!prev) {
        *head = target->next;
    } else {
        prev->next = target->next;
    }
    delete target;  // De-allocate target node's memory from heap
}
```

```cpp title="Elegant way to delete given node"
void remove_list_entry (Node** head, Node* target) {
    if (!head || !*head || !target) {  // Safety guards
        return;
    }
    // The "indirect" pointer points to the "address" of the pointer we'll update
    Node** indirect = head;
    // Walk the list looking for the pointer that points to our target node
    while (*indirect && *indirect != target) {
        indirect = &((*indirect)->next);
    }
    // If found, unlink it (safely handles head, middle, and tail identically)
    if (*indirect) {
        *indirect = target->next;  // Unlink the node
        delete target;             // De-allocate target node's memory from heap
    }
}
```

If we are guaranteed that `target` node is **NOT the last node** and we're allowed to **edit values of the node itself** such as in the LeetCode question [Delete Node in a Linked List](https://leetcode.com/problems/delete-node-in-a-linked-list/), we can edit node data and links in=place to achieve deletion

```cpp title="Delete given Non-Tail node"
void deleteNode(Node* target) {
    Node* temp = target->next;
    target->val = temp->val;
    target->next = temp->next;
    delete temp;
}
```

### Delete All Occurrences of Value

This is the question [Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/description/) from LeetCode:

We maintain two pointers `prev` and `curr` while moving over nodes of list till we reach the end of list. We delete node at `curr` if its value equals `key`. The special case we need to take care of is when the `head` node is to be deleted and actual `head` of final answer list is should be updated. Since we are traversing all nodes of list, it takes $O(n)$ time but each deletion operation after reaching respective node is $O(1)$

```cpp title="Delete All Occurrences of Value"
Node* deleteOccurrences (Node* head, int key) {
    // Maintain two pointers and keep traversing till end of list
    Node *prev = nullptr, *curr = head;
    while (curr) {
        if (curr->val == key) {  // "curr" node is to be deleted
            Node* nodeToDelete = curr;
            // Unlink targeted deletion node from the list (handles both head and non-head node link updates)
            if (prev == nullptr) {        // "curr" node to delete is the head node
                head = curr->next;        // Update "head" of list to point to what lies ahead of "curr" node
            } else {                      // "curr" node to delete is a non-head node
                prev->next = curr->next;  // Update "prev" to point to what lies ahead of "curr" node
            }
            // Move "curr" one position ahead BEFORE we destroy the memory
            curr = curr->next;
            delete nodeToDelete;
        } else {
            // Move both pointers one position ahead
            prev = curr;
            curr = curr->next;
        }
    }
    return head;  // return answer as head of final updated list
}
```

> Creating a `dummy` node to track updated `head` of list after deletions simplifies the cases and handles deletions at start as well as anywhere else:

```cpp title="Using Dummy node to Delete All Occurrences of Value"
Node* deleteOccurrences (Node* head, int key) {
    // Create dummy node to track updated head of list (handles deletions at start)
    Node* dummy = new Node(0, head);  // assuming "key" >= 1
    // Maintain two pointers and keep traversing till end of list
    Node *prev = dummy, *curr = head;
    while (curr) {
        if (curr->val == key) {            // "curr" node is to be deleted
            Node* aheadPart = curr->next;  // Track what lies ahead of "curr" node
            prev->next = aheadPart;        // Make "prev" point to that ahead part
            delete curr;                   // Delete "curr" node
            curr = aheadPart;              // Move "curr" one position ahead (over the deleted node)
        } else {
            // Move both pointers one position ahead
            prev = curr;
            curr = curr->next;
        }
    }
    // Store head of final updated list to return as answer and delete dummy node
    Node* finalHead = dummy->next;
    delete dummy;
    return finalHead;
}
```

<details>
<summary>See output of running <code>deleteOccurrences</code> over the cases</summary>

```cpp title="deleteOccurrences over the cases"
int main () {
    Node* l1 = new Node(1, new Node(2, new Node(3)));
    printList(l1);                   // 1 -> 2 -> 3 ->
    l1 = deleteOccurrences(l1, 50);  // key that does NOT exist in list
    printList(l1);                   // 1 -> 2 -> 3 ->

    Node* l2 = new Node(1, new Node(2, new Node(3, new Node(4, new Node(3)))));
    printList(l2);                  // 1 -> 2 -> 3 -> 4 -> 3 ->
    l2 = deleteOccurrences(l2, 3);  // key that does exists in multiple places
    printList(l2);                  // 1 -> 2 -> 4 ->

    Node* l3 = new Node(3, new Node(1, new Node(3, new Node(4, new Node(3, new Node(3))))));
    printList(l3);                  // 3 -> 1 -> 3 -> 4 -> 3 -> 3 ->
    l3 = deleteOccurrences(l3, 3);  // key that does exists in head as well as other places
    printList(l3);                  // 3 -> 1 -> 3 -> 4 -> 3 -> 3 ->

    Node* l4 = new Node(3, new Node(1));
    printList(l4);                  // 3 -> 1 ->
    l4 = deleteOccurrences(l4, 3);  // key that does exists only at head
    printList(l4);                  // 1 ->

    Node* l5 = new Node(1, new Node(3));
    printList(l5);                  // 1 -> 3 ->
    l5 = deleteOccurrences(l5, 3);  // key that does exists only at tail
    printList(l5);                  // 1 ->

    Node* l6 = new Node(3, new Node(3, new Node(3, new Node(3))));
    printList(l6);                  // 3 -> 3 -> 3 -> 3 ->
    l6 = deleteOccurrences(l6, 3);  // All nodes are to be deleted
    printList(l6);                  // List is Empty

    Node* l7 = new Node(3);
    printList(l7);                  // 3 ->
    l7 = deleteOccurrences(l7, 3);  // single node that exists is to be deleted
    printList(l7);                  // List is Empty
}
```

</details>

Another similar question to this one is [Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/) on LeetCode. We would be using a `dummy` node like before and deleting `curr` node if it holds same value as `prev`

```cpp title="Remove Duplicates from Sorted List"
Node* deleteDuplicates (Node* head) {
    Node* dummy = new Node(INT_MIN, head);  // node values are in range [-100, 100]
    Node *prev = dummy, *curr = head;
    while (curr) {
        if (curr->val == prev->val) {  // "curr" node to be deleted as it holds same value as "prev"
            Node* aheadPart = curr->next;
            prev->next = aheadPart;
            delete curr;
            curr = aheadPart;
        } else {
            prev = curr;
            curr = curr->next;
        }
    }
    Node* finalHead = dummy->next;
    delete dummy;
    return finalHead;
}
```

---

## Search

We traverse through the list till we reach either the first occurrence of `key` or till end of list. If found, we return that first occurrence node as answer i.e. `Node*` type else `nullptr` when key not found. Since we're traversing over each node like linear search, in worst case it could take $O(n)$ time

```cpp title="Search a value in list"
Node* searchKey (Node* head, int key) {
    if (!head) {  // No values exist to be searched
        cout << "Empty list. No values exist\n";
        return nullptr;
    }
    // Traverse list till first occurrence of key (or till end if not exists)
    Node* curr = head;
    while (curr) {
        if (curr->val == key) {  // key FOUND at this node
            return curr;         // return this node as answer
        }
        curr = curr->next;  // keep moving ahead
    }
    return nullptr;  // Reached end, key NOT FOUND
}
```

<details>
<summary>See output of running <code>searchKey</code> over the cases</summary>

```cpp
int main () {
    Node* l1 = nullptr;
    Node* res1 = searchKey(nullptr, 3);  // Empty list. No values exist

    Node* l2 = new Node(1, new Node(2, new Node(3, new Node(4, new Node(3, new Node(5))))));
    printList(l2);  // 1 -> 2 -> 3 -> 4 -> 3 -> 5 ->

    Node* res2 = searchKey(l2, 3);
    if (res2) cout << "key 3 FOUND at address " << res2 << " in list\n";
    else cout << "key 3 NOT FOUND in list\n";
    // key 3 FOUND at address 0x62c2048f0070 in list

    Node* res3 = searchKey(l2, 25);
    if (res3) cout << "key 25 FOUND at address " << res2 << " in list\n";
    else cout << "key 25 NOT FOUND in list\n";
    // key 25 NOT FOUND in list
}
```

</details>

See next section [Linked-List Traversals and Reversals](/code-journal/dsa/lists/01-ll-traverse-reverse/) for more
