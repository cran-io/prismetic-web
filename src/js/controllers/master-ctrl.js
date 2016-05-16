angular.module('RDash').controller('MasterCtrl', ['$scope', '$cookieStore', 'apiRequest', function($scope, $cookieStore, apiRequest) {
  //navbar management.
  var mobileView = 992;
 
  //datepicker variables
  $scope.format = 'dd/MM/yyyy';
  $scope.begPopup = { opened: false };
  $scope.endPopup = { opened: false };
  $scope.date = {};

  $scope.devices = [];
  $scope.sensors = [];

  var sensorID, deviceID;
  
  (function() {
    apiRequest
      .getDevices()
      .then(function(response) {
        $scope.devices = response;
        $scope.devices.map(function(device, index) {
          device.index    = index;
          device.selected = index == 0;
        });
        if ($scope.devices.length) {
          deviceID = $scope.devices[0]._id;
          getSensors(deviceID);
        }
      });
  })();
  
  $scope.selectDevice = function(index) {
    $scope.devices.forEach(function(device) {
      if (device.index == index) {
        device.selected = true;
        getSensors(device._id);
      } else {
        device.selected = false;
      }
    });
  };

  $scope.selectSensor = function(index) {
    $scope.sensors.forEach(function(sensor) {
      if (sensor.index == index) {
        sensor.selected = true;
        sensorID = sensor._id;
        getSensorData(deviceID, sensorID);
      } else {
        sensor.selected = false;
      }
    });
  };

  var getSensorData = function(deviceID, sensorID) {
    apiRequest
      .getSensorData(deviceID, sensorID)
      .then(function(response) {
        console.log(response);
      });
  };

  var getSensors = function(deviceID) {
    apiRequest
      .getSensors(deviceID)
      .then(function(response) {
        $scope.sensors = response;
        $scope.sensors.map(function(sensor, index) {
          sensor.index = index;
          sensor.selected = index == 0;
        });
      });
  };

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
