import Entry from "@/views/Entry";
import { Vector3 } from "three";

/**
 * 集装箱/船位
 */
export const enum ContainerType {
  船位 = 'nodes',
  集装箱 = 'containers',
  全部 = 'all'
}

/**
* 集装箱的几种显示状态
*/

export const enum ContainerState {
  初始态,
  留船箱,
  装船位,
  卸船箱,
  将来态,
}

/** 集装箱的实际状态 */
export enum NodeState {
  留船 = 'down',
  装船 = 'empty',
  卸船 = 'exchange',
}

/** 方便后续扩展任意状态的弱化情况 */
export enum WeakNodeState {
  弱化 = 'weak'
}

/**
 * 船位类型对应的值
 */
export enum NodesType {
  仓位调整 = 'swap',
  空位可装 = 'empty',
  有箱无变 = 'on',
  先卸后装 = 'exchange',
  计划卸船 = 'down',
  计划装船 = 'up'
}

/**
 * 集装箱对应的公司logo
 */
export enum Companys {
  default = "default",
  zim = "zim",
  maersk = "maersk",
  msc = "msc"
}

/**
 * 甲板
 */
export const enum BoardType {
  甲板上 = 'tierType=甲板上',
  甲板下 = 'tierType=甲板下',
  全部 = 'tierType=',
}

/**
 * 模型类型
 */
export const ModelType = { ...Companys, ...NodesType, ...NodeState, ...WeakNodeState } as const;
export type ModelType = Companys | NodesType | NodeState | WeakNodeState;

export interface Res<T> {
  code: 200 | 0;
  status: "success" | "failure";
  data: T;
}

export type Reg = RegExp | string;

// 模型自定义userData对象
export type ModelUserData = {
  size: Vector3;
} & PlainObj;

export declare interface Window {
  app: Entry;
}

export type PlainObj = {
  [key: string]: any;
};