/*
 * @Author: topfounder
 * @Date: 2020-07-23 14:18:56
 * @Last Modified by: topfounder
 * @Last Modified time: 2020-07-24 17:55:46
 */

import { defineComponent, h, computed, ref } from "@vue/runtime-core";

import StartPage from "./pages/startPage.js";
import GamePage from "./pages/gamePage.js";

//定义一个组件
const App = defineComponent({
  setup() {
    const curentPageName = ref("startPage");

    const pageComponent = computed(() => {
      if (curentPageName.value === "startPage") {
        return StartPage;
      } else if (curentPageName.value === "gamePage") {
        return GamePage;
      }
    });

    return { curentPageName, pageComponent };
  },
  render(ctx) {
    return h("Container", [
      h(ctx.pageComponent, {
        onChangePage(pageName) {
          ctx.curentPageName = pageName;
        },
      }),
    ]);
  },
});

export default App;
