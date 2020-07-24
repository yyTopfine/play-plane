/*
 * @author : topfounder
 * @since : 创建时间  2020-07-23 08:45:41
 */
import { Graphics, Text, Container, Sprite, Texture } from "pixi.js";
import { createRenderer } from "@vue/runtime-core";
// createRenderer作用是将游戏渲染到canvas 实现渲染器
const render = createRenderer({
  createElement(type) {
    let element;

    switch (type) {
      case "Container":
        element = new Container();
        break;

      case "Sprite":
        element = new Sprite();
        break;
    }

    return element;
  },

  insert(el, parent) {
    parent.addChild(el);
  },

  // 设置属性
  patchProp(el, key, preVal, nextVal) {
    switch (key) {
      case "texture":
        el[key] = Texture.from(nextVal);
        break;

      case "onClick":
        el.on("pointertap", nextVal);
        break;

      default:
        el[key] = nextVal;
        break;
    }
  },

  setElementText(node, text) {},

  createText(text) {
    return new Text(text);
  },
  //处理注释
  createComment() {},
  //获取父节点
  parentNode() {},
  //获取兄弟节点
  nextSibling() {},
  // 删除节点
  remove(el) {
    const parent = el.parent;
    if (parent) {
      parent.removeChild(el);
    }
  },
});

export function createApp(rootComponent) {
  // 调用render
  return render.createApp(rootComponent);
}
