/*
* @author : topfounder
* @since : 创建时间  2020-07-23 08:45:41
*/

import {createRender} from '@vue/runtime-core'

const render = createRender()
console.log(render)

export function createApp(rootComponent){
    // 调用render
    return render.createApp(rootComponent)
}