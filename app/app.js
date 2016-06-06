var app = angular.module('themeaning', ['ui.router', 'themeaning.directives', 'themeaning.services', 'themeaning.templates']);

app.config(['$stateProvider', function($stateProvider) {
  'use strict';

  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'src/main.html',
    controller: 'mainCtrl'
  });
}]);

app.controller('mainCtrl', ['$scope', '$log',
  function($scope, $log) {
    'use strict';

    $scope.log = function(msg) {
      $log.info(msg);
    };
  }
]);
