angular
  .module('Prismetic', ['ui.bootstrap', 'ui.router', 'ngCookies', 'btford.socket-io', 'xeditable'])
  .run(['editableOptions', function(editableOptions) {
    editableOptions.theme = 'bs3';
  }]);
  
