import { app } from "@/App";
import { Box3, Color, Object3D, Vector3 } from "three";

/**
 * @description 获取物体尺寸信息
 * @param Object3D 
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
 * @param Object3D 
 * @returns Vector3
 */
export function getCenter (object: Object3D): Vector3 {
  return new Box3()
    .expandByObject(object)
    .getCenter(new Vector3());
}

/**
 * @description 设置物体对象的外边框
 * @param Object3D 
 * @param Color 
 */
export function setOutline (object: Object3D, color: Color) {
  app.outline.setOutline(object, color);
}