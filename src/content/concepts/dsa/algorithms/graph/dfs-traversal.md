---
title: DFS Traversal
tags: [dsa, algorithm, graph]
---

## Algorithm

Depth-First Search (DFS) traversal of Graph keeps going **deeper** till there's a dead end. Then it **backtracks** to other neighbours of the recently visited node. It uses the **Stack** data structure as it's **recursive**

Below is the approach for DFS traversal of a **connected component**:

```txt title="Pseudocode"
DFS(Adj, node):
    Mark 'node' as visited and add it to traversed nodes.
    For all neighbours of 'node':
        If a neighbour 'nb' of 'node' is unvisited:
            DFS(Adj, nb)
```

To traverse a **disconnected** graph, run this component exploration from **every unvisited node as the source**

## DFS traversal on Adjacency List

Refer [Adjacency List Graph representation](/code-journal/dsa/dsa/graph-representations#2-adjacency-list-best)

```cpp
// Explore an unvisited neighbor of current node
void dfs (
    vector<vector<int>> const &Adj,
    vector<char> &visited,
    vector<int> &componentTraversal,
    const int currentNode
) {
    // Mark current node as visited
    visited[currentNode] = true;
    // Append current node into the traversed nodes of present component
    componentTraversal.push_back(currentNode);

    // Iterate over neighbors of current node
    for (auto &neighbor : Adj[currentNode]) {
        if (!visited[neighbor]) {
            // Visit this univisted neighbor of current node next
            dfs(Adj, visited, componentTraversal, neighbor);
        }
    }
}

const vector<vector<int>> dfsOfGraph(vector<vector<int>> const &Adj) {
    int V = Adj.size();
    vector<vector<int>> graphTraversal; // Stores answer

    // To track previously visited nodes so that we don't re-explore them
    vector<char> visited(V, false); // Initially all nodes are unvisited

    // Iterate over all nodes
    for (int src = 0; src < V; src++) {
        // If a node wasn't visited before
        if (!visited[src]) {
            // Stores traversal of this component
            vector<int> componentTraversal;
            // Start exploring this component from this unvisited node as root
            dfs(Adj, visited, componentTraversal, src);
            // Add this component's traversal to answer
            graphTraversal.push_back(componentTraversal);
        }
    }
    return graphTraversal;
}

int main() {
    // Build graph:
    int V, E;
    cin >> V >> E;
    vector<vector<int>> Adj(V);
    for (int i = 0; i < E; i++) {
        int src, dest;
        cin >> src >> dest;
        Adj[src].push_back(dest);
        Adj[dest].push_back(src);
    }

    // Perform DFS traversal of graph:
    const auto graphTraversal = dfsOfGraph(Adj);

    // Print the traversal taken
    for (auto &componentTraversal : graphTraversal) {
        for (auto &node : componentTraversal) {
            cout << node << ", ";
        }
        cout << endl;
    }
    return 0;
}
```

## Input

![Graph](/code-journal/diagrams/graphviz/001.svg)

```txt title="Adjacency List"
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

## Output

```txt
0, 1, 2, 5, 7, 9,
3, 4, 11, 6, 10,
8,
```

Note that **there can be other valid DFS traversals** too

<details>
    <summary>A <strong>dry-run</strong> of the above example is shown here</summary>

```txt title="Dry-run Output"

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

```

Below code was used to generate the verbose dry-run output:

```cpp
void dfs(
    vector<vector<int>> const &Adj,
    vector<char> &visited,
    vector<int> &componentTraversal,
    const int currentNode
) {
    visited[currentNode] = true;
    cout << "\t" << currentNode << " visited.";
    componentTraversal.push_back(currentNode);
    for (auto &neighbor : Adj[currentNode]) {
        if (!visited[neighbor]) {
            cout << " Next, we'll visit it's unvisited neighbor " << neighbor << endl;
            dfs(Adj, visited, componentTraversal, neighbor);
        }
    }
}

const vector<vector<int>> dfsOfGraph(vector<vector<int>> const &Adj) {
    int V = Adj.size();
    vector<vector<int>> graphTraversal;
    vector<char> visited(V, false);
    for (int src = 0; src < V; src++) {
        if (!visited[src]) {
            vector<int> componentTraversal;
            cout << "\nStart exploring new component from " << src << endl;
            dfs(Adj, visited, componentTraversal, src);
            cout << "\n\tThis component has been explored completely ✅ " << endl;
            cout << "This component's traversal was: [ ";
            for (auto &node : componentTraversal) {
                cout << node << ", ";
            }
            cout << "]" << endl;
            graphTraversal.push_back(componentTraversal);
        }
    }
    return graphTraversal;
}
```

</details>

## Algorithm Analysis

| Metric | Complexity      |
| ------ | --------------- |
| Time   | \\( O(V+E ) \\) |
| Space  | \\( O(V) \\)    |

### Time

At each node, we are iterating over all it's neighbours and making a recursive call at the first univisted neighbour found. Note that there would be \\( O(V) \\) **recursive calls in total**.

The time to iterate over all the neighbours of each node would be \\( O(V+2E ) \\) in an **undirected** and \\( O(V+E ) \\) in a **directed** graph

### Space

The `visited[]` array takes \\( O(V) \\) space

The worst-case space used by the recursion call stack depends on the max depth of recursive calls. The worst case would occur when we are traversing almost all the nodes depth-wise in one-direction without backtracking, i.e. when the graph is like a linked-list. All the nodes would be present in the call-stack at one point i.e. \\( O(V) \\) space

We are ignoring the \\( O(V) \\) used to store the final answer and the \\( O(V+E ) \\) space of Adjacency List
