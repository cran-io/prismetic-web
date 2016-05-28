angular.module('Prismetic').controller('MasterCtrl', ['$scope', 'apiRequest', 'highCharts', 'sockets', function($scope, apiRequest, highCharts, sockets) {
  $scope.format   = 'dd/MM/yyyy';
  $scope.begPopup = { opened: false };
  $scope.endPopup = { opened: false };
  $scope.date     = {};

  $scope.devices  = [];
  $scope.sensors  = [];
  $scope.enter    = 0;
  $scope.exit     = 0;

  var sensorID, deviceID;
  
  var countData, avgData = [];
  var countChart, averageChart;

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
        deviceID = device._id;
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
        getDeviceData(deviceID, sensorID);
      } else {
        sensor.selected = false;
      }
    });
  };

  ['updateDeviceName', 'updateDeviceLocation'].forEach(function(func) {
    $scope[func] = function(id) {
      var device = $scope.devices.find(function(device){
        return device._id == id;
      });
      apiRequest.updateDeviceName(id, device);
    };
  }); 

  var getDeviceData = function(deviceID, sensorID) {
    var params = {
      'sensors[]': [sensorID],
      dateFrom: $scope.date.begDate,
      dateTo: $scope.date.endDate,
      interval: 60
    };
    apiRequest
      .getDeviceData(deviceID, params)
      .then(function(response) {
        $scope.rawSensorData = response;
        countData = response.data.count.map(function(dot) {
          return [new Date(dot.sentAt).getTime(), dot.count];
        });

        avgData = response.data.average.map(function(dot) {
          return [new Date(dot.sentAt).getTime(), dot.average];
        });
        $scope.enter = response.metadata.enter;
        $scope.exit  = response.metadata.exit;
        countChart = countData.length ? highCharts.lineChart('chart', countData) : highCharts.lineChart('chart', countData).showLoading('No hay datos disponibles.');
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
        getDeviceData(deviceID, $scope.sensors[0]._id);
        $scope.sensors.forEach(function(sensor) {
          sockets.on(sensor._id, function(dot) {
            $scope.enter  += Number(dot.enter);
            if (countChart) {
              countChart.series[0].addPoint({x: new Date(dot.sentAt).getTime(), y: dot.count});
            }

            if (averageChart) {
              var lastIndex  = averageChart.series[0].data.length - 1;
              var lastPoint  = averageChart.series[0].data[lastIndex];
              var lastPointHour = moment(lastPoint.x).add(30, 'minutes');
              if (moment(dot.sentAt) < lastPointHour) {
                var scopedData   = $scope.rawSensorData.data[$scope.rawSensorData.data.length - 1];
                var updatedPoint = ((scopedData.count + dot.count) / (scopedData.cant + 1)).toFixed(1);
                lastPoint.update({ y: Number(updatedPoint) });
              } else {
                var newHour = moment(dot.sentAt).startOf('hour').add(30, 'minutes');
                averageChart.series[0].addPoint({x: newHour, y: dot.count});
              }
            }
          });
        });
      });
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
    $scope.date.begDate = moment($scope.date.endDate).subtract(subs, period).startOf('day')._d;
    $scope.date.endDate = moment($scope.date.endDate)._d;
    getDeviceData(deviceID, sensorID);
  };

  $scope.changeDate = function(type, date) {
    getDeviceData(deviceID, sensorID);
    $scope.period = null;
  };

}]);
