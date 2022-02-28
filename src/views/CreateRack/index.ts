import { Group } from "three";
import { app } from "@/App";
import { getCenter, getSize } from "@/utils/three.utils";
import { blueContainer, rack } from "@/views/LoadModel";
import { CONTAINER_SPACEING_Z_EVEN, CONTAINER_SPACEING_Z_ODD } from "@/const";

export async function createRacks () {

  // 船架组
  const racksGroup = new Group();
  racksGroup.name = "rackGroup";

  // 船架模型对象
  const rackModel = rack.scene;

  // 集装箱模型
  const container = blueContainer.scene;
  const containerSize = getSize(container);

  // 船对象
  const ship = app.scene.getObjectByName('ship')!;
  // 获取船的 size
  const shipSize = getSize(ship);

  // 船甲板对象
  const shipBoard = app.scene.getObjectByName('ship_01014')!;
  // 获取船甲板的 size
  const shipBoardSize = getSize(shipBoard);
  // 获取甲板的 center
  const shipBoardCenter = getCenter(shipBoard);

  // 获取船架的 size
  let rackSize = getSize(rackModel);
  // 获取船架的 size
  let rackCenter = getCenter(rackModel);

  // 船架 x 轴缩放至和船身等宽
  rackModel.scale.set(
    shipSize.x / rackSize.x,
    shipSize.x / rackSize.x / 1.5,
    1
  );

  // 重新获取缩放后的船架size和center
  rackSize = getSize(rackModel);
  rackCenter = getCenter(rackModel);
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const rack = rackModel.clone();
    sum += CONTAINER_SPACEING_Z_ODD + CONTAINER_SPACEING_Z_EVEN;
    rack.position.set(
      0,
      0,
      i * (containerSize.z * 2) + sum
    );
    racksGroup.add(rack);
  }

  racksGroup.position.set(
    -((shipBoardSize.x / 2) - (rackSize.x / 2) - shipBoardCenter.x + rackCenter.x) - 1,
    +((shipBoardSize.y / 2) + (rackSize.y / 2) + shipBoardCenter.y - rackCenter.y),
    -((shipBoardSize.z / 2) - (rackSize.z / 2) - shipBoardCenter.z + rackCenter.z),
  );
  return racksGroup;
}