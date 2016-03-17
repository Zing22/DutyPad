app.controller('MainController', function($scope) {
	$scope.message = "This is angular.";
});

app.controller('PadController', function($scope) {
	$scope.message = "This is pad";
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
	$scope.showSidebar = function(room) {
		$('.ui.labeled.icon.sidebar').not('.styled').sidebar('toggle');
	}
	
	// check duty record
	$scope.setBeginDay = function() {
		$("#setBeginDayModal").modal('show');
	}
	$scope.alertDate = function() {
		alert($scope.checkBeginDate);
	}
})