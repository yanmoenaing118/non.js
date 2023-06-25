import non from "./non";
import Entity from "./non/Entity";
import Container from "./non/containers/Container";


const e1 = new non.Entity(32,32);
const e2 = new non.Entity(64,32);


const scene = new non.Container(300,300);
const cam = new non.Container(360,360);



scene.add(e1);
scene.add(e2);


scene.add(cam)

cam.add(new non.Entity(44,44));

function render(container: Container) {
    function renderContainer(parentContainer: Container) {
        parentContainer.forEach( child => {
            if(child instanceof Container) {
                renderContainer(child);
            }
        })
    }

    renderContainer(container);
}


render(scene);

