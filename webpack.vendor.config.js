const path = require('path');
const webpack = require('webpack');
const dllAssetPath = path.join(__dirname,'dll');
const dllLibraryName = 'dllExample';

module.exports = {
    entry:['react'],
    output: {
        path:dllAssetPath,
        filename: "vendor.js",
        library: dllLibraryName,
    },

    plugins: [
        //name：导出的dll library的名字，它需要与output.library的值对应
        //path：资源清单的绝对路径，业务代码打包时将会使用这个清单进行模块索引
        new webpack.DllPlugin({
            name:dllLibraryName,
            path:path.join(dllAssetPath,'manifest.json'),
        })
    ],
}