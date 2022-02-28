import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";

export function createBox (width = 2, height = 2, depth = 2) {
  const boxGeometry = new BoxGeometry(width, height, depth);
  const boxMaterial = new MeshBasicMaterial({ color: 0xabcdef });
  const box = new Mesh(boxGeometry, boxMaterial);
  return box;
}