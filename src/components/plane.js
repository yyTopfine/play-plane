/*
 * @Author: topfounder
 * @Date: 2020-07-24 18:04:06
 * @Last Modified by: topfounder
 * @Last Modified time: 2020-07-24 18:59:36
 */

import { defineComponent, h, reactive, watch } from "@vue/runtime-core";

import planeImg from "../../assets/plane.png";

export default defineComponent({
  props: ["x", "y"],
  setup(props) {
    const point = reactive({
      x: props.x,
      y: props.y,
    });

    watch(props, () => {
      (point.x = props.x), (point.y = props.y);
    });

    return { point };
  },
  render(ctx) {
    return h("Container", { x: ctx.point.x, y: ctx.point.y }, [
      h("Sprite", { texture: planeImg }),
    ]);
  },
});
