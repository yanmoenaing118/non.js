import Entity from "../Entity";
class Container extends Entity {
  private children: Entity[] = [];
  add(e: Entity) {
    this.children.push(e);
  }

  remove(e: Entity) {
    this.children = this.children.filter((child) => child !== e);
  }

  update(dt: number, t: number) {
    this.children = this.children.filter((child) => {
      if (child.update) {
        child.update(dt, t);
      }
      return !child.dead;
    });
  }

  forEach(fn: (e: Entity) => void) {
    this.children.forEach(fn);
  }
}

export default Container;