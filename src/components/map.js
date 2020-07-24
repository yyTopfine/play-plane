/*
 * @Author: topfounder
 * @Date: 2020-07-24 15:43:35
 * @Last Modified by: topfounder
 * @Last Modified time: 2020-07-24 18:23:58
 */

import { defineComponent, h, ref } from "@vue/runtime-core";

import mapImg from "../../assets/map.jpg";
import { getGame } from "../runtime-canvas/game.js";

export default defineComponent({
  setup() {
    const mapHeight = 1080;
    const speed = 5;
    const mapy1 = ref(0);
    const mapy2 = ref(-mapHeight);

    // 地图无限滚动
    getGame().ticker.add(() => {
      mapy1.value += speed;
      mapy2.value += speed;

      if (mapy1.value >= mapHeight) {
        mapy1.value = -mapHeight;
      }

      if (mapy2.value >= mapHeight) {
        mapy2.value = -mapHeight;
      }
    });

    return { mapy1, mapy2 };
  },
  render(ctx) {
    return h("Container", [
      h("Sprite", { texture: mapImg, y: ctx.mapy1 }),
      h("Sprite", { texture: mapImg, y: ctx.mapy2 }),
    ]);
  },
});
