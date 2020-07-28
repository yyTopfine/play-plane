/*
 * @Author: topfounder
 * @Date: 2020-07-24 17:54:48
 * @Last Modified by: topfounder
 * @Last Modified time: 2020-07-28 16:01:53
 */

import { defineComponent, h, reactive } from "@vue/runtime-core";

import Map from "../components/map.js";
import Plane from "../components/plane.js";
import { useMovePlane } from "../utils/index.js";
import Bullte from "../components/bullet.js";
import bullet from "../components/bullet.js";
import { attackHandle, collisiion } from "../utils/index.js";
import Enemy from "../components/enemy.js";
import { getGame } from "../runtime-canvas/game.js";

export default defineComponent({
  setup(props, ctx) {
    //飞机位置
    const planInfo = reactive({
      x: 280,
      y: 600,
      width: 258,
      height: 364,
    });

    // 子弹
    const bulltes = reactive([]);

    // 敌机位置
    const enemys = reactive([
      {
        x: 10,
        y: 10,
        width: 308,
        height: 207,
      },
    ]);

    // 飞机移动
    const { x, y } = useMovePlane(planInfo.x, planInfo.y, 5);
    planInfo.x = x;
    planInfo.y = y;

    // 发射子弹
    const attack = attackHandle(bulltes, planInfo,enemys);

    const tickerHandle = () => {
      enemys.forEach((enemy) => {
        if (collisiion(enemy, planInfo)) {
          getGame().ticker.remove(tickerHandle);
          ctx.emit("ChangePage", "endPage");
        }
      });
    };

    getGame().ticker.add(tickerHandle);

    return { planInfo, bulltes, attack, enemys };
  },

  render(ctx) {
    function bulltesComponents() {
      return ctx.bulltes.map((bullet) => {
        return h(Bullte, { x: bullet.x, y: bullet.y });
      });
    }

    function enemyComponent() {
      return ctx.enemys.map((enemy) => {
        return h(Enemy, { x: enemy.x, y: enemy.y });
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
      ...enemyComponent(),
    ]);
  },
});
