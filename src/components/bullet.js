import { defineComponent, h, toRefs, reactive } from "@vue/runtime-core";

import bullteImg from "../../assets/bullet.png";

export default defineComponent({
  props: ["x", "y"],
  setup(props) {},
  render(ctx) {
    return h("Container", { x: ctx.x, y: ctx.y }, [
      h("Sprite", { texture: bullteImg }),
    ]);
  },
});
