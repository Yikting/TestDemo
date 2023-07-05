const {merge } = require("webpack-merge")
const commonConfig = require('./webpack.common.config') // 引入公共配置

const prodConfig = {
  // 模式
  mode: 'production',
  // source-map
  devtool: 'nosources-source-map',

}

module.exports = merge(commonConfig, prodConfig) // 公用配置和开发配置合并