'use strict';
angular.module('Prismetic').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  // For unmatched routes
  $urlRouterProvider.otherwise('/');
  // Application routes
  $stateProvider
      .state('main', {
        templateUrl: 'templates/main.html',
        // url: '/'
      })
      .state('main.dashboard', {
        url: '/',
        templateUrl: 'templates/dashboard.html',
        onEnter:  ['SessionService', '$location', '$localStorage', function(SessionService, $location, $localStorage) {
          if(!SessionService.isLogged()) $location.path('/login');
        }]
      })
      .state('main.tables', {
        url: '/tables',
        templateUrl: 'templates/tables.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
        onEnter: ['SessionService', '$location', '$localStorage', function(SessionService, $location, $localStorage) {
          if(SessionService.isLogged()) $location.path('/');
        }]
      });
}]);
