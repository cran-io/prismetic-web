angular.module('RDash').factory('apiRequest', ['$http', '$q', function($http, $q) {
  var apiUrl = 'http://prismetic.cran.io:8080/api';
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
    }, 
    
    getSensors: function(deviceID) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: apiUrl + '/devices/' + deviceID + '/sensors',
        headers: {
          'Content-type': 'application/json'
        }
      }).success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    },

    getSensorData: function(deviceID, sensorID, params) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        params: params,
        url: apiUrl + '/devices/' + deviceID + '/sensors/' + sensorID + '/sensors_data',
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
