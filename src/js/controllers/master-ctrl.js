angular.module('RDash').controller('MasterCtrl', ['$scope', '$cookieStore', 'apiRequest', function($scope, $cookieStore, apiRequest) {
  //navbar management.
  var mobileView = 992;
 
  //datepicker variables
  $scope.format = 'dd/MM/yyyy';
  $scope.begPopup = { opened: false };
  $scope.endPopup = { opened: false };
  $scope.date = {};

  $scope.getWidth = function() {
      return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
    if (newValue >= mobileView) {
      if (angular.isDefined($cookieStore.get('toggle'))) {
        $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
      } else {
        $scope.toggle = false;
      }
    } else {
      $scope.toggle = false;
    }
  });

  $scope.toggleSidebar = function() {
    $scope.toggle = !$scope.toggle;
    $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
    $scope.$apply();
  };

  $scope.today = function() {
    $scope.date.begDate = new Date();
    $scope.date.endDate = new Date();
  };

  $scope.today();

  $scope.dateOptions = {
    showWeeks: false
  };

  $scope.open = function(popup) {
    if (popup == 'beginning') $scope.begPopup.opened = true;
    else $scope.endPopup.opened = true;
  }

  $scope.setPeriod = function(period) {
    $scope.period  = period;
    $scope.date.begDate = new Date(moment().subtract(1, period).format());
    $scope.date.endDate = new Date(moment().format());
  };

  $scope.unsetButtons = function() {
    $scope.period = null;
  }

}]);
