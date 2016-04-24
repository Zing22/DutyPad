var app = angular.module('DutyPad', ['ng']);

$(document).ready(function() {
	$("input[name='username']").focus();
	// login begin
	$("#login-btn").click(function(event) {
		var usr = $("input[name='username']").val(),
			pwd = $("input[name='password']").val();
		if(!usr) {
			swal({
				title: "啊噢",
				text: "学号不能为空",
				type: "warning",
				confirmButtonText: "好"
			},
			function(){
				$("input[name='username']").focus();
			});
			return false;
		} else if(!pwd) {
			swal({
				title: "啊噢",
				text: "密码不能为空",
				type: "warning",
				confirmButtonText: "好"
			},
			function(){
				$("input[name='password']").focus();
			});
			return false;
		}
		var param = {
			"username": usr,
			"password": pwd
		}
		var str = $.param(param);
		$.post("http://127.0.0.1:5000/test", str, function(data){
			data = {
				"code": 0
			}
			if(data.code){
				swal({
					title: "啊噢",
					text: data.error,
					type: "error",
					confirmButtonText: "好"
				});
				return false;
			} else {
				location.href = "./pad.html";
			}
		}).fail(failFor500);
	})
	// login end

})


var getNowDateStr = function() {
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	return month + "月" + day + "日";
}

var getUserCheckDate = function(d) {
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	return year + "-" + month + "-" + day;
}

$("#SideBar").click(function() {
	$('.ui.labeled.icon.sidebar').not('.styled').sidebar('toggle');
});

$("#SideBar").mouseover(function() {
	$('.ui.labeled.icon.sidebar').not('.styled').sidebar('show');
});


// global functions
var failFor500 = function() {
	swal({
		title: "爆炸了",
		text: "后台服务器炸了，请尽快联系技术人员",
		type: "error",
		confirmButtonText: "好"
	});
}
