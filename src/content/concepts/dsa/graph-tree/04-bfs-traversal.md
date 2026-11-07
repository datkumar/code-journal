---
title: BFS Traversal of Graph
tags: [dsa, algorithm, graph]
---

**Contents**:

- [BFS Algorithm](#bfs-algorithm)
- [BFS traversal on Adjacency List](#bfs-traversal-on-adjacency-list)
  - [Analysis of BFS Traversal on Adjacency List](#analysis-of-bfs-traversal-on-adjacency-list)
- [BFS traversal on Adjacency Matrix](#bfs-traversal-on-adjacency-matrix)
  - [Analysis of BFS Traversal on Adjacency Matrix](#analysis-of-bfs-traversal-on-adjacency-matrix)

## Input Graph

![Graph](/code-journal/diagrams/graphviz/001.svg)

## BFS Algorithm

Breadth-First Search (BFS) traversal of Graph is also called as **Level-Order** traversal as it traverses all the nodes at particular level at a time. It uses the **Queue** data structure

Below is the approach for BFS traversal of a **connected component** with one node selected as the **source node**. To traverse a **disconnected** graph, run this component exploration from **every unvisited node as the source**

```txt title="Pseudocode: BFS traversal of Component"
Create a Queue to store which nodes that should be explored next
Mark the source node as visited and add it into the empty queue
Keep iterating till no elements remain in queue:
    Pick one element from the front of queue
    Process that picked element (i.e. append it to the traversed nodes)
    Explore all neighbors of this picked node:
        If any unvisited neighbor found:
            Mark that neighbor as visited
            Add that neighbor to back of the queue to be explored later
```

## BFS traversal on Adjacency List

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

```cpp title="BFS traversal on Adjacency List"
// BFS Traversal of the component level-by-level starting from source node
vector<int> bfs (
    const int src,
    vector<char> &visited,
    const vector<vector<int>> &Adj
) {
    vector<int> componentTraversal;  // Stores traversal of this component
    queue<int> Q;                    // Stores nodes that we have should be EXPLORED NEXT

    // Mark the SOURCE node as visited into the empty queue
    visited[src] = true;
    Q.push(src);

    // Keep going till no elements remain to be explored
    while (!Q.empty()) {
        // Pick node at front of queue and add it to the traversed nodes (mark as explored)
        const int currNode = Q.front();
        Q.pop();
        componentTraversal.emplace_back(currNode);

        // Explore all neighbors of this picked node
        for (auto &nbr : Adj[currNode]) {
            if (!visited[nbr]) {      // When an unvisited neighbor is encountered
                visited[nbr] = true;  // Mark this neighbor as visited
                Q.push(nbr);          // Append the neighbor node into queue to be explored later
            }
        }
    }
    // This component has been explored. Return our traversal of this component
    return componentTraversal;
}

// BFS Traversal of the entire Graph
vector<vector<int>> bfsOfGraph (const vector<vector<int>> &Adj) {
    int V = Adj.size();
    vector<vector<int>> graphTraversal;  // Stores final answer
    // To track previously visited nodes so that we don't re-explore them
    vector<char> visited(V, false);  // Initially all nodes are unvisited

    // Iterate over all nodes
    for (int node = 0; node < V; node++) {
        // If this node was not visited anytime before
        if (!visited[node]) {
            // Start BFS exploration of this component from this node as SOURCE
            const auto componentTraversal = bfs(node, visited, Adj);
            // Add this component's traversal to answer
            graphTraversal.emplace_back(componentTraversal);
        }
    }
    // Entire graph has been explored. Return final answer
    return graphTraversal;
}

int main() {
    // Build Graph
    int V, E;
    cin >> V >> E;
    vector<vector<int>> Adj(V);
    for (int i = 0; i < E; i++) {
        int u, v;
        cin >> u >> v;
        Adj[u].emplace_back(v);
        Adj[v].emplace_back(u);
    }

    // Perform BFS traversal of Graph
    const auto graphTraversal = bfsOfGraph(Adj);

    // Print the traversal taken
    for (const auto &componentTraversal : graphTraversal) {
        for (const int &node : componentTraversal) {
            cout << node << ", ";
        }
        cout << "\n";
    }
}
/* Output:
    0, 1, 2, 5, 7, 9,
    3, 4, 6, 10, 11,
    8,
*/
```

Since the neighbors are present in sorted manner within the adjacency list, the traversal nodes are also traversed in sorted way. But there can be **multiple possible valid BFS traversals** of a Graph

- In **first component**, node `0` taken as source at root level (`depth = 0`):
  1. Nodes at `depth = 1` from source: `[1,2,5]`
  2. Nodes at `depth = 2` from source: `[7,9]`

- In **second component**, node `3` taken as source at root level (`depth = 0`):
  1. Nodes at `depth = 1` from source: `[4,6,10]`
  2. Nodes at `depth = 2` from source: `[11]`

- In **third component**, node `8` taken as source at root level (`depth = 0`):
  1. Nodes at `depth = 1` from source: **none**

<details>
    <summary>A <strong>dry-run</strong> of the above example is shown here</summary>

```txt title="Output of Dry-run"
Start exploring new component from node 0 as source:
  Source 0 marked visited and appended as first element in queue.
  Front element 0 popped from queue and added to traversal. Now, exploring it's neighbors:
    1 is an unvisited neighbor. Mark it visited and append it to end of queue
    2 is an unvisited neighbor. Mark it visited and append it to end of queue
    5 is an unvisited neighbor. Mark it visited and append it to end of queue
  Front element 1 popped from queue and added to traversal. Now, exploring it's neighbors:
  Front element 2 popped from queue and added to traversal. Now, exploring it's neighbors:
  Front element 5 popped from queue and added to traversal. Now, exploring it's neighbors:
    7 is an unvisited neighbor. Mark it visited and append it to end of queue
    9 is an unvisited neighbor. Mark it visited and append it to end of queue
  Front element 7 popped from queue and added to traversal. Now, exploring it's neighbors:
  Front element 9 popped from queue and added to traversal. Now, exploring it's neighbors:
  This component has been explored completely ✅
This component's traversal was: [ 0, 1, 2, 5, 7, 9, ]

Start exploring new component from node 3 as source:
  Source 3 marked visited and appended as first element in queue.
  Front element 3 popped from queue and added to traversal. Now, exploring it's neighbors:
    4 is an unvisited neighbor. Mark it visited and append it to end of queue
    6 is an unvisited neighbor. Mark it visited and append it to end of queue
    10 is an unvisited neighbor. Mark it visited and append it to end of queue
  Front element 4 popped from queue and added to traversal. Now, exploring it's neighbors:
    11 is an unvisited neighbor. Mark it visited and append it to end of queue
  Front element 6 popped from queue and added to traversal. Now, exploring it's neighbors:
  Front element 10 popped from queue and added to traversal. Now, exploring it's neighbors:
  Front element 11 popped from queue and added to traversal. Now, exploring it's neighbors:
  This component has been explored completely ✅
This component's traversal was: [ 3, 4, 6, 10, 11, ]

Start exploring new component from node 8 as source:
  Source 8 marked visited and appended as first element in queue.
  Front element 8 popped from queue and added to traversal. Now, exploring it's neighbors:
  This component has been explored completely ✅
This component's traversal was: [ 8, ]

FINAL RESULT:
0, 1, 2, 5, 7, 9,
3, 4, 6, 10, 11,
8,
```

Below code was used to generate the verbose dry-run output:

```cpp title="Dry-run code"
vector<int> bfs (
    const int src,
    vector<char> &visited,
    const vector<vector<int>> &Adj
) {
    queue<int> Q;
    vector<int> componentTraversal;
    visited[src] = true;
    cout << "  Source " << src << " marked visited and appended as first element in queue.\n";
    Q.push(src);
    while (!Q.empty()) {
        const int currNode = Q.front();
        Q.pop();
        componentTraversal.emplace_back(currNode);
        cout << "  Front element " << currNode
             << " popped from queue and added to traversal. Now, exploring it's neighbors:\n";
        for (auto &nbr : Adj[currNode]) {
            if (!visited[nbr]) {
                visited[nbr] = true;
                Q.push(nbr);
                cout << "    " << nbr << " is an unvisited neighbor. Mark it visited and append it to end of queue\n";
            }
        }
    }
    return componentTraversal;
}

vector<vector<int>> bfsOfGraph (const vector<vector<int>> &Adj) {
    int V = Adj.size();
    vector<vector<int>> graphTraversal;
    vector<char> visited(V, false);
    for (int node = 0; node < V; node++) {
        if (!visited[node]) {
            cout << "\nStart exploring new component from node " << node << " as source:\n";
            const auto componentTraversal = bfs(src, visited, Adj);

            cout << "  This component has been explored completely ✅\n";
            cout << "This component's traversal was: [ ";
            for (auto &x : componentTraversal) cout << x << ", ";
            cout << "]\n";

            graphTraversal.emplace_back(componentTraversal);
        }
    }
    return graphTraversal;
}

int main () {
    // Build graph
    int V, E;
    cin >> V >> E;
    vector<vector<int>> Adj(V);
    for (int i = 0; i < E; i++) {
        int u, v;
        cin >> u >> v;
        Adj[u].emplace_back(v);
        Adj[v].emplace_back(u);
    }

    const auto graphTraversal = bfsOfGraph(Adj);

    cout << "\nFINAL RESULT:\n";
    for (const auto &componentTraversal : graphTraversal) {
        for (const int &node : componentTraversal) {
            cout << node << ", ";
        }
        cout << "\n";
    }
}
```

</details>

### Analysis of BFS Traversal on Adjacency List

| Metric | Complexity |
| ------ | ---------- |
| Time   | $O(V+E)$   |
| Space  | $O(V)$     |

**Time Complexity**:

- For each unvisited node, we are checking each of it's neighbours. Thus, each node is being visited once and it's neighbours then explored once.
- In **undirected** graph, the edges are bidirectional i.e. for an edge, the two nodes are present as each other's neighbours. So overall time would be $O(V+2E)$. However, in **directed** graph, there is no double-counting so it's time is $O(V+E )$

**Space Complexity**:

- The `visited[]` array takes $O(V)$ space
- Each node is appended into **queue** only once. At worst, there would be around $O(V)$ elements in queue. This case can occur when all nodes other than the source are direct neighbours of the source node.
- We are ignoring the $O(V)$ used to store the final answer and $O(V+E)$ space used to store the Adjacency List itself

> BFS is suitable when the node we're searching is located **close to the source** at a small depth

## BFS traversal on Adjacency Matrix

BFS Traversal on Adjacency Matrix representation of Graph is similar to the Adjacency List approach, just with an extra step of having to iterate through an entire row of a node to find which are its neighbors (edge exists between them and they are neighbors if cell value is `1` else they're not neighbors)

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

```cpp title="BFS traversal on Adjacency Matrix"
// BFS Traversal of the component level-by-level starting from source node
vector<int> bfs (const int src, vector<char> &visited, const vector<vector<int>> &Adj) {
    const int V = Adj.size();
    vector<int> componentTraversal;  // Stores traversal of this component
    queue<int> Q;                    // Stores nodes that we have should be EXPLORED NEXT

    // Mark the SOURCE node as visited into the empty queue
    visited[src] = true;
    Q.push(src);

    // Keep going till no elements remain to be explored
    while (!Q.empty()) {
        // Pick node at front of queue and add it to the traversed nodes (mark as explored)
        const int currNode = Q.front();
        Q.pop();
        componentTraversal.emplace_back(currNode);

        // Explore all neighbors of this picked node. We have to traverse the entire row of Adj[currNode]
        // "node" is neighbor of "currNode" when Edge exists between them i.e. Adj[currNode][node] = 1
        for (int node = 0; node < V; node++) {
            // When "node" is an unvisited neighbor of "currNode"
            if (Adj[currNode][node] && !visited[node]) {
                visited[node] = true;  // Mark this neighbor as visited
                Q.push(node);          // Append the neighbor node into queue to be explored later
            }
        }
    }
    // This component has been explored. Return our traversal of this component
    return componentTraversal;
}

// BFS Traversal of the entire Graph
vector<vector<int>> bfsOfGraph (const vector<vector<int>> &Adj) {
    const int V = Adj.size();
    vector<vector<int>> graphTraversal;  // Stores final answer
    // To track previously visited nodes so that we don't re-explore them
    vector<char> visited(V, false);  // Initially all nodes are unvisited

    // Iterate over all nodes
    for (int node = 0; node < V; node++) {
        // If this node was not visited anytime before
        if (!visited[node]) {
            // Start BFS exploration of that component from this node as SOURCE
            const auto componentTraversal = bfs(node, visited, Adj);
            // Add that component's traversal to answer
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

    // Perform BFS traversal of Graph
    const auto graphTraversal = bfsOfGraph(Adj);

    // Print the traversal taken
    for (const auto &componentTraversal : graphTraversal) {
        for (const int &node : componentTraversal) {
            cout << node << ", ";
        }
        cout << "\n";
    }
}
/* Output:
    0, 1, 2, 5, 7, 9,
    3, 4, 6, 10, 11,
    8,
*/
```

### Analysis of BFS Traversal on Adjacency Matrix

| Metric | Complexity |
| ------ | ---------- |
| Time   | $O(V^2)$   |
| Space  | $O(V)$     |

**Time Complexity**:

- For every vertex we pop from the queue, we must iterate through all $V$ columns of the adjacency matrix to check for neighbors, regardless of whether an edge actually exists
- Since this $O(V)$ neighbor check is performed for all $V$ vertices in the graph, the total time complexity becomes $O(V^2)$
- Unlike the adjacency list version, the time complexity here is independent of the number of edges ($E$), making it inefficient for sparse graphs where $E$ is much smaller than $V^2$

**Space Complexity**:

- The `visited[]` array takes $O(V)$ space
- In the worst-case scenario (dense graphs), the queue can hold up to $O(V)$ elements simultaneously
- We are ignoring the $O(V)$ space used to store the final answer and the $O(V^2)$ space required to store the Adjacency Matrix itself

> BFS on an Adjacency Matrix is optimal for Dense graphs, where $E$ approaches $V^2$, but performs **redundant neighbor lookups** on Sparse graphs
