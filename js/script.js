var app = angular.module('DutyPad', ['ng']);

//var initPer = function iper(per) {
//	setTimeout(function() {
//		$('#my-progress').progress('increment');
//		if (per < 72) {
//			iper(per + 1);
//		}
//	}, 300);
//};

// test!
$('#addMore1').click(function() {
	$(this).addClass("loading");
});

var getNowDateStr = function() {
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	return month + "月" + day + "日";
}

var getCheckInitStr = function(d) {
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	return year + "年" + month + "月" + day + "日";
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