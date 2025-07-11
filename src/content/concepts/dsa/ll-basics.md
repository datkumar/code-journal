---
title: Singly Linked-List basics
tags: [dsa]
---

## Node Representation

```cpp title="Linked-List Node"
template <typename T = int>
struct Node {
    T val;
    Node* next;
    Node (T _val) : val(_val), next(nullptr) {}
};
```

## Insertion

To insert an entry at the **beginning** of the List:

```cpp title="Insert at start"
template <typename T = int>
void insertStart (Node<T> *&head, T val) {
    // Create new node
    Node<T> *newNode = new Node(val);
    if (!head) {         // Empty list
        head = newNode;  // New node will be the head and only node
        return;
    }
    // Update new node as head whose next is old head
    newNode->next = head;
    head = newNode;
}
```

To insert an entry at the **end** of the List:

```cpp title="Insert at end"
template <typename T = int>
void insertEnd (Node<T> *&head, T val) {
    // Create new node
    Node<T> *newNode = new Node(val);
    if (!head) {         // Empty list
        head = newNode;  // New node will be the head and only node
        return;
    }
    // Traverse till last node
    Node<T> *curr = head;
    while (curr->next) {
        curr = curr->next;
    }
    // Append new node after existing last node
    curr->next = newNode;
}
```

To insert an entry at **after given node** in the List:

```cpp title="Insert after target node"
template <typename T = int>
void insertAfter (Node<T> *&target, T val) {
    // Create new node
    Node<T> *newNode = new Node(val);
    if (!target) {         // Empty target
        target = newNode;  // New node will be in place of target
        return;
    }
    // Keep track of the part of list after the target
    Node<T> *afterTarget = target->next;
    // New node will come after target and the tracked part after it
    newNode->next = afterTarget;
    target->next = newNode;
}
```

## Deletion

To delete the **starting** i.e. **first** entry from the List:

```cpp title="Delete starting node"
template <typename T = int>
void deleteFirst (Node<T> *&head) {
    if (!head) {  // Empty list, so skip
        cout << "List empty, nothing to delete" << endl;
        return;
    }
    // Update head to point to second node, then delete old head
    Node<T> *oldHead = head;
    head = head->next;
    delete oldHead;
}
```

To delete the **last** entry from the List:

```cpp title"Delete last node"
template <typename T = int>
void deleteLast (Node<T> *&head) {
    if (!head) {  // Empty list, so skip
        cout << "List empty, nothing to delete" << endl;
        return;
    }
    if (!head->next) {  // One element. After deletion, list will be empty
        delete head;
        head = nullptr;
        return;
    }
    // Traverse till last node, tracking previous node too
    Node<T> *prev = head, *curr = head->next;
    while (curr->next) {
        prev = curr;
        curr = curr->next;
    }
    // Delete last node and make second-last node point to nothing
    delete curr;
    prev->next = nullptr;
}
```

To delete a given **target node** from the List:

```cpp title="Delete given target node"
template <typename T = int>
void deleteNode (Node<T> *&head, Node<T> *target) {
    if (!target || !head) {  // When list or target node is empty, skip
        cout << "Either target or List is empty" << endl;
        return;
    }
    if (target == head) {  // First node as target to delete
        head = head->next;
        delete target;
        return;
    }
    // Traverse till last node, tracking previous node too
    Node<T> *prev = nullptr, *curr = head;  // Can have single or more elements
    while (curr && curr != target) {        // Stop when target node found or end reached
        prev = curr;
        curr = curr->next;
    }
    if (!curr) {  // Target not found in list, so skip
        cout << "Target node does NOT exist in List" << endl;
        return;
    }
    prev->next = curr->next;  // Make the node before target(curr) point to node after target.
    delete curr;              // Then delete target node
}
```

> There is also a more clever way to remove given node from List, with the help of `**indirect` pointer-to-pointer to the node we wish to delete. Linus Torvalds mentions it in a [Ted talk](https://youtu.be/o8NPllzkFhE?si=yjLA7JLl3Lk4Xw17&t=860s) when talking about _taste_ in code. Refer [here](https://felipec.github.io/good-taste/parts/1.html) for more

```cpp
void remove_list_entry(node **head, node *entry) {
    // The "indirect" pointer points to the "address" of the thing we'll update
    node **indirect = head;

    // Walk the list, looking for the thing that points to the entry we want to remove
    while ((*indirect) != entry) {
        indirect = &(*indirect)->next;
    }

    // Then just remove it
    *indirect = entry->next;
}
// Above codes assumes "entry" exists and just removes the link (not delete the node)
```

## Traversal

To iteratively print nodes of list (in forward direction):

```cpp title="Iteratively print"
template <typename T = int>
void printList (Node<T> *head) {
    Node<T> *curr = head;  // Start from head
    // Check node exists and keep moving ahead
    while (curr) {
        cout << curr->val << " -> ";
        curr = curr->next;
    }
    // Last node won't be pointing to anything
    cout << "/" << endl;
}
```

You can also use **recursion** for traversing over nodes of the list

To recursively print list nodes in **forward** direction, at each step, we will:

- First print current node
- Then make recursive call to move to next node

```cpp title="Recursively print forward"
template <typename T = int>
void printListRecur (Node<T> *curr) {
    // Base case: Node empty, so stop going further
    if (!curr) {
        cout << "/" << endl;
        return;
    }
    cout << curr->val << " -> ";  // Print current node
    printListRecur(curr->next);   // Recursive call to move to next node
}
```

To recursively print list nodes in **forward** direction, at each step, we will:

- Make recursive call to move to next node
- Print current node after the next node's recursive call has finished

```cpp title="Recursively print reverse"
template <typename T = int>
void printListReverseRecur (Node<T> *curr) {
    // Base case: Node empty, so stop going further
    if (!curr) {
        cout << "/ <- ";
        return;
    }
    printListReverseRecur(curr->next);  // Recursive call to move to next node
    cout << curr->val << " <- ";        // Print current node after the above call finishes
}
// Note: You'll need to add a "\n" or "endl" at the end of this function call
```

## Search

```cpp title="Search a value in list"
template <typename T = int>
Node<T>* search (Node<T>*& head, T key) {
    if (!head) {  // Empty list, so nothing found
        return nullptr;
    }
    Node<T>* curr = head;  // Start from head
    // Check node exists and keep moving ahead
    while (curr) {
        if (curr->val == key) {  // key FOUND
            return curr;
        }
        curr = curr->next;
    }
    return nullptr;  // Reached end, key NOT FOUND
}
```
