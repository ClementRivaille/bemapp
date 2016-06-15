var app = angular.module('terriblelogos', ['ui.router', 'terriblelogos.directives', 'terriblelogos.services', 'terriblelogos.templates']);

app.config(['$stateProvider', function($stateProvider) {
  'use strict';

  $stateProvider.state('main', {
    url: '/?norainbow?text?interval',
    templateUrl: 'src/main.html',
    controller: 'mainCtrl'
  });
}]);
