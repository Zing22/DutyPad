app.controller('MainController', function($scope) {
	$scope.message = "This is angular.";
});

// pad记录是否要高亮。
app.filter('padHighlight', function() {
	return function(isImportant) {
		if (isImportant) {
			return "warning";
		} else {
			return "";
		}
	}
});

// 填充空字符串
app.filter('isEmpty', function() {
	return function(str) {
		if (str.length) {
			return str;
		} else {
			return "无";
		}
	}
})

app.controller('PadController', function($scope) {
	$scope.perWorth = 12; // 每小时12元
	$scope.nowPad = 0; // 现在是第几个选项卡
	$scope.nowRoom = "B400"; // 正在看哪个本子

	// 读取本人当月工时
	$scope.nowTimes = 0;
	$scope.accTimes = 0;
	$.get("http://127.0.0.1:5000/test", "", function(data) {
		$scope.nowTimes = 36;
		$scope.accTimes = 4;
		$scope.$apply();
		$("#my-progress").progress({
			value: $scope.nowTimes
		})
		$("body").fadeIn();
	});

	// 读取待办事项
	$scope.todoList = [{
		"room": "B401",
		"date": "2016/03/01",
		"text": "教师机坏了，需要修理。",
		"author": "紫薇",
		"id": 0
	}];
	$.get("http://127.0.0.1:5000/test", "", function(data) {
		$scope.todoList = [{
			"room": "B401",
			"date": "2016/03/01",
			"text": "教师机坏了，需要修理。",
			"author": "紫薇",
			"id": 0
		}, {
			"room": "B403",
			"date": "2016/04/15",
			"text": "有好多好多人在实验室里吃东西，把键盘弄坏了，需要更换",
			"author": "紫薇",
			"id": 1
		}];
		$scope.$apply();
		$.get("http://127.0.0.1:5000/test", "", function(data) {
			$scope.nowTimes = 36;
			$scope.accTimes = 4;
			$scope.$apply();
			$("#my-progress").progress({
				value: $scope.nowTimes
			})
			$("body").fadeIn();
		});
	})

	// 解决了待办事项 , id需要获取。
	$scope.nowFixing = -1; // 正在解决哪个待办事项
	$scope.showFixModal = function(id) {
		$scope.nowFixing = id;
		$("#fixTaskModal").modal("show");
	}
	$scope.fixNeedTo = function() { // 确定解决
		var params = {
			"id": $scope.nowFixing,
			"text": $("#fix-note").val()
		}
		var str = $.param(params);
		$.post("http://127.0.0.1:5000/test", str, function(data) {
			swal({
				title: "成功解决",
				text: "人品值 +1",
				type: "success",
				confirmButtonText: "确定"
			});
		});
	}

	// 查看本子

	// 加载本子 每个本子（401~404）都有不同的变量储存，防止重复加载
	$scope.PadList401 = []; // 储存已经加载到的列表
	$scope.checkBeginDate401 = new Date(); // 加载本子的起始日期
	$scope.padBeginNumber401 = 0; // 已经加载了多少天的记录了
	$('#addMore1').click(function() {
		var btn = $(this);
		btn.addClass("loading");
		var params = {
			"beginDate": $scope.checkBeginDate401,
			"room": "B401",
			"beginNumber": $scope.padBeginNumber401
		}
		var str = $.param(params);
		$.post("http://127.0.0.1:5000/test", str, function(data) {
			$scope.padBeginNumber401 += 2;
			$scope.PadList401 = $scope.PadList401.concat([{
				"date": "2016/04/23",
				"beginTime": "13:30:00",
				"times": 4.5,
				"endTime": "17:00:03",
				"name": "LittleBin",
				"note": "Good day",
				"needTo": "",
				"isImportant": 0
			},
			{
				"date": "2016/04/23",
				"beginTime": "13:30:00",
				"times": 4.5,
				"endTime": "17:00:03",
				"name": "LittleBin",
				"note": "",
				"needTo": "教师机炸了",
				"isImportant": 1
			}]);
			$scope.$apply();
			btn.removeClass("loading");
		});
	}); // 401 end
	// 402 ~ 404 还没复制粘贴

	$scope.changePad = function(NO) { // 切换选项卡
		$scope.nowPad = NO;
		if (NO == 1 && $scope.PadList401.length == 0) { // 第一次切换到本子会自动加载一次
			$("#addMore1").click();
		}
	}

	// 新的签到
	$scope.room = "B400"; // 签到房间号。
	$scope.newRecordShow = function(room) {
		$scope.room = room;
		$("#newRecord-beginTime").val('00:00');
		$("#newRecord-endTime").val('00:00');
		$("#newDutyModal").modal('show');
	}
	$scope.sendNewRecord = function() {
		// 检查时间 开始
		var begT = $("#newRecord-beginTime").val();
		var endT = $("#newRecord-endTime").val();

		var stt = new Date("May 1, 2015 " + begT);
		stt = stt.getTime();

		var endt = new Date("May 1, 2015 " + endT);
		endt = endt.getTime();

		if (stt >= endt) {
			swal({
				title: "时间有点不对劲噢~",
				text: "再试试呗？",
				type: "error",
				confirmButtonText: "确定"
			});
			return;
		}
		// 检查时间 结束
		var params = {
			"beginTime": $("#newRecord-beginTime").val(),
			"endTime": $("#newRecord-endTime").val(),
			"isOverWork": $("#newRecord-overWork").is(':checked'),
			"note": $("#newRecord-note").val(),
			"needTo": $("#newRecord-needTo").val(),
			"isImportant": $("#newRecord-important").is(':checked'),
			"room": $scope.room
		};
		var str = $.param(params);
		$.post("http://127.0.0.1:5000/test", str, function() {
			swal({
				title: "签到成功",
				text: "记得关灯关窗关电脑噢！",
				type: "success",
				confirmButtonText: "确定"
			});
		})
	}
	$scope.nowDate = getNowDateStr();

	// 查看本子
	$scope.setBeginDayShow = function() { // 重设开始的日期，需要清空原有的。
		if ($scope.nowPad == 1) {
			$scope.checkBeginDateShow = $scope.checkBeginDate401;
		}
		$scope.checkBeginDate = $scope.checkBeginDateShow;
		$("#setBeginDayModal").modal('show');
	}
	$scope.setBeginDay = function() {
		if ($scope.nowPad == 1) {
			$scope.checkBeginDate401 = $scope.checkBeginDate;
			$scope.PadList401 = [];
			$scope.padBeginNumber401 = 0;
			$('#addMore1').click(); // 重新加载401的签到记录
		}
		swal({
			title: "成功！",
			text: $scope.checkBeginDate401,
			type: "success",
			confirmButtonText: "确定"
		});
	}

	$scope.Math = window.Math;
});

