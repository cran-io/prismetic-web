angular.module('RDash').factory('sockets', function (socketFactory) {
  var myIoSocket = io.connect('192.168.1.56:8080');
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return socketFactory();
});
