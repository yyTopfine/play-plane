/*
 * @Author: topfounder
 * @Date: 2020-07-24 17:54:48
 * @Last Modified by: topfounder
 * @Last Modified time: 2020-07-24 18:53:00
 */

import { defineComponent, h, reactive } from "@vue/runtime-core";

import Map from "../components/map.js";
import Plane from "../components/plane.js";
import { useMovePlane } from "../utils/index.js";
import Bullte from "../components/bullet.js";
import bullet from "../components/bullet.js";
import { attackHandle } from "../utils/index.js";

export default defineComponent({
  setup() {
    //飞机位置
    const planInfo = reactive({
      x: 280,
      y: 600,
    });

    // 子弹
    const bulltes = reactive([]);

    // 飞机移动
    const { x, y } = useMovePlane(planInfo.x, planInfo.y);
    planInfo.x = x;
    planInfo.y = y;

    // 发射子弹
    const attack = attackHandle(bulltes, planInfo);

    return { planInfo, bulltes, attack };
  },
  render(ctx) {
    function bulltesComponents() {
      return ctx.bulltes.map((bullet) => {
        return h(Bullte, { x: bullet.x, y: bullet.y });
      });
    }

    return h("Container", [
      h(Map),
      ...bulltesComponents(),
      h(Plane, {
        x: ctx.planInfo.x,
        y: ctx.planInfo.y,
        onAttack: ctx.attack,
      }),
    ]);
  },
});
