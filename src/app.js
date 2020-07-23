/*
 * @Author: topfounder 
 * @Date: 2020-07-23 14:18:56 
 * @Last Modified by: topfounder
 * @Last Modified time: 2020-07-23 15:32:03
 */

import {defineComponent,h} from '@vue/runtime-core'
//定义一个组件
const App = defineComponent({
    render(){
        //创建一个圆（基于pixi）的虚拟节点
        const vnode = h('circle',{x:180,y:330},[
            h('circle',{x:100,y:200}),
            'demo'
        ])
        return vnode
    }
})

export default App