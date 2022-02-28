/*
 * @Author: xiaojun.xiong 
 * @Date: 2021-12-22 11:29:33 
 * @Last Modified by: xiaojun.xiong
 * @Last Modified time: 2022-02-25 15:45:59
 */

import { Companys, NodesType } from "@/types";
import { get } from "./http";

// /** 获取船只列表 */
export const getShipList = get<ShipListeReq, Array<ShipListeRes>>('/data/list.json');
// /** 获取船只详情 */
export const getShipInfo = get<ShipInfoReq, ShipInfoRes>('/data/UN9454357.json');

/** 船只列表 req */
export interface ShipListeReq {
  type: string;
}

/** 船只列表 res */
export interface ShipListeRes {
  code: string;
  name: string;
}

/** 船只详情 req */
export interface ShipInfoReq {
  type: string;
  shipCode: string;
}

/** 描述对象的尺寸信息 */
export interface ObjectSize {
  length: number;
  width: number;
  height: number;
};

/** 船只的尺寸类型 */
export enum SizeType {
  小集装箱 = "20GP",
  大集装箱 = "40GP",
}

/** 单个 container / nodes */
export interface ContainerItem {
  loadType: NodesType;
  sizeType: SizeType;
  logo: Companys;
  nodeId: string;
  nodeName: string;
  row: string;
  tier: string;
}

/** 单个贝 */
export interface BayItem {
  [x: string]: any;
  /** 贝号 */
  bayNO: string;
  /** 距离 */
  distance: number;
  rowType: 'center' | 'nocenter';
  /** 船位 */
  containers: ContainerItem[];
  /** 集装箱 */
  nodes?: ContainerItem[];
  tierDistance: {
    [key: number]: number;
  };
}

/** 船只详情 res */
export interface ShipInfoRes {
  /**  基本信息 */
  baseInfo: ObjectSize;
  /** logo 相关信息 */
  logoInfo: { imgUrl: string, color: string; };
  bridge: { distance: number; } & ObjectSize;
  /** congainer 容器尺寸 */
  sizeTypeInfo: {
    '20GP': ObjectSize,
    '40GP': ObjectSize,
  };
  /** 横向每个贝位里的盒子位置信息 */
  rowTypeDistince: {
    center: {
      [key: number]: number;
    };
    nocenter: {
      [key: number]: number;
    };
  };
  /** 贝位信息 */
  bayInfo: BayItem[];
}