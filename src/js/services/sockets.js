angular.module('RDash').factory('sockets',['socketFactory', function (socketFactory) {
  var myIoSocket = io.connect('prismetic.cran.io:8080');
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
}]);
