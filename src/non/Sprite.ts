import Entity from "./Entity";
import Texture from "./Texture";
import Vec2 from "./Vec2";

export default class Sprite extends Entity {
    texture: Texture;
    constructor(texture: Texture,x: number, y: number, width: number, height: number) {
        super(width,height);
        this.pos = new Vec2(x,y);
        this.texture = texture;
    }
}