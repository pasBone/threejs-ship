import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, Object3D } from "three";
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Entry {

  /** 场景 */
  scene: Scene;

  /** 相机 */
  camera: PerspectiveCamera;

  /** 渲染器 */
  renderer: WebGLRenderer;

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
    camera.position.set(100, 100, 100);
    camera.lookAt(new Vector3(0, 0, 0));
    camera.up = new Vector3(0, 1, 0);

    // 设置渲染器
    const renderer = new WebGLRenderer({
      antialias: true
    });
    renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
    renderer.setClearColor(0xeeeeee);
    renderer.shadowMap.enabled = true;

    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;

    // 添加性能监视器dom及渲染器dom
    const { stats, statsDom } = this.createStats();
    const orbitControls = this.createOrbitControls();
    dom.appendChild(renderer.domElement);
    dom.appendChild(statsDom);

    // 定时刷新界面
    (function renderFrame () {
      orbitControls.update();
      renderer.render(scene, camera);
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
