import { Frame } from "./Interfaces";


/**
 * Animation(Anim) class can be used to animate a sequence of Frames.
 * We will use the name Anim because Animation confict with the DOM's Animation object
 */
export default class Anim {
  /**
   * frameRate is the await time before switching to a next frame
   */
  frameRate: number;

  /**
   * Current Frame being drawn on the screen
   */
  frame: Frame;

  /**
   * Sequence of Frames which will be in the Animation
   */
  frames: Frame[];

  currentFrameIndex: number;
  currentFrameTime: number;

  constructor(frames: Frame[], frameRate: number = 0.1) {
    this.frames = frames;
    this.frameRate = frameRate;
    this.currentFrameIndex = 0;
    this.currentFrameTime = 0;
    this.frame = this.frames[this.currentFrameIndex];
    this.reset();
  }

  update(dt: number) {
    if ((this.currentFrameTime += dt) >= this.frameRate) {
      this.currentFrameTime -= this.frameRate;
      this.currentFrameIndex++;
      this.frame = this.frames[this.currentFrameIndex % this.frames.length];
    }
  }

  reset() {
    this.currentFrameIndex = 0;
    this.currentFrameTime = 0;
  }
}
