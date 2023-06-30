import Texture from "../non/Texture";
import TileSprite from "../non/TileSprite";
import KeyboardControls from "../non/controls/KeyboardControls";
import { clamp } from "../non/math";
import NinjaImg from "./assets/ninja_f.png";
import { HEIGHT, WIDTH, WORLD_HEIGHT, WORLD_WIDTH } from "./constants";

const NinjaTexture = new Texture(NinjaImg);

class Ninja extends TileSprite {
  controls: KeyboardControls;
  animSpeed = 0.1;
  speed = 320; // will move 320px per second
  currentX = 0;
  constructor(controls: KeyboardControls) {
    super(NinjaTexture, 0, 0, 32, 36, {
      x: 0,
      y: 1,
    });
    this.controls = controls;
    this.anims.add("walkLeft", this.animSpeed, [
      {
        x: 0,
        y: 3,
      },
      {
        x: 1,
        y: 3,
      },
      {
        x: 2,
        y: 3,
      },
    ]);
    this.anims.add('walkRight',this.animSpeed, [
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
      ] )
    this.anims.play("walkLeft");
  }

  update(dt: number, t: number): void {
    super.update(dt, t);
    /**
     * v = s / t
     * v = speed (this.speed)
     * s = distance (this.pos.x)
     * t = time (dt)
     *
     * s = v * t
     */
    this.pos.x += this.speed * dt * this.controls.x;
    this.pos.y += this.speed * dt * this.controls.y;

    this.pos.x = clamp(this.pos.x, 0, WORLD_WIDTH - 32);
    this.pos.y = clamp(this.pos.y, 32, WORLD_HEIGHT - 36 - 32);

    if (this.pos.x < this.currentX) {
    //   this.dead = true;
    }

    if(this.controls.x > 0) {
        this.anims.play('walkRight');
    } else if(this.controls.x < 0) {
        this.anims.play('walkLeft');
    } else {
        this.anims.pause();
    }

    this.currentX = this.pos.x;

  }
}

export default Ninja;
