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
  }
  frames.push(getFrame([], [-1, -1]));
  return frames;
}
export function insertionSort(arr: number[]) {
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
