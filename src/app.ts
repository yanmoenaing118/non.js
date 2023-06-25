import Renderer from "./non/Renderer";
import Container from "./non/containers/Container";
import Rect from "./non/shapes/Rect";

const w = 640;
const h = 64 * 7;

const render = new Renderer(w, h);
render.debugGridMode = true;
const scene = new Container(w, h);
const rect = new Rect(0, 0,100,100);
rect.setStyles({
  fill: "pink",
});

const rect2 = new Rect(100,100,200,200);
rect2.setStyles({
    fill: 'green'
})
scene.add(rect);
scene.add(rect2)
function loop() {
    render.render(scene);
    requestAnimationFrame(loop);
}


requestAnimationFrame(loop);