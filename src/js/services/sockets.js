angular.module('RDash').factory('sockets', function (socketFactory) {
  var myIoSocket = io.connect('prismetic.cran.io:8080');
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
});
