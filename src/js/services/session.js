angular.module('Prismetic').service('SessionService', ['$http', '$localStorage', function($http, $localStorage) {
  var session = {}

  session.setUser = function(data) {
    $localStorage.user = data
  };

  session.isLogged = function (argument) {
    return !!$localStorage.user;
  };
  session.user = (function() {
    return $localStorage.user;
  })();

  return session;
}]);