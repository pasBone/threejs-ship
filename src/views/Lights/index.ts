import { AmbientLight, Object3D, PointLight, SpotLight } from 'three';

export const Lights: Object3D[] = [];

// const ambientLight: AmbientLight = new AmbientLight(0xffffff, 1);
const ambientLight: AmbientLight = new AmbientLight(
  0xffffff,
  1
);

export const pointLight: PointLight = new PointLight(
  0xffffff,
  1,
  0,
  0.84
);
pointLight.position.set(20, 20, 20);

export const spotLight: SpotLight = new SpotLight(
  0xffffff,
  1,
  0,
  0.3141592653589793,
  0,
  1
);
spotLight.position.set(0, 0, 0);
spotLight.target.position.set(0, 0, 1);

Lights.push(ambientLight, pointLight, spotLight);