/*
 * @Author: xiaojun.xiong 
 * @Date: 2021-12-27 11:31:02 
 * @Last Modified by: xiaojun.xiong
 * @Last Modified time: 2022-02-25 15:46:15
 */

import { Res } from "@/types";
import qs from "query-string";

// const BASE_URL = location.href.includes('123.124.196.192') ? "" : " http://123.124.196.192:2013";
const BASE_URL = ""

const httpRequest = (type: string) => {
  return <Q = void, P = void> (url: string) => {
    return (params?: Q): Promise<Res<P>> => {
      const requestUrl = `${BASE_URL}${url}?${qs.stringify(params || {})}`;
      return fetch(requestUrl, {
        method: type,
      }).then(response => {
        if (response.ok) return response;
        throw { code: 0, status: 'failure' };
      })
        .then(response => response.json())
        .then((res: Res<P>) => {
          if (res.code === 200) return res;
          console.log("HTTP: err", res);
          throw res;
        });
    };
  };
};

export const post = httpRequest('post');
export const get = httpRequest('get');
