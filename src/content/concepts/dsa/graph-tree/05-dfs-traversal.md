---
title: DFS Traversal of Graph
tags: [dsa, algorithm, graph]
---

**Contents**:

- [DFS Algorithm](#dfs-algorithm)
- [DFS traversal on Adjacency List](#dfs-traversal-on-adjacency-list)
  - [Analysis of DFS Traversal on Adjacency List](#analysis-of-dfs-traversal-on-adjacency-list)
- [DFS traversal on Adjacency Matrix](#dfs-traversal-on-adjacency-matrix)
  - [Analysis of DFS Traversal on Adjacency Matrix](#analysis-of-dfs-traversal-on-adjacency-matrix)

## Input Graph

![Graph](/code-journal/diagrams/graphviz/001.svg)

## DFS Algorithm

Depth-First Search (DFS) traversal of Graph keeps going **deeper** till there's a dead end. Then it **backtracks** to other neighbors of the **last-visited** node. It is **recursive** and uses call stack to track order of recursive calls

Below is the approach for DFS traversal of a **connected component**. To traverse a **disconnected** graph, run this component exploration from **every unvisited node as the source**

```txt title="Pseudocode: DFS traversal of Component"
DFS(node):
    Mark node as visited and process it (i.e. append to the traversed nodes)
    Explore all neighbors of this picked node:
        If any unvisited neighbor node "nbr" encountered:
            Make recursive call to start exploring from that neighbor i.e. DFS(nbr)
```

## DFS traversal on Adjacency List

Refer [Adjacency List Graph representation](/code-journal/dsa/dsa/graph-tree/02-graph-representations#2-adjacency-list-representation-of-graph-best)

```txt title="Adjacency List of the Input Graph"
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

```cpp title="DFS traversal on Adjacency List"
// Explore connected unvisited nodes of this component from "currNode"
void dfs (
    const int currNode,
    vector<char> &visited,
    vector<int> &componentTraversal,
    const vector<vector<int>> &Adj
) {
    // Mark current node as visited
    visited[currNode] = true;
    // Process current node (append it to the traversed nodes)
    componentTraversal.emplace_back(currNode);
    // Iterate over neighbors of current node
    for (auto &nbr : Adj[currNode]) {
        // When an unvisited neighbor encountered
        if (!visited[nbr]) {
            // Make recursive call to explore from that neighbor
            dfs(nbr, visited, componentTraversal, Adj);
        }
    }
}

// DFS Traversal of the entire Graph
vector<vector<int>> dfsOfGraph (const vector<vector<int>> &Adj) {
    int V = Adj.size();
    vector<vector<int>> graphTraversal;  // Stores answer

    // To track previously visited nodes so that we don't re-explore them
    vector<char> visited(V, false);  // Initially all nodes are unvisited

    // Iterate over all nodes
    for (int node = 0; node < V; node++) {
        // If this node was not visited anytime before
        if (!visited[node]) {
            // Stores traversal of this component
            vector<int> componentTraversal;
            // Start DFS exploration of this component from this unvisited node as SOURCE
            dfs(node, visited, componentTraversal, Adj);
            // Add this component's traversal to answer
            graphTraversal.emplace_back(componentTraversal);
        }
    }
    // Entire graph has been explored. Return final answer
    return graphTraversal;
}

int main() {
    // Build graph
    int V, E;
    cin >> V >> E;
    vector<vector<int>> Adj(V);
    for (int i = 0; i < E; i++) {
        int src, dest;
        cin >> src >> dest;
        Adj[src].emplace_back(dest);
        Adj[dest].emplace_back(src);
    }

    // Perform DFS traversal of graph
    const auto graphTraversal = dfsOfGraph(Adj);

    // Print the traversal taken
    for (auto &componentTraversal : graphTraversal) {
        for (auto &node : componentTraversal) {
            cout << node << ", ";
        }
        cout << "\n";
    }
}
/* Output:
    0, 1, 2, 5, 7, 9,
    3, 4, 11, 6, 10,
    8,
*/
```

Note that there can be **multiple valid DFS traversals** of a Graph

<details>
    <summary>A <strong>dry-run</strong> of the above example is shown here</summary>

```txt title="Output of Dry-run"
Start exploring new component from 0
  0 visited. Next, we'll visit it's unvisited neighbor 1
  1 visited. Next, we'll visit it's unvisited neighbor 2
  2 visited. Next, we'll visit it's unvisited neighbor 5
  5 visited. Next, we'll visit it's unvisited neighbor 7
  7 visited. Next, we'll visit it's unvisited neighbor 9
  9 visited.
  This component has been explored completely ✅
This component's traversal was: [ 0, 1, 2, 5, 7, 9, ]

Start exploring new component from 3
  3 visited. Next, we'll visit it's unvisited neighbor 4
  4 visited. Next, we'll visit it's unvisited neighbor 11
  11 visited. Next, we'll visit it's unvisited neighbor 6
  6 visited. Next, we'll visit it's unvisited neighbor 10
  10 visited.
  This component has been explored completely ✅
This component's traversal was: [ 3, 4, 11, 6, 10, ]

Start exploring new component from 8
  8 visited.
  This component has been explored completely ✅
This component's traversal was: [ 8, ]

FINAL RESULT:
0, 1, 2, 5, 7, 9,
3, 4, 11, 6, 10,
8,
```

Below code was used to generate the verbose dry-run output:

```cpp title="Dry-run code"
void dfs (
    const int currNode,
    vector<char> &visited,
    vector<int> &componentTraversal,
    vector<vector<int>> const &Adj
) {
    visited[currNode] = true;
    cout << "  " << currNode << " visited.";
    componentTraversal.emplace_back(currNode);
    for (auto &nbr : Adj[currNode]) {
        if (!visited[nbr]) {
            cout << " Next, we'll visit it's unvisited neighbor " << nbr << "\n";
            dfs(nbr, visited, componentTraversal, Adj);
        }
    }
}

vector<vector<int>> dfsOfGraph (const vector<vector<int>> &Adj) {
    int V = Adj.size();
    vector<vector<int>> graphTraversal;
    vector<char> visited(V, false);
    for (int src = 0; src < V; src++) {
        if (!visited[src]) {
            vector<int> componentTraversal;
            cout << "\nStart exploring new component from " << src << "\n";
            dfs(src, visited, componentTraversal, Adj);
            cout << "\n  This component has been explored completely ✅\n";
            cout << "This component's traversal was: [ ";
            for (auto &node : componentTraversal) {
                cout << node << ", ";
            }
            cout << "]\n";
            graphTraversal.emplace_back(componentTraversal);
        }
    }
    return graphTraversal;
}
```

</details>

### Analysis of DFS Traversal on Adjacency List

| Metric | Complexity |
| ------ | ---------- |
| Time   | $O(V + E)$ |
| Space  | $ O(V) $   |

**Time Complexity**:

- At each node, we are iterating over all it's neighbours and making a recursive call at the first univisted neighbour found. Note that there would be $ O(V) $ **recursive calls in total**.
- The time to iterate over all the neighbours of each node would be $ O(V+2E ) $ in an **undirected** and $ O(V+E ) $ in a **directed** graph

**Space Complexity**:

- The `visited[]` array takes $ O(V) $ space
- The worst-case space used by the recursion call stack depends on the max depth of recursive calls. The worst case would occur when we are traversing almost all the nodes depth-wise in one-direction without backtracking, i.e. when the graph is like a linked-list. Almost all the nodes would be present in the call-stack at one point i.e. $O(V)$ space
- We are ignoring the $O(V)$ space used to store the final answer and $O(V+E )$ space of Adjacency List itself

## DFS traversal on Adjacency Matrix

DFS Traversal on Adjacency Matrix representation of Graph is similar to the Adjacency List approach, just with an extra step of having to iterate through an entire row of a node to find which are its neighbors (edge exists between them and they are neighbors if cell value is `1` else they're not neighbors)

Refer [Adjacency Matrix Graph representation](/code-journal/dsa/dsa/graph-tree/02-graph-representations#1-adjacency-matrix-representation-of-graph)

```txt title="Adjacency Matrix of the Input Graph"
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

```cpp title="DFS traversal on Adjacency Matrix"
// Explore connected unvisited nodes of this component from "currNode"
void dfs (
    const int currNode,
    vector<char> &visited,
    vector<int> &componentTraversal,
    const vector<vector<int>> &Adj
) {
    // Mark current node as visited
    visited[currNode] = true;
    // Process current node (append it to the traversed nodes)
    componentTraversal.emplace_back(currNode);

    // Iterate over current node's row in Adjacency Matrix. We have to traverse the entire row of Adj[currNode]
    const int V = Adj.size();
    for (int node = 0; node < V; node++) {
        // "node" is neighbor of "currNode" when Edge exists between them i.e. Adj[currNode][node] = 1
        if (Adj[currNode][node] && !visited[node]) {  // When an unvisited neighbor encountered
            // Make recursive call to explore from that neighbor
            dfs(node, visited, componentTraversal, Adj);
        }
    }
}

vector<vector<int>> dfsOfGraph (const vector<vector<int>> &Adj) {
    int V = Adj.size();
    vector<vector<int>> graphTraversal;  // Stores answer

    // To track previously visited nodes so that we don't re-explore them
    vector<char> visited(V, false);  // Initially all nodes are unvisited

    // Iterate over all nodes
    for (int node = 0; node < V; node++) {
        // If this node was not visited anytime before
        if (!visited[node]) {
            // Stores traversal of this component
            vector<int> componentTraversal;
            // Start DFS exploration of this component from this unvisited node as SOURCE
            dfs(node, visited, componentTraversal, Adj);
            // Add this component's traversal to answer
            graphTraversal.emplace_back(componentTraversal);
        }
    }
    // Entire graph has been explored. Return final answer
    return graphTraversal;
}
int main () {
    // Build Graph
    int V, E;
    cin >> V >> E;
    vector<vector<int>> Adj(V, vector<int>(V, 0));
    for (int i = 0; i < E; i++) {
        int u, v;
        cin >> u >> v;
        Adj[u][v] = Adj[v][u] = 1;
    }

    // Perform DFS traversal of graph:
    const auto graphTraversal = dfsOfGraph(Adj);

    // Print the traversal taken
    for (auto &componentTraversal : graphTraversal) {
        for (auto &node : componentTraversal) {
            cout << node << ", ";
        }
        cout << "\n";
    }
}
/* Output:
    0, 1, 2, 5, 7, 9,
    3, 4, 11, 6, 10,
    8,
*/
```

### Analysis of DFS Traversal on Adjacency Matrix

| Metric | Complexity |
| ------ | ---------- |
| Time   | $O(V^2)$   |
| Space  | $O(V)$     |

**Time Complexity**:

- At each node, instead of looping only through its actual neighbors, we must iterate over all $V$ columns of the Adjacency Matrix row to check for unvisited neighbors
- Since this row-scan of length $V$ is performed for all $V$ vertices in the graph, the total time complexity becomes $O(V^2)$
- Unlike the Adjacency List version which scales with the number of edges as $O(V + E)$, the Adjacency Matrix DFS always examines $V^2$ potential connections, making it inefficient for Sparse graphs

**Space Complexity**:

- The `visited[]` array takes $O(V)$ space
- The worst-case space used by the recursion call stack is $O(V)$, which occurs when the graph is structured like a linear chain (for example, a linked list) and the recursion reaches a maximum depth close to the total number of vertices without backtracking
- We are ignoring the $O(V)$ space used to store the final answer and the $O(V^2)$ space required to store the Adjacency Matrix itself
