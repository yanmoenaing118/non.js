/**
 * The renderer will render all the entities inside of a Scene Container
 */

import Sprite from "./Sprite";
import TileSprite from "./TileSprite";
import Container from "./containers/Container";
import Rect from "./shapes/Rect";

export default class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  debugGridMode: boolean = false;
  debugGrid = {
    rows: 0,
    cols: 0,
    size: 64,
    i: 0
  }

  constructor(width: number, height: number, root?: HTMLElement, debugMode: boolean = false) {
    this.w = width;
    this.h = height;
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.border = "1px solid gray";
    this.ctx = this.canvas.getContext("2d");
    if (root) {
      root.appendChild(this.canvas);
    } else {
      document.body.appendChild(this.canvas);
    }
    this.debugGridMode = debugMode;
    this.debugGrid = {
      ...this.debugGrid,
      rows: Math.round(height / this.debugGrid.size),
      cols: Math.round(width / this.debugGrid.size),
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
          if (child.style.fill) {
            ctx.fillRect(0, 0, child.w, child.h);
          } else if (child.style.stroke) {
            ctx.strokeRect(0, 0, child.w, child.h);
          } else if (child.style.fill && child.style.stroke) {
            ctx.fillRect(0, 0, child.w, child.h);
            ctx.strokeRect(0, 0, child.w, child.h);
          }
        }

        if (child instanceof Sprite && !('tileH' in child)) {
          ctx.drawImage(child.texture.img, 0, 0);
        }

        if (child instanceof TileSprite && 'tileH' in child && 'tileW' in child) {
          ctx.drawImage(
            child.texture.img,
            child.frame.x * child.tileW,
            child.frame.y * child.frame.y,
            child.tileW,
            child.tileH,
            0,
            0,
            child.tileW,
            child.tileH
          );
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
    if(this.debugGridMode) {
      this.renderDebugGrid();
    }
    renderContainer(scene);
  }

  /**
   * This is a 64x64 debugger grid.
   * This will render a grid when debugGridMode is true
   */
  renderDebugGrid() {
    for ( this.debugGrid.i = 0; this.debugGrid.i < this.debugGrid.rows; this.debugGrid.i++) {
      this.ctx.save();
      this.ctx.translate(0, this.debugGrid.i * this.debugGrid.size);
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.w, 0);
      this.ctx.stroke();
      this.ctx.closePath(); // must call close Path to reduce rendering cost
      this.ctx.restore();
    }
    for (this.debugGrid.i = 0; this.debugGrid.i < this.debugGrid.cols; this.debugGrid.i++) {
      this.ctx.save();
      this.ctx.translate(this.debugGrid.i * this.debugGrid.size, 0);
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(0, this.h);
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
    }
  }
}
