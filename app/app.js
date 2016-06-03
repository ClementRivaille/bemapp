var app = angular.module('bemapp', ['ui.router']);

app.config(['$stateProvider', function($stateProvider) {
  'use strict';

  $stateProvider.state('main', {
    url: '/',
    template: '<div>Hello world!&nbsp;<i class="fa fa-check"></i></div>',
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
