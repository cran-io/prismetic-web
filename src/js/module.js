angular
  .module('Prismetic', ['ui.bootstrap', 'ui.router', 'ngCookies', 'btford.socket-io', 'xeditable', 'ngAnimate'])
  .run(['editableOptions', function(editableOptions) {
    editableOptions.theme = 'bs3';
  }]);
  