app.controller('TimesController', function($scope) {
	// pages ctrl
	$scope.pad0 = true;

	// process bar
	$scope.nowTimes = 25.3;
	$scope.accTimes = 12.3;
	$scope.perWorth = 12.00;

	// check history
	$scope.nowDate = getNowDateStr();
	$scope.checkBeginDate = new Date();
	$scope.checkBeginDateStr = getCheckInitStr($scope.checkBeginDate);

	// check duty record
	$scope.setBeginDay = function() {
		$("#setBeginDayModal").modal('show');
	}
	$scope.alertDate = function() {
		alert($scope.checkBeginDate);
	}
});

app.controller('ManageController', function($scope) {
	// pads
	$scope.nowPad0 = 1;

	// pad0
	$scope.nowName = "李煜政";

	// check history
	$scope.nowDate = getNowDateStr();
	$scope.checkBeginDate = new Date();
	$scope.checkBeginDateStr = getCheckInitStr($scope.checkBeginDate);

	// check duty record
	$scope.NewRecord = function() {
		$("#setNewRecord").modal('show');
	}

	$scope.NewDeadTable = function() {
		$("#setNewDeadTable").modal('show');
	}

	$scope.UndoDeadTable = function() {
		isNewest = 0; // check from server
		UndoErrorMsg = "";
		if (isNewest == 0) { // OK
			$("#undoDeadTableModal").modal('show');
		} else if (isNewest == 1) { // NOT BOSS
			UndoErrorMsg = "只有BOSS才能撤销噢..."
			$("#undoTableErrorModal").modal('show');
		} else if (isNewest == 2) { // NOT NEWEST
			UndoErrorMsg = "只能撤销最新的一张表噢..."
			$("#undoTableErrorModal").modal('show');
		}
	}

	$scope.HisTableTitle = "2016年3月工时统计表";
});