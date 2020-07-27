import { reactive, toRefs, onMounted, onUnmounted } from "@vue/runtime-core";
import bullet from "../components/bullet";
import { getGame } from "../runtime-canvas/game.js";

export function useMovePlane(x, y) {
  const point = reactive({
    x: x,
    y: y,
  });

  let handle = (e) => {
    const speed = 15;
    switch (e.key) {
      case "ArrowUp":
        point.y -= speed;
        break;
      case "ArrowDown":
        point.y += speed;
        break;
      case "ArrowRight":
        point.x += speed;
        break;
      case "ArrowLeft":
        point.x -= speed;
        break;
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", handle);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handle);
  });

  //解决vue3响应丢失
  return toRefs(point);
}

export function bulletAttack(ctx) {
  let handle = function (e) {
    if (e.code === "Space") {
      ctx.emit("Attack");
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", handle);
  });

  onUnmounted(() => {
    window.removeEventListener("keydonw", handle);
  });
}

export function attackHandle(bulltes, planInfo) {
  return () => {
    bulltes.push({
      x: planInfo.x + 103,
      y: planInfo.y,
    });

    bulltes.map((item) => {
      let speed = 5;
      getGame().ticker.add(() => {
        item.y -= speed;
      });
    });
  };
}
