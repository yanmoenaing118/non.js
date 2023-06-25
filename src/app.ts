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

const render = new Renderer(w * size, h,undefined, true);
// render.debugGridMode = true;
const scene = new Container(w, h);

class Spider extends TileSprite {
  constructor() {
    super(new Texture("images/spiders.png"), 0, 0, 64, 64);
    this.pos = {
        x: Math.random() * w * size,
        y: Math.random() * h * size
    }
  }

  update(dt: number, t: number): void {
      this.pos.x += dt * controls.x * Math.random() * 1000;
      this.pos.y += dt * controls.y * 1000 * Math.random();
  }
}

function loop(time: number) {
  dt = Math.min(5, (time - ellapsedTime) * 0.001);
  ellapsedTime = time;
  scene.update(dt, ellapsedTime * 0.001);
  render.render(scene);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
