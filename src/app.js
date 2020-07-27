/*
 * @Author: topfounder
 * @Date: 2020-07-23 14:18:56
 * @Last Modified by: topfounder
 * @Last Modified time: 2020-07-27 18:24:34
 */

import { defineComponent, h, computed, ref } from "@vue/runtime-core";

import StartPage from "./pages/startPage.js";
import GamePage from "./pages/gamePage.js";
import EndPage from "./pages/endPage.js";

//定义一个组件
const App = defineComponent({
  setup() {
    const curentPageName = ref("startPage");

    const pageComponent = computed(() => {
      if (curentPageName.value === "startPage") {
        return StartPage;
      } else if (curentPageName.value === "gamePage") {
        return GamePage;
      } else if (curentPageName.value === "endPage") {
        return EndPage;
      }
    });

    return { curentPageName, pageComponent };
  },
  render(ctx) {
    return h("Container", [
      h(ctx.pageComponent, {
        onChangePage(pageName) {
          console.log("1", pageName);
          ctx.curentPageName = pageName;
        },
      }),
    ]);
  },
});

export default App;
