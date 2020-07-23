/*
* @author : topfounder
* @since : 创建时间  2020-07-19 19:31:03
*/

const path = require('path')

module.exports = {
    entry: path.resolve(__dirname,'./main.js'),
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname,'./dist')
    },
    devServer:{
        contentBase:path.resolve(__dirname,'./dist')
    }
}