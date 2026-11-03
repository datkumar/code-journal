---
title: Graph Representation
tags: [dsa, graph]
---

**Contents**:

- [Input Format](#input-format)
- [1. Adjacency Matrix representation of Graph](#1-adjacency-matrix-representation-of-graph)
  - [Adjacency Matrix via arrays](#adjacency-matrix-via-arrays)
    - [Adjacency Matrix via Static Arrays](#adjacency-matrix-via-static-arrays)
    - [Adjacency Matrix via Dynamic Arrays](#adjacency-matrix-via-dynamic-arrays)
  - [Adjacency Matrix via Vectors (better)](#adjacency-matrix-via-vectors-better)
  - [Tweaking the Adjacency Matrix](#tweaking-the-adjacency-matrix)
- [2. Adjacency List representation of Graph (best)](#2-adjacency-list-representation-of-graph-best)
  - [Tweaking the Adjacency List](#tweaking-the-adjacency-list)
- [Other Representations](#other-representations)

## Input Format

Given a graph (**undirected unweighted**) containing $V$ number of **vertices** (with node numbers as `0` to `V-1`) and $E$ number of **edges**, we can store the graph in the following ways:

The input format will be:

- First line contains two integers `V` and then `E`
- Next `E` lines: 2 integers denoting the ends of an edge

For example, consider the graph shown below . There exist `12` vertices and `13` edges

![Graph](/code-journal/diagrams/graphviz/001.svg)

The input format for this graph would be as follows:

```txt title="Input"
12 13
0 1
0 2
0 5
1 2
1 5
2 5
3 4
3 6
3 10
4 11
5 7
5 9
6 11
```

---

## 1. Adjacency Matrix representation of Graph

For $V$ vertices in graph, the Adjacency Matrix representation would be a $(V*V)$ matrix where:

- Each **cell** $[a_{ij}]$ is $1$ when an **edge exists** from node number $i$ to node number $j$ else it is $0$
- Each **row** $[a_i]$ denotes which are the neighboring nodes of the node number $i$ (those which are $1$)

![General form of Adjacency Matrix](/code-journal/diagrams/adj-matrix-general.svg)

Each of the below three ways to store Adjacency Matrix representations should contain the following contents for above given example input graph.

```txt title="Filled Adjacency Matrix of Graph"
0 1 1 0 0 1 0 0 0 0 0 0
1 0 1 0 0 1 0 0 0 0 0 0
1 1 0 0 0 1 0 0 0 0 0 0
0 0 0 0 1 0 1 0 0 0 1 0
0 0 0 1 0 0 0 0 0 0 0 1
1 1 1 0 0 0 0 1 0 1 0 0
0 0 0 1 0 0 0 0 0 0 0 1
0 0 0 0 0 1 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0 0
0 0 0 1 0 0 0 0 0 0 0 0
0 0 0 0 1 0 1 0 0 0 0 0
```

### Adjacency Matrix via Arrays

In arrays, we have to **check bounds** and in the case of dynamic arrays, **explicitly manage the heap memory** too

#### Adjacency Matrix via Static Arrays

![Adjacency matrix via Static array](/code-journal/diagrams/adj-matrix-static-array.svg)

In C++, the number of **columns** in static 2D array should be known at **compile-time**. So we have to allocate matrix as `Adj[][V_MAX]` with `V_MAX` initialized beforehand

**Space required** is &nbsp; $O(V * V_{max})$ &nbsp; out of which we only use &nbsp; $O(V^2)$

> Note: **Extra space has to be allocated** than what is used

```cpp title="Adjacency Matrix via Static Array"
const int V_MAX = 100;  // Define maximum possible vertices in Graph

// Print (V * V) cells of  (V * V_MAX) Adjacency Matrix
void printAdjMatrix (const int Adj[][V_MAX], const int V) {
    for (int row = 0; row < V; row++) {
        for (int col = 0; col < V; col++) {
            cout << Adj[row][col] << " ";
        }
        cout << "\n";
    }
}
int main() {
    // Take Vertex and Edge count inputs
    int V, E;
    cin >> V >> E;
    // Allocate the Adjacency Matrix (V * V_MAX)
    int Adj[V][V_MAX];
    memset(Adj, 0, sizeof(Adj));  // Initialize all contents to 0

    // Building graph contents from input:
    for (int i = 0; i < E; i++) {
        // Take the two ends of the Edge from input
        int u, v;
        cin >> u >> v;
        // Set the Edge entry in Adjacency Matrix
        Adj[u][v] = Adj[v][u] = 1;
    }
    cout << "Filled Graph:\n";
    printAdjMatrix(Adj, V);
}
```

<details>
<summary>Output</summary>

```txt title="Output: Adjacency Matrix via Static Array"
Filled Graph:
0 1 1 0 0 1 0 0 0 0 0 0
1 0 1 0 0 1 0 0 0 0 0 0
1 1 0 0 0 1 0 0 0 0 0 0
0 0 0 0 1 0 1 0 0 0 1 0
0 0 0 1 0 0 0 0 0 0 0 1
1 1 1 0 0 0 0 1 0 1 0 0
0 0 0 1 0 0 0 0 0 0 0 1
0 0 0 0 0 1 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0 0
0 0 0 1 0 0 0 0 0 0 0 0
0 0 0 0 1 0 1 0 0 0 0 0
```

</details>

#### Adjacency Matrix via Dynamic Arrays

![Adjacency matrix via Dynamic array](/code-journal/diagrams/adj-matrix-dynamic-array.svg)

**Space required**: '$V$' number of pointers where each pointer points to a '$V$' sized integer array

$\implies (V \ast V) + V = O(V^2)$

> Note: We have to **manually deallocate rows** of matrix to free-up heap memory

```cpp title="Adjacency Matrix via Dynamic Array"
// Print cells of (V * V) Adjacency Matrix
// - outer `const`: readonly array of row pointers
// - inner `const`: each row pointer points to a readonly array of integers
void printAdjMatrix (const int* const* Adj, const int V) {
    for (int row = 0; row < V; row++) {
        for (int col = 0; col < V; col++) cout << Adj[row][col] << " ";
        cout << '\n';
    }
}

// Cleanup allocated memory of matrix
// Since `Adj` contents being modified, pass `Adj` by reference instead of copied value of the pointer
void deallocateAdjMatrix (int**&Adj, const int V) {
    if (Adj == nullptr) {  // Guard clause against double deletion on null pointer
        return;
    }
    for (int r = 0; r < V; r++) {
        // Deallocate the array of integers that the row pointer points to
        delete[] Adj[r];
        // Set the row pointer as not pointing to anything (prevents use-after-free bugs)
        Adj[r] = nullptr;
    }
    // Deallocate the array of row pointers that Adj points to
    delete[] Adj;
    // Set Adj pointer as not pointing to anything
    Adj = nullptr;
}

int main () {
    // Take Vertex and Edge count inputs
    int V, E;
    cin >> V >> E;

    // Create (V * V) Adjacency Matrix and initialize all cells as '0':
    // Adj is a pointer to a (row) pointer array
    // Each element of the (row) pointer array points to an array of integers
    int** Adj;

    // Set Adj as pointing to an array of 'V' (row) pointers to integer arrays
    Adj = new int*[V];

    // Iterate over the (row) pointer array's items of Adj:
    for (int r = 0; r < V; r++) {
        // At each index 'r' in the row pointers array:
        // Make that row pointer point to an array of 'V' integers (each initialized to 0)
        // This array forms a row of our matrix
        Adj[r] = new int[V]{0};
    }

    // Building graph contents from input:
    for (int i = 0; i < E; i++) {
        // Take the two ends of the Edge from input
        int u, v;
        cin >> u >> v;
        // Set the Edge entry in Adjacency Matrix
        Adj[u][v] = Adj[v][u] = 1;
    }
    cout << "Filled Graph:" << endl;
    printAdjMatrix(Adj, V);

    // Deallocate memory and reset Adj pointer
    deallocateAdjMatrix(Adj, V);
    // Ensure the de-allocation worked:
    if (!Adj) cout << "Adj is not pointing to anything\n";
    else cout << "Adj = " << (Adj) << "\n";  // Print address of Adj
}
```

<details>
<summary>Output</summary>

```txt title="Output: Adjacency Matrix via Dynamic Array"
Filled Graph:
0 1 1 0 0 1 0 0 0 0 0 0
1 0 1 0 0 1 0 0 0 0 0 0
1 1 0 0 0 1 0 0 0 0 0 0
0 0 0 0 1 0 1 0 0 0 1 0
0 0 0 1 0 0 0 0 0 0 0 1
1 1 1 0 0 0 0 1 0 1 0 0
0 0 0 1 0 0 0 0 0 0 0 1
0 0 0 0 0 1 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0 0
0 0 0 1 0 0 0 0 0 0 0 0
0 0 0 0 1 0 1 0 0 0 0 0
Adj is not pointing to anything
```

</details>

### Adjacency Matrix via Vectors (better)

![Adjacency Matrix via vectors](/code-journal/diagrams/adj-matrix-vector.svg)

**Space required**: $O(V^2)$

```cpp title="Adjacency Matrix via Vector"
// Print cells of (V * V) Adjacency Matrix
void printAdjMatrix (vector<vector<int>> const &Adj) {
    const int V = Adj.size();
    for (int row = 0; row < V; row++) {
        for (int col = 0; col < V; col++) cout << Adj[row][col] << " ";
        cout << "\n";
    }
}

int main() {
    // Take Vertex and Edge count inputs
    int V, E;
    cin >> V >> E;

    // Create (V * V) Adjacency Matrix and initialize each cell to 0
    vector<vector<int>> Adj(V, vector<int>(V, 0));

    // Building graph contents from input:
    for (int i = 0; i < E; i++) {
        // Take the two ends of the Edge from input
        int u, v;
        cin >> u >> v;
        // Set the Edge entry in Adjacency Matrix
        Adj[u][v] = Adj[v][u] = 1;
    }

    cout << "Filled Graph:\n";
    printAdjMatrix(Adj);
}
```

<details>
<summary>Output</summary>

```txt title="Output: Adjacency Matrix via Vector"
Filled Graph:
0 1 1 0 0 1 0 0 0 0 0 0
1 0 1 0 0 1 0 0 0 0 0 0
1 1 0 0 0 1 0 0 0 0 0 0
0 0 0 0 1 0 1 0 0 0 1 0
0 0 0 1 0 0 0 0 0 0 0 1
1 1 1 0 0 0 0 1 0 1 0 0
0 0 0 1 0 0 0 0 0 0 0 1
0 0 0 0 0 1 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0 0
0 0 0 1 0 0 0 0 0 0 0 0
0 0 0 0 1 0 1 0 0 0 0 0
```

</details>

> In summary, we can say **Adjacency matrix** takes up overall $O(n^2)$ **space** for $n$ vertices. Traversing each of it's cells would also take up $O(n^2)$ **traversal time**. It is suited for **dense graphs** where most of the cells would be filled. We have **fast random access** i.e. we can check `Adj[u][v]` in $O(1)$ time to **know if edge exists** from `u` to `v`

### Tweaking the Adjacency Matrix

- **Directed vs Undirected graphs**:

  Since above given graph is **undirected**, we assume the **edges are bi-directional** i.e for an undirected edge between nodes `u` and `v`, we are setting both `Adj[u][v]` and `Adj[v][u]` as `1`. For **Directed graphs**, when there is a directed edge from node `u` to `v`, we **ONLY set `Adj[u][v]`** as `1` and not vice-versa

- **Weighted vs Unweighted graphs**:

  Since above given graph is **unweighted**, we assume the **all the weights as `1`**. For **Weighted graphs**, we set the **`Adj[u][v]` value** as the **weight of edge** from the node `u` to node `v`

- **Storing half triangle of** `Adj[][]`:

  For **undirected unweighted** graphs, you can **store just one half of the adjacency matrix**, since the matrix will be **symmetric** across it's main diagonal i.e. `Adj[u][v] = Adj[v][u]`. Storing just upper or lower triangle of matrix would take only half as much space. The decision to include the diagonal elements or not depends on whether there are any **self-edges** present

---

## 2. Adjacency List representation of Graph (best)

For $V$ vertices in graph, the Adjacency List representation would be a jagged array of $V$ lists where:

- Each list $a_i$ at position $i$ in the jagged array contains list of all the **neighboring nodes** of node number $i$
- Checking whether an **edge exists** from node $u$ to $v$ requires traversing the neighbor list of $u$ to find if node $v$ is present in there

```txt title="Output: Adjacency List"
Filled Graph:
0 -> 1, 2, 5,
1 -> 0, 2, 5,
2 -> 0, 1, 5,
3 -> 4, 6, 10,
4 -> 3, 11,
5 -> 0, 1, 2, 7, 9,
6 -> 3, 11,
7 -> 5,
8 ->
9 -> 5,
10 -> 3,
11 -> 4, 6,
```

```cpp title="Adjacency List"
// Print neighbors of each node in Adjacency List
void printAdjList (const vector<vector<int>> &Adj) {
    const int V = Adj.size();
    // Iterate over nodes:
    for (int node = 0; node < V; node++) {
        // Print current node
        cout << node << " -> ";
        // Traverse and print all neighbors of current node
        for (const int &nbr : Adj[node]) {
            cout << nbr << ", ";
        }
        cout << "\n";
    }
}

int main() {
   // Take Vertex and Edge count inputs
    int V, E;
    cin >> V >> E;

    // Allocate 'V' vectors as neighbors list for each of the nodes
    // Initially all neighbor lists are empty
    vector<vector<int>> Adj(V);

    // Building graph contents from input:
    for (int i = 0; i < E; i++) {
        // Take the two ends of the Edge from input
        int u, v;
        cin >> u >> v;
        // Mark both nodes of that Edge as neighbors of each other
        Adj[u].emplace_back(v);
        Adj[v].emplace_back(u);
    }
    cout << "Filled Graph:\n";
    printAdjList(Adj);
}
```

The Adjacency List can also be declared as `vector<int> Adj[V];` . However, this fixes the total number of nodes and we can't add more nodes later.

**Space required**:

- We have $ (V) $ lists (one neighbour list per node)
- Each list contains the neighboring nodes. Since the graph is **undirected**, if an edge exists between node `u` and `v`, then `v` will be appended into the neigbour list of `u` and vice-versa too, i.e. **entries added in two places per undirected edge**. So, in total, there will be $(2E)$ neigbour entries

**Total space** $\implies O(V + 2E)$

> **Adjacency List** takes up $ O(V+E) $ space which is **almost linear** while Adjacency Matrix takes up quadratic space. Similar complexities for traversing Adjacency List too. Thus, Adjacency List is suited for **sparse graphs**, which make up most of the graphs in real-world. Note that there is **no fast random-access** to check existence of edge between two nodes; we have to traverse over all the neighbors of the node.

### Tweaking the Adjacency List

- **Directed vs Undirected graphs**:

  When there is directed edge from node `u` to node `v`, only append `v` into the neigbours list of `u` and **NOT vice-versa**. The space required in directed graphs would be $ O(V+E) $ as there's only one entry per directed edge

- **Weighted vs Unweighted graphs**:

  Since above given graph is **unweighted**, we assume the **all the weights as `1`**. For **Weighted graphs**, we would need to **store the edge weight along with the neighbour node info** in a `pair`

  ```cpp title="Weighted Edge representation"
  vector< vector< pair<int, int> > > Adj(V);
  // Neighbor entries of a node are as:
  // node -> list of {node,weight} entries
  ```

- **Fast random access**:

  Sometimes, we may need fast random access, typically when answering multiple queries. For that, we can **store the neighbors in a set** (`set` or `unordered_set`) instead of a `vector`. We can check if one node is present as a neighbor of another in $O(1)$ time. This is also known as the **Adjacency Set** representation

  ```cpp title="Fast access for checking Edge exists"
  // Declaration (assuming unweighted)
  vector< unordered_set<int> > Adj(V);

  // Checking if edge exists from node u to v
  if (Adj[u].count(v)) {
      cout << "Edge exists";
  }
  ```

  Also, you can **maintain the neighbors in sorted manner** to allow $O(logn)$ lookup via **binary search**

- **When nodes are not denoted by integers**:

  Sometimes the node labels are not integers but something like characters or strings. In such cases, we use **maps**. Each node label is mapped to the labels of it's neighboring nodes

  ```cpp
  // Adjacency list mapping:
  // node label -> list of labels of it's neighbours
  map< string, vector<string> > Adj;

  // Adding edge from "Mike" node to "Adam" node
  Adj["Mike"].push_back("Adam");

  // Traversal
  for(auto &[node, neighbours]: Adj) {
      // processing current vertex 'node'
      for(string &nbr: neighbours) {
          // processing current neighbor 'nbr' of 'node'
      }
  }
  ```

- **1-based indexing**:

  The zero-index node data will be empty and `1` to `V` nodes data will be filled i.e. `V+1` total stored

  ```cpp
  // Adjacency Matrix declaration
  vector<vector<int>> Adj( V + 1, vector<int>(V + 1, 0) );

  // Adjacency List declaration
  vector< vector<int> > Adj( V + 1 );

  // Traversal
  for (int node = 1; node <= V; node++) {
      // traverse neighbors of 'node'
  }
  ```

---

In summary, comparing the two representations, we have:

| Criteria                        | Adjacency Matrix | Adjacency List        |
| ------------------------------- | ---------------- | --------------------- |
| Space occupied                  | $O(V^2)$         | $O(V+E)$              |
| Check if Edge exists            | $O(1)$           | $O(deg(u))$           |
| Enumerate neighbors of a vertex | $O(V)$           | $O(degree(u))$        |
| BFS/DFS Traversal               | $O(V^2)$         | $O(V+E)$              |
| Add an Edge                     | $O(1)$           | $O(1)$ amortized      |
| Remove an Edge                  | $O(1)$           | $O(deg(u))$ amortized |
| Add a vertex                    | $O(V²)$          | $O(1)$ amortized      |
| Delete a vertex                 | $O(V²)$          | $O(V + E) $           |
| Best suited for                 | Dense Graphs     | Sparse Graphs         |

Note that $deg(u)$ represents the **degree** of the vertex $u$ in the graph. Iterating neighbors of the node $u$ in Adjacency List would take $O(deg(u))$ time, which could be $O(V)$ in worst case for dense graph. We are assuming neighbors are maintained as `vector` and that adding an edge in graph skips checking whether the edge exists before. Using `set` or `unordered_set` as list of neighbors could make the edge existence checks faster in $log(deg(u))$ or $O(1)$ time

---

## Other representations

### Edge List

It is a simple list of all the edges of the graph. Each edge entry in the list could be a `pair` mentioning the two ends of the edge or a `tuple` mentioning the weight too.

```cpp title="Edge List"
// Edge List for Unweighted Graph: {u,v} entries
vector<pair<int, int>> el1 = {
    {0, 1},
    {0, 2},
    {1, 3},
    {2, 3}
};
// Edge List for Weighted Graph: {u,v,weight} entries
vector<tuple<int, int, int>> el2 = {
    {0, 1, 5},
    {0, 2, 3},
    {1, 3, 7},
    {2, 3, 2}
};
```

Even though it is efficent in terms of storage taking just $\Theta(E)$ space, checking edge existence or iterating neighbors takes is slow, taking $O(E)$ time in worst case. It is useful for algorithms that process all edges independently such as Kruskal's algorithm for MST.

Also refer the [Incidence Matrix](https://en.wikipedia.org/wiki/Incidence_matrix) representation of Graph

---

**Further reading**:

- [CS Academy - Graph representation](https://csacademy.com/lesson/graph_representation)
- [The Boost Graph Library](https://www.boost.org/doc/libs/latest/libs/graph/doc/html/graph/index.html)
