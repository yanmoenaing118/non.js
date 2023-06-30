import Renderer from "../non/Renderer";
import Camera from "../non/containers/Camera";
import Container from "../non/containers/Container";
import KeyboardControls from "../non/controls/KeyboardControls";
import Background from "./Background";
import Ninja from "./Ninja";
import { DELTA_TIME, HEIGHT, WIDTH, WORLD_HEIGHT, WORLD_WIDTH } from "./constants";

const controls = new KeyboardControls();

const w = WIDTH;
const h = HEIGHT;
const renderer = new Renderer(w,h);
let delta = DELTA_TIME;
let lastFrameTime = 0;
let lastFrameTimeInSecond = 0;

const scene = new Container(w, h);
const ninja = new Ninja(controls);
const background = new Background();

const camera = new Camera(w,h,WORLD_WIDTH, WORLD_HEIGHT)

camera.setSubject(ninja);
// scene.add(background);
// scene.add(ninja);

camera.add(background);
camera.add(ninja);
console.log(background)
scene.add(camera);

function run(timeEllapsed: number) {
    delta = Math.min((timeEllapsed - lastFrameTime) * 0.001, DELTA_TIME); 
    lastFrameTime = timeEllapsed;
    lastFrameTimeInSecond = lastFrameTime *0.001;

    // update everything
    scene.update(delta, lastFrameTimeInSecond);

    // render everything
    renderer.render(scene);

    requestAnimationFrame(run);
}

requestAnimationFrame(run);