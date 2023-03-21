import { Frame } from "@/globalState/context";

function getFrame(elements: number[], highlighted: number[]) {
  return { elements, highlighted };
}
export function sort(arr: number[], algorithm: string) {
  var frames = [getFrame([], [-1, -1])];
  switch (algorithm) {
    case "insertion sort":
      frames = [...frames, ...insertionSort(arr)];
      break;
    case "selection sort":
      frames = [...frames, ...selectionSort(arr)];
      break;
    case "quick sort":
      const tempFrames: Frame[] = [];

      frames = [...frames, ...quickSort(arr, 0, arr.length - 1, frames)];
      break;
  }
  frames.push(getFrame([], [-1, -1]));
  return frames;
}
function insertionSort(arr: number[]) {
  const frames = [];
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    frames.push(getFrame([], [j, j + 1]));
    while (j >= 0 && arr[j] > key) {
      //remove comment below to add extra frame before swapping
      frames.push(getFrame([], [j, j + 1]));

      arr[j + 1] = arr[j];
      frames.push(getFrame([j, j + 1], [j, j + 1]));

      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return frames;
}

function selectionSort(arr: number[]) {
  const frames = [];
  for (let i = 0; i < arr.length - 1; i++) {
    var minIndex = i;
    frames.push(getFrame([], [i, minIndex]));
    var j = 0;
    for (j = i + 1; j < arr.length - 1; j++) {
      frames.push(getFrame([], [i, minIndex, j]));

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    //swap indices
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
    frames.push(getFrame([i, minIndex], [j, minIndex]));
  }

  return frames;
}

//GFG
// JavaScript program for implementation of QuickSort

/* This function takes last element
    as pivot, places the pivot element
    at its correct position in sorted
    array, and places all smaller 
    (smaller than pivot) to left of
    pivot and all greater elements to 
    right of pivot */

function partition(arr: number[], low: number, high: number, frames: Frame[]) {
  let temp;
  let pivot = arr[high];

  // index of smaller element
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    // If current element is
    // smaller than or
    // equal to pivot
    frames.push(getFrame([], [low, j, high]));
    if (arr[j] <= pivot) {
      i++;

      // swap arr[i] and arr[j]
      frames.push(getFrame([i, j], [low, i, j, high]));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  // swap arr[i+1] and arr[high]
  // (or pivot)

  temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  frames.push(getFrame([i + 1, high], [low, i + 1, high]));

  return i + 1;
}

function quickSort(
  arr: number[],
  low: number,
  high: number,
  frames: Frame[]
): any {
  /* The main function that implements
    QuickSort() arr[] --> Array to be 
    sorted,
    low --> Starting index,
    high --> Ending index */

  if (low < high) {
    /* pi is partitioning index, 
            arr[pi] is now at right place */
    frames.push(getFrame([], [low, high]));

    let pi = partition(arr, low, high, frames);

    // Recursively sort elements
    // before partition and after
    // partition
    quickSort(arr, low, pi - 1, frames);
    quickSort(arr, pi + 1, high, frames);
  }
  return frames;
}
