"use strict";
require('./index.css')
require('page/common/nav-simple/index.js')
var _user = require('service/user-service.js')
var _mm = require('util/mm.js')

// 表单里的错误提示
var formError = {
	show: function(errMsg) {
		$('.error-item').show().find('.err-msg').text(errMsg)
	},
	hide: function() {
		$('.error-item').hide().find('.err-msg').text('')
	}
}

var page= {
	data: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},
	init: function() {
		this.onLoad()
		this.bindEvent()
	},
	onLoad: function() {
		this.loadStepUsername()
	},
	bindEvent: function() {
		var _this = this;
		// 输入用户名下一步按钮点击
		$('#submit-username').click(function() {
			var username = $.trim($("#username").val());
			if(username) {
				_user.getQuestion(username, function(res) {
					_this.data.username = username
					_this.data.question = res
					_this.loadStepQuestion()
				}, function(errMsg) {
					formError.show(errMsg)
				})
			}

		})
		// 输入密码提示问题答案下一步按钮点击
		$('#submit-question').click(function() {
			var answer = $.trim($("#answer").val());
			if(answer) {
				_user.checkAnswer({
					username: _this.data.username,
					question: _this.data.question,
					answer: answer
				}, function(res) {
					_this.data.answer = answer
					_this.data.token = res
					_this.loadStepPassword()
				}, function(errMsg) {
					formError.show(errMsg)
				})
			} else {
				formError.show('请输入密码提示问题答案')
			}
		})
		// 输入新密码下一步按钮点击
		$('#submit-password').click(function() {
			var password = $.trim($("#password").val());
			if(password && password.length >= 6) {
				_user.resetPassword({
					username: _this.data.username,
					passwordNew: password,
					forgetToken: _this.data.token
				}, function(res) {
					window.location.href = './result.html?type=pass-reset'
				}, function(errMsg) {
					formError.show(errMsg)
				})
			} else {
				formError.show('请输入不少于6位的新密码')
			}
		})
		$('.user-content').keyup(function(e) {
			if(e.keyCode == 13) {
				_this.submit()
			}
		})
	},
	// 加载用户名
	loadStepUsername: function() {
		$('.step-username').show()
	},
	// 加载密码提示问题
	loadStepQuestion: function() {
		// 清楚错误提示
		formError.hide()
		// 做容器的切换
		$('.step-username').hide().siblings('.step-question').show().find(".question").text(this.data.question)
	},
	// 加载新密码
	loadStepPassword: function() {
		// 清楚错误提示
		formError.hide()
		// 做容器的切换
		$('.step-question').hide().siblings('.step-password').show()
	},
	// 提交表单
	submit:function() {
	}
}

$(function() {
	page.init()
})
