var app = angular.module('DutyPad', ['ng']);

$(document).ready(function() {
	// login begin
	$("#login-btn").click(function(event) {
		var param = {
			"username": $("input[name='username']").val(),
			"password": $("input[name='password']").val()
		}
		var str = $.param(param);
		$.post("http://127.0.0.1:5000/test", str, function(data){
			console.log(data);
		})
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