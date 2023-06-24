import Vec2 from "./Vec2";

class Entity {
  pos: Vec2;
  scale: Vec2;
  anchor: Vec2;
  w: number;
  h: number;

  /**
   *
   * @param width width of the entity
   * @param height height of the entity
   */
  constructor(width: number, height: number) {
    this.pos = new Vec2(0, 0);
    this.scale = { x: 1, y: 1 };
    this.anchor = { x: 0, y: 0 };
    this.w = width;
    this.h = height;
  }
}


export default Entity;