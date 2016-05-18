angular.module('RDash').factory('sockets', function (socketFactory) {
  var myIoSocket = io.connect('localhost:8080');
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
});
