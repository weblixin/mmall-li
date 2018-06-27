const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

// 环境变量配置  dev / online
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
console.log(WEBPACK_ENV)

// 获取HtmlWebpackPlugin参数的方法
const getHtmlConfig = function(name) {
	return {
		template: './src/view/'+ name +'.html',
		filename: 'view/'+ name +'.html',
		inject: true,
		hash: true,
		chunks: ['common', name]
	}
}

// webpack config
const config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'login': ['./src/page/login/index.js']
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist'
	},
	externals: {
		'jquery': 'window.jQuery'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		}, {
			test: /\.(gif|png|jpg|jpeg|woff|ttf|svg|eot)\??.*$/,
			loader: 'url-loader?limit=100&name=resource/[name].[ext]'
		}]
	},
	plugins: [
		// 独立通用模块到js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: "js/base.js"
		}),
		// 把css单独打包到文件里
		new ExtractTextPlugin("css/[name].css"),
		// html模板处理
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login'))
	]
};

if ('dev' == WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088')
}
module.exports = config;