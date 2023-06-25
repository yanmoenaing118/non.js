import Renderer from "./non/Renderer";
import Container from "./non/containers/Container";
import Rect from "./non/shapes/Rect";

const w = 640;
const h = 64 * 7;

const render = new Renderer(w, h);
render.debugGridMode = true;
const scene = new Container(w, h);

function loop() {
    render.render(scene);
    requestAnimationFrame(loop);
}


requestAnimationFrame(loop);