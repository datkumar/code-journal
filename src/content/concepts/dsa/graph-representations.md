---
title: Graph Representation
tags: [dsa, graph]
---

Given a graph (**undirected unweighted**) containing '\\(V\\)' number of **vertices** (with node numbers as `0` to `V-1`) and '\\(E\\)' number of **edges**, we can store the graph in the following ways:

The input format will be:

- First line contains two integers `V` and then `E`
- Next `E` lines: 2 integers denoting the ends of an edge

For example, consider the graph shown in diagram. There exist 12 vertices and 13 edges.

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

![Graph](/code-journal/diagrams/graphviz/001.svg)

## 1. Adjacency Matrix

Each of the below three Adjacency Matrix methods will produce the output:

```txt

After Initialization:
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0

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

### Adjacency Matrix via arrays

In arrays, we have to **check bounds** and in the case of dynamic arrays, **explicitly manage the heap memory** too

<details>
<summary>Adjacency Matrix via <strong>Static Arrays</strong></summary>

![Adjacency matrix via Static array](/code-journal/diagrams/adj-matrix-static-array.svg)

In C++, the number of columns in static 2D array should be known at compile-time. So we have to allocate matrix as `Adj[][V_MAX]` with `V_MAX` initialized beforehand

**Space required** is &nbsp; \\( O( V\_{max}^2 ) \\) &nbsp; out of which we only use &nbsp; \\(O(V^2)\\)

> Note: **Extra space has to be allocated** than what is used

```cpp
// Define Maximum number of nodes in graph
const int V_MAX = 100;

// Print (V x V) cells of  (V x V_MAX) Adjacency Matrix
void printMatrix(int Adj[][V_MAX], const int V) {
    for (int row = 0; row < V; row++) {
        for (int col = 0; col < V; col++) {
            cout << Adj[row][col] << " ";
        }
        cout << endl;
    }
}

int main() {
    // Input number of nodes and edges
    int V, E;
    cin >> V >> E;

    int Adj[V][V_MAX];            // Create (V x V_MAX) Adjacency Matrix
    memset(Adj, 0, sizeof(Adj));  // Initialize all cells as '0'

    cout << "\nAfter Initialization:" << endl;
    printMatrix(Adj, V);

    // Building graph edges from input
    for (int i = 0; i < E; i++) {
        // Input the two ends of edge
        int src, dest;
        cin >> src >> dest;
        // Set edge entry
        Adj[src][dest] = Adj[dest][src] = 1;
    }

    cout << "\nFilled Graph:" << endl;
    printMatrix(Adj, V);

    return 0;
}
```

</details>

<br>

<details>
<summary>Adjacency Matrix via <strong>Dynamic Arrays</strong></summary>

![Adjacency matrix via Dynamic array](/code-journal/diagrams/adj-matrix-dynamic-array.svg)

**Space required**: '\\(V\\)' number of pointers where each pointer points to a '\\(V\\)' sized integer array

\\( \implies (V \ast V) + V = O(V^2) \\)

> Note: We **have to manually deallocate rows of matrix** to free-up heap memory

```cpp
// Print cells of (V x V) Adjacency Matrix
void printMatrix(int** Adj, const int V) {
    for (int row = 0; row < V; row++) {
        for (int col = 0; col < V; col++) {
            cout << Adj[row][col] << " ";
        }
        cout << endl;
    }
}

// Cleanup allocated memory of matrix
void deallocateMatrix(int** Adj, const int V) {
    for (int row = 0; row < V; row++) {
        delete[] Adj[row];   // Deallocate the pointed row
        Adj[row] = nullptr;  // Set pointer as not pointing to anything
    }
}

int main() {
    // Input number of nodes and edges
    int V, E;
    cin >> V >> E;

    // Create (V x V) Adjacency Matrix and initialize all cells as '0':

    // Array of 'V' pointers that each point to dynamic integer array
    int* Adj[V];
    for (int row = 0; row < V; row++) {
        // Each pointer would point to a 'V' sized row on the heap
        Adj[row] = new int[V]{0};
    }

    cout << "\nAfter Initialization:" << endl;
    printMatrix(Adj, V);

    // Building graph edges from input
    for (int i = 0; i < E; i++) {
        // Input the two ends of edge
        int src, dest;
        cin >> src >> dest;
        // Set edge entry
        Adj[src][dest] = Adj[dest][src] = 1;
    }

    cout << "\nFilled Graph:" << endl;
    printMatrix(Adj, V);

    deallocateMatrix(Adj, V);

    return 0;
}
```

</details>

### Adjacency Matrix via vectors (better)

![Adjacency Matrix via vectors](/code-journal/diagrams/adj-matrix-vector.svg)

**Space required**: \\( O( V^2 ) \\)

```cpp
void printMatrix(vector<vector<int>> const &Adj) {
    int V = Adj.size();
    for (int row = 0; row < V; row++) {
        for (int col = 0; col < V; col++) {
            cout << Adj[row][col] << " ";
        }
        cout << endl;
    }
}

int main() {
    // Input number of nodes and edges
    int V, E;
    cin >> V >> E;

    // Create (V x V) Adjacency Matrix and initialize all cells to '0'
    vector<vector<int>> Adj(V, vector<int>(V, 0));

    cout << "\nAfter Initialization:" << endl;
    printMatrix(Adj);

    // Building graph edges from input
    for (int i = 0; i < E; i++) {
        // Input the two ends of edge
        int src, dest;
        cin >> src >> dest;
        // Set edge entry
        Adj[src][dest] = Adj[dest][src] = 1;
    }

    cout << "\nFilled Graph:" << endl;
    printMatrix(Adj);

    return 0;
}
```

> In summary, we can say **Adjacency matrix** takes up overall \\( O(n^2) \\) **space**. Traversing each of it's cells would also take up \\( O(n^2) \\) **traversal time**. It is suited for **dense graphs** where most of the cells would be filled. But one advantage is that we have **fast random access** i.e. we can check `Adj[u][v]` in \\( O(1) \\) time to **know if edge exists** from `u` to `v`

### Tweaking the Adjacency matrix

- **Directed vs Undirected graphs**:

  Since above given graph is **undirected**, we assume the **edges are bi-directional** i.e for an undirected edge between nodes `u` and `v`, we are setting both `Adj[u][v]` and `Adj[v][u]` as `1`. For **Directed graphs**, when there is a directed edge from node `u` to `v`, we **ONLY set `Adj[u][v]`** as `1` and not vice-versa

- **Weighted vs Unweighted graphs**:

  Since above given graph is **unweighted**, we assume the **all the weights as `1`**. For **Weighted graphs**, we set the `Adj[u][v]` **value as the weight of edge** from the node `u` to node `v`

- **Storing half triangle of** `Adj[][]`:

  For **undirected, unweighted** graphs, you can **store just one half of the adjacency matrix**, since the matrix will be symmetric across it's main diagonal i.e. `Adj[u][v] = Adj[v][u]`. This will need only half as much as the previous memory. The decision to include or not include the elements lying on the diagonal depends on whether there are **self-edges** present

## 2. Adjacency List (best)

```cpp
void printMatrix(vector<vector<int>> const &Adj) {
    int V = Adj.size();
    // Traverse all neighbors of each node
    for (int node = 0; node < V; node++) {
        cout << node << " -> ";
        for (int neighbor : Adj[node]) {
            cout << neighbor << ", ";
        }
        cout << endl;
    }
}

int main() {
    // Input number of nodes and edges
    int V, E;
    cin >> V >> E;

    // Allocate an empty list for each of the 'V' nodes
    vector<vector<int>> Adj(V);

    cout << "\nAfter Initialization:" << endl;
    printMatrix(Adj);

    // Building graph edges from input
    for (int i = 0; i < E; i++) {
        // Input the two ends of edge
        int src, dest;
        cin >> src >> dest;
        // Mark both nodes as neighbors of each other
        Adj[src].push_back(dest);
        Adj[dest].push_back(src);
    }

    cout << "\nFilled Graph:" << endl;
    printMatrix(Adj);

    return 0;
}
```

The Adjacency List can also be declared as `vector<int> Adj[V];` . However, this fixes the total number of nodes and we can't add more nodes later.

```txt title="Output"
After Initialization:
0 ->
1 ->
2 ->
3 ->
4 ->
5 ->
6 ->
7 ->
8 ->
9 ->
10 ->
11 ->

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

**Space required**:

- We have \\( (V) \\) lists (one neighbour list per node)
- Each list contains the neighboring nodes. Since the graph is **undirected**, if an edge exists between node `u` and `v`, then `v` will be appended into the neigbour list of `u` and vice-versa too, i.e. **entries added in two places per undirected edge**. So, in total, there will be \\( (2 \ast E) \\) neigbour entries

**Total space** \\( \implies O(V + 2E) \\)

> **Adjacency List** takes up \\( O(V+E) \\) space which is **almost linear** while Adjacency Matrix takes up quadratic space. Similar complexities for traversals too. Thus, Adjacency list is suited for **sparse graphs**, which make up most of the graphs in real-world. Note that there is **no fast random-acess** (we have to traverse the neighbors list of nodes one-by-one).

### Tweaking the Adjacency List

- **Directed vs Undirected graphs**:

  When there is directed edge from node `u` to node `v`, only append `v` into the neigbours list of `u` and **NOT vice-versa**. The space required in directed graphs would be \\( O(V+E) \\) as there's only one entry per directed edge

- **Weighted vs Unweighted graphs**:

  Since above given graph is **unweighted**, we assume the **all the weights as `1`**. For **Weighted graphs**, we would need to **store the edge weight along with the neighbour node info** in a `pair`

  ```cpp
  // node -> list of {neighbor, weight} pairs
  vector< vector< pair<int, int> > > Adj(V);
  ```

- **Fast random access**:

  Sometimes, we may need fast random access, typically when answering multiple queries. For that, we can **store the neighbors in a set** (`set` or `unordered_set`) instead of a `vector`. We can check if one node is present as a neighbor of another in \\( O(1) \\) time

  ```cpp
  // Declaration (assuming unweighted)
  vector< unordered_set<int> > Adj(V);

  // Checking if edge exists from node 'a' to 'b'
  if (Adj[a].count(b)) {
      cout << "Edge exist";
  }
  ```

  Also, you can **maintain the neighbors in sorted manner** to allow \\(O(logn)\\) lookup via **binary search**

---

## Other tweaks

### When nodes are not denoted by integers

Sometimes the node labels are not integers but something like characters or strings. In such cases, we use **maps**. Each node label is mapped to the labels of it's neighbouring nodes

```cpp
// Adcaccency list mapping:
// node label -> list of labels of it's neighbours
map< string, vector<string> > Adj;

// Adding edge from "Mike" node to "Adam" node
Adj["Mike"].push_back("Adam");

// Traversal
for(auto &[node, neighbours]: Adj) {
    // processing current vertex 'node'
    for(string &nb: neighbours) {
        // processing current neighbour 'nb' of 'node'
    }
}
```

### 1-based indexing

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

**Also refer**:

[CS Academy - Graph representation](https://csacademy.com/lesson/graph_representation)

[The Boost Graph Library](https://www.boost.org/doc/libs/1_84_0/libs/graph/doc/index.html)
