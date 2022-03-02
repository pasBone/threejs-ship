import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import Entry from ".";
import { Vector2 } from "three";

class Outline {
  constructor(app: Entry) {
    //  初始化 outlinePass
    const composer = new EffectComposer(app.renderer);

    const renderPass = new RenderPass(app.scene, app.camera);
    composer.addPass(renderPass);

    const outlinePass = new OutlinePass(
      new Vector2(window.innerWidth, window.innerHeight),
      app.scene,
      app.camera
    );
    composer.addPass(outlinePass);

    return outlinePass;
  }
}