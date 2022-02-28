import { Group } from "three";
import { app } from "@/App";
import { getCenter, getSize } from "@/utils/three.utils";
import { blueContainer } from "@/views/LoadModel";
import { CONTAINER_SPACEING_Z_EVEN, CONTAINER_SPACEING_Z_ODD } from "@/const";

export async function createContainers () {

  // 集装箱组
  const containersGroup = new Group();
  containersGroup.name = "containersGroup";

  // 船对象
  const ship = app.scene.getObjectByName('ship')!;
  // 船甲板对象
  const shipBoard = ship.getObjectByName('ship_01014')!;

  // 获取集装箱的 size 
  const containeSize = getSize(blueContainer.scene);

  // 获取船甲板的 size
  const shipBoardSize = getSize(shipBoard);
  console.log(shipBoardSize);
  // 获取甲板的 center
  const shipBoardCenter = getCenter(shipBoard);

  // 获取船架 size 
  // const rackSize = getSize(rack.scene);
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 5; j++) {
      sum = 0;
      for (let k = 0; k < 26; k++) {
        const container = blueContainer.scene.clone();
        sum += k % 2 == 0 ? CONTAINER_SPACEING_Z_ODD : CONTAINER_SPACEING_Z_EVEN;  // 0.1-固定间距， 0.4-船架之间的间距
        container.position.set(
          (containeSize.x * i),
          (containeSize.y + 0.1) * j,
          (containeSize.z * k) + sum,
        );
        // containersGroup.add(container);
      }
    }
  }

  containersGroup.position.set(
    -((shipBoardSize.x / 2) - (containeSize.x / 2) - shipBoardCenter.x - 0.355),
    +((shipBoardSize.y / 2) + (containeSize.y / 2) + shipBoardCenter.y),
    -((shipBoardSize.z / 2) - (containeSize.z / 2) - shipBoardCenter.z - CONTAINER_SPACEING_Z_ODD - CONTAINER_SPACEING_Z_EVEN / 2)
  );

  return containersGroup;
}