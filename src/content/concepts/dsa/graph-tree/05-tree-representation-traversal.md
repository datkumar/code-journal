---
title: Tree Representation and Traversal
tags: [dsa, tree]
---

Trees as used in computing are similar to but can be different from mathematical constructs of trees in graph theory. In computer science, a tree is a widely used abstract data type that represents a **hierarchical** tree structure with a set of connected nodes. Each node in the tree can be connected to many children (depending on the type of tree), but must be connected to exactly one parent, except for the root node, which has no parent (i.e., the root node as the top-most node in the tree hierarchy).

Generally, we use to a rooted out-tree i.e. edge connection links pointing down (away from root, towards the children) which is also known as arborescence in graph theory

![Tree example](/code-journal/diagrams/tree-example.svg)

Due to the special constraints in the properties of trees (such as no loops), each child can be treated like the root node of its own subtree, making **recursion** a useful technique for tree traversal

In contrast to linear data structures, many trees cannot be represented by relationships between neighboring nodes (parent and it's children nodes of a node under consideration, if they exist) in a single straight line (called edge or link between two adjacent nodes).

## Tree Representation

![Tree and it's representation](/code-journal/diagrams/tree-representation.svg)

The Tree ADT can be represented in a number of ways such as:

- A list of parents with pointers to children (most common, used with out-trees)
- A list of nodes where each stores a reference to its parent (useful for navigating upward, often seen in in-trees)
- A list of nodes and a separate list of parent-child relations (a specific type of adjacency list)

Representations might also be more complicated, for example using indexes or ancestor lists for performance.

Binary trees are a commonly used type, which constrain the number of children for each parent to at most two. Above image is example of a out-tree which is a rooted out-tree. Each child edge corresponds to a pointer from one node to it's children. If the pointer is null, it means that child is not present on that link

## Node Representation

![Tree node representation](/code-journal/diagrams/tree-node-representation.svg)

For a **Binary tree**, we will have only two child links, `left` and `right`. These may be pointing to a child node or empty i.e. not having any child below it. Recursively, each child node will also have the same ADT format:

Technically, a Singly **Linked-list** can also be thought of a a **skewed tree** where each node only has one or none left child link

```cpp title="Binary Tree nodes"
template <typename T = int>
struct Node {
    T val;                  // Value stored at node
    Node<T> *left, *right;  // LEFT and RIGHT child links

    // Value-Parameter Constructor
    Node (T _val) : val(_val), left(nullptr), right(nullptr) {}

    // Destructor
    ~Node () {
        delete left;
        delete right;
    }
};

int main () {
    auto *root1 = new Node(5);
    Node<int> *r1n1 = new Node(7);
    Node<int> *r1n2 = new Node<int>(2);
    root1->left = r1n1;
    root1->right = r1n2;
    /*
            5
           / \
          7   2
    */

    auto *root2 = new Node('A');
    Node<char> *r2n1 = new Node('B');
    Node<char> *r2n2 = new Node<char>('C');
    root2->left = r2n1;
    root2->right = r2n2;
    /*
             A
            / \
           B   C
    */
    return 0;
}
```

Note that `Node *root = new Node(5);` won't work because class template parameters are not deduced from constructor arguments (unlike function templates).

## N-ary trees

A tree can have more than $2$ children at each node. Such trees are called $n$-ary trees. Here, we keep the child links as a list of pointers instead of just `left` and `right` that we saw in binary tree.

```cpp title="N-ary Tree nodes"
template <typename T = int>
struct Node {
    T val;                       // Value stored at node
    vector<Node<T> *> children;  // List of child links

    // Value-Parameter Constructor
    Node (T _val) : val(_val) {}

    // Destructor
    ~Node () {
        for (Node *child : children) {
            delete child;
        }
    }
};

int main () {
    auto *root1 = new Node(5);
    Node<int> *r1c1 = new Node(7);
    Node<int> *r1c2 = new Node<int>(2);
    Node<int> *r1c3 = new Node<int>(8);
    root1->children = {r1c1, r1c2, r1c3};

    auto *c1c1 = new Node(6), *c1c2 = new Node(4);
    r1c1->children = {c1c1, c1c2};

    Node<int> *c2c1 = new Node(1), *c2c2 = new Node<int>(3), *c2c3 = new Node(9);
    r1c2->children = {c2c1, c2c2, c2c3};
    /*
                5
              / \ \
            /   \  \
          7     2    8
         /\    /\ \
        /  \  /  \ \
       6   4  1  3  9
    */
    return 0;
}
```

## Array representation

![Binary Tree Array Representation](/code-journal/diagrams/binary-tree-array-representation.svg)

- Binary trees can also be stored in breadth-first order (level-wise) as an implicit data structure in arrays, and if the tree is a **complete binary tree**, this method wastes no space.
- In this compact arrangement, if a node has an index $i$, its children are found at indices $2i+1$ (for the `left` child) and $2i +2$ (for the `right`), while its parent (if any) is found at index $ \left \lfloor {\frac{i-1}{2}} \right \rfloor $ (assuming the root has index zero)
- Alternatively, with a `1`-indexed array, the implementation is simplified with children found at $2i$ and $2i+1$ with parent found at $ \lfloor i/2\rfloor $

This method benefits from more compact storage and better locality of reference, particularly during a preorder traversal. It is often used for **binary heaps**

## Tree Traversal

Stepping through the items of a tree, by means of the connections between parents and children, is called walking the tree, and the action is a **walk** of the tree. Often, an operation might be performed when a pointer arrives at a particular node

- A walk in which each parent node is traversed before its children is called a **pre-order** walk
- A walk in which the children are traversed before their respective parents are traversed is called a **post-order** walk
- A walk in which a node's left subtree, then the node itself, and finally its right subtree are traversed is called an **in-order** traversal. (This last scenario, referring to exactly two subtrees, a left subtree and a right subtree, assumes specifically a binary tree.)
- A **level-order** walk effectively performs a **BFS** over the entirety of a tree; nodes are traversed level by level, where the root node is visited first, followed by its direct child nodes and their siblings, followed by its grandchild nodes and their siblings, etc., until all nodes in the tree have been traversed.

In below traversal codes, note that `const` indicates that the nodes are just accessed during traversal and not modified in any way

## Pre-order Traversal

Sequence: `<CURRENT-node> <LEFT-child> <RIGHT-child>`

The excution of recursive function calls also follow this preorder sequence, meaning the current function call is executed completely and then we move to further recursive calls in current function execution block

The pre-order traversal is a **topologically sorted** one, because a parent node is processed before any of its child nodes is done.

```cpp title="Pre-order traversal"
template <typename T = int>
void preorder (const Node<T> *curr, vector<T> &traversal) {
    if (!curr) return;                 // Base-case (stop going further down)
    traversal.push_back(curr->val);    // Process CURRENT node
    preorder(curr->left, traversal);   // Visit LEFT child
    preorder(curr->right, traversal);  // Visit RIGHT child
}
```

## Post-order Traversal

Sequence: `<LEFT-child> <RIGHT-child> <CURRENT-node>`

```cpp title="Post-order traversal"
template <typename T = int>
void postorder (const Node<T> *curr, vector<T> &traversal) {
    if (!curr) return;                  // Base-case (stop going further down)
    postorder(curr->left, traversal);   // Visit LEFT child
    postorder(curr->right, traversal);  // Visit RIGHT child
    traversal.push_back(curr->val);     // Process CURRENT node
}
```

## In-order Traversal

Sequence: `<LEFT-child> <CURRENT-node> <RIGHT-child>`

```cpp title="In-order traversal"
void inorder (const Node<T> *curr, vector<T> &traversal) {
    if (!curr) return;                // Base-case (stop going further down)
    inorder(curr->left, traversal);   // Visit LEFT child
    traversal.push_back(curr->val);   // Process CURRENT node
    inorder(curr->right, traversal);  // Visit RIGHT child
}
```

## Level-order Traversal

Sequence: `<root> <Lvl-1 nodes> <Lvl-2 nodes> ...`

At each level, the nodes are processed from left to right, as that is the fashion in which the child links get added for next processing

```cpp title="Level-order traversal"
template <typename T = int>
vector<vector<T>> levelorder (const Node<T> *root) {
    if (!root) return {};

    vector<vector<T>> allLevelTraversal;
    queue<const Node<T> *> upcoming;

    upcoming.push(root);
    while (!upcoming.empty()) {
        vector<T> currLevelTraversal;
        size_t levelNodeCount = upcoming.size();

        for (size_t i = 0; i < levelNodeCount; i++) {
            const Node<T> *currNode = upcoming.front();
            upcoming.pop();

            currLevelTraversal.push_back(currNode->val);

            if (currNode->left) upcoming.push(currNode->left);
            if (currNode->right) upcoming.push(currNode->right);
        }

        allLevelTraversal.push_back(currLevelTraversal);
    }

    return allLevelTraversal;
}
```

## Algorithm Analysis

### Time Complexity

All of the 4 traversals (viz. preorder, postorder, inorder and level-order) visit and explore each node exactly once, resulting in the time complexity of $O(|V|)$

### Space Complexity

While traversing, we're not storing any extra space such as `visited[]` array in the case of graphs

- **Recursive Traversals** (preorder, postorder, inorder):

  - The space complexity would be the **max depth of the recursive call stack**
  - This depth can reach $O(|V|)$ in worst-case when the the binary tree is **skewed**, whereas in best case, it would be $O(log_2(|V|))$ for **balanced** binary trees

- **Level-order traversal**:
  - While we're not using any recursive call-stack, we are using a queue to store nodes of the next level that we would be exploring once we're done exploring current level.
  - In balanced trees where the last level is completely filled, the number of nodes being pushed into queue would be $|V|/2$ at one point of time , meaning the worst-case complexity of level-order traversal is $O(|V|)$

**Purely Skewed Trees**:

Purely skewed trees are those in which all child links are all only-left child ones or all are right-child ones. Level order traversal of them would have $O(1)$ space complexity (only one node at each level). We can apply tail-call optimization over their preorder traversal to get space complexity of $O(1)$; there is only one recursive call due to branching factor of $1$

To summarize, with $n$ being the number of nodes i.e. $|V|$ :

| Traversal         |   Best-case Space complexity    | Worst-case Space complexity |
| ----------------- | :-----------------------------: | :-------------------------: |
| Pre/Post/In order | $O(log_2(n))$ ... Balanced tree |    $O(n)$ ... skew tree     |
| Level order       |      $O(1)$ ... Skew tree       |  $O(n)$ ... Balanced tree   |

## Binary Tree traversal example

Here's an example of running all above traversals on a binary tree

```cpp title="Binary Tree traversals"
template <typename T = int>
void printVector (const vector<T> &vect) {
    cout << "[ ";
    for (const T &x : vect) {
        cout << x << ", ";
    }
    cout << "]" << endl;
}

template <typename T = int>
void printVectorOfVector (const vector<vector<T>> &vect) {
    cout << "[" << endl;
    for (const vector<T> &x : vect) {
        cout << "  ";
        printVector<T>(x);
    }
    cout << "]" << endl;
}

int main () {
    Node<int> *root = new Node(5);
    auto *c1 = new Node(7), *c2 = new Node(4);
    auto *c3 = new Node(9), *c4 = new Node(2), *c5 = new Node(6), *c6 = new Node(8);
    root->left = c1, root->right = c2;
    c1->left = c3, c1->right = c4;
    c2->left = c5, c2->right = c6;
    /*
             5
           /  \
          7    4
         /\    /\
        9  2  6  8
    */

    vector<int> preorderTraversal;
    preorder(root, preorderTraversal);
    printVector(preorderTraversal);  // [ 5, 7, 9, 2, 4, 6, 8, ]

    vector<int> postorderTraversal;
    postorder(root, postorderTraversal);
    printVector(postorderTraversal);  // [ 9, 2, 7, 6, 8, 4, 5, ]

    vector<int> inorderTraversal;
    inorder(root, inorderTraversal);
    printVector(inorderTraversal);  // [ 9, 7, 2, 5, 6, 4, 8, ]

    vector<vector<int>> levelorderTraversal = levelorder(root);
    printVectorOfVector(levelorderTraversal);
    // [
    //     [ 5, ]
    //     [ 7, 4, ]
    //     [ 9, 2, 6, 8, ]
    // ]

    delete root;
    return 0;
}
```

## N-ary Tree traversal

To traverse an N-ary tree, the only difference you need to make is to iterate over the child links instead of `left` and `right` child links as we did in binary tree

```cpp
// Change from this:
func(curr->left, ...)
func(curr->right, ...)

// To this:
for (Node<T> *child : curr->children) {
    func(child, ...);
}
```

Also, since there is no concept of which child link is `left` and which is `right`, there is **no In-order traversal** defined for N-ary trees

```cpp title="N-ary Tree traversals"
template <typename T = int>
void preorder (const Node<T> *curr, vector<T> &traversal) {
    if (!curr) return;
    traversal.push_back(curr->val);

    // Iterate over child links and visit each child one-by-one
    for (const Node<T> *child : curr->children) {
        preorder(child, traversal);
    }
}

template <typename T = int>
void postorder (const Node<T> *curr, vector<T> &traversal) {
    if (!curr) return;

    // Iterate over child links and visit each child one-by-one
    for (const Node<T> *child : curr->children) {
        postorder(child, traversal);
    }

    traversal.push_back(curr->val);
}

template <typename T = int>
vector<vector<T>> levelorder (const Node<T> *root) {
    if (!root) return {};

    vector<vector<T>> allLevelTraversal;
    queue<const Node<T> *> upcoming;

    upcoming.push(root);
    while (!upcoming.empty()) {
        vector<T> currLevelTraversal;
        size_t levelNodeCount = upcoming.size();

        for (size_t i = 0; i < levelNodeCount; i++) {
            const Node<T> *currNode = upcoming.front();

            upcoming.pop();

            currLevelTraversal.push_back(currNode->val);

            for (const Node<T> *child : currNode->children) {
                upcoming.push(child);
            }
        }

        allLevelTraversal.push_back(currLevelTraversal);
    }

    return allLevelTraversal;
}

int main () {
    Node<int> *root = new Node(5);
    Node<int> *r1c1 = new Node(7), *r1c2 = new Node(2), *r1c3 = new Node(8);
    root->children = {r1c1, r1c2, r1c3};
    Node<int> *c1c1 = new Node(6), *c1c2 = new Node(4);
    r1c1->children = {c1c1, c1c2};
    Node<int> *c2c1 = new Node(1), *c2c2 = new Node<int>(3), *c2c3 = new Node(9);
    r1c2->children = {c2c1, c2c2, c2c3};
    /*
                5
              / \ \
            /   \  \
          7     2    8
         /\    /\ \
        /  \  /  \ \
       6   4  1  3  9
    */

    vector<int> preorderTraversal;
    preorder(root, preorderTraversal);
    printVector(preorderTraversal);  // [ 5, 7, 6, 4, 2, 1, 3, 9, 8, ]

    vector<int> postorderTraversal;
    postorder(root, postorderTraversal);
    printVector(postorderTraversal);  // [ 6, 4, 7, 1, 3, 9, 2, 8, 5, ]

    vector<vector<int>> levelorderTraversal = levelorder(root);
    printVectorOfVector(levelorderTraversal);
    // [
    //     [ 5, ]
    //     [ 7, 2, 8, ]
    //     [ 6, 4, 1, 3, 9, ]
    // ]

    delete root;
    return 0;
}
```
