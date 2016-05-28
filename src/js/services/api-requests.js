angular.module('Prismetic').factory('apiRequest', ['$http', '$q', function($http, $q) {
  var apiUrl   = 'http://prismetic.cran.io:8080/api';
  var requests = {};

  requests.getDevices =  function() {
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
  };
  
  requests.getSensors = function(deviceID) {
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
  };

  requests.getDeviceData = function(deviceID, params) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      params: params,
      url: apiUrl + '/devices/' + deviceID + '/graphSensorData',
      headers: {
        'Content-type': 'application/json'
      }
    }).success(function(response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  };

  requests.getSensorData = function(deviceID, sensorID, params) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      params: params,
      url: apiUrl + '/devices/' + deviceID + '/sensors/' + sensorID + '/average',
      headers: {
        'Content-type': 'application/json'
      }
    }).success(function(response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  };

  requests.postDeviceName = function(deviceID, params) {
    var deferred = $q.defer();
    $http({
      method: 'PUT',
      params: params,
      url: apiUrl + '/devices/' + deviceID,
      headers: {
        'Content-type': 'application/json'
      }
    }).success(function(response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  };

  ['postDeviceName', 'postAddressLocation'].forEach(function(post) {
    requests[post] = function(deviceID, params) {
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        params: params,
        url: apiUrl + '/devices/' + deviceID,
        headers: {
          'Content-type': 'application/json'
        }
      }).success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    };

  });

  
  return requests;
}]);
