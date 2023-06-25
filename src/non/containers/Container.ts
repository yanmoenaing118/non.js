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

  getByIndex(idx: number): Entity {
    if(!this.children[idx]) return this.children[0];
    return this.children[idx];
  }

  forEach(fn: (e: Entity) => void) {
    this.children.forEach(fn);
  }
}

export default Container;
