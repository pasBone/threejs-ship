import "@/style/app.scss";
import { defineComponent } from "vue";
import { useStore } from "@/store";
import Entry from "@/views/Entry";
import { Lights } from "@/views/Lights";
import { createContainers } from "@/views/CreateContainers";
import { ElLoading } from 'element-plus';
import { createRacks } from "./views/CreateRack";
import { ship } from "@/views/LoadModel";
import 'element-plus/theme-chalk/el-loading.css';

export default defineComponent({
  async setup () {

    const loading = ElLoading.service({
      fullscreen: true,
      background: "rgba(0,0,0,.8)"
    });

    await init3D();

    // 关闭 loading
    loading.close();

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
  app.add((await ship).scene);

  /** 添加船架组*/
  app.add(await createRacks());

  /** 添加蓝色集装箱组 */
  app.add(await createContainers());
}