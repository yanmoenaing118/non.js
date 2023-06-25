import Renderer from "./non/Renderer";
import Sprite from "./non/Sprite";
import Texture from "./non/Texture";
import TileSprite from "./non/TileSprite";
import Container from "./non/containers/Container";
import TileMap from "./non/containers/TileMap";
import KeyboardControls from "./non/controls/KeyboardControls";
import { clamp } from "./non/math";

const controls = new KeyboardControls();

const cell = 64;
const w = cell * 12;
const h = cell * 8;
const MAX_FRAME = 1 / 60;
let dt = MAX_FRAME;
let ellapsedTime = 0;

const size = 1;

const render = new Renderer(w, h, undefined, true);
const scene = new Container(w, h);

class Dungeon extends TileMap {
  constructor() {
    const mapW = w / cell;
    const mapH = h / cell;
    super(mapW, mapH, cell, cell);
    this.createMap();
  }

  createMap() {
    for(let i = 0 ; i < this.noTileCols * this.noTileRows; i++) {
      const x = i % this.noTileCols * this.tileW;
      const y = Math.floor( i / this.noTileCols) * this.tileH;
      this.add(new TileSprite(new Texture('images/dungeon.png'),x,y,cell,cell, {
        x: Math.round(Math.random() * this.noTileCols),
        y: Math.round(Math.random() * this.noTileRows)
      }));
    }
  }
}

class Spider extends TileSprite {
  constructor() {
    super(new Texture('images/spiders.png'), 0, 0, cell, cell);
  }

  update(dt: number, t: number): void {
    this.pos.x += dt * 320 * controls.x;
    this.pos.y += dt * 320 * controls.y;


    /**
     * TODO: Snap to Tile Grid
     * 
     */

    this.pos.x = clamp(this.pos.x,0,w - cell);
    this.pos.y = clamp(this.pos.y,0,h - cell);


    // console.log(x, y)
  }
}

const dungeon = scene.add(new Dungeon());
const spider = scene.add(new Spider())

console.log(dungeon);


function loop(time: number) {
  dt = Math.min(5, (time - ellapsedTime) * 0.001);
  ellapsedTime = time;

  const spiderMapPos = dungeon.pixelToMapPosition(spider.pos);
  const spiderPixPos = dungeon.mapToPixelPositon(spiderMapPos);
  const tileAtMap = dungeon.tileAtMapPosition(spiderMapPos);
  const tileAtPix = dungeon.tileAtPixelPosition(spiderPixPos);
  // console.log('mapPos: ',spiderMapPos);
  // console.log('pixPos: ',spiderPixPos);


  // console.log('spider is under ', tileAtMap.pos);
  // console.log(tileAtPix.pos)
  scene.update(dt, ellapsedTime * 0.001);
  render.render(scene);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
