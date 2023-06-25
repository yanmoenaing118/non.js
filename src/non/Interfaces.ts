import Anim from "./Anim"

export interface ContextStyle {
    fill?: string,
    stroke?: string,
    font?: string
}


export interface Frame {
    x: number,
    y: number
}


/**
 * Anims is a collection of animation that can be added to a TileSprite
 */
export interface Anims {
    [key: string]: Anim
}