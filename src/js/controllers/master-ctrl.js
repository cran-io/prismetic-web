angular.module('RDash').controller('MasterCtrl', ['$scope', '$cookieStore', 'apiRequest', function($scope, $cookieStore, apiRequest) {
  var mobileView = 992;

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
    $scope.begDate = new Date();
    $scope.endDate = new Date();
  };

  $scope.today();

  $scope.dateOptions = {
    showWeeks: false,
  };

  $scope.open = function(popup) {
    if (popup == 'beginning') $scope.begPopup.opened = true;
    else $scope.endPopup.opened = true;
  }

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.format = 'dd/MM/yyyy';

  $scope.begPopup = {
    opened: false
  };

  $scope.endPopup = {
    opened: false
  };
}]);
