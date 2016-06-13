var app = angular.module('themeaning', ['ui.router', 'themeaning.directives', 'themeaning.services', 'themeaning.templates']);

app.config(['$stateProvider', function($stateProvider) {
  'use strict';

  $stateProvider.state('main', {
    url: '/?norainbow?text?interval',
    templateUrl: 'src/main.html',
    controller: 'mainCtrl'
  });
}]);
