const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // Html模板插件，作用是将打包后的js、css文件加入到index.html中
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	mode: 'development', // 设置webpack打包环境为开发环境
	optimization: {
		// 添加抽离公共代码插件的配置
		splitChunks: {
			chunks: 'async',
			minSize: 20000,
			minRemainingSize: 0,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			enforceSizeThreshold: 50000,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
		// splitChunks: {
		//   cacheGroups: {
		//     打包公共模块
		//     commons: {
		//       chunks: 'initial', // initial表示提取入口文件的公共部分
		//       miniChunks: 2, // 表示提取公共部分最少的文件数
		//       miniSize: 0, // 表示公共部分最小的大小
		//       name: 'commons' // 提取出来的文件命名
		//     }
		//   }
		// }
	},
	entry: './src/index.js', //项目的入口文件，它的路径是相对于项目根路径的，所以此处我们写的是“./src”，而不是“../src”
	output: {
		path: path.resolve(__dirname, 'dist'), // 打包输出的路径，这里的路径针对的是当前目录，所以我们写成了"../dist"，而不是"./dist"
		filename: 'test-demo.bundle.js', // 打包输出文件的名称，后期可改成动态生成
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),
		new HtmlWebpackPlugin({
			// 实例化Html模板插件
			template: path.resolve(__dirname, '../index.html'),
		}),
	],
	module: {
		rules: [
			{
				test: /\.js/,
				use: ['babel-loader?cacheDirectory=true'],
				include: path.join(__dirname, '../src'),
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						},
					},
					'css-loader',
				],
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('autoprefixer')],
							},
						},
					},
					{ loader: 'less-loader' },
				],
			},
			/**
			 * file-loader可以用来帮助webpack打包处理一系列的图片文件，比如：.png 、 .jpg 、.jepg等格式的图片。
			 * 打包的图片会给每张图片都生成一个随机的hash值作为图片的名字；url-loader封装了file-loader，
			 * 它的工作原理：
			 * 1、文件大小小于limit参数，url-loader将会把文件转为Base64；
			 * 2、文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。
			 */
			//配置图片静态资源的打包信息
			{
				test: /\.(jpg|png|jpeg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'img/[name].[hash:8].[ext]',
								},
							},
						},
					},
				],
			},
			//配置多媒体资源的打包信息
			{
				test: /\.(mp4|webm|ogg|mp3|wav)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
							fallback: {
								loader: 'file-loader',
								option: {
									name: 'media/[name].[hash:8].[ext]',
								},
							},
						},
					},
				],
			},
		],
	},
	resolve: {
		//resolve核心配置
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			pages: path.join(__dirname, '../src/pages'),
			components: path.join(__dirname, '../src/components'),
			actions: path.join(__dirname, '../src/redux/actions'),
			reducers: path.join(__dirname, '../src/redux/reducers'),
			images: path.join(__dirname, '../src/images'),
		},
	},
	devServer: {
		// 热更新模块配置
		hot: true,
		open: true,
		port: 3500,
		compress: false,
	},
}
