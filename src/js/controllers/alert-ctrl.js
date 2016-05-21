angular.module('Prismetic').controller('AlertsCtrl', ['$scope', function($scope) {
  $scope.alerts = [];

  $scope.addAlert = function() {
      $scope.alerts.push({
          msg: 'Another alert!'
      });
  };

  $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
  };
}]);

