/*
 * @Author: topfounder
 * @Date: 2020-07-24 18:04:06
 * @Last Modified by: topfounder
 * @Last Modified time: 2020-07-24 18:59:36
 */

import { defineComponent, h, reactive, watch } from "@vue/runtime-core";

import planeImg from "../../assets/plane.png";
import { bulletAttack } from "../utils/index.js";

export default defineComponent({
  props: ["x", "y"],
  setup(props, ctx) {
    //因props是只读类型响应式，固借助watch间接进行修改
    // const point = reactive({
    //   x: props.x,
    //   y: props.y,
    // });
    // watch(props, () => {
    //   (point.x = props.x), (point.y = props.y);
    // });
    // return { point };

    bulletAttack(ctx);
  },
  render(ctx) {
    return h("Container", { x: ctx.x, y: ctx.y }, [
      h("Sprite", { texture: planeImg }),
    ]);
  },
});
