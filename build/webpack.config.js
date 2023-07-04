const path = require('path')

module.exports = {
  mode: 'development', // 设置webpack打包环境为开发环境
  entry: './src/index.js', //项目的入口文件，它的路径是相对于项目根路径的，所以此处我们写的是“./src”，而不是“../src”
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包输出的路径，这里的路径针对的是当前目录，所以我们写成了"../dist"，而不是"./dist"
    filename: 'test-demo.bundle.js' // 打包输出文件的名称，后期可改成动态生成
  }
}