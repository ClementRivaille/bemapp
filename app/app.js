var app = angular.module('terriblelogos', ['ui.router', 'terriblelogos.directives', 'terriblelogos.services', 'terriblelogos.templates', 'bem']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  'use strict';

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/?norainbow?text?interval',
    templateUrl: 'src/main.html',
    controller: 'mainCtrl'
  });
}]);
