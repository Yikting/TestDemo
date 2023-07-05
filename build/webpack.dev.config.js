const path = require('path')
const webpack = require("webpack");
const {merge } = require("webpack-merge")
const commonConfig = require('./webpack.common.config') // 引入公共配置

const devConfig = {
  // 模式
  mode: 'development',
  // 性能优化 (tree shaking)
  optimization: {
    usedExports: true
  },
  // source-map
  devtool: 'eval-cheap-module-source-map',
  // 开发服务器
  devServer: {
    static: {
			directory: path.join(__dirname, 'dist'), // 注意：Webpack5 中已用 static 替代 contentBase
			publicPath: '/' // 服务器访问静态资源的默认路径，优先级高于output.publicPath
		},
    compress: true, // 开启gzip压缩
    port: 8080, // 自定义端口号
    open: true, // 开启服务器时，自动打开页面
    hot: true, // 代码变化后，自动刷新页面 (该参数可以不用手动添加，它已经被自动应用于 HMR 插件。)
    historyApiFallback: true
  },
  // 插件
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(commonConfig, devConfig) // 公用配置和开发配置合并