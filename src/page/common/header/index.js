"use strict";
require('./index.css')
var _mm = require('util/mm.js')
// 通用页面头部
var header = {
	init: function() {
		this.bindEvent();
	},
	onLoad:function() {
		var keyword = _mm.getUrlParam("keyword");
		if (keyword) {
			$('#search-input').val(keyword)
		}
	},
	bindEvent: function() {
		var _this = this;
		// 点击搜索按钮后，做搜索提交
		$('#search-btn').click(function() {
			_this.searchSubmit()
		});
		// 输入回车后，做搜索提交
		$('#search-input').keyup(function(e) {
			if (e.keyCode == 13) {
				_this.searchSubmit()
			}
		})
	},
	searchSubmit: function() {
		var keyword = $("#search-input").val();
		// 如果有keyword，正常跳转到list页
		if(keyword) {
			window.location.href = './list.html?keyword=' + keyword;
		}
		// keyword不存在,跳回主页
		else {
			_mm.goHome()
		}
	}
}
header.init()