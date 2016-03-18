app.controller('MainController', function($scope) {
	$scope.message = "This is angular.";
});

app.controller('PadController', function($scope) {
	$scope.nowTimes = 17;
	$scope.accTimes = 12;
	$scope.nowPad0 = 1;
	$scope.perWorth = 12;

	// new duty record
	$scope.room = "B404";

	$scope.setNewDuty = function(room) {
		$scope.room = room;
		$("#newDutyModal").modal('show');
	}
	$scope.nowDate = getNowDateStr();
	$scope.checkBeginDate = new Date();
	$scope.checkBeginDateStr = getCheckInitStr($scope.checkBeginDate);

	// sidebar


	// check duty record
	$scope.setBeginDay = function() {
		$("#setBeginDayModal").modal('show');
	}
	$scope.alertDate = function() {
		alert($scope.checkBeginDate);
	}
});


app.controller('TimesController', function($scope) {
	// pages ctrl
	$scope.item1 = true;
	
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


app.controller('DetailController', function($scope) {
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