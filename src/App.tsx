import "@/style/app.scss";
import { defineComponent } from "vue";
import { useStore } from "@/store";
import Entry from "@/views/Entry";
import { getShipModel } from "@/views/LoadModel";
import { Lights } from "@/views/Lights";
import { createContainers } from "@/views/CreateContainers";
import { ElLoading } from 'element-plus';
import 'element-plus/theme-chalk/el-loading.css';
import { createRacks } from "./views/CreateRack";

import { ship } from "@/views/LoadModel";

export default defineComponent({
  async setup () {

    const store = useStore();
    const loading = ElLoading.service({
      fullscreen: true,
      background: "rgba(0,0,0,.8)"
    });

    // 获取船只列表
    await store.getShipList();

    // 默认获取第一首船的信息, 并将 code 记录在 store 和 url 上
    if (!store.shipCode && store.shipList.length) {
      store.shipCode = store.shipList[0].code;
    };

    // 获取详情
    await store.getShipInfo(store.shipCode);

    await init3D();

    // 关闭 loading
    loading.close();

    // 船code发生变化时记录到url
    watchEffect(() => {
      history.pushState({}, '', `?code=${store.shipCode}`);
    });

    return () => <div></div>;
  }
});


/** 应用入口 */
export const app: Entry = new Entry(
  document.querySelector("#ship-canvas")!
);

async function init3D () {
  // @ts-ignore
  window.app = app;

  /** 添加光源相关对象 */
  app.add(...Lights);

  /** 添加 ship 对象 */
  app.add(ship.scene);

  /** 添加船架组*/
  app.add(await createRacks());

  /** 添加蓝色集装箱组 */
  app.add(await createContainers());
}