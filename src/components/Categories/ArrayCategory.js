const arrayCategory = [
  {
    category: "Array",
    subcategory: "Sorting",
    algorithms: [
      {
        name: "Bubble Sort",
        slug: "bubble-sort",
        description: "Simple comparison-based sorting algorithm.",
      },
      {
        name: "Selection Sort",
        slug: "selection-sort",
        description: "Sorts by selecting the minimum element each time.",
      },
      {
        name: "Insertion Sort",
        slug: "insertion-sort",
        description: "Builds the final sorted array one item at a time by inserting elements into their correct position.",
      },
      {
        name: "Quick Sort",
        slug: "quick-sort",
        description: "Divide-and-conquer algorithm that partitions the array around a pivot and recursively sorts subarrays.",
      },
      {
        name: "Merge Sort",
        slug: "merge-sort",
        description: "Divide-and-conquer algorithm that splits the array in halves, sorts them recursively, and then merges the results.",
      },
    ],
  },
  {
    category: "Array",
    subcategory: "Searching",
    algorithms: [
      {
        name: "Linear Search",
        slug: "linear-search",
        description: "Simple search by checking each element.",
      },
      {
        name: "Binary Search",
        slug: "binary-search",
        description: "Efficient search in a sorted array.",
      },
    ],
  },
];




export default arrayCategory;
