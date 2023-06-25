/**
 * The renderer will render all the entities inside of a Scene Container
 */

import Container from "./containers/Container";
import Rect from "./shapes/Rect";

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
    this.canvas.style.border = '1px solid gray';
    this.ctx = this.canvas.getContext("2d");
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
    const { ctx, w, h } = this;
    const renderContainer = (container: Container) => {
      container.forEach((child) => {
        ctx.save();

        console.log(child)

        if (child.pos) {
          ctx.translate(child.pos.x, child.pos.y);
        }

        if (child.style) {
          const { fill, stroke } = child.style;
          if (fill) {
            ctx.fillStyle = fill;
          }
          if (stroke) {
            ctx.strokeStyle = stroke;
          }
        }

        if (child instanceof Rect) {
            console.log(child)
          if (child.style.fill) {
            ctx.fillRect(0, 0, child.w, child.h);
          } else if (child.style.stroke) {
            ctx.strokeRect(0, 0, child.w, child.h);
          } else if (child.style.fill && child.style.stroke) {
            ctx.fillRect(0, 0, child.w, child.h);
            ctx.strokeRect(0, 0, child.w, child.h);
          }
        }

        /**
         * This recursive renderContainer must be called before restore method because the
         * position of each entity inside a container must be relative to its parent's
         * origin.
         */
        if (child instanceof Container) {
          renderContainer(child);
        }

        this.ctx.restore();
        
      });
    };


    /**
     * clear the Canvas before any rendering happens
     */
    ctx.clearRect(0, 0, w, h);
    renderContainer(scene);
    
  }
}