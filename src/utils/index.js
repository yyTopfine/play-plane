/*
 * @Author: topfounder
 * @Date: 2020-07-28 12:13:33
 * @Last Modified by: topfounder
 * @Last Modified time: 2020-07-28 18:57:23
 */

import {
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
  ref,
} from "@vue/runtime-core";
import bullet from "../components/bullet";
import { getGame } from "../runtime-canvas/game.js";

// 发射子弹
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

// 移除数组中的指定元素
function removeArrayItem(obj, key, ary) {
  const val = obj[key];
  const index = ary.findIndex((c) => c[key] === val);
  ary.splice(index, 1);
}

// 子弹运行
export function attackHandle(bulltes, planInfo, enemys) {
  return () => {
    bulltes.push({
      x: planInfo.x + 103,
      y: planInfo.y,
      width: 61,
      height: 99,
    });

    bulltes.map((item) => {
      let speed = 5;

      let handler = () => {
        item.y -= speed;
        if (item.y < 100) {
          removeArrayItem(item, "x", bulltes);
          getGame().ticker.remove(handler);
        }

        enemys.forEach((enemy) => {
          if (collisiion(item, enemy)) {
            removeArrayItem(item, "x", bulltes);
            removeArrayItem(enemy, "x", enemys);
          }
        });
      };
      getGame().ticker.add(handler);
    });
  };
}

// 碰撞检测
export function collisiion(objA, objB) {
  return (
    objA.x + objA.width >= objB.x &&
    objB.x + objB.width >= objA.x &&
    objA.y + objA.height >= objB.y &&
    objB.y + objB.height >= objA.y
  );
}

// 飞机移动
export function useMovePlane(x, y, speed) {
  //飞机位置
  const planX = ref(x);
  const planY = ref(y);
  const commands = [];

  //按键类型
  const commandType = {
    upAndDown: "upAndDown",
    leftAndRight: "leftAndRight",
  };
  const downCommand = {
    type: commandType.upAndDown,
    dir: 1,
    id: 1,
  };
  const upCommand = {
    type: commandType.upAndDown,
    dir: -1,
    id: 2,
  };
  const leftCommand = {
    type: commandType.leftAndRight,
    dir: -1,
    id: 3,
  };
  const rightCommand = {
    type: commandType.leftAndRight,
    dir: 1,
    id: 4,
  };

  //查找上下，左右两种类型按键
  const findUpAndDown = () => {
    return commands.find((item) => item.type === commandType.upAndDown);
  };

  const findLeftAndRight = () => {
    return commands.find((item) => item.type === commandType.leftAndRight);
  };

  //飞机移动
  const moveHandler = () => {
    const findUpAndDownCommand = findUpAndDown();
    if (findUpAndDownCommand) {
      planY.value = findUpAndDownCommand.dir * speed + planY.value;
    }

    const findLeftAndRightCommand = findLeftAndRight();
    if (findLeftAndRightCommand) {
      planX.value = findLeftAndRightCommand.dir * speed + planX.value;
    }
  };

  //查找按键是否存在于按键队列中
  const isExistCommand = (command) =>
    commands.find((item) => item.id === command.id);

  const commandMap = {
    ArrowLeft: leftCommand,
    ArrowRight: rightCommand,
    ArrowUp: upCommand,
    ArrowDown: downCommand,
  };

  //方向键按下处理函数
  const downHandler = (e) => {
    const command = commandMap[e.code];
    if (command && !isExistCommand(command)) {
      commands.unshift(command);
    }
  };

  const removeCommand = (command) => {
    const id = command.id;
    const index = commands.findIndex((c) => c.id === id);
    commands.splice(index, 1);
  };

  // 方向键被释放处理程序
  const upHandler = (e) => {
    const command = commandMap[e.code];
    if (command) {
      removeCommand(command);
    }
  };

  onMounted(() => {
    getGame().ticker.add(moveHandler);
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
  });

  onUnmounted(() => {
    getGame().ticker.remove(moveHandler);
    window.removeEventListener("keydown", downHandler);
    window.removeEventListener("keyup", upHandler);
  });

  return {
    x: planX,
    y: planY,
  };
}
