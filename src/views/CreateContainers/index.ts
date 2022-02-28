import { Group } from "three";
import { app } from "@/App";
import { getCenter, getSize } from "@/utils/three.utils";
import { blueContainer, rack } from "@/views/LoadModel";

export async function createContainers () {

  // 集装箱组
  const containersGroup = new Group();

  // 船对象
  const ship = app.scene.getObjectByName('ship')!;
  // 船甲板对象
  const shipBoard = ship.getObjectByName('ship_01014')!;

  // 获取集装箱的 size 
  const containeSize = getSize(blueContainer.scene);

  // 获取船甲板的 size
  const shipBoardSize = getSize(shipBoard);
  // 获取甲板的 center
  const shipBoardCenter = getCenter(shipBoard);

  // 获取船架 size 
  const rackSize = getSize(rack.scene);

  for (let i = 0; i < 1; i++) {
    for (let j = 0; j < 1; j++) {
      for (let k = 0; k < 30; k++) {
        console.log(k % 2)
        const container = blueContainer.scene.clone();
        container.position.set(
          containeSize.x * i,
          (containeSize.y + 0.1) * j,
          (containeSize.z + (k % 2 == 0 ?0 : 0.5)) * k,  // 0.1-固定间距， 0.5-船架之间的间距
          // (containeSize.z + 0.5) * k,  // 0.1-固定间距， 0.5-船架之间的间距
        );
        containersGroup.add(container);
      }
    }
  }

  containersGroup.position.set(
    -((shipBoardSize.x / 2) - (containeSize.x / 2) - shipBoardCenter.x - 0.355),
    +((shipBoardSize.y / 2) + (containeSize.y / 2) + shipBoardCenter.y),
    -((shipBoardSize.z / 2) - (containeSize.z / 2) - shipBoardCenter.z - 0.5)
  );

  return containersGroup;
}