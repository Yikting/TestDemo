const path = require('path') // Node.js的路径模块
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // Html模板插件，作用是将打包后的js、css文件加入到index.html中
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniSvgDataURI = require('mini-svg-data-uri') // svg文件转为uri编码，会比base64编码体积更小
const webpack = require('webpack')

/**
 * 占位符（placeholders）介绍
 * [name]: 原来的文件名
 * [hash]: 散列值
 * [ext]: 文件后缀
 */

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
		usedExports: true,
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
	entry: './src/index.tsx', // 入口文件（简写模式），项目的入口文件，它的路径是相对于项目根路径的，所以此处我们写的是“./src”，而不是“../src”
	// entry: {
	// 	main: './src/index.tsx'
	// },
	output: {
		// clean: true, // webpack 2.20.0+ 版本内置输出清除目录功能
		path: path.resolve(__dirname, '../dist'), // 打包输出的路径，这里的路径针对的是当前目录，所以我们写成了"../dist"，而不是"./dist"
		filename: 'test-demo.bundle.js', // 打包输出文件的名称，后期可改成动态生成
		assetModuleFilename: 'assets/[name]_[hash][ext]', // 静态文件打包后的路径及文件名（默认走全局的，如果有独立的配置就按照自己独立的设置来）
		publicPath: '/'
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
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
			{
				test: /\.js/,
				use: ['babel-loader?cacheDirectory=true'],
				include: path.join(__dirname, '../src'),
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
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
				sideEffects: true
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
					{ loader: 'less-loader' },
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('autoprefixer')],
							},
						},
					},
				],
				sideEffects: true
			},
			/**
			 * 配置图片静态资源的打包信息   webpack5 新增Asset Module, 替代了之前常用的 raw-loader、url-loader、file-loader
			 * **当type设置为'asset'时，会通过如下策略打包
			 * 		如果文件大小超过8kb(默认值)，就使用asset/resource,被打包进输出文件夹（类似于file-loader）
			 * 		否则就使用asset/inline,内联到打包文件中（类似于url-loader）
			 *
			 * 		区别在于：前者会被单独放进输出文件夹中，后者被处理成 base64 编码字符串内敛进打包出的 JS 文件中。
			 * 		作用是可以减少一次http请求
			 */
			{
				test: /\.(jpe?g|png|gif)$/i,
				type: 'asset', // 一般会转换为 "asset/resource"
				generator: {
					filename: 'assets/images/[name]_[hash][ext]', // 独立的配置
				},
				parser: {
					dataUrlCondition: {
						maxSize: 8 * 1024, // 8kb (低于8kb都会被压缩成base64)
					},
				},
			},
			/**
			 * file-loader可以用来帮助webpack打包处理一系列的图片文件，比如：.png 、 .jpg 、.jepg等格式的图片。
			 * 打包的图片会给每张图片都生成一个随机的hash值作为图片的名字；url-loader封装了file-loader，
			 * 它的工作原理：
			 * 1、文件大小小于limit参数，url-loader将会把文件转为Base64；
			 * 2、文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。
			 */
			// {
			// 	test: /\.(jpe?g|png|gif)$/i,
			// 	use: [
			// 		{
			// 			loader: 'url-loader',
			// 			options: {
			// 				limit: 1024,
			// 				fallback: {
			// 					loader: 'file-loader',
			// 					options: {
			// 						name: 'img/[name].[hash:8].[ext]',
			// 					},
			// 				},
			// 			},
			// 		},
			// 	],
			// },
			// svg文件
			{
				test: /\.svg$/i,
				type: 'asset/inline',
				generator: {
					filename: 'assets/icons/[name]_[hash][ext]', // 独立的配置
					dataUrl(content) {
						content = content.toString()
						return MiniSvgDataURI(content)
					},
				},
				parser: {
					dataUrlCondition: {
						maxSize: 2 * 1024, // 2kb (低于2kb都会被压缩成base64)
					},
				},
			},
			// 字体文件
			{
				test: /\.(otf|eot|woff2?|ttf|svg)$/i,
				type: 'asset', // 一般会转换为 "asset/inline"
				generator: {
					filename: 'assets/fonts/[name]_[hash][ext]',
				},
			},
			//配置多媒体资源的打包信息
			{
				test: /\.(mp4|webm|ogg|mp3|wav)$/,
				type: 'asset',
			},
			// {
			// 	test: /\.(mp4|webm|ogg|mp3|wav)$/,
			// 	use: [
			// 		{
			// 			loader: 'url-loader',
			// 			options: {
			// 				limit: 1024,
			// 				fallback: {
			// 					loader: 'file-loader',
			// 					option: {
			// 						name: 'media/[name].[hash:8].[ext]',
			// 					},
			// 				},
			// 			},
			// 		},
			// 	],
			// },
			// 数据文件
			{
				test: /\.(txt|xml)$/i,
				type: 'asset/source',
			},
		],
	},
	resolve: {
		//resolve核心配置
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
		alias: {
			pages: path.join(__dirname, '../src/pages'),
			components: path.join(__dirname, '../src/components'),
			actions: path.join(__dirname, '../src/redux/actions'),
			reducers: path.join(__dirname, '../src/redux/reducers'),
			images: path.join(__dirname, '../src/images'),
		},
	},
	devServer: {
		// contentBase: path.join(__dirname, 'dist'), // 指定被访问html页面所在目录的路径
    static: {
			directory: path.join(__dirname, 'dist'), // 注意：Webpack5 中已用 static 替代 contentBase
			publicPath: '/' // 服务器访问静态资源的默认路径，优先级高于output.publicPath
		},
		hot: 'only', // 热更新模块配置 'only': 强制热更新，不会刷新页面
		open: true, // 开启服务器时，自动打开页面
		port: 3500, // 自定义端口号
		compress: true, // 开启gzip压缩
	},
}
