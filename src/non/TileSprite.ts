import Entity from "./Entity";
import { Frame } from "./Interfaces";
import Sprite from "./Sprite";
import Texture from "./Texture";

export default class TileSprite extends Sprite {
  tileW: number;
  tileH: number;
  frame: Frame;

  constructor(
    texture: Texture,
    x: number,
    y: number,
    tileWidth: number,
    tileHeight: number,
    frame?: Frame
  ) {
    super(texture, x, y);
    this.tileW = tileWidth;
    this.tileH = tileHeight;
    this.frame = frame || { x: 0, y: 0 };
  }
}
