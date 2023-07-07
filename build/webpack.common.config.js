const path = require('path') // Node.js的路径模块
const HTMLWebpackPlugin = require('html-webpack-plugin') // Html模板插件，作用是将打包后的js、css文件加入到index.html中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MiniSvgDataURI = require('mini-svg-data-uri') // svg文件转为uri编码，会比base64编码体积更小

/**
 * 占位符（placeholders）介绍
 * [name]: 原来的文件名
 * [hash]: 散列值
 * [ext]: 文件后缀
 */

module.exports = {
	// 入口文件
	entry: './src/index.tsx', // 入口文件（简写模式），项目的入口文件，它的路径是相对于项目根路径的，所以此处我们写的是“./src”，而不是“../src”
	// 输出文件
	output: {
		path: path.resolve(__dirname, '../dist'), // 打包输出的路径，这里的路径针对的是当前目录，所以我们写成了"../dist"，而不是"./dist"
		filename: '[name]_[hash].js', // 打包输出文件的名称，后期可改成动态生成
		assetModuleFilename: 'assets/[name]_[hash][ext]', // 静态文件打包后的路径及文件名（默认走全局的，如果有独立的配置就按照自己独立的设置来）
		clean: true, // webpack 2.20.0+ 版本内置输出清除目录功能
	},
	optimization: {
    splitChunks: {
      chunks: 'all', // 同步或者异步
      minSize: 100, // 20k 如果模块大小小于这个值，则不分割
      minRemainingSize: 0, // 最小可保存大小，开发模式下为0，其他情况等于minSize，一般不用手动配置
      minChunks: 1, // 如果模块被引用次数小于这个值，则不会被分割
      maxAsyncRequests: 30, // 异步模块，一次最多被加载的次数
      maxInitialRequests: 30, // 入口模块最多被加载的次数
      enforceSizeThreshold: 50000, // 50k 强制分割的大小阈值
      // 缓存组
      cacheGroups: {
        // 打包第三方库
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // 正则匹配第三方库文件
          priority: -10, // 优先级
          reuseExistingChunk: true, // 如果一个模块被打包了，那么这个模块也不会被打包
          filename: 'vendors_[hash].js' // 打包后的文件名
        },
        // 打包公共模块
        default: {
          minChunks: 2, //被超过两个模块引用才会被打包
          priority:-20, // 优先级
          reuseExistingChunk: true, // 如果一个模块被打包了，那么这个模块也不会被打包
          filename: 'common_[hash].js' // 打包后的文件名
        }
      },
    },
	},
	// 模块
	module: {
		rules: [
			{
				test: /\.js/i,
				use: ['babel-loader'],
				include: path.join(__dirname, '../src'),
				exclude: /node_modules/,
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
				sideEffects: true,
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						},
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
				sideEffects: true,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						},
					},
					{
						loader: 'css-loader',
					},
					{ loader: 'sass-loader' },
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('autoprefixer')],
							},
						},
					},
				],
				sideEffects: true,
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
			// 图片文件
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
			// 数据文件
			{
				test: /\.(txt|xml)$/i,
				type: 'asset/source',
			},
		],
	},
	// 插件
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),
		new HTMLWebpackPlugin({
			// 实例化Html模板插件
			template: path.resolve(__dirname, '../index.html'),
		}),
	],
	resolve: {
		//resolve核心配置
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
		alias: {
			pages: path.join(__dirname, '../src/pages'),
			components: path.join(__dirname, '../src/components'),
			router: path.join(__dirname, '../src/router'),
			images: path.join(__dirname, '../src/assets/images'),
			actions: path.join(__dirname, '../src/redux/actions'),
			reducers: path.join(__dirname, '../src/redux/reducers'),
			utils: path.join(__dirname, '../src/utils'),
			types: path.join(__dirname, '../src/types'),
		},
	},
}
