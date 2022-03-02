
import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, Object3D, Raycaster, Vector2, RepeatWrapping, TextureLoader, Texture } from "three";
import { Interaction } from '@/vendor/three.interaction';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
export default class Entry {

  /** 场景 */
  scene: Scene;

  /** 相机 */
  camera: PerspectiveCamera;

  /** 渲染器 */
  renderer: WebGLRenderer;

  /** 外边框 */
  outlinePass: OutlinePass;

  constructor(dom: HTMLElement) {
    // 创建场景
    const scene = new Scene();

    // 创建相机
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new PerspectiveCamera(
      45,
      aspect,
      0.1,
      10000000
    );
    camera.position.set(20, 20, 20);
    camera.lookAt(new Vector3(0, 0, 0));
    camera.up = new Vector3(0, 1, 0);

    // 设置渲染器
    const renderer = new WebGLRenderer({
      antialias: true
    });
    renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
    renderer.setClearColor(0xeeeeee);
    renderer.shadowMap.enabled = true;

    // 设置 css2d 渲染器
    const css2DRenderer = new CSS2DRenderer();
    css2DRenderer.setSize(window.innerWidth, window.innerHeight);
    css2DRenderer.domElement.style.position = 'absolute';
    css2DRenderer.domElement.style.top = '0px';
    css2DRenderer.domElement.style.pointerEvents = 'none';

    // 初始化事件管理器
    new Interaction(renderer, scene, camera);

    //  初始化 outlinePass
    const composer = new EffectComposer( renderer );

    var renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );

    const outlinePass = new OutlinePass(
      new Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    );
    composer.addPass( outlinePass );

    this.outlinePass = outlinePass;

    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;

    // 添加性能监视器dom及渲染器dom
    const { stats, statsDom } = this.createStats();
    const orbitControls = this.createOrbitControls();

    dom.appendChild(renderer.domElement);
    dom.appendChild(statsDom);
    dom.appendChild(css2DRenderer.domElement);

    // 定时刷新界面
    (function renderFrame () {
      orbitControls.update();
      renderer.render(scene, camera);
      css2DRenderer.render(scene, camera);
      composer.render();
      stats.update();
      requestAnimationFrame(renderFrame);
    })();
  }

  // 初始orbitControls
  private createOrbitControls () {
    const orbitControls: OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    orbitControls.addEventListener("change", () => {
      this.renderer.render(this.scene, this.camera);
    });
    orbitControls.minDistance = 5;
    orbitControls.maxDistance = 100;
    return orbitControls;
  }

  /** 初始化性能监视器 */
  private createStats () {
    const stats = Stats();
    const statsDom = stats.domElement;
    statsDom.style.position = 'fixed';
    statsDom.style.top = '0';
    statsDom.style.right = '5px';
    statsDom.style.left = 'unset';
    return {
      stats,
      statsDom
    };
  }

  // 往场景里添加 3D 对象
  add (...object: Object3D[]) {
    object.forEach(elem => {
      this.scene.add(elem);
    });
  }

}
