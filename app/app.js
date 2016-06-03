var app = angular.module('themeaning', ['ui.router', 'themeaning.templates']);

app.config(['$stateProvider', function($stateProvider) {
  'use strict';

  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'main.html',
    controller: 'mainCtrl'
  });
}]);

app.controller('mainCtrl', ['$scope', '$log',
  function($scope, $log) {
    'use strict';

    $scope.log = function(msg) {
      $log.info(msg);
    };

    $log.info('Hello again!');
  }
]);
