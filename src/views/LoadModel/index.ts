import { ModelUserData } from "@/types";
import { getCenter, getSize } from "@/utils/three.utils";
import { BoxGeometry, MeshStandardMaterial, Mesh } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();

/** 加载 ship 模型 */
export const getShipModel = () => {
  return gltfLoaderAsync('models/ship-oil/scene-2.gltf').then(gltf => {
    const scale = 2;
    gltf.scene.name = 'ship';
    gltf.scene.userData.scale = scale;
    gltf.scene.scale.set(scale, scale, scale);
    return gltf;
  });
};

/** 加载 船架 模型 */
export const getRackModel = () => {
  return gltfLoaderAsync('models/rack/scene.gltf').then(gltf => {
    gltf.scene.name = 'rack';
    return gltf;
  });
};

/** 加载 蓝色集装箱 模型 */
export const getBlueContainerModel = () => {
  return gltfLoaderAsync('models/blue-container/scene.gltf');
};

/** 加载 红色集装箱 模型 */
export const getRedContainerModel = () => {
  return gltfLoaderAsync('models/red-container/scene.gltf');
};

/** 异步加载 gltf 模型 */
const gltfLoaderAsync = (
  url: string,
  onProgress?: (event: ProgressEvent) => void,
) => {
  loader.setCrossOrigin('Anonymous');
  return loader
    .loadAsync(url, onProgress)
    .then(gltf => gltf);
};

/** 同步加载 gltf 模型 */
const gltfLoader = (
  url: string,
  onLoad: (gltf: GLTF) => void,
  onProgress?: (event: ProgressEvent) => void,
  onError?: (event: ErrorEvent) => void,
) => {
  loader.setCrossOrigin('Anonymous');
  loader.load(url, onLoad, onProgress, onError);
};

export const ship = await getShipModel();

export const rack = await getRackModel();

export const blueContainer = await getBlueContainerModel();

