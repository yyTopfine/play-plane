import { defineComponent, h } from "@vue/runtime-core";

import enemPlaneImg from "../../assets/enemy.png";

export default defineComponent({
  props: ["x", "y"],
  render(ctx) {
    return h("Container", { x: ctx.x, y: ctx.y }, [
      h("Sprite", { texture: enemPlaneImg }),
    ]);
  },
});
