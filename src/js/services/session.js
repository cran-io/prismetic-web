angular.module('Prismetic').service('SessionService', ['$http', '$localStorage', '$q', '$location', '$timeout', 
  function($http, $localStorage, $q, $location, $timeout) {
  var session = {}

  session.setUser = function(data) {
    $localStorage.user = data
  };

  session.isLogged = function () {
    return !!$localStorage.user;
  };
  session.user = (function() {
    return $localStorage.user;
  })();

  session.authResolve = function() {
    var p = $q.defer();
    if(session.isLogged()) {
      p.resolve();
    } else {
      $timeout(function () {
        $location.path('/login');
      }, 0);
      p.reject();
    }
    return p.promise;
  }


  return session;
}]);