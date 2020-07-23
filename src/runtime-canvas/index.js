/*
* @author : topfounder
* @since : 创建时间  2020-07-23 08:45:41
*/
import {Graphics,Text} from 'pixi.js'
import {createRenderer} from '@vue/runtime-core'
// createRenderer作用是将游戏渲染到canvas
const render = createRenderer({
    createElement(type){
        let element
        //基于type 创建视图，type即为通过app.js中h（）的参数
        if(type === 'circle'){
            element = new Graphics()
            element.beginFill(0xff0000,1)
            element.drawCircle(0,0,100)
            element.endFill()
            console.log(element)
        }
        return element
    },
    insert(el,parent){
        //el为上面createElement中的element
        parent.addChild(el)
    },
    patchProp(el,key,preVal,nextVal){
        el[key] = nextVal
    },
    setElementText(node,text){
        let val = new Text(text)
        node.addChild(val)
    },
    createText(text){
        return new Text(text)
    }
})

export function createApp(rootComponent){
    // 调用render
    return render.createApp(rootComponent)
}