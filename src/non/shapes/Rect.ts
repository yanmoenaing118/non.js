import Entity from "../Entity";
import Vec2 from "../Vec2";

export default class Rect extends Entity {
    constructor(x: number, y: number, width: number, height:number) {
        super(width, height);
        this.pos = new Vec2(x,y);
    }
}