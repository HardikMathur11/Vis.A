const graphCategory = [
  {
        category:"Graph",
    subcategory: "Graph Traversal",
    algorithms: [
      {
        name: "Breadth-First Search (BFS)",
        description: "Traverses graph level by level using a queue.",
            slug: "breadth-first-search",
      },
      {
        name: "Depth-First Search (DFS)",
        description: "Traverses graph depth-wise using recursion or stack.",
        slug: "depth-first-search",
      }
    ]
  },
  {
    category:"Graph",
    subcategory: "Shortest Path",
    algorithms: [
      {
        name: "Dijkstra's Algorithm",
        description: "Finds shortest path from source to all vertices.",
        slug: "dijkstra-algorithm",
      },
      {
        name: "Bellman-Ford Algorithm",
        description: "Handles negative weight edges.",
        slug: "bellman-ford-algorithm",
      }
  
]
  }
]

export default graphCategory;
