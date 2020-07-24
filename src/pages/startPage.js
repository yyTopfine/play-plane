/*
 * @Author: topfounder
 * @Date: 2020-07-24 17:55:00
 * @Last Modified by: topfounder
 * @Last Modified time: 2020-07-24 18:07:18
 */

import { defineComponent, h } from "@vue/runtime-core";

import startPageImg from "../../assets/start_page.jpg";
import startBtn from "../../assets/startBtn.png";

export default defineComponent({
  // 设置图片
  render(ctx) {
    return h("Container", [
      h("Sprite", { texture: startPageImg }),
      h("Sprite", {
        texture: startBtn,
        x: 230,
        y: 520,
        interactive: true,
        onClick() {
          ctx.$emit("ChangePage", "gamePage");
        },
      }),
    ]);
  },
});
