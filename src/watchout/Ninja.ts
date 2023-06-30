import Texture from "../non/Texture";
import TileSprite from "../non/TileSprite";
import KeyboardControls from "../non/controls/KeyboardControls";
import { clamp } from "../non/math";
import NinjaImg from "./assets/ninja_f.png";
import { HEIGHT, WIDTH } from "./constants";

const NinjaTexture = new Texture(NinjaImg);

class Ninja extends TileSprite {
  constrols: KeyboardControls;
  animSpeed = 0.1;
  speed = 480; // will move 320px per second
  constructor(controls: KeyboardControls) {
    super(NinjaTexture, 0, 0, 32, 36, {
      x: 0,
      y: 1,
    });
    this.constrols = controls;
    this.anims.add("walkLeft", this.animSpeed, [
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
    ]);
    this.anims.play("walkLeft");
  }

  update(dt: number, t: number): void {
   super.update(dt,t);
   /**
    * v = s / t
    * v = speed (this.speed)
    * s = distance (this.pos.x)
    * t = time (dt)
    * 
    * s = v * t
    */
   this.pos.x += this.speed * dt * this.constrols.x;
   this.pos.y += this.speed * dt * this.constrols.y;

   this.pos.x = clamp(this.pos.x, 0, WIDTH - 32);
   this.pos.y = clamp(this.pos.y, 0, HEIGHT - 36);
  }
}

export default Ninja;
