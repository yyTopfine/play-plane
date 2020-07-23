/*
* @author : topfounder
* @since : 创建时间  2020-07-19 19:30:56
*/

import App from './src/app'
import {createApp} from './src/runtime-canvas/index'
import {getPixiApplictionContainer} from './src/runtime-canvas/game'

// 创建一个渲染器（自定义）
const app = createApp(App)

// vue 装载
app.mount(getPixiApplictionContainer())
