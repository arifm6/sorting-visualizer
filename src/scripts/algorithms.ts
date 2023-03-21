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
