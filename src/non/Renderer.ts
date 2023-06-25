/**
 * The renderer will render all the entities inside of a Scene Container
 */

import Container from "./containers/Container";

export default class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;

  constructor(width: number, height: number, root?: HTMLElement) {
    this.w = width;
    this.h = height;
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
    if (root) {
      root.appendChild(this.canvas);
    } else {
      document.body.appendChild(this.canvas);
    }
  }

  /**
   *
   * @param scene Scene Container must be provided in order for the renderer to work. A scene is an instance of Container class
   */
  render(scene: Container) {
     const renderContainer = (container: Container) => {
        container.forEach(child => {
            this.ctx.save();


            /**
             * This recursive renderContainer must be called before restore method because the
             * position of each entity inside a container must be relative to its parent's 
             * origin.
             */
            if(child instanceof Container) {
                renderContainer(child);
            }
            
            
            this.ctx.restore();
        })
    }
  }
}
