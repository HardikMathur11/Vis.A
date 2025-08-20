const algorithmData = [
  {
    name: "Bubble Sort",
    slug: "bubble-sort",
    category: "Sorting",
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    steps: [
      "Start from the first element",
      "Compare with the next element",
      "Swap if in wrong order",
      "Move to next pair",
      "Repeat until no more swaps needed"
    ],
    implementations: {
      javascript: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
      }
    }
  }
  return arr;
}`,
      cpp: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        std::swap(arr[j], arr[j+1]);
      }
    }
  }
}`,
      java: `public static void bubbleSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        int temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
}`,
      c: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        int temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
}`
    },
    animationComponent: "BubbleSortAnimation"
  },
  {
    name: "Selection Sort",
    slug: "selection-sort",
    category: "Sorting",
    description: "Sorts an array by repeatedly finding the minimum element from unsorted part and putting it at the beginning.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    steps: [
      "Divide array into sorted and unsorted parts",
      "Find minimum element in unsorted part",
      "Swap with first unsorted element",
      "Move boundary between sorted/unsorted one element right"
    ],
    implementations: {
      javascript: `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; // Swap
  }
  return arr;
}`,
      cpp: `void selectionSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    int minIdx = i;
    for (int j = i+1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    std::swap(arr[i], arr[minIdx]);
  }
}`,
      java: `public static void selectionSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n-1; i++) {
    int minIdx = i;
    for (int j = i+1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    int temp = arr[minIdx];
    arr[minIdx] = arr[i];
    arr[i] = temp;
  }
}`,
      c: `void selectionSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    int minIdx = i;
    for (int j = i+1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    int temp = arr[minIdx];
    arr[minIdx] = arr[i];
    arr[i] = temp;
  }
}`
    },
    animationComponent: "SelectionSortAnimation"
  },
  {
    name: "Linear Search",
    slug: "linear-search",
    category: "Searching",
    description: "Sequentially checks each element of the list until a match is found or the whole list has been searched.",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)"
    },
    spaceComplexity: "O(1)",
    steps: [
      "Start from the first element",
      "Compare with target value",
      "Return index if match found",
      "Move to next element",
      "Return -1 if end reached without match"
    ],
    implementations: {
      javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
      cpp: `int linearSearch(int arr[], int n, int target) {
  for (int i = 0; i < n; i++) {
    if (arr[i] == target) return i;
  }
  return -1;
}`,
      java: `public static int linearSearch(int[] arr, int target) {
  for (int i = 0; i < arr.length; i++) {
    if (arr[i] == target) return i;
  }
  return -1;
}`,
      c: `int linearSearch(int nums[], int n, int target) {
  for (int i = 0; i < n; i++) {
    if (nums[i] == target) return i;
  }
  return -1;
}`
    },
    animationComponent: "LinearSearchAnimation"
  },
   {
    name: "Insertion Sort",
    slug: "insertion-sort",
    category: "Sorting",
    description: "Builds the final sorted array one item at a time by inserting each element into its proper position.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    steps: [
      "Start with the second element (index 1)",
      "Compare with elements in the sorted portion",
      "Shift elements to make space for insertion",
      "Insert the element in correct position",
      "Repeat for all elements"
    ],
    implementations: {
      javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      cpp: `void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
      java: `public static void insertionSort(int[] arr) {
  for (int i = 1; i < arr.length; i++) {
    int key = arr[i];
    int j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
      c: `void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`
    },
    animationComponent: "InsertionSortAnimation"
  },
  {
    name: "Quick Sort",
    slug: "quick-sort",
    category: "Sorting",
    description: "Divide and conquer algorithm that partitions the array around a pivot element and recursively sorts the sub-arrays.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(log n)",
    steps: [
      "Choose a pivot element",
      "Partition the array around the pivot",
      "Recursively apply quick sort to left partition",
      "Recursively apply quick sort to right partition",
      "Combine results"
    ],
    implementations: {
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      cpp: `void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      std::swap(arr[i], arr[j]);
    }
  }
  std::swap(arr[i + 1], arr[high]);
  return i + 1;
}`,
      java: `public static void quickSort(int[] arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

public static int partition(int[] arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  int temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return i + 1;
}`,
      c: `void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  int temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return i + 1;
}`
    },
    animationComponent: "QuickSortAnimation"
  },
  {
    name: "Merge Sort",
    slug: "merge-sort",
    category: "Sorting",
    description: "Divide and conquer algorithm that divides the array into halves, sorts them, and then merges the sorted halves.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)"
    },
    spaceComplexity: "O(n)",
    steps: [
      "Divide the array into two halves",
      "Recursively sort the left half",
      "Recursively sort the right half",
      "Merge the two sorted halves",
      "Repeat until entire array is sorted"
    ],
    implementations: {
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
      cpp: `void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}

void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  
  int L[n1], R[n2];
  
  for (int i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for (int j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];
  
  int i = 0, j = 0, k = l;
  
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }
  
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }
  
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}`,
      java: `public static void mergeSort(int[] arr, int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}

public static void merge(int[] arr, int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  
  int[] L = new int[n1];
  int[] R = new int[n2];
  
  for (int i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for (int j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];
  
  int i = 0, j = 0, k = l;
  
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }
  
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }
  
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}`,
      c: `void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}

void merge(int arr[], int l, int m, int r) {
  int i, j, k;
  int n1 = m - l + 1;
  int n2 = r - m;
  
  int L[n1], R[n2];
  
  for (i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for (j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];
  
  i = 0;
  j = 0;
  k = l;
  
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }
  
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }
  
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}`
    },
    animationComponent: "MergeSortAnimation"
  },
  {
    name: "Binary Search",
    slug: "binary-search",
    category: "Searching",
    description: "Efficiently finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)"
    },
    spaceComplexity: "O(1)",
    steps: [
      "Initialize low (0) and high (length-1) pointers",
      "While low <= high:",
      "  Calculate mid = low + (high-low)/2",
      "  If arr[mid] equals target, return mid",
      "  If target < arr[mid], search left half",
      "  Else search right half",
      "Return -1 if not found"
    ],
    implementations: {
      javascript: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      cpp: `int binarySearch(int arr[], int n, int target) {
  int low = 0, high = n - 1;
  while (low <= high) {
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      java: `public static int binarySearch(int[] arr, int target) {
  int low = 0, high = arr.length - 1;
  while (low <= high) {
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      c: `int binarySearch(int arr[], int n, int target) {
  int lo = 0, hi = n - 1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`
    },
    animationComponent: "BinarySearchAnimation"
  },

   {
    name: "Breadth-First Search (BFS)",
    slug: "breadth-first-search",
    category: "Graph Traversal",
    description: "Explores all neighbor nodes at the present depth prior to moving on to nodes at the next depth level.",
    timeComplexity: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)"
    },
    spaceComplexity: "O(V)",
    steps: [
      "Start from the root node",
      "Visit all neighbors of the current node",
      "Move to next level neighbors",
      "Continue until all nodes are visited"
    ],
    implementations: {
      javascript: `function bfs(graph, startNode) {
  const visited = new Set();
  const queue = [startNode];
  visited.add(startNode);
  
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
      cpp: `void bfs(vector<int> graph[], int startNode, int n) {
  vector<bool> visited(n, false);
  queue<int> q;
  q.push(startNode);
  visited[startNode] = true;
  
  while (!q.empty()) {
    int node = q.front();
    q.pop();
    cout << node << " ";
    
    for (int neighbor : graph[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        q.push(neighbor);
      }
    }
  }
}`,
      java: `public static void bfs(ArrayList<ArrayList<Integer>> graph, int startNode) {
  boolean[] visited = new boolean[graph.size()];
  Queue<Integer> queue = new LinkedList<>();
  queue.add(startNode);
  visited[startNode] = true;
  
  while (!queue.isEmpty()) {
    int node = queue.poll();
    System.out.print(node + " ");
    
    for (int neighbor : graph.get(node)) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.add(neighbor);
      }
    }
  }
}`,
      c: `void bfs(int graph[][MAX], int startNode, int n) {
  int visited[MAX] = {0};
  int queue[MAX], front = 0, rear = 0;
  
  queue[rear++] = startNode;
  visited[startNode] = 1;
  
  while (front < rear) {
    int node = queue[front++];
    printf("%d ", node);
    
    for (int i = 0; i < n; i++) {
      if (graph[node][i] && !visited[i]) {
        visited[i] = 1;
        queue[rear++] = i;
      }
    }
  }
}`
    },
    animationComponent: "BFSAnimation"
  },
  {
    name: "Depth-First Search (DFS)",
    slug: "depth-first-search",
    category: "Graph Traversal",
    description: "Explores as far as possible along each branch before backtracking.",
    timeComplexity: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)"
    },
    spaceComplexity: "O(V)",
    steps: [
      "Start from the root node",
      "Explore each branch completely before moving to next branch",
      "Use stack (recursion or iterative) to track nodes",
      "Backtrack when no more unvisited neighbors"
    ],
    implementations: {
      javascript: `// Iterative DFS
function dfs(graph, startNode) {
  const visited = new Set();
  const stack = [startNode];
  
  while (stack.length > 0) {
    const node = stack.pop();
    
    if (!visited.has(node)) {
      visited.add(node);
      console.log(node);
      
      for (const neighbor of graph[node].reverse()) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
}`,
      cpp: `// Iterative DFS
void dfs(vector<int> graph[], int startNode, int n) {
  vector<bool> visited(n, false);
  stack<int> st;
  st.push(startNode);
  
  while (!st.empty()) {
    int node = st.top();
    st.pop();
    
    if (!visited[node]) {
      visited[node] = true;
      cout << node << " ";
      
      for (auto it = graph[node].rbegin(); it != graph[node].rend(); ++it) {
        if (!visited[*it]) {
          st.push(*it);
        }
      }
    }
  }
}`,
      java: `// Iterative DFS
public static void dfs(ArrayList<ArrayList<Integer>> graph, int startNode) {
  boolean[] visited = new boolean[graph.size()];
  Stack<Integer> stack = new Stack<>();
  stack.push(startNode);
  
  while (!stack.isEmpty()) {
    int node = stack.pop();
    
    if (!visited[node]) {
      visited[node] = true;
      System.out.print(node + " ");
      
      for (int i = graph.get(node).size() - 1; i >= 0; i--) {
        int neighbor = graph.get(node).get(i);
        if (!visited[neighbor]) {
          stack.push(neighbor);
        }
      }
    }
  }
}`,
      c: `// Iterative DFS
void dfs(int graph[][MAX], int startNode, int n) {
  int visited[MAX] = {0};
  int stack[MAX], top = -1;
  
  stack[++top] = startNode;
  
  while (top >= 0) {
    int node = stack[top--];
    
    if (!visited[node]) {
      visited[node] = 1;
      printf("%d ", node);
      
      for (int i = n-1; i >= 0; i--) {
        if (graph[node][i] && !visited[i]) {
          stack[++top] = i;
        }
      }
    }
  }
}`
    },
    animationComponent: "DFSAnimation"
  },

  {
    name: "Dijkstra's Algorithm",
    slug: "dijkstra-algorithm",
    category: "Shortest Path",
    description: "Finds the shortest path between nodes in a graph with non-negative edge weights.",
    timeComplexity: {
      best: "O(E + V log V)",
      average: "O(E + V log V)",
      worst: "O(E + V log V)"
    },
    spaceComplexity: "O(V)",
    steps: [
      "Initialize distance to source as 0 and others as infinity",
      "While unvisited nodes remain:",
      "  Select unvisited node with smallest distance",
      "  Mark as visited",
      "  Update distances to all neighbors",
      "Continue until all nodes visited or target reached"
    ],
    implementations: {
      javascript: `function dijkstra(graph, source) {
  const n = graph.length;
  const dist = new Array(n).fill(Infinity);
  const visited = new Array(n).fill(false);
  
  dist[source] = 0;
  
  for (let i = 0; i < n - 1; i++) {
    const u = minDistance(dist, visited);
    visited[u] = true;
    
    for (let v = 0; v < n; v++) {
      if (!visited[v] && graph[u][v] !== 0 && 
          dist[u] !== Infinity && 
          dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }
  
  return dist;
}`,
      cpp: `vector<int> dijkstra(vector<vector<int>> graph, int source) {
  int n = graph.size();
  vector<int> dist(n, INT_MAX);
  vector<bool> visited(n, false);
  
  dist[source] = 0;
  
  for (int count = 0; count < n-1; count++) {
    int u = minDistance(dist, visited);
    visited[u] = true;
    
    for (int v = 0; v < n; v++) {
      if (!visited[v] && graph[u][v] && dist[u] != INT_MAX &&
          dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }
  
  return dist;
}`,
      java: `public static int[] dijkstra(int[][] graph, int source) {
  int n = graph.length;
  int[] dist = new int[n];
  boolean[] visited = new boolean[n];
  
  Arrays.fill(dist, Integer.MAX_VALUE);
  dist[source] = 0;
  
  for (int count = 0; count < n-1; count++) {
    int u = minDistance(dist, visited);
    visited[u] = true;
    
    for (int v = 0; v < n; v++) {
      if (!visited[v] && graph[u][v] != 0 && dist[u] != Integer.MAX_VALUE &&
          dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }
  
  return dist;
}`,
      c: `void dijkstra(int graph[][MAX], int source, int n, int dist[]) {
  int visited[MAX] = {0};
  
  for (int i = 0; i < n; i++) {
    dist[i] = INT_MAX;
  }
  dist[source] = 0;
  
  for (int count = 0; count < n-1; count++) {
    int u = minDistance(dist, visited, n);
    visited[u] = 1;
    
    for (int v = 0; v < n; v++) {
      if (!visited[v] && graph[u][v] && dist[u] != INT_MAX &&
          dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }
}`
    },
    animationComponent: "DijkstraAnimation"
  },

  {
    name: "Bellman-Ford Algorithm",
    slug: "bellman-ford-algorithm",
    category: "Shortest Path",
    description: "Finds shortest paths from a source node to all other nodes, even with negative weight edges (but no negative cycles).",
    timeComplexity: {
      best: "O(VE)",
      average: "O(VE)",
      worst: "O(VE)"
    },
    spaceComplexity: "O(V)",
    steps: [
      "Initialize distance to source as 0 and others as infinity",
      "Relax all edges V-1 times",
      "Check for negative weight cycles",
      "Return distances or negative cycle detection"
    ],
    implementations: {
      javascript: `function bellmanFord(graph, source) {
  const V = graph.length;
  const dist = new Array(V).fill(Infinity);
  dist[source] = 0;
  
  // Relax all edges V-1 times
  for (let i = 0; i < V - 1; i++) {
    for (let u = 0; u < V; u++) {
      for (const edge of graph[u]) {
        const { v, weight } = edge;
        if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
          dist[v] = dist[u] + weight;
        }
      }
    }
  }
  
  // Check for negative cycles
  for (let u = 0; u < V; u++) {
    for (const edge of graph[u]) {
      const { v, weight } = edge;
      if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
        return "Graph contains negative weight cycle";
      }
    }
  }
  
  return dist;
}`,
      cpp: `vector<int> bellmanFord(vector<vector<pair<int, int>>>& graph, int source) {
  int V = graph.size();
  vector<int> dist(V, INT_MAX);
  dist[source] = 0;
  
  // Relax all edges V-1 times
  for (int i = 0; i < V - 1; i++) {
    for (int u = 0; u < V; u++) {
      for (auto& edge : graph[u]) {
        int v = edge.first;
        int weight = edge.second;
        if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
          dist[v] = dist[u] + weight;
        }
      }
    }
  }
  
  // Check for negative cycles
  for (int u = 0; u < V; u++) {
    for (auto& edge : graph[u]) {
      int v = edge.first;
      int weight = edge.second;
      if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
        throw "Graph contains negative weight cycle";
      }
    }
  }
  
  return dist;
}`,
      java: `public static int[] bellmanFord(ArrayList<ArrayList<int[]>> graph, int source) {
  int V = graph.size();
  int[] dist = new int[V];
  Arrays.fill(dist, Integer.MAX_VALUE);
  dist[source] = 0;
  
  // Relax all edges V-1 times
  for (int i = 0; i < V - 1; i++) {
    for (int u = 0; u < V; u++) {
      for (int[] edge : graph.get(u)) {
        int v = edge[0];
        int weight = edge[1];
        if (dist[u] != Integer.MAX_VALUE && dist[u] + weight < dist[v]) {
          dist[v] = dist[u] + weight;
        }
      }
    }
  }
  
  // Check for negative cycles
  for (int u = 0; u < V; u++) {
    for (int[] edge : graph.get(u)) {
      int v = edge[0];
      int weight = edge[1];
      if (dist[u] != Integer.MAX_VALUE && dist[u] + weight < dist[v]) {
        throw new RuntimeException("Graph contains negative weight cycle");
      }
    }
  }
  
  return dist;
}`,
      c: `int bellmanFord(int graph[][3], int E, int V, int source, int dist[]) {
  for (int i = 0; i < V; i++) {
    dist[i] = INT_MAX;
  }
  dist[source] = 0;
  
  // Relax all edges V-1 times
  for (int i = 0; i < V - 1; i++) {
    for (int j = 0; j < E; j++) {
      int u = graph[j][0];
      int v = graph[j][1];
      int weight = graph[j][2];
      if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
      }
    }
  }
  
  // Check for negative cycles
  for (int j = 0; j < E; j++) {
    int u = graph[j][0];
    int v = graph[j][1];
    int weight = graph[j][2];
    if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
      return 0; // Negative cycle detected
    }
  }
  
  return 1; // No negative cycle
}`
    },

    animationComponent: "BellmanFordAnimation"
  }
];



export default algorithmData;