/*
 * @Author: topfounder
 * @Date: 2020-07-24 17:54:48
 * @Last Modified by: topfounder
 * @Last Modified time: 2020-07-24 18:53:00
 */

import { defineComponent, h, reactive } from "@vue/runtime-core";

import Map from "../components/map.js";
import Plane from "../components/plane.js";

export default defineComponent({
  setup() {
    //飞机位置
    const planInfo = reactive({
      x: 280,
      y: 600,
    });

    window.addEventListener("keydown", (e) => {
      console.log(e.key);
      const speed = 15;
      switch (e.key) {
        case "ArrowUp":
          planInfo.y -= speed;
          break;
        case "ArrowDown":
          planInfo.y += speed;
          break;
        case "ArrowRight":
          planInfo.x += speed;
          break;
        case "ArrowLeft":
          planInfo.x -= speed;
          break;
      }
    });

    return { planInfo };
  },
  render(ctx) {
    return h("Container", [
      h(Map),
      h(Plane, { x: ctx.planInfo.x, y: ctx.planInfo.y }),
    ]);
  },
});
