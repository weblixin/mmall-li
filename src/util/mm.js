"use strict";
const Hogan = require('hogan.js');
const conf = {
	serverHost: ''
}
const _mm = {
	request: function(param) {
		let _this = this
		$.ajax({
			type: param.method || 'get',
			url: param.url || '',
			dataType: param.type || 'json',
			data: param.data || '',
			success: function(res) {
				// 请求成功
				if (res.status == 0) {
					typeof param.success === 'function' && param.success(res.data, res.msg)
				} 
				// 没有登录状态，强制登录
				else if (res.status == 10) {
					_this.doLogin()
				}
				// 请求数据错误
				else if (res.status == 1) {
					typeof param.error === 'function' && param.error(res.msg)
				}
			},
			error: function(err) {
				typeof param.error === 'function' && param.error(err.statusText)
			}
		});
	},
	// 获取服务器地址
	getServerUrl: function(path) {
		return conf.serverHost + path
	},
	// 获取url参数
	getUrlParam: function(name) {
		// happymmall.com/product/list?keyword=xxx&page=1
		var reg =new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null
	},
	// 渲染html
	renderHtml: function(htmlTemplate, data) {
		var template = Hogan.compile(htmlTemplate)
		var result = template.render(data);
        return result;
	},
	// 成功提示
	successTips: function(msg) {
		alert(msg || '操作成功')
	},
	// 错误提示
	errorTips: function(msg) {
		alert(msg || '哪里不对了~~~')
	},
	// 字段的验证，支持非空、手机邮箱判断
	validate: function(value, type) {
		var value = $.trim(value);
		// 非空验证
		if (type === 'require') {
			return !!value
		}
		//手机号验证
		if (type === 'phone') {
			return /^1\d{10}$/.test(value)
		}
		// 邮箱验证
		if (type === 'email') {
			return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)
		}
	},
	// 统一登录处理
	doLogin: function () {
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)
	},
	// 跳回主页
	goHome: function() {
		window.location.href = './index.html'
	}
}

module.exports = _mm;
