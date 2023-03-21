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
    case "quick sort": {
      const tempFrames: Frame[] = [];

      frames = [...frames, ...quickSort(arr, 0, arr.length - 1, frames)];
      break;
    }
    case "merge sort":
      const { tempFrames, tempArray } = mergeSort(arr, frames);

      frames = [...tempFrames];
      for (let i = 0; i < arr.length; i++) {
        arr[i] = tempArray[i];
      }

      break;
    case "bubble sort":
      frames = [...frames, ...bubbleSort(arr)];
      break;
    case "shell sort":
      frames = [...frames, ...shellSort(arr)];
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
//iterative mergesort from https://stackoverflow.com/questions/32041092/implementing-merge-sort-iteratively

function mergeSort(arr: number[], frames: Frame[]) {
  var sorted = arr.slice(),
    n = sorted.length,
    buffer = new Array(n);

  for (var size = 1; size < n; size *= 2) {
    for (var leftStart = 0; leftStart < n; leftStart += 2 * size) {
      var left = leftStart,
        right = Math.min(left + size, n),
        leftLimit = right,
        rightLimit = Math.min(right + size, n),
        i = left;
      frames.push(getFrame([], [left, right, leftLimit, rightLimit]));
      while (left < leftLimit && right < rightLimit) {
        if (sorted[left] <= sorted[right]) {
          frames.push(
            getFrame(
              [i, sorted[left], -1],
              [i, left, right, leftLimit, rightLimit]
            )
          );

          buffer[i++] = sorted[left++];
        } else {
          frames.push(
            getFrame(
              [i, sorted[right], -1],
              [i, left, right, leftLimit, rightLimit]
            )
          );

          buffer[i++] = sorted[right++];
        }
      }
      while (left < leftLimit) {
        frames.push(
          getFrame(
            [i, sorted[left], -1],
            [i, left, right, leftLimit, rightLimit]
          )
        );

        buffer[i++] = sorted[left++];
      }
      while (right < rightLimit) {
        frames.push(
          getFrame(
            [i, sorted[right], -1],
            [i, left, right, leftLimit, rightLimit]
          )
        );

        buffer[i++] = sorted[right++];
      }
    }
    var temp = sorted,
      sorted: number[] = buffer,
      buffer: any[] = temp;
  }

  return { tempArray: sorted, tempFrames: frames };
}

function bubbleSort(arr: number[]) {
  const frames = [];

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      frames.push(getFrame([], [j, j + 1]));
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        frames.push(getFrame([j, j + 1], [j, j + 1]));
      }
    }
  }
  return frames;
}

function shellSort(arr: number[]) {
  const frames: Frame[] = [];
  let n = arr.length;

  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort for this gap size.
    // The first gap elements a[0..gap-1] are already
    // in gapped order keep adding one more element
    // until the entire array is gap sorted
    for (let i = gap; i < n; i += 1) {
      // add a[i] to the elements that have been gap
      // sorted save a[i] in temp and make a hole at
      // position i
      let temp = arr[i];

      // shift earlier gap-sorted elements up until
      // the correct location for a[i] is found
      let j: number;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        frames.push(getFrame([j, j - gap], [i, j - gap]));

        frames.push(getFrame([], [j, j - gap]));

        arr[j] = arr[j - gap];
      }
      // put temp (the original a[i]) in its correct
      // location
      arr[j] = temp;
    }
  }

  return frames;
}
