//A frame is an instance of time
export class Frame {
  //stores the array in current order
  array: number[];
  //stores the currently highlighted elements... should have 2 elements only
  highlights: number[];
  constructor() {
    this.array = [];
    this.highlights = [];
  }
}
//an animation contains all frames in order
export class Animation {
  frames: Frame[];
  constructor() {
    this.frames = [];
  }
  addFrame(frameToAdd: Frame) {
    this.frames.push(frameToAdd);
  }
}
//algorithm simply runs the algo and stores into an animation
export class Algorithms {
  solution: Animation;
  constructor() {
    this.solution = new Animation();
  }
}
