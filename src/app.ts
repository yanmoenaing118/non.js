import Renderer from "./non/Renderer";
import Sprite from "./non/Sprite";
import Texture from "./non/Texture";
import Container from "./non/containers/Container";
import KeyboardControls from "./non/controls/KeyboardControls";

const controls = new KeyboardControls();

const w = 640;
const h = 64 * 7;
const MAX_FRAME = 1 / 60;
let dt = MAX_FRAME;
let ellapsedTime = 0;

const render = new Renderer(w, h);
render.debugGridMode = true;
const scene = new Container(w, h);


function loop(time: number) {
    dt = Math.min(5, (time - ellapsedTime) * 0.001);
    ellapsedTime = time;
    scene.update(dt, ellapsedTime * 0.001);
    render.render(scene);
    requestAnimationFrame(loop);
}



requestAnimationFrame(loop);