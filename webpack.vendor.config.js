const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry:['react','react-dom','react-router','react-redux','redux'],
    output: {
        filename: '[name].dll.js',
        path:path.join(__dirname,'dist/dll'),
        library: '[name]_dll_[hash]',
    },

    plugins: [
        //name：导出的dll library的名字，它需要与output.library的值对应
        //path：资源清单的绝对路径，业务代码打包时将会使用这个清单进行模块索引
        new webpack.DllPlugin({
            name:'[name]_dll_[hash]',
            path:path.join(path.join(__dirname,'dist/dll'),'manifest.json'),
        }),

        new webpack.HashedModuleIdsPlugin(),
    ],
}