import { defineComponent, h } from "@vue/runtime-core";

import endPageImg from "../../assets/end_page.jpg";
import restartBtnImg from "../../assets/restartBtn.png";

export default defineComponent({
  render(ctx) {
    return h("Container", [
      h("Sprite", { texture: endPageImg }),
      h("Sprite", {
        texture: restartBtnImg,
        x: 230,
        y: 500,
        interactive: true,
        onClick() {
          ctx.$emit("ChangePage", "gamePage");
        },
      }),
    ]);
  },
});
