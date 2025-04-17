---
title: BFS Traversal
tags: [dsa, algorithm, graph]
---

## Algorithm

Breadth-First Search (BFS) traversal of Graph is also called as **Level-Order** traversal as it traverses all the nodes at particular level at a time. It uses the **Queue** data structure

Below is the approach for BFS traversal of a **connected component** with one node selected as the **source node**:

```txt title="Pseudocode"
Add the source node in a queue and mark it as visited.
Continue till no elements remain in queue:
    Pick one element apart from the front of queue.
    Explore all neighbors of this node:
        If any neighbor wasn't visited before:
            Append it to the end of queue and mark it as visited.
```

To traverse a **disconnected** graph, run this component exploration from **every unvisited node as the source**

## BFS traversal on Adjacency List

Refer [Adjacency List Graph representation](/code-journal/dsa/dsa/graph-representations#2-adjacency-list-best)

```cpp
// Traverse the component level-by-level starting from source node
const vector<int> bfs(
    vector<vector<int>> const &Adj,
    vector<char> &visited,
    const int src
) {
    queue<int> Q;                   // To store nodes that we have to explore next
    vector<int> componentTraversal; // Stores traversal of this component

    // Add the source node into the empty queue and mark it as visited
    Q.push(src);
    visited[src] = true;

    // Keep going till no elements remain to be explored
    while (!Q.empty()) {
        // Pick apart the front element of queue and add it to traversed (exploration done) nodes
        const int currentNode = Q.front();
        Q.pop();
        componentTraversal.push_back(currentNode);

        // Explore all neighbours of this picked node
        for (auto &neighbour : Adj[currentNode]) {
            if (!visited[neighbour]) {
                // Append the univisited neighbour into queue and mark it visited
                Q.push(neighbour);
                visited[neighbour] = true;
            }
        }
    }
    // This component has been traversed. Return our traversal taken
    return componentTraversal;
}

const vector<vector<int>> bfsOfGraph(vector<vector<int>> const &Adj) {
    int V = Adj.size();
    vector<vector<int>> graphTraversal; // Stores answer

    // To track previously visited nodes so that we don't re-explore them
    vector<char> visited(V, false); // Initially all nodes are unvisited

    // Iterate over all nodes
    for (int src = 0; src < V; src++) {
        // If this node wasn't yet visited
        if (!visited[src]) {
            // Start exploring this component from this unvisited node as root
            const auto componentTraversal = bfs(Adj, visited, src);
            // Add this component's traversal to answer
            graphTraversal.push_back(componentTraversal);
        }
    }
    // Entire graph has been traversed. Return final answer
    return graphTraversal;
}

int main() {
    // Build graph:
    int V, E;
    cin >> V >> E;
    vector<vector<int>> Adj(V);
    for (int i = 0; i < E; i++) {
        int u, v;
        cin >> u >> v;
        Adj[u].push_back(v);
        Adj[v].push_back(u);
    }

    // Perform BFS traversal of graph:
    const auto graphTraversal = bfsOfGraph(Adj);

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

Since the neighbors are present in sorted manner within the adjacency list, the traversal nodes are also traversed in sorted way. But **there can be other valid BFS traversals** too

```txt title="Output"
0, 1, 2, 5, 7, 9,
3, 4, 6, 10, 11,
8,
```

- In **first component**, node `0` taken as source at root level (`depth = 0`):

  1. Nodes at `depth = 1` from source: `[1,2,5]`
  2. Nodes at `depth = 2` from source: `[7,9]`

- In **second component**, node `3` taken as source at root level (`depth = 0`):

  1. Nodes at `depth = 1` from source: `[4,6,10]`
  2. Nodes at `depth = 2` from source: `[11]`

- In **third component**, node `8` taken as source at root level (`depth = 0`):

  1. Nodes at `depth = 1` from source: `none`

<details>
    <summary>A <strong>dry-run</strong> of the above example is shown here</summary>

```txt title="Dry-run Output"

Start exploring new component from 0
    Root 0 marked visited and appended as first element in queue.
    Front element 0 popped from queue and added to traversal. Now, explore it's neighbors:
        1 is an unvisited neighbor. Mark it visited and append it to end of queue
        2 is an unvisited neighbor. Mark it visited and append it to end of queue
        5 is an unvisited neighbor. Mark it visited and append it to end of queue
    Front element 1 popped from queue and added to traversal. Now, explore it's neighbors:
    Front element 2 popped from queue and added to traversal. Now, explore it's neighbors:
    Front element 5 popped from queue and added to traversal. Now, explore it's neighbors:
        7 is an unvisited neighbor. Mark it visited and append it to end of queue
        9 is an unvisited neighbor. Mark it visited and append it to end of queue
    Front element 7 popped from queue and added to traversal. Now, explore it's neighbors:
    Front element 9 popped from queue and added to traversal. Now, explore it's neighbors:
    This component has been explored completely ✅
This component's traversal was: [ 0, 1, 2, 5, 7, 9, ]

Start exploring new component from 3
    Root 3 marked visited and appended as first element in queue.
    Front element 3 popped from queue and added to traversal. Now, explore it's neighbors:
        4 is an unvisited neighbor. Mark it visited and append it to end of queue
        6 is an unvisited neighbor. Mark it visited and append it to end of queue
        10 is an unvisited neighbor. Mark it visited and append it to end of queue
    Front element 4 popped from queue and added to traversal. Now, explore it's neighbors:
        11 is an unvisited neighbor. Mark it visited and append it to end of queue
    Front element 6 popped from queue and added to traversal. Now, explore it's neighbors:
    Front element 10 popped from queue and added to traversal. Now, explore it's neighbors:
    Front element 11 popped from queue and added to traversal. Now, explore it's neighbors:
    This component has been explored completely ✅
This component's traversal was: [ 3, 4, 6, 10, 11, ]

Start exploring new component from 8
    Root 8 marked visited and appended as first element in queue.
    Front element 8 popped from queue and added to traversal. Now, explore it's neighbors:
    This component has been explored completely ✅
This component's traversal was: [ 8, ]

```

Below code was used to generate the verbose dry-run output:

```cpp
const vector<int> bfs(
    vector<vector<int>> const &Adj,
    vector<char> &visited,
    const int src
) {
    vector<int> componentTraversal;
    queue<int> Q;
    Q.push(src);
    visited[src] = true;
    cout << "\tRoot " << src << " marked visited and appended as first element in queue." << endl;
    while (!Q.empty()) {
        const int currentNode = Q.front();
        Q.pop();
        componentTraversal.push_back(currentNode);
        cout << "\tFront element " << currentNode << " popped from queue and added to traversal. Now, explore it's neighbors:" << endl;
        for (auto &neighbor : Adj[currentNode]) {
            if (!visited[neighbor]) {
                Q.push(neighbor);
                visited[neighbor] = true;
                cout << "\t\t" << neighbor << " is an unvisited neighbor. Mark it visited and append it to end of queue" << endl;
            }
        }
    }
    return componentTraversal;
}

const vector<vector<int>> bfsOfGraph(vector<vector<int>> const &Adj) {
    int V = Adj.size();
    vector<vector<int>> graphTraversal;
    vector<char> visited(V, false);
    for (int src = 0; src < V; src++) {
        if (!visited[src]) {
            cout << "\nStart exploring new component from " << src << endl;
            const auto componentTraversal = bfs(Adj, visited, src);
            cout << "\tThis component has been explored completely ✅ " << endl;
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

> BFS is suitable when the node we're searching is located **close to the source** at a small depth

### Time

For each unvisted node, we are checking each of it's neighbours. Thus, each node is being visited once and it's neighbours then explored once.

In **undirected** graph, the edges are bidirectional i.e. for an edge, the two nodes are present as each other's neighbours. So overall time would be \\( O(V+2E ) \\) . However, in **directed** graph, there is no double-counting so it's time is \\( O(V+E ) \\)

### Space

The `visited[]` array takes \\( O(V) \\) space

Each node is appended into **queue** only once. At worst, there would be around \\( O(V) \\) elements in queue. This case can occur when all nodes other than the source are direct neighbours of the source node.

We are ignoring the \\( O(V) \\) used to store the final answer and the \\( O(V+E ) \\) space of Adjacency List
