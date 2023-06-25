import Entity from "../Entity";
class Container extends Entity {
  private children: Entity[] = [];
  add<T>(e: T): T {
    this.children.push(e as Entity);
    return e;
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

  getTotalChildren() {
    return this.children.length;
  }

  forEach(fn: (e: Entity) => void) {
    this.children.forEach(fn);
  }
}

export default Container;
