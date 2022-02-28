import { Box3, Object3D, Vector3 } from "three";

/**
 * @description 获取物体尺寸信息
 * @param object 
 * @returns Vector3
 */
export function getSize (object: Object3D): Vector3 {
  return new Box3()
    // .setFromObject(object)
    .expandByObject(object)
    .getSize(new Vector3());
}

/**
 * @description 获取物体中心坐标
 * @param object 
 * @returns Vector3
 */
export function getCenter (object: Object3D): Vector3 {
  return new Box3()
    // .setFromObject(object)
    .expandByObject(object)
    .getCenter(new Vector3());
}
