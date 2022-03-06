import { Camera, Raycaster, Renderer, Scene, Vector2 } from "three";

var raycaster = new Raycaster();

export class ObjectEvents {

  mouse = {
    x: 0,
    y: 0,
  };

  camera: Camera;

  scene: Scene;

  constructor(renderer: Renderer, scene: Scene, camera: Camera,) {
    this.camera = camera;
    this.scene = scene;
    renderer.domElement.addEventListener('mousedown', this.onTouchMove.bind(this));
  }

  onTouchMove (event: MouseEvent) {
    var x = event.clientX || (event as unknown as TouchEvent).changedTouches[0].pageX;
    var y = event.clientY || (event as unknown as TouchEvent).changedTouches[0].pageY;
    this.mouse.x = (x / window.innerWidth) * 2 - 1;
    this.mouse.y = - (y / window.innerHeight) * 2 + 1;
    this.checkIntersection();
  }

  checkIntersection () {
    raycaster.setFromCamera(this.mouse, this.camera);
    var intersects = raycaster.intersectObjects([this.scene], true);
    if (intersects.length > 0) {
      var selectedObject = intersects[0].object;
    } else {
      // outlinePass.selectedObjects = [];
    }
  }
}