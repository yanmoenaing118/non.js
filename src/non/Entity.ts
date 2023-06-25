import Vec2 from "./Vec2";

class Entity {
  pos: Vec2;
  scale: Vec2;
  anchor: Vec2;
  w: number;
  h: number;
  dead: boolean;

  constructor(width: number, height: number) {
    this.pos = new Vec2(0,0);
    this.scale = new Vec2(1,1);
    this.anchor = new Vec2(0,0);
    this.w = width;
    this.h = height;
    this.dead = false;
  }

  update (dt: number, t: number): void {
    console.log(this)
  } 
}


export default Entity;