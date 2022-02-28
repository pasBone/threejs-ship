
/**
 * 
 * @returns 返回地址栏参数
 */
export const getParams = () => new URLSearchParams(location.search);


/**
 * @description 动态获取图片
 * @param {*} url 路径和名称 
 * @returns { string } 动态
 */
export function dynamicImg (url: string) {
  const picture = import.meta.globEager(`/src/assets/images/**/*`)[`/src/assets/images/${url}`];
  return picture.default;
};

/* 单位px转化为rem */
export function px2rem (px = 0, designWidth = 3840, blocks = 10) {
  return px / designWidth * blocks;
}

/* 单位px转化为vw */
export function px2vw (px = 0, designWidth = 3840, blocks = 100) {
  return px / designWidth * blocks;
}

/** 手动delay */
export function delay (timer: number) {
  return new Promise(resolve => setTimeout(resolve, timer));
}