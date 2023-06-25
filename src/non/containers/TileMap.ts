import Entity from "../Entity";
import Vec2 from "../Vec2";
import Container from "./Container";

export default class TileMap extends Container {
  tileW: number;
  tileH: number;
  noTileCols: number;
  noTileRows: number;
  constructor(
    noTileCols: number,
    noTileRows: number,
    tileW: number,
    tileH: number
  ) {
    super(noTileCols * tileW, noTileRows * tileH);
    this.w = noTileCols * tileW;
    this.h = noTileRows * tileH;
    this.tileW = tileW;
    this.tileH = tileH;
    this.noTileCols = noTileCols;
    this.noTileRows = noTileRows;
  }

  pixelToMapPosition(vec: Vec2): Vec2 {
    return {
      x: Math.floor(vec.x / this.tileW),
      y: Math.floor(vec.y / this.tileH),
    };
  }

  mapToPixelPositon(vec: Vec2): Vec2 {
    return {
        x: vec.x * this.tileW,
        y: vec.y * this.tileH
    }
  }

  tileAtMapPosition(vec: Vec2): Entity {
   return this.getByIndex(this.noTileCols * vec.y + vec.x);  
  }

  tileAtPixelPosition(vec: Vec2): Entity {
    return this.tileAtMapPosition(this.pixelToMapPosition(vec))
  }
}
