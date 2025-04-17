---
title: Graph Theory terminology
tags: [dsa, graph, tree]
---

## Sections

### PART 1: [**Graphs**](#graphs)

- [Graph](#graph)
- [Edge](#edge)
  - [Edge Weight](#edge-weight)
  - [Special Edges](#special-edges)
  - [Number of Edges](#number-of-edges)
- [Degree (or Valency) of Vertex](#degree-or-valency-of-vertex)
  - [Handshaking Lemma](#handshaking-lemma)
  - [Walk, Trail, Path, Cycle](#walk-trail-path-cycle)
- [Connectivity](#connectivity)
  - [Regular Graph](#regular-graph)
  - [Complete Graph](#complete-graph)
  - [Cycle Graph](#cycle-graph)
- [Spanning Tree](#spanning-tree)
  - [Minimum Spanning Tree](#minimum-spanning-tree)
- [Graph Coloring](#graph-coloring)
  - [Bipartite Graph](#bipartite-graph)
- [Topological Sort](#topological-sort)

### PART 2: [**Trees**](#trees)

- [Tree](#tree)
  - [Forest](#forest)
- [Rooted Tree](#rooted-tree)
  - [Types of nodes in a rooted tree](#types-of-nodes-in-a-rooted-tree)
  - [Height, Depth](#height-depth)
- [Types of Binary Trees](#types-of-binary-trees)
  - [Full or Proper or Strict Binary Tree](#full-or-proper-or-strict-binary-tree)
  - [Perfect Binary Tree](#perfect-binary-tree)
  - [Complete Binary Tree](#complete-binary-tree)
  - [Balanced Binary Tree](#balanced-binary-tree)
  - [Degenerate or Skew Binary Tree](#degenerate-or-skew-binary-tree)
- [Binary Search Tree](#binary-search-tree)
- [Heap](#heap)
- [More types of Trees](#more-types-of-trees)

# Graphs

## Graph

An ordered pair of a set of **vertices** $\text{'V'}$ and a set of **edges** $\text{'E'}$ represented as:

$$G = (V, E)$$

An **ordered** pair is represented as $(a, b)$ and an **unordered** pair as $\\{a, b\\}$

Note that $\\{a, b\\} = \\{b, a\\}$ however $(a, b) \neq (a, b) $

## Edge

- A **directed** edge from vertex $u$ to vertex $v$ is **one-directional** link denoted by $(u,v)$
- An **undirected** edge between vertex $u$ and vertex $v$ is **bi-directional** link and denoted by either of $\\{u, v\\}$ OR $\\{u, v\\}$

![Graph Edge types](/code-journal/diagrams/graph-edge-types.svg)

We can draw an undirected graph as directed but NOT vice-versa

Consider below example of a **directed graph**:

![Directed Graph Example](/code-journal/diagrams/graph-example-directed.svg)

The above graph would be mathematically represented as $G = (V, E)$ where:

$$ \text{ V = { 0, 1, 2, 3, 4, 5, 6, 7, 8 } }$$

$$\text{ E = { (0,1), (1,2), (2,4), (0,4), (4,3), (3,2), (6,5), (5,7) } }$$

If all the edges were undirected, $G$ would become an **undirected graph** with $V$ staying the same but $E$ would become:

$$\text{ E = { {0,1}, {1,2}, {2,4}, {0,4}, {4,3}, {3,2}, {6,5}, {5,7} } }$$

### Edge Weight

![Graph Edge Weight](/code-journal/diagrams/graph-edge-types-weight.svg)

Edges can have some weight or **cost** associated for traversing from one vertex to another through the edge between them. In below diagram, $w$ is the weight of the directed/undirected edge between vertex $u$ and $v$.

A directed/undirected graph with no weight mentioned for all edges is considered as all edges having the same **unit weight**

### Special Edges

![Graph Special Edges ](/code-journal/diagrams/graph-edge-types-special.svg)

A graph can also have special types of edges like a **self-edges** or **multi-edges**. A graph without any such special edges are called **Simple Graph**, which we'll be studying in most cases. Even a mixture of all types of directed and undirected edges can be present in a given graph, but we generally only stick to one type for one graph. Refer [Multigraph](https://en.wikipedia.org/wiki/Multigraph)

### Number of Edges

Given a simple graph $G = (V,E)$, if the number of vertices i.e. $|V|$ is $n$, then:

The **minimum** number of edges is **zero** for both undirected and directed graphs (the set of edges is empty and we have just vertices)

The **maximum** number of possible edges are:

- **Undirected Graph**: An edge is a connection between two vertices. So,number of ways to connect each vertex to another would be $ ^n{C}\_2 = \frac{n(n-1)}{2} $

- **Directed Graph**: Since each undirected edge entry $\\{a,b\\}$ in undirected graph could translate into two differing edge possibilities $(a,b)$ and $(b,a)$ in directed graph, the max possible edges would be **double** that of undirected graph i.e. $n(n-1)$

## Degree (or Valency) of Vertex

Degree of Vertex in **Undirected Graph**:

![Undirected Graph Example](/code-journal/diagrams/graph-example-undirected.svg)

- The degree of a vertex in an undirected graph is the number of edges that are incident on that vertex i.e. having one end of each edge as that vertex
- In above example, vertex `2` has a degree of 3 as edges $\text{{1,2}, {4,2}, {2,3}}$ are connected to that vertex. Compared to it, vertex `8` has degree zero

### Handshaking Lemma

Note that for each edge being added in the graph, the total sum of degrees of all the vertices is being incremented by $+2$ . Thus the sum of degrees of all vertices must always be an even number. The **degree sum formula** states as:

$$ { \sum \_{v \in V} \deg(v) = 2 \cdot |E| } $$

The formula implies that in any undirected graph, the number of vertices with odd degree is even. This statement (and the degree sum formula) is known as the handshaking lemma. The name comes from a popular mathematical problem, which is to prove that in any group of people, the number of people who have shaken hands with an odd number of other people from the group is even. As referred from [Wikipedia](<https://en.wikipedia.org/wiki/Degree_(graph_theory)>)

In **Directed Graph**, we have in-degree and out-degree of a vertex:

![Directed Graph Example](/code-journal/diagrams/graph-example-directed.svg)

- **In-degree** of a vertex is the number of edges whose **ending** point is that vertex i.e. the number of incoming edges into that vertex. In above example, vertex `4` has an in-degree of 2
- **Out-degree** of a vertex is the number of edges whose **starting** point is that vertex. i.e. the number of outgoing edges from that vertex. In above example, vertex `0` has an out-degree of 2

### Walk, Trail, Path, Cycle

- **Walk**: A [walk](<https://en.wikipedia.org/wiki/Path_(graph_theory)>) is a sequence of vertices where each adjacent pair of vertices is connected by an edge. Even if we are mentioning vertices in the sequence we are traveling over edges connecting those vertices.

  - You can visit the same vertex multiple times by going over the same edge multiple times too.
  - If a walk starts and ends at the same vertex, it's called a **closed walk**, else it's an **open walk**. The **length** of the walk is the number of edges we traversed during the walk

- **Trail**: A Trail is a **walk** in which all **edges** are distinct

- **Path**: A Path is a **trail** in which all **vertices** (and thereby all edges) are distinct. Some authors do not require that all vertices of a path be distinct and instead use the term **simple path** to refer to such a path where all vertices are distinct.

- **Cycle**: A Cycle is **closed walk** where no vertices are repeated other than the start and end vertex

Any graph that contains a cycle is called a **Cyclic graph**. A graph that does not contain any cycle is called an **Acyclic Graph**. Some examples of Acyclic graphs are **Trees** and **Directed Acyclic Graphs** (DAGs) as shown below:

![Acyclic Graph Example](/code-journal/diagrams/graph-example-acyclic.svg)

## Connectivity

An **Undirected** graph is called as **Connected Graph** if there exists a path from any vertex to any other vertex. The left-side example is a disconnected graph (with two connected components) while the right-side example is a connected graph

![Connected Undirected Graph Example](/code-journal/diagrams/graph-example-connected-undirected.svg)

A **Directed** graph is called a **Strongly Connected Graph** if there exists a path from any vertex to any other vertex. In below example, the left-side graph isn't strongly connected as there does not exist any path from `2` to `0` or from `1` to `0`

![Connected Directed Graph Example](/code-journal/diagrams/graph-example-connected-directed.svg)

### Regular Graph

A graph where each vertex has the same number of neighbors i.e. all vertices having the same dress is called a [Regular Graph](https://en.wikipedia.org/wiki/Regular_graph)

![Regular Graphs](/code-journal/images/regular-graphs.png)

Regular graphs of degree at most `2` are easy to classify: a `0`-regular graph consists of disconnected vertices, a `1`-regular graph consists of disconnected edges, and a `2`-regular graph consists of a disjoint union of cycles and infinite chains.

A `3`-regular graph is known as a cubic graph.

A strongly regular graph is a regular graph where every adjacent pair of vertices has the same number $l$ of neighbors in common, and every non-adjacent pair of vertices has the same number $n$ of neighbors in common. The smallest graphs that are regular but not strongly regular are the cycle graph and the circulant graph on `6` vertices.

The complete graph $K_m$ is strongly regular for any $m$

### Complete Graph

A [Complete graph](https://en.wikipedia.org/wiki/Complete_graph) is a simple undirected graph in which every pair of distinct vertices is connected by a unique edge. The complete graph on $n$ vertices is denoted by $K_n$

![Complete Graphs](/code-journal/diagrams/complete-graphs.svg)

$K_n$ has $\frac{n(n-1)}{2}$ edges (i.e. maximum possible edges as shown above), and also it's $(n–1)$ regular, meaning each vertex has a degree of $(n–1)$

### Cycle Graph

A [Cycle graph](https://en.wikipedia.org/wiki/Cycle_graph) or **circular graph** is a graph that consists of a single cycle, or in other words, some number of vertices (at least 3, in simple graph) connected in a closed chain. The cycle graph with $n$ vertices is called $C_n$. The **number of vertices equals the number of edges** in $C_n$ and **every vertex has degree 2**; that is, every vertex has exactly two edges incident with it.

![Cycle Graphs](/code-journal/images/cycle-graphs.png)

Also refer [Circulant Graph](https://en.wikipedia.org/wiki/Circulant_graph)

## Spanning Tree

![Spanning Tree](/code-journal/diagrams/graph-example-spanning-tree.svg)

- A [Spanning tree](https://en.wikipedia.org/wiki/Spanning_tree) $T$ of an undirected graph $G$ is a **subgraph** that is a tree which **includes all of the vertices** of $G$
- A connected graph may have several spanning trees, but a disconnected graph will not contain a spanning tree
- Since the Spanning tree is a n-ary tree containing all $|V|$ nodes, the tree contains $|V| - 1$ edges
- If all of the edges of $G$ are also edges of a spanning tree $T$ of $G$, then $G$ is a tree and is identical to $T$ (that is, a tree has a unique spanning tree and it is itself).

The number of spanning trees $t(G)$ of a connected graph can be calculated directly in special cases:

- $G$ is itself a tree $\implies t(G) = 1$
- $G$ is the cycle graph $C_n$ with $n$ vertices $\implies t(G) = n$
- $G$ is the complete graph $K_n$ with $n$ vertices $\implies t(G) = n^{n−2} \space$ as given by [Cayley's formula](https://en.wikipedia.org/wiki/Cayley%27s_formula)
- $G$ is the complete bipartite graph $K_{p,q}$ $\implies t(G)=p^{q-1}\cdot q^{p-1}$

### Minimum Spanning Tree

A [minimum spanning tree](https://en.wikipedia.org/wiki/Minimum_spanning_tree) (MST) or **minimum weight spanning tree** is a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight. It is a spanning tree whose sum of edge weights is as small as possible

![Minimum Spanning Tree](/code-journal/diagrams/graph-example-spanning-tree-min.svg)

- There may be several minimum spanning trees possible for a given weighted graph, but all of those MSTs would have the same minimum weight value.

- If all the edge weights of a given graph are the **same**, then **every spanning tree** of that graph is minimum. If each edge has a **distinct** weight then there will be only one, **unique minimum spanning tree**

## Graph Coloring

[Graph Coloring](https://en.wikipedia.org/wiki/Graph_coloring) is a methodic assignment of labels traditionally called "colors" to elements of a graph. The color are assigned such as that no two adjacent elements have the same color. When used without any qualification, a coloring of a graph almost always refers to a proper vertex coloring

<img alt="Graph Coloring" src="/code-journal/diagrams/peterson-graph-colored.svg" height="250" >

- **Vertex Coloring** is a way of coloring the vertices of a graph such hat no two vertices sharing the same edge have the same color.

- **Edge coloring** assigns a color to each edges so that no two adjacent edges are of the same color,

- **Face coloring** of a planar graph assigns a color to each face (or region) so that no two faces that share a boundary have the same color.

A coloring using at most $k$ colors is called a (proper) **k-coloring**. The smallest number of colors needed to color a graph $G$ is called its **chromatic number**

### Bipartite Graph

A [Bipartite Graph](https://en.wikipedia.org/wiki/Bipartite_graph) or **Bigraph** is a graph whose vertices can be divided into **two disjoint and independent sets** $A$ and $B$ i.e., every edge connects a vertex in $A$ to one in $B$. Vertex sets $A$ and $B$ are usually called the _parts_ of the graph

![Bipartite Graph](/code-journal/diagrams/graph-example-bipartite.svg)

The two sets $A$ and $B$ may be thought of as a coloring of the graph with **two colors**: if one colors all nodes in $A$ as blue, and all nodes in $B$ as red, each edge has endpoints of differing colors, as is required in the graph coloring problem. Such a coloring is not possible in the case of non-bipartite graphs

If the two sets $A$ and $B$ have the same **cardinality** i.e the number of elements in a set, then it's called a **balanced** bipartite graph. If all the vertices on the same side of the bipartition have the same degree, then it's called a **biregular** graph

One often writes $G = (A, B, E)$ to denote a bipartite graph whose partition has the parts $A$ and $B$, with $E$ denoting the edges of the graph

The degree sum formula for a bipartite graph states that:

$${ \displaystyle \sum _{a \in A} deg(a) =\sum _{b \in B} deg(b) = |E| }$$

Some more characteristics of bipartite graphs:

- An undirected graph is bipartite if and only if it does **NOT** contain an **odd length cycle**
- Cycle graphs with an even number of vertices are bipartite
- Every tree is bipartite

A **Complete Bipartite** graph on $m$ and $n$ vertices, denoted by $K_{n,m}$ is the bipartite graph $G=(A,B,E)$, where $A$ and $B$ are disjoint sets of size $m$ and $n$, respectively, and $E$ connects every vertex in $A$ with all vertices in $B$. It follows that $K_{n,m}$ has $(m \cdot n)$ edges. Closely related to the complete bipartite graphs are the [crown graphs](https://en.wikipedia.org/wiki/Crown_graph)

<img alt="Cycle Graphs" height="250" src="/code-journal/images/complete-bipartite-graphs.png">

## Topological Sort

A [Topological sort](https://en.wikipedia.org/wiki/Topological_sorting) of a _directed_ graph is a **linear ordering** of its vertices such that for every directed edge $(u,v)$ from vertex $u$ to vertex $v$, $u$ comes **before** $v$ in the ordering

For instance, the vertices of the graph may represent tasks to be performed, and the edges may represent constraints that one task must be performed before another; in this application, a topological ordering is just a valid sequence for the tasks

A topological ordering is possible if and only if the graph has no directed cycles, that is, if it is a **DAG** (directed acyclic graph). Any DAG has at **least one** topological ordering, and possibly many

---

# Trees

## Tree

![Tree examples](/code-journal/images/tree-examples.png)

In Graph theory, a [Tree](<https://en.wikipedia.org/wiki/Tree_(graph_theory)>) is a **connected undirected** graph in which **any two vertices** are connected by **exactly one path**. If an undirected graph $G$ is a Tree, it will have these special characteristics:

- $G$ is **connected** and **acyclic** (does not contain any cycle)
- If any edge is **added** to $G$, a **cycle** is formed somewhere
- If any edge is **removed** from $G$, the graph would become **disconnected**
- Any two vertices in $G$ can be connected by a **unique path**
- If $G$ contains finite $n$ number of vertices, then the tree would contain $(n-1)$ **edges**. You can say: $|E| = |V| - 1$
- Since a tree contains no cycles (neither odd nor even length), it is bipartite, every tree is a bipartite graph

### Forest

- A forest is an **undirected** graph in which any two vertices are connected by **at most one path** (one or no path), or equivalently a **disjoint union of trees**. It is an undirected (not necessarily connected) acyclic graph.
- Each connected component of a forest is a tree. Since we know that for each tree, $|E| = |V| - 1$. Thereby we can get the number of trees that are within a forest as: $|V| - |E|$

## Rooted Tree

A rooted tree is a tree in which one vertex has been designated the **root**. The edges of a rooted tree can be assigned a natural **orientation**, either away from or towards the root,in which case the structure becomes a directed rooted tree. When a directed rooted tree has an orientation **away** from the root, it is called an **arborescence** i.e. **out-tree**. When it has an orientation **towards** the root, it is called an **anti-arborescence** or **in-tree**.

![Rooted trees](/code-journal/diagrams/rooted-trees.svg)

A $k$-ary tree ($k$ being a non-negative integer) is a rooted tree in which each vertex has **at-most $k$ children**. $2$-ary trees are often called **Binary trees**, while $3$-ary trees are sometimes called Ternary trees

### Types of nodes in a rooted tree

- In a rooted tree, the **parent** of a vertex $v$ is the vertex connected to $v$ on the path to the root; every vertex has a unique parent, except the root, which has no parent
- A **child** of a vertex $v$ is a vertex of which $v$ is the parent
- An **ascendant** of a vertex $v$ is any vertex that is either the parent of $v$ or is (recursively) an ascendant of a parent of $v$
- A **descendant** of a vertex $v$ is any vertex that is either a child of $v$ or is (recursively) a descendant of a child of $v$.
- A **sibling** to a vertex $v$ is any other vertex on the tree that shares a parent with $v$
- A **leaf** is a vertex with no children (green color nodes in above image)
- An **internal vertex** is a vertex that is not a leaf (yellow color nodes and red color root in above image)

Other terms used with trees:

- **Neighbor**: Parent or child.
- **Ancestor**:A node reachable by repeated proceeding from child to parent.
- **Descendant**: A node reachable by repeated proceeding from parent to child. Also known as subchild
- **Degree**: For a given node, its number of children. A leaf, by definition, has degree zero.
- **Degree** of tree: The degree of a tree is the maximum degree of a node in the tree.
- **Distance**: The number of edges along the shortest path between two nodes.
- **Level**: The level of a node is the number of edges along the unique path between it and the root node. This is the same as depth.
- **Width**: The number of nodes in a level.
- **Breadth**: The number of leaves.
- **Forest**: A set of one or more disjoint trees.
- **Ordered tree**: A rooted tree in which an ordering is specified for the children of each vertex.
- **Size** of a tree: Number of nodes in the tree.

### Height, Depth

- The **height** of a vertex in a rooted tree is the length of the **longest downward path** to a leaf from that vertex. The height of the tree is the height of the root.
- The **depth** of a vertex is the length of the path to its root (root path). The depth of a tree is the maximum depth of any vertex.
- The root has depth zero, leaf nodes have height zero
- A tree with only a single vertex (which is both a root and leaf) has depth and height zero. - An empty tree (a tree with no vertices, if such are allowed) has depth and height $−1$.

## Types of Binary Trees

A Binary Tree is a tree where each node has has **at most two children**, referred to as the `left` child and the `right` child. These can further be classified as:

### Full or Proper or Strict Binary Tree

<img alt="Full Binary Tree" src="/code-journal/diagrams/full-binary-tree.svg" height="200">

- A full binary tree (sometimes referred to as a **proper**, **plane**, or **strict** binary tree) is a tree in which every node has **either $0$ or $2$ children**. Every node is either an **internal** node having **exactly 2** children or a **leaf** node with **zero** children
- Note that there is no restriction on the depth at which various leaf node might be present
- Another way of defining a full binary tree is a recursive definition. A full binary tree is either:

  - A single vertex (a single node as the root node)
  - A tree whose root node has two subtrees, both of which are full binary trees

### Perfect Binary Tree

A perfect binary tree is a binary tree in which all **internal** nodes have $2$ children and all **leaves** have the **same depth** (i.e. all leaves are at the same level)

### Complete Binary Tree

- A complete binary tree is a binary tree in which every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible.
- The height of a complete binary tree **height** is $ \lfloor {log_2(|V|)} \rfloor $
- It can have between $1$ to $2h$ nodes at the **last level** $h$

### Balanced Binary Tree

A balanced binary tree is a binary tree structure in which the **left and right subtrees** of every node differ in height (the number of edges from the top-most node to the farthest node in a subtree) by **no more than 1**. One may also consider binary trees where no leaf is much farther away from the root than any other leaf

### Degenerate or Skew Binary Tree

A **degenerate** or **pathological** or **skew** binary tree is where each parent node has only one associated child node. This means that the tree will behave like a linked list data structure.

Below images are examples of **Skewed** (purely-left skewed) and **Balanced** Binary Trees:

![Skew and Balanced Binary Trees](/code-journal/diagrams/skew-n-balanced-bt.svg)

Note that:

> - Every Perfect binary tree is a Full binary tree, but every Full binary tree is not a Perfect binary tree
> - Every Perfect binary tree is Complete but every Complete binary tree is not always perfect
> - Every Complete binary tree is Balanced but every Balanced binary tree is not Complete

**Some interesting illustrative examples**:

| Tree diagram | Is Full? | Is Perfect? | Is Complete? | Is Balanced? |
| :----------: | :------: | :---------: | :----------: | :----------: |
|     $T1$     |    ❌    |     ❌      |      ❌      |      ✅      |
|     $T2$     |    ✅    |     ❌      |      ✅      |      ✅      |
|     $T3$     |    ✅    |     ❌      |      ❌      |      ✅      |
|     $T4$     |    ❌    |     ❌      |      ❌      |      ✅      |
|     $T5$     |    ❌    |     ❌      |      ✅      |      ✅      |
|     $T6$     |    ✅    |     ✅      |      ✅      |      ✅      |

![Binary Tree types examples](/code-journal/diagrams/binary-tree-type-examples.svg)

<br>

<details>
<summary style="font-size: 20px; color: var(--accentColor);margin-bottom: 10px;"><strong>
Properties of Binary Trees
</strong></summary>

- The number of nodes $n$ in a full binary tree is at least $(2h + 1)$ and at most $2^{h+1} − 1 $ (i.e., the number of nodes in a perfect binary tree), where $h$ is the height of the tree

  A tree consisting of only a root node has a height of $0$. The least number of nodes is obtained by adding only two children nodes per adding height so $2h+1$ ($1$ for counting the root node).

  The maximum number of nodes is obtained by fully filling nodes at each level, i.e., it is a perfect tree. For a perfect tree, the number of nodes is $1 + 2 + 4 + \ldots + 2^{h} = 2^{h+1}- 1$

- The number of leaf nodes $l$ in a perfect binary tree is $l =(n+1)/2$ (where $n$ is the number of nodes in the tree) because $n = {{2}^{h+1}}-1$ (by using the above property) and the number of leaves is $2^{h}$ so $n = 2 \cdot { {2}^{h} } - 1 = 2l-1 \to l = \left(n+1\right)/2$ . It also means that $n = 2l-1$. In terms of the tree height $h$, $l = (2^{h+1} - 1 + 1)/2 = 2^{h}$

- For any non-empty binary tree with $l$ leaf nodes and $i*{2}$ nodes of degree $2$ (internal nodes with two child nodes), $l = i*{2} + 1$. The proof is the following:

  For a perfect binary tree, the total number of nodes is $ n=2^{h+1} - 1$ (A perfect binary tree is a full binary tree.) and $l=2^{h}$, so $i=n-l=(2^{h+1}-1)-2^{h}=2^{h}-1=l-1\to l=i+1$.

  To make a full binary tree from a perfect binary tree, a pair of two sibling nodes are removed one by one. This results in "two leaf nodes removed" and "one internal node removed" and "the removed internal node becoming a leaf node", so one leaf node and one internal node is removed per removing two sibling nodes.

  As a result, $l = i + 1$ also holds for a full binary tree. To make a binary tree with a leaf node without its sibling, a single leaf node is removed from a full binary tree, then "one leaf node removed" and "one internal nodes with two children removed" so $l = i + 1$ also holds. This relation now covers all non-empty binary trees.

- With given $n$ nodes, the minimum possible tree height is $ h*{min}=\log *{2}(n+1)-1$ with which the tree is a balanced full tree or perfect tree. With a given height $h$ , the number of nodes can't exceed the $2^{h+1} - 1$ as the number of nodes in a perfect tree. Thus $ n\leq 2^{h+1}-1\to h \geq \log\_{2}(n+1)-1$.

- A binary Tree with $l$ leaves has at least the height $h_m = \log_{2}(l)$. With a given height $h$, the number of leaves at that height can't exceed $2^h$ as the number of leaves at the height in a perfect tree. Thus $l \leq 2^{h} \to h \geq \log_{2}(l)$

- In a non-empty binary tree, if n {\displaystyle n} is the total number of nodes and e {\displaystyle e} is the total number of edges, then e = n − 1 {\displaystyle e=n-1}. This is obvious because each node requires one edge except for the root node.

- The number of null links (i.e., absent children of the nodes) in a binary tree of $n$ nodes is $(n + 1)$

- The number of internal nodes in a complete binary tree of $n$ nodes is $ \lfloor n/2 \rfloor $

</details>

## Binary Search Tree

![An Example BST ](/code-journal/diagrams/bst-example.svg)

A [Binary Search Tree](https://en.wikipedia.org/wiki/Binary_search_tree) (**BST**), also called an **ordered** or **sorted** binary tree, is a rooted binary tree data structure with the key of each internal node being greater than all the keys in the respective node's `left` subtree and less than the ones in its `right` subtree.

Here's the structure property of every BST node:

![Structure of BST Node](/code-journal/diagrams/bst-node-structure.svg)

We generally avoid inserting duplicates of the same value in the BST, but you can set equal values to be assigned to only one side subtree of the BST at every insertion, such as equal value nodes being inserted only in left subtree making the left child property as $\leq$ the current node value

Below is example of a BST:

BSTs allow **binary search** for fast lookup, addition, and removal of data items. Since the nodes in a BST are laid out so that each comparison skips about half of the remaining tree, the lookup performance is proportional to that of $log_2(n)$

For a given BST with $n$ nodes, all operations such as **Search, Insertion & Deletion** take $O(logn)$ time on **average**, where the tree is completely or somewhat nearly **balanced**. However, if the tree is highly **skewed**, these operations can take $O(n)$ in the **worst** case. In other words, the time complexity of operations on the BST is **linear** with respect to the **height** $h$ of the tree i.e. $O(h)$

**Inorder** traversal of a BST prints a **sorted** sequence of values.

BST corresponds to each execution of **Quicksort**: the initial **pivot** is the **root** node; the pivot of the left half is the root of the left subtree, the pivot of the right half is the root of the right subtree, and so on. The number of comparisons of the execution of quicksort equals the number of comparisons during the construction of the BST by a sequence of insertions. So, the average number of comparisons for randomized quicksort equals the average cost of constructing a BST when the values inserted $(x*{1},x*{2},\ldots ,x\_{n})$ form a random permutation.

To address the issue of the BST becoming skewed after some insertions which might increase the time complexity of operations from $O(logn)$ to $O(n)$, **self-balancing** mechanisms are introduced that balance the BST structure of nodes after each or a couple of insertions/deletions. There are several self-balanced BSTs, including [T-trees](https://en.wikipedia.org/wiki/T-tree) , [Treaps](https://en.wikipedia.org/wiki/Treap) , [Red-Black trees](https://en.wikipedia.org/wiki/Red-black_tree) , [B-trees](https://en.wikipedia.org/wiki/B-tree) , [2–3 trees](https://en.wikipedia.org/wiki/2%E2%80%933_tree) and [Splay trees](https://en.wikipedia.org/wiki/Splay_tree)

Both AVL and Red-Black trees use [tree rotation](https://en.wikipedia.org/wiki/Tree_rotation) to balance the BST

**AVL** Trees are named after it's two Soviet inventors Georgy **A**delson-**V**elsky and Evgenii **L**andis is the first self-balancing binary search tree data structure to be invented. They have **strict balancing** scheme with more **frequent rotations**, which might take slightly longer time for insertion/deletion, but give the **best search efficiency**, as the height is minimum (strictly balanced). They store a **balancing-factor** value (-1,0,1) at every node and apply single or double rotation to fix each balancing violation. AVL Trees are used in **read-heavy** applications.

On the other hand, **Red-Black** trees have comparatively **relaxed balancing** scheme with **fewer rotations** for each insertion/deletion, resulting in slightly longer heights and a but longer search times compared to AVL trees. They store a **color bit** at each node and perform recoloring & rotations to fix the violations. Red-Black trees are used in **write-heavy** applications

## Heap

A [Heap](<https://en.wikipedia.org/wiki/Heap_(data_structure)>) is a tree-based data structure that satisfies the **heap property**:

- In a **Max Heap**, for any given node $C$ if $P$ is the parent node of $C$ then the key (value at the node) of $P$ is **greater than or equal** to the key of $C$
- In a **Min heap**, the key of $P$ is **less than or equal to** the key of $C$

![Heap Property of node](/code-journal/diagrams/heap-node-structure.svg)

The heap is one maximally efficient implementation of an abstract data type called a **priority queue**, and in fact, priority queues are often referred to as "heaps", regardless of how they may be implemented. In a heap, the _highest priority_ (which might be highest/lowest value of key) element is always stored at the root

However, a heap is not a sorted structure; it can be regarded as being **partially ordered**. There is no implied ordering between siblings or cousins and no implied sequence for an in-order traversal (as there would be in, e.g., a binary search tree). The heap relation mentioned above applies only between nodes and their parents, grandparents

A heap is a useful data structure when it is necessary to repeatedly remove the object with the highest priority, or when insertions need to be interspersed with removals of the root node.

The maximum number of children each node can have depends on the type of heap. A common implementation of a heap is the **Binary Heap**, in which the tree is a **Complete Binary Tree**, thereby it can be stored as an array. Below figure is example of a Binary Max-heap:

<img alt="Binary Heap" src="/code-journal/diagrams/binary-heap.svg" height="400" >

When a heap is a complete binary tree, it has the smallest possible height — a heap with $N$ nodes and $b$ branches for each node always has $log_b{(N)}$ height

Balancing a heap is done by sift-up or sift-down operations (swapping elements which are out of order). As we can build a heap from an array without requiring extra memory (for the nodes, for example), heapsort can be used to sort an array in-place.

Most of the operations on Binary Heap take $O(logn)$ time with $n$ being the number of nodes.

After an element is inserted into or deleted from a heap, the heap property may be violated, and the heap must be re-balanced by swapping elements within the array. Balancing a heap is done by **sift-up** or **sift-down** operations (swapping elements which are out of order)

As we can build a heap from an array without requiring extra memory (for the nodes, for example), [**HeapSort**](https://en.wikipedia.org/wiki/Heapsort#Variations) can be used to sort an array in-place.

Construction of a binary (or $d$-ary) heap out of a given array of elements, also known as **heapify** may be performed in linear time i.e. $O(n)$ amortized, using the classic Floyd algorithm.

There are other types of heaps also such as [Fibonacci Heap](https://en.wikipedia.org/wiki/Fibonacci_heap) , [Binomial Heap](https://en.wikipedia.org/wiki/Binomial_heap) etc

## More types of Trees

- [**Splay Tree**](https://en.wikipedia.org/wiki/Splay_tree): Self-adjusting BST that moves recently accessed elements to root
- [**Trie**](https://en.wikipedia.org/wiki/Trie) i.e. **Prefix Tree**: Used for storing strings with shared prefixes
- [**Suffix Tree**](https://en.wikipedia.org/wiki/Suffix_tree): Stores all suffixes of a string for pattern matching
- [**Segment Tree**](https://cp-algorithms.com/data_structures/segment_tree.html): Used for range queries and updates on arrays
- [**Fenwick Tree**](https://cp-algorithms.com/data_structures/fenwick.html) ie. **Binary Indexed Tree**: Efficient implementation for range sum queries
- [**B Tree**](https://en.wikipedia.org/wiki/B-tree): Self-balancing tree with multiple children per node
- [**B+ Tree**](https://en.wikipedia.org/wiki/B%2B_tree): Variation of B-tree with values only in leaf nodes and linked leaves
- [**Merkle Tree**](https://en.wikipedia.org/wiki/Merkle_tree): Used in cryptography, blockchain and even Git
- [**Decision Tree**](https://en.wikipedia.org/wiki/Decision_tree): Used in machine learning for classification and regression
- [**Cartesian Tree**](https://en.wikipedia.org/wiki/Cartesian_tree): Binary tree derived from a sequence of distinct numbers
- [**Treap**](https://en.wikipedia.org/wiki/Treap): Combination of BST and heap. It maintain a dynamic set of ordered keys and allow binary searches among the keys
