/*
 * @Author: xiaojun.xiong 
 * @Date: 2021-12-23 14:33:48 
 * @Last Modified by: xiaojun.xiong
 * @Last Modified time: 2022-02-15 16:15:22
 */

import { getShipInfo, getShipList, ShipInfoRes, ShipListeRes } from "@/api";
import { BoardType, ContainerType, ContainerState } from "@/types";
import { defineStore } from "pinia";

/** 部分默认store */
export const defaultStore = {
  containerType: ContainerType.集装箱,
  boardType: BoardType.全部,
  containerState: ContainerState.初始态,
  shipCode: new URLSearchParams(location.search).get('code') || '',
  bayNo: "",
};

export const useStore = defineStore('shipState', {
  state: () => ({
    /** 当前记录下的贝号 */
    bayNo: defaultStore.bayNo,
    /** 当前选中的船只 code */
    shipCode: defaultStore.shipCode,
    /** 当前需要显示的对象类型 */
    containerType: defaultStore.containerType,
    /** 当前需要显示的集装箱状态 */
    containerState: defaultStore.containerState,
    /** 当前需要显示的甲板对象类型 */
    boardType: defaultStore.boardType,
    /** 船只列表 */
    shipList: [] as Array<ShipListeRes>,
    /** 船只详情 */
    shipDetails: {
      /**  基本信息 */
      baseInfo: {
        length: 0,
        width: 0,
        height: 0
      },
      /** logo 相关信息 */
      logoInfo: {
        imgUrl: '',
        color: '',
      },
      /** 驾驶舱信息 */
      bridge: {
        distance: 0,
        length: 0,
        width: 0,
        height: 0
      },
      /** congainer 容器尺寸 */
      sizeTypeInfo: {
        '20GP': {},
        '40GP': {},
      },
      /** 横向每个贝位里的盒子位置信息 */
      rowTypeDistince: {
        center: {},
        nocenter: {},
      },
      /** 贝位信息 */
      bayInfo: []
    } as unknown as ShipInfoRes,
  }),

  actions: {
    /** 获取船只列表 */
    async getShipList () {
      const response = await getShipList({ type: 'queryShipList' });
      this.shipList = response.data;
    },
    /** 获取船只详情 */
    async getShipInfo (shipCode: string) {
      const response = await getShipInfo({ type: 'queryDetail', shipCode });
      this.shipDetails = response.data;
    }
  }
});