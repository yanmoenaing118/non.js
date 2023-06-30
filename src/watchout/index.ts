import Renderer from "../non/Renderer";
import Container from "../non/containers/Container";
import KeyboardControls from "../non/controls/KeyboardControls";
import Background from "./Background";
import Ninja from "./Ninja";
import { DELTA_TIME, HEIGHT, WIDTH } from "./constants";

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

scene.add(background);
scene.add(ninja);


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