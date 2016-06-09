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
      .state('main.index', {
          url: '/',
          templateUrl: 'templates/dashboard.html'
      })
      .state('main.tables', {
          url: '/tables',
          templateUrl: 'templates/tables.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      });
}]);
