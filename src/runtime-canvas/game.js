/*
 * @Author: topfounder 
 * @Date: 2020-07-23 15:32:00 
 * @Last Modified by: topfounder
 * @Last Modified time: 2020-07-23 15:34:34
 */

import * as PIXI from 'pixi.js'
// pixi 初始化
const game = new PIXI.Application({
    width:750,
    height:1080
})

// body添加一个canvas画布
document.body.appendChild(game.view)

export function getPixiApplictionContainer(){
    return game.stage
}