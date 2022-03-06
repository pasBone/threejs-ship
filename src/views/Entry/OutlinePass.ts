import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { Camera, Color, Scene, Vector2, WebGLRenderer } from "three";
import { Object3D } from "three";

export class Outline {

  outlinePass: OutlinePass;

  composer: EffectComposer;

  constructor(renderer: WebGLRenderer, scene: Scene, camera: Camera) {
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const outlinePass = new OutlinePass(
      new Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    );
    composer.addPass(outlinePass);
    this.outlinePass = outlinePass;
    this.composer = composer;
  }

  /** 设置对象 outLine */
  setOutline (object: Object3D, color: Color) {
    this.outlinePass.selectedObjects = [object];
    this.outlinePass.visibleEdgeColor = color;
  }
}

