angular
  .module('Prismetic', ['ui.bootstrap', 'ui.router', 'ngCookies', 'btford.socket-io', 'xeditable', 'ngAnimate', 'ngStorage'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    // $httpProvider.interceptors.push(function($q, $location, $localStorage) {
    //   return {
    //     responseError: function(response) {
    //       if (response.status === 401) {
    //         delete $localStorage.user;
    //         console.log("C", $localStorage)
    //         $location.path('/login');
    //       }
    //       return $q.reject(response);
    //     }
    //   };
    // });
  }])
  .run(['editableOptions', function(editableOptions) {
    editableOptions.theme = 'bs3';
  }]);

