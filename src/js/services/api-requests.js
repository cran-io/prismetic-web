angular.module('RDash').factory('apiRequest', ['$http', '$q', function($http, $q) {
  var apiUrl = 'http://prismetic.cran.io';
  return {
    getDevices: function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: apiUrl + '/devices',
        headers: {
          'Content-type': 'application/json'
        }
      }).success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }
  }
}]);
