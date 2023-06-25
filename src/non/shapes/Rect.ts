import Entity from "../Entity";

export default class Rect extends Entity {
    constructor(x: number, y: number, width: number, height:number) {
        super(width, height);
        this.pos.x = x;
        this.pos.y = y;
    }
}