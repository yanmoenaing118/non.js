import Texture from "../non/Texture";
import TileSprite from "../non/TileSprite";
import TileMap from "../non/containers/TileMap";
import DungeonImg from "./assets/dungeon32x32.png";
import { HEIGHT, WIDTH } from "./constants";

const texture = new Texture(DungeonImg);

class Background extends TileMap {
  constructor() {
    super(WIDTH / 32, HEIGHT / 32, 32, 32);
    this.createMap();
  }

  createMap() {
    for (let i = 0; i < this.noTileCols * this.noTileRows; i++) {
      const x = (i % this.noTileCols) * this.tileW;
      const y = Math.round(i / this.noTileRows) * this.tileH;
      const frame = {
        x: Math.round(Math.random() * 10),
        y: Math.round(Math.random() * 10),
      };
      const tile = new TileSprite(texture, x, y, 32, 32, frame);
      this.add(tile);
    }
  }
}

export default Background;
