import { Anims, Frame } from "./Interfaces";
import TileSprite from "./TileSprite";
import Animation from "./Anim";
import Anim from "./Anim";

/**
 * AnimationManager's instances will be created by The TileSprite Entity
 * AnimationManager will manage which Animation to be played.
 * AnimationManager will be responsible for
 *  - adding the animation
 *  - playing the animation
 *  - pausing the animation
 *  - synce the Animation's frame to Source Entity's frame property
 */

export default class AnimationManager {
  /**
   * Collections of Animation
   */
  anims: Anims;

  /**
   * Name of the current animation
   */
  currentAnimationName: string;

  sourceFrame: Frame;

  constructor(e: TileSprite) {
    this.anims = {};
    this.sourceFrame = e.frame;
  }

  /**
   *
   * @param name Animation's name
   * @param frameRate Animation's frame rate
   */
  add(name: string, frameRate: number, frames: Frame[]) {
    if (name in this.anims) {
      return;
    }
    this.currentAnimationName = name;
    this.anims[name] = new Anim(frames, frameRate);
  }

  play(name: string) {
    if (name == this.currentAnimationName) return;
    const currentAnimationName = this.anims[name];
    currentAnimationName.reset();
  }

  /**
   * We need to call this update method from the source's update method so that it get updated in the Game Loop.
   * This method also need to call the current animation's update method so that the source object frame get updated(synced) with the Animation's Frame
   * @param dt delta time
   */
  update(dt: number) {
    if (!this.currentAnimationName || !this.anims[this.currentAnimationName])
      return;
    this.sourceFrame.x = this.anims[this.currentAnimationName].frame.x;
    this.sourceFrame.y = this.anims[this.currentAnimationName].frame.y;
    this.anims[this.currentAnimationName].update(dt);
  }
}
