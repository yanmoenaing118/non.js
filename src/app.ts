import Entity from "./non/Entity";

class Love extends Entity {

    another: string;
    update (dt: number, t: number) {
        // super.update(dt,t);
        console.log('love', this)
    }
}

class Hate extends Entity {
   
    update(dt: number, t: number): void {
        // super.update(dt,t);
        console.log('hate', this)
    }
}


class Container extends Entity{
    children: Entity[] = [];
    add(e: Entity) {
        this.children.push(e);
    }

    update(dt: number, t: number){
       this.children = this.children.filter( child => {
            if(child.update) {
                child.update(dt,t);
            }
            return !child.dead;
        })
    }
}


const scene = new Container(600,600);
const love = new Love(32,32);
const hate = new Hate(64,64);

const onlyLove = new Container(6006,600);
onlyLove.add(love);
onlyLove.add(new Love(65,65));


scene.add(love);
scene.add(hate);
scene.add(onlyLove)

scene.update(0,0);

console.log('SCENE: ',scene);
