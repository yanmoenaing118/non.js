import Renderer from "./non/Renderer";
import Sprite from "./non/Sprite";
import Texture from "./non/Texture";
import TileSprite from "./non/TileSprite";
import { MAX_DELTA } from "./non/constants";
import Camera from "./non/containers/Camera";
import Container from "./non/containers/Container";
import TileMap from "./non/containers/TileMap";
import KeyboardControls from "./non/controls/KeyboardControls";
import { clamp } from "./non/math";

const controls = new KeyboardControls();

const cell = 64;
const w = cell * 12;
const h = cell * 8;
let dt = MAX_DELTA
let ellapsedTime = 0;

const size = 1;
const worldW = w + w;
const worlH = h + cell * 5;
const render = new Renderer(w, h, undefined, true);
const scene = new Container(w, h);

class Dungeon extends TileMap {
  constructor() {
    const mapW = worldW / cell;
    const mapH = worlH / cell;
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
  speed: number = 320;
  constructor() {
    super(new Texture('images/spiders.png'), 0, 0, cell, cell);
  
    this.anims.add('walk', 0.1, [
      {
        x: 0,
        y: 1
      },
      {
        x: 1,
        y: 1
      },
      {
        x: 2,
        y: 2
      }
    ])
    this.anims.play('walk')
  }

  update(dt: number, t: number): void {
    this.anims.update(dt);
    this.pos.x += dt * this.speed * controls.x;
    this.pos.y += dt * this.speed * controls.y;



    /**
     * TODO: Snap to Tile Grid
     * 
     */

    this.pos.x = clamp(this.pos.x,0,worldW - cell);
    this.pos.y = clamp(this.pos.y,0, worlH - cell);

  }
}
const camera = new Camera(w, h, w + w, worlH)
const dungeon = camera.add(new Dungeon());
const spider = camera.add(new Spider())
spider.speed = 800;
console.log(dungeon);

camera.setSubject(spider)
scene.add(camera);

function loop(time: number) {
  dt = Math.min(MAX_DELTA, (time - ellapsedTime) * 0.001);
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
