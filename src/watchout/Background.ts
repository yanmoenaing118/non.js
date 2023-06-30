import Texture from "../non/Texture";
import TileSprite from "../non/TileSprite";
import TileMap from "../non/containers/TileMap";
import DungeonImg from "./assets/dungeon32x32.png";
import { HEIGHT, WIDTH, WORLD_HEIGHT, WORLD_WIDTH } from "./constants";

const texture = new Texture(DungeonImg);

class Background extends TileMap {
  constructor() {
    super(WORLD_WIDTH / 32, WORLD_HEIGHT / 32, 32, 32);
    this.createMap();
  }

  createMap() {
    for (let i = 0; i < this.noTileCols * this.noTileRows; i++) {
      const x = (i % this.noTileCols) * this.tileW;
      const y = Math.floor(i / this.noTileCols) * this.tileH;
      let frame = {
        x: 0,
        y: 0,
      };
      if (y == 0) {
        frame = { x: 8, y: 0 };
      } else if (y > this.noTileRows * this.noTileCols - this.noTileCols - 1) {
        frame = { x: 6, y: 9 };
      } else {
        frame = { x: 0, y: 0 };
      }
      const tile = new TileSprite(texture, x, y, 32, 32, frame);
      this.add(tile);
    }
  }
}

export default Background;
