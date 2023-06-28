import Entity from "../Entity";
import Vec2 from "../Vec2";
import { clamp } from "../math";
import Container from "./Container";

export default class Camera<T extends Entity> extends Container {
    wroldWidth: number;
    worldHeight: number;
    subject: Vec2;
    constructor(w: number, h: number, worldWidth: number, worldHeight: number, subject?: T) {
        super(w, h);
        this.wroldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.setSubject(subject)
    }

    /**
     * 
     * @param e set the object to be followed by
     */
    setSubject(e: T) {
        this.subject = e ? e.pos : this.pos;

        // TODO: check offset and anchor
        // will add later
    }

    /**
     * focus on the Entity || mouse position
     */
    focus() {

        const maxX = this.wroldWidth - this.w;
        const centeredX =  this.subject.x - this.w / 2;
        const x = -clamp(centeredX, 0, maxX);

        const maxY = this.worldHeight - this.h;
        const centeredY = this.subject.y - this.h / 2;
        const y = -clamp(centeredY, 0, maxY);

        this.pos.x = x;
        this.pos.y = y;

        // console.log('cam pos ', this.subject)
    }

    /**
     * 
     * @param dt 
     * @param t 
     */
    update(dt: number, t: number): void {
        super.update(dt, t);
        if(this.subject) {
            this.focus();
        }
    }

}