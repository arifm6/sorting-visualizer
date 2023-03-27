# Sorting Visualizer

Welcome to my sorting visualizer. In this app, you can see how various sorting algorithms function with different array sizes and settings. For a demo, you can visit [https://sorting-visualizer-arifm6.vercel.app/](https://sorting-visualizer-arifm6.vercel.app/). You can also clone the repo and run yarn dev or npm run dev.

## Sorting Algorithms

### `Insertion Sort`

Insertion sort is a simple sorting algorithm that sorts a list by comparing items one at a time. It is relatively inefficient on large unsorted lists.

### `Selection Sort`

Selection sort is another simple sorting algorithm that sorts the array one index at a time by finding the next smallest item and placing it in its appropriate index.

### `Quick Sort`

QuickSort is a divide and conquer algorithm that picks an element as a pivot and partitions the list around that pivot. There are many different versions of quicksort, namely with deciding what element to use as a pivot.

### `Merge Sort`

Merge Sort is also a divide and conquer algorithm that sorts the array by dividing it into many smaller subarrays, sorting the subarrays, and then merging the subarrays back into one array.

### `Bubble Sort`

Bubble Sort is another simple sorting algorithm that repeatedly passes through a list of items and swaps adjacent elements based on the correct intended order.

### `Shell Sort`

Shell Sort is a sorting algorithm that builds on top of insertion sort. In traditional insertion sort, elements are compared one at a time. In Shell Sort, we are able to make swaps across larger distances without needed to compare any intermediate distance. We continuously do this and reduce the distance until we perform insertion sort on our final step.

## Control Panel

The control panel is where you can adjust the settings of the app. Here you can change algorithm, adjust array size, randomize array, and adjust animation speed.

## Animation Panel

The animation panel is where you can run the animation and go through the different phases of the animation. Here you can skip through the animation one frame at a time, start/pause a real time animation, or skip to the beginning/end of the sorting cycle.
