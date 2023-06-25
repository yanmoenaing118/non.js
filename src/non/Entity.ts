import { ContextStyle } from "./Interfaces";
import Vec2 from "./Vec2";

/**
 * Entity is the base class for all objects in the Game
 * Every class must extend The Entity Class to be inside the Game Loop
 */
class Entity {
  pos: Vec2;
  scale: Vec2;
  anchor: Vec2;
  w: number;
  h: number;
  dead: boolean;
  style: ContextStyle;

  constructor(width: number, height: number) {
    this.pos = new Vec2(0,0);
    this.scale = new Vec2(1,1);
    this.anchor = new Vec2(0,0);
    this.w = width;
    this.h = height;
    this.dead = false;
  }

  setStyles(style: ContextStyle) {
    this.style = {...style}
  }

  /**
   * @param dt delta time
   * @param t ellapsed time since the Game Loop has started.
   */
  update (dt: number, t: number): void {
  } 
}


export default Entity;