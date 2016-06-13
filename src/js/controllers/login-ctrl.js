angular.module('Prismetic').controller('LoginCtrl', ['$scope', 'apiRequest', '$state', 'SessionService', 
  function($scope, apiRequest, $state, SessionService) {
  
  $scope.form = {};

  $scope.submit = function() {
    apiRequest.login($scope.form).then(function(data) {
      SessionService.setUser(data.data);
      $state.go('main.dashboard')
    }).catch(function(error) {
      console.log(error);
    });
  }
}]);

