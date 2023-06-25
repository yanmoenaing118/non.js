import Renderer from "./non/Renderer";
import Sprite from "./non/Sprite";
import Texture from "./non/Texture";
import TileSprite from "./non/TileSprite";
import Container from "./non/containers/Container";
import KeyboardControls from "./non/controls/KeyboardControls";


const controls = new KeyboardControls();

const w = 640;
const h = 64 * 7;
const MAX_FRAME = 1 / 60;
let dt = MAX_FRAME;
let ellapsedTime = 0;

const size = 1;

const render = new Renderer(w * size, h, undefined, false);
const scene = new Container(w, h);

const walkLeft = new Array(10).fill(0).map((_, i) => ({
  x: i,
  y: 3,
}));
const wallkRight = new Array(10).fill(0).map((_,i) => ({
  x: i,
  y: 1
}))
const walkDown = new Array(10).fill(0).map((_, i) => ({
  x: i,
  y: 2
}))
const walkUp = new Array(10).fill(0).map((_,i)=>({
  x: i,
  y: 0
}))

class Spider extends TileSprite {
  animSpeed: number = 0.05;
  constructor() {
    super(new Texture("images/spiders.png"), 0, 0, 64, 64);
    this.pos = {
      x: 0,
      y: 0,
    };
    this.anims.add('walkLeft', this.animSpeed, walkLeft);
    this.anims.add('walkRight', this.animSpeed, wallkRight);
    this.anims.add('walkDown', this.animSpeed, walkDown);
    this.anims.add('walkUp', this.animSpeed, walkUp);

    // this.anims.play('walkRight')
  }

  update(dt: number, t: number): void {
    super.update(dt, t);
    this.pos.x += dt * controls.x  * 500;
    this.pos.y += dt * controls.y * 500;
    
    if(controls.x == 1) {
      this.anims.play('walkLeft');
    } else if(controls.x == -1) {
      this.anims.play('walkRight');
    } else if(controls.y == 1) {
      this.anims.play('walkDown');
    } else if(controls.y == -1) {
      this.anims.play('walkUp');
    } else {
      this.anims.pause();
    }
  }
}

const spider = scene.add(new Spider())

function loop(time: number) {
  dt = Math.min(5, (time - ellapsedTime) * 0.001);
  ellapsedTime = time;
  scene.update(dt, ellapsedTime * 0.001);
  render.render(scene);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
