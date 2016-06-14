angular.module('Prismetic').factory('apiRequest', ['$http', '$q', function($http, $q) {
  var apiUrl   = 'http://127.0.0.1:8080/api';
  var url = "http://127.0.0.1:8080"
  var requests = {};

  requests.login = function(userForm) {
    return $http.post(url + "/signin", userForm);
  }

  requests.logout = function() {
    return $http.get(url + "/logout");
  }

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

  ['updateDeviceName', 'updateAddressLocation'].forEach(function(func) {
    requests[func] = function(deviceID, device) {
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        data: device,
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

  requests.updateSensor = function(deviceID, sensor) {
    return $http.put(apiUrl + /devices/ + deviceID + "/sensors/" + sensor._id, {sensor: sensor})
  }

  requests.deleteSensorData = function(deviceID, sensorID) {
    return $http.delete(apiUrl + "/devices/" + deviceID + "/sensors/" + sensorID + "/sensors_data")
  }

  return requests;

}]);
