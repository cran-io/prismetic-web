angular.module('RDash').controller('MasterCtrl', ['$scope', '$cookieStore', 'apiRequest', 'highCharts', 'sockets', function($scope, $cookieStore, apiRequest, highCharts, sockets) {
  //navbar management.
  var mobileView = 992;
 
  //datepicker variables
  $scope.format = 'dd/MM/yyyy';
  $scope.begPopup = { opened: false };
  $scope.endPopup = { opened: false };
  $scope.date = {};

  $scope.devices = [];
  $scope.sensors = [];
  $scope.sensorData = [];
  $scope.enter = 0;
  $scope.exit = 0;

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
    var params = {
      dateFrom: $scope.date.begDate,
      dateTo: $scope.date.endDate,
      interval: 60
    };
    apiRequest
      .getSensorData(deviceID, sensorID, params)
      .then(function(response) {
        console.log(response);
        $scope.sensorData = response.data.map(function(dot){
          return [new Date(dot.date).getTime(), dot.average];
        });
        $scope.enter = response.metadata.enter;
        $scope.exit  = response.metadata.exit;
        console.log($scope.exit, $scope.enter);
        sensorDataChart = $scope.sensorData.length ? highCharts.lineChart('chart',  $scope.sensorData) : highCharts.lineChart('chart',  $scope.sensorData).showLoading('No hay datos disponibles.');
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
        sensorID = $scope.sensors[0]._id;
        getSensorData(deviceID, $scope.sensors[0]._id);
        sockets.on(sensorID, function(data) {
          console.log(data);
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
    $scope.date.begDate = moment().startOf('day')._d;
    $scope.date.endDate = moment()._d;
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
    var subs = period == 'days' ? 0 : 1;
    $scope.date.begDate = moment().subtract(subs, period).startOf('day')._d;
    $scope.date.endDate = moment()._d;
    getSensorData(deviceID, sensorID);
  };

  $scope.changeDate = function(type, date) {
    getSensorData(deviceID, sensorID);
    $scope.period = null;
  };

}]);
