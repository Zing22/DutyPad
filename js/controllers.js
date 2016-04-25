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

// 设置行颜色，0表示无色，1表示绿色，-1表示红色
// 用于管理员查看个人签到记录里的 奖惩记录
app.filter('setColor', function() {
	return function(color) {
		if (color == 1) {
			return "positive";
		} else if (color == -1) {
			return "error";
		} else {
			return "";
		}
	}
})

app.controller('PadController', function($scope) {
	// 常量
	$scope.perWorth = 12; // 每小时12元
	$scope.offsetSept = 7; // 每次加载多少天
	// 翻页
	$scope.nowPad = 0; // 现在是第几个选项卡
	$scope.nowRoom = "B400"; // 正在看哪个本子

	// 读取本人当月工时
	$scope.nowTimes = 0;
	$scope.accTimes = 0;
	$.get("http://127.0.0.1:5000/test", "", function(data) {
		checkTimeout(data);
		$scope.nowTimes = 61;
		$scope.accTimes = 4;
		$scope.$apply();
		$("#my-progress").progress({
			value: $scope.nowTimes,
			total: Math.max(40, $scope.nowTimes),
			label: 'ratio',
			text: {
				ratio: '{value} / {total}'
			}
		})
	}, "json").fail(failFor500);

	// 读取待办事项
	$scope.todoList = [];
	$.get("http://127.0.0.1:5000/test", "", function(data) {
		checkTimeout(data);
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
	}, "json").fail(failFor500);

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
		}, "json").fail(failFor500);
	}

	// 查看本子

	// 加载本子 每个本子（401~404）都有不同的变量储存，防止重复加载
	$scope.PadList401 = []; // 储存已经加载到的列表
	$scope.checkBeginDate401 = new Date(); // 加载本子的起始日期
	$scope.padBeginNumber401 = 0; // 已经加载了多少天的记录了
	$('#addMore401').click(function() {
		var btn = $(this);
		btn.addClass("loading");
		var params = {
			"beginDate": $scope.checkBeginDate401,
			"room": "B401",
			"beginNumber": $scope.padBeginNumber401
		}
		var str = $.param(params);
		$.post("http://127.0.0.1:5000/test", str, function(data) {
			$scope.padBeginNumber401 += $scope.offsetSept;
			$scope.PadList401 = $scope.PadList401.concat([{
				"date": "2016/04/23",
				"beginTime": "13:30:00",
				"times": 4.5,
				"endTime": "17:00:03",
				"name": "LittleBin",
				"note": "Good day",
				"needTo": "",
				"isImportant": 0
			}, {
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
		}, "json").fail(failFor500);
	}); // 401 end
	
	
	$scope.PadList402 = []; // 储存已经加载到的列表
	$scope.checkBeginDate402 = new Date(); // 加载本子的起始日期
	$scope.padBeginNumber402 = 0; // 已经加载了多少天的记录了
	$('#addMore402').click(function() {
		var btn = $(this);
		btn.addClass("loading");
		var params = {
			"beginDate": $scope.checkBeginDate402,
			"room": "B402",
			"beginNumber": $scope.padBeginNumber402
		}
		var str = $.param(params);
		$.post("http://127.0.0.1:5000/test", str, function(data) {
			$scope.padBeginNumber402 += $scope.offsetSept;
			$scope.PadList402 = $scope.PadList402.concat([{
				"date": "2016/04/23",
				"beginTime": "13:30:00",
				"times": 4.5,
				"endTime": "17:00:03",
				"name": "LittleBin",
				"note": "Good day",
				"needTo": "",
				"isImportant": 0
			}, {
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
		}, "json").fail(failFor500);
	}); // 402 end
	
	$scope.PadList403 = []; // 储存已经加载到的列表
	$scope.checkBeginDate403 = new Date(); // 加载本子的起始日期
	$scope.padBeginNumber403 = 0; // 已经加载了多少天的记录了
	$('#addMore403').click(function() {
		var btn = $(this);
		btn.addClass("loading");
		var params = {
			"beginDate": $scope.checkBeginDate403,
			"room": "B403",
			"beginNumber": $scope.padBeginNumber403
		}
		var str = $.param(params);
		$.post("http://127.0.0.1:5000/test", str, function(data) {
			$scope.padBeginNumber403 += $scope.offsetSept;
			$scope.PadList403 = $scope.PadList403.concat([{
				"date": "2016/04/23",
				"beginTime": "13:30:00",
				"times": 4.5,
				"endTime": "17:00:03",
				"name": "LittleBin",
				"note": "Good day",
				"needTo": "",
				"isImportant": 0
			}, {
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
		}, "json").fail(failFor500);
	}); // 403 end

	// 奖惩记录
	$scope.PadList404 = []; // 储存已经加载到的列表
	$scope.checkBeginDate404 = new Date(); // 加载本子的起始日期
	$scope.padBeginNumber404 = 0; // 已经加载了多少天的记录了
	$('#addMore404').click(function() {
		var btn = $(this);
		btn.addClass("loading");
		var params = {
			"beginDate": $scope.checkBeginDate404,
			"room": "B404",
			"beginNumber": $scope.padBeginNumber404
		}
		var str = $.param(params);
		$.post("http://127.0.0.1:5000/test", str, function(data) {
			$scope.padBeginNumber404 += 2;
			$scope.PadList404 = $scope.PadList404.concat([{
				"date": "2016/04/23",
				"times": 4.5,
				"name": "LittleBin",
				"note": "Good day",
				"isImportant": 0
			}, {
				"date": "2016/04/23",
				"times": -2.5,
				"name": "LittleBin",
				"note": "",
				"isImportant": 1
			}]);
			$scope.$apply();
			btn.removeClass("loading");
		}, "json").fail(failFor500);
	});

	// 设置起始日期
	$scope.setBeginDayShow = function() { // 重设开始的日期，需要清空原有的。
		if ($scope.nowPad == 1) {
			$scope.checkBeginDateShow = $scope.checkBeginDate401;
		}
		if ($scope.nowPad == 2) {
			$scope.checkBeginDateShow = $scope.checkBeginDate402;
		}
		if ($scope.nowPad == 3) {
			$scope.checkBeginDateShow = $scope.checkBeginDate403;
		}
		$scope.checkBeginDate = $scope.checkBeginDateShow;
		$("#setBeginDayModal").modal('show');
	}
	$scope.setBeginDay = function() {
		if ($scope.nowPad == 1) {
			$scope.checkBeginDate401 = new Date($scope.checkBeginDate);
			$scope.PadList401 = [];
			$scope.padBeginNumber401 = 0;
			$('#addMore401').click(); // 重新加载401的签到记录
		}
		if ($scope.nowPad == 2) {
			$scope.checkBeginDate402 = new Date($scope.checkBeginDate);
			$scope.PadList402 = [];
			$scope.padBeginNumber402 = 0;
			$('#addMore402').click(); // 重新加载402的签到记录
		}
		if ($scope.nowPad == 3) {
			$scope.checkBeginDate403 = new Date($scope.checkBeginDate);
			$scope.PadList403 = [];
			$scope.padBeginNumber403 = 0;
			$('#addMore403').click(); // 重新加载403的签到记录
		}
		if ($scope.nowPad == 4) {
			$scope.checkBeginDate404 = new Date($scope.checkBeginDate);
			$scope.PadList404 = [];
			$scope.padBeginNumber404 = 0;
			$('#addMore404').click(); // 重新加载奖惩记录
		}
		swal({
			title: "成功",
			type: "success",
			confirmButtonText: "确定"
		});
	}

	$scope.changePad = function(NO) { // 切换选项卡
		$scope.nowPad = NO;
		if (NO == 1 && $scope.PadList401.length == 0) { // 第一次切换到本子会自动加载一次
			$("#addMore401").click();
		} else if (NO == 2 && $scope.PadList402.length == 0) {
			$("#addMore402").click();
		} else if (NO == 3 && $scope.PadList403.length == 0) {
			$("#addMore403").click();
		} else if (NO == 4 && $scope.PadList404.length == 0) {
			$("#addMore404").click();
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
			
			// 刷新当前页面，重新加载值班本子
			$scope.checkBeginDate = new Date();
			$scope.setBeginDay();
			$("#newRecord-note").val("");
			$("#newRecord-needTo").val("");
			
		}, "json").fail(failFor500);
	}
	$scope.nowDate = getNowDateStr();

	// 查看本子
	
	// 通讯录
	$scope.contacts = [];
	$.get("http://127.0.0.1:5000/test", "", function(){
		checkTimeout(data);
		$scope.contacts = [{
			"name": "渔政",
			"sid": "14348060",
			"phone" : "15521149494",
			", ": "",
			"email": "233@qq.com"
		}];
		$scope.$apply();
	}, "json").fail(failFor500);

	$scope.Math = window.Math;
});
////// 首页结束
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
////// 工时页开始！
app.controller('TimesController', function($scope, $filter) {
	// 显示第几页
	$scope.nowPad = 0;
	$scope.changePad = function(NO) { // 切换选项卡
		$scope.nowPad = NO;
	}

	// 个人工时
	$scope.perWorth = 12;
	$scope.nowTimes = 0;
	$scope.accTimes = 0;
	$.get("http://127.0.0.1:5000/test", "", function(data) {
		checkTimeout(data);
		$scope.nowTimes = 31.3;
		$scope.accTimes = 4;
		$scope.$apply();
		$("#my-progress").progress({
			value: $scope.nowTimes,
			total: Math.max(40, $scope.nowTimes),
			label: 'ratio',
			text: {
				ratio: '{value} / {total}'
			}
		})
	}, "json").fail(failFor500);

	// 查看个人工时记录
	$scope.PadList = []; // 储存已经加载到的列表
	$scope.checkBeginDate = new Date(); // 加载本子的起始日期
	$scope.padBeginNumber = 0; // 已经加载了多少天的记录了
	$('#addMore').click(function() {
		var btn = $(this);
		btn.addClass("loading");
		var params = {
			"beginDate": $scope.checkBeginDate,
			"beginNumber": $scope.padBeginNumber
		}
		var str = $.param(params);
		$.post("http://127.0.0.1:5000/test", str, function(data) {
			$scope.padBeginNumber += 2;
			$scope.PadList = $scope.PadList.concat([{ // no names
				"date": "2016/04/23",
				"beginTime": "13:30:00",
				"times": 4.5,
				"endTime": "17:00:03",
				"note": "Good day",
				"needTo": "",
				"isImportant": 0
			}, {
				"date": "2016/04/23",
				"beginTime": "13:30:00",
				"times": 4.5,
				"endTime": "17:00:03",
				"note": "",
				"needTo": "教师机炸了",
				"isImportant": 1
			}]);
			$scope.$apply();
			btn.removeClass("loading");
		}, "json").fail(failFor500);
	});

	// 更改起始日期
	$scope.setBeginDayShow = function() { // 重设开始的日期，需要清空原有的。
		$scope.checkBeginDateShow = $scope.checkBeginDate;
		$scope.checkBeginDateModify = $scope.checkBeginDateShow;
		$("#setBeginDayModal").modal('show');
	}
	$scope.setBeginDay = function() {
		$scope.checkBeginDate = $scope.checkBeginDateModify;
		$scope.PadList = [];
		$scope.padBeginNumber = 0;
		$('#addMore').click(); // 重新加载401的签到记录
		swal({
			title: "成功",
			text: $scope.checkBeginDateModify,
			type: "success",
			confirmButtonText: "确定"
		});
	}

	// 查看本月工时
	$scope.MonthList = [];
	$.get("http://127.0.0.1:5000/test", "", function() {
		checkTimeout(data);
		$scope.MonthList = [{
			"name": "小彬",
			"times": 34,
			"last": 12
		}, {
			"name": "紫薇",
			"times": 67.2,
			"last": 123
		}, {
			"name": "渔政",
			"times": 37,
			"last": 38.8
		}];
		$scope.$apply();
		$(".month-row").each(function(n, el) {
			var pro = $($(el).find(".indicating.progress"));
			var times = pro.attr('data-value');
			pro.progress({
				value: times,
				total: Math.max(40, times),
				label: 'ratio',
				text: {
					ratio: '{value} / {total}'
				}
			});
			//			console.log(times);
		});
	}, "json").fail(failFor500);

	// 查看历史工时
	$scope.historyList = {
		"0": "请选择表格"
	}; // 所有的死表列表
	$scope.nowHistoryTable = []; // 目前在查看的死表
	$scope.checkHistory = ""; // 绑定为select的值
	$.get("http://127.0.0.1:5000/test", "", function(data) { // 获取列表
		checkTimeout(data);
		$scope.historyList = {
			"1": "2016/03工时统计",
			"2": "2016/04工时统计"
		}; // 获得待选列表
		$scope.$apply();
	}, "json").fail(failFor500);

	$scope.getHistoryTable = function() {
		var params = {
			"id": $scope.checkHistory
		}
		var str = $.param(params);
		$.get("http://127.0.0.1:5000/test", str, function(data) {
			checkTimeout(data);
			$scope.nowHistoryTable = [{
				"name": "李一正",
				"sid": "14348888",
				"times": 47,
				"last": 24,
				"willGet": 40,
				"willLast": 31,
				"note": "帮忙搬东西 +3; FFC比赛加班 +12; 无故缺勤 -2; 维修小分队 +40"
			}, {
				"name": "李二正",
				"sid": "14342288",
				"times": 23,
				"last": 121,
				"willGet": 40,
				"willLast": 104,
				"note": "FFC比赛加班 +12"
			}]
			$scope.$apply();
		}, "json").fail(failFor500);
	}

	$scope.Math = window.Math;
});
/////////////////////////////////////////////

/////////////////////////////////////////////
///////// 管理页面
app.controller('ManageController', function($scope) {
	// 显示第几页
	$scope.nowPad = 0;
	$scope.changePad = function(NO) { // 切换选项卡
		$scope.nowPad = NO;
	}

	// 查看个人记录
	$scope.nowWho = "0";
	$scope.nameList = {
		"0": "请先选择助理"
	};
	$scope.personalRecord = [];

	$.get("http://127.0.0.1:5000/test", "", function(data) {
		checkTimeout(data);
		$scope.nameList = {
			"1": "李煜政",
			"2": "赖子威",
			"3": "高山"
		}
		$scope.$apply();
	}, "json").fail(failFor500);

	$scope.selectPerson = function() {
		var params = {
			"id": $scope.nowWho
		}
		var str = $.param(params);
		$.get("http://127.0.0.1:5000/test", str, function(data) {
			checkTimeout(data);
			$scope.personalRecord = [{
				"date": "4-14",
				"beginTime": "13:30:23",
				"endTime": "17:00:03",
				"room": "B403",
				"times": 5,
				"note": "",
				"needTo": "",
				"color": 0
			}, {
				"date": "4-14",
				"beginTime": "13:30:23",
				"endTime": "17:00:03",
				"room": "B403",
				"times": 5,
				"note": "",
				"needTo": "",
				"color": 1
			}, {
				"date": "4-14",
				"beginTime": "13:30:23",
				"endTime": "17:00:03",
				"room": "B403",
				"times": 5,
				"note": "",
				"needTo": "",
				"color": 0
			}, {
				"date": "4-14",
				"beginTime": "13:30:23",
				"endTime": "17:00:03",
				"room": "B403",
				"times": -2,
				"note": "",
				"needTo": "",
				"color": -1
			}];
			$scope.$apply();
		}, "json").fail(failFor500);
	}

	// check duty record
	$scope.NewRecord = function() {
		if($scope.nowWho === "0") {
			swal({
				title: "请先选择助理",
				type : "info",
				confirmButtonText : "好"
			});
			return false;
		};
		$("#setNewRecord").modal('show');
	}

	// 获取本月工时表
	$scope.thisMonthAll = [];
	$.get("http://127.0.0.1:5000/test", "abc=233", function(data) {
		checkTimeout(data);
		$scope.thisMonthAll = [{
			"name": "小彬",
			"sid": "14348079",
			"times": 32,
			"last": 67,
			"willGet": 40,
			"willLast": 59,
			"note": "FFC比赛加班 +12"
		}]
		$scope.$apply();
	}, "json").fail(failFor500);

	// 显示确定死表的框
	$scope.NewDeadTable = function() {
		$("#setNewDeadTable").modal('show');
	}

	// 发送 确定新建死表
	$scope.setNewHistory = function() {
		var params = {
			"title": $("#setHis-title").val()
		}
		var str = $.param(params);
		$.post("http://127.0.0.1:5000/test", str, function(data) {
			swal({
				title: "统计成功",
				text: "大伙都等着发工资呐",
				type: "success",
				confirmButtonText: "确定"
			});
		}, "json").fail(failFor500);
	}

	// 助理管理
	$scope.newUser = {};
	$scope.newUser_check = function() {
		if (!($scope.newUser.sid && $scope.newUser.name && $scope.newUser.password && $scope.newUser.email && $scope.newUser.phone && $scope.newUser.cornet &&
				$scope.newUser.bankcard && $scope.newUser.power)) {
			swal({
				title: "失败了",
				text: "还有些信息没填呢",
				type: "error",
				confirmButtonText: "好吧"
			});
			return false;
		};

		// 开始构造
		var params = {
			"sid": $scope.newUser.sid,
			"name": $scope.newUser.name,
			"password": $scope.newUser.password,
			"email": $scope.newUser.email,
			"phone": $scope.newUser.phone,
			"cornet": $scope.newUser.cornet,
			"bankcard": $scope.newUser.bankcard,
			"power": $scope.newUser.power
		}
		var str = $.param(params);
		$.post("http://127.0.0.1:5000/test", str, function(data) {
			swal({
				title: "新增成功",
				text: "快教TA用本系统吧~",
				type: "success",
				confirmButtonText: "确定"
			});
		}, "json").fail(failFor500);
	};

	// 查看、修改用户信息
	$scope.User = {};
	$scope.User_nowWho = "0"; // 下拉框选择了哪个助理
	auth = ["无", "助理", "管理员", "老大"]; // 下标对应着不同的权限数字
	$scope.User_selectPerson = function() {
		var params = {
			"sid": $scope.User_nowWho
		}
		var str = $.param(params);
		console.log(str);
		$.get("http://127.0.0.1:5000/test", str, function(data) {
			checkTimeout(data);
			$scope.User.sid = "14348079"; // 学号，用于登陆
			$scope.User.name = "大斌"; // 姓名
			$scope.User.password = "123456"; // 密码
			$scope.User.email = "123456@qq.com"; // 邮箱
			$scope.User.phone = "18819251234"; // 手机长号
			$scope.User.cornet = "209876"; // 短号
			$scope.User.bankcard = "3213312312312312312"; // 银行卡
			$scope.User.power = 2; // 权限（身份）
			$("#User-select").dropdown('set selected', auth[$scope.User.power]);
			$scope.$apply();
		}, "json").fail(failFor500);
	}
	$scope.User_check = function() {
		if (!($scope.User.sid && $scope.User.name && $scope.User.pwd && $scope.User.email && $scope.User.phone && $scope.User.cornet &&
				$scope.User.bankcard && $scope.User.power)) {
			swal({
				title: "失败了",
				text: "还有些信息没填呢",
				type: "error",
				confirmButtonText: "好吧"
			});
			return false;
		};

		// 开始构造
		var params = {
			"sid": $scope.User.sid,
			"name": $scope.User.name,
			"password": $scope.User.password,
			"email": $scope.User.email,
			"phone": $scope.User.phone,
			"cornet": $scope.User.cornet,
			"bankcard": $scope.User.bankcard,
			"power": $scope.User.power
		}
		var str = $.param(params);
		$.post("http://127.0.0.1:5000/test", str, function(data) {
			swal({
				title: "修改成功",
				type: "success",
				confirmButtonText: "确定"
			});
		}, "json").fail(failFor500);
	}

	$scope.User_delete = function() {
		if ($scope.User_nowWho === "0") {
			swal({
				title: "请先选择一位助理",
				type : "info",
				confirmButtonText: "好"
			})
			return false;
		}
		swal({
			title: "警告",
			text: "真的要删除 "+$scope.User.name+" 吗？",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "删掉吧",
			cancelButtonText: "再想想",
			closeOnConfirm: false,
			closeOnCancel: false
		}, function(isConfirm) {
			if (isConfirm) {
				swal("删除啦", "这个助理消失啦", "success");
			} else {
				swal("取消啦", "取消成功！", "error");
			}
		});
	}

	$scope.HisTableTitle = "2016年3月工时统计表";
});