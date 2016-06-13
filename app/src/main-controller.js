angular.module('themeaning').controller('mainCtrl', ['$scope', '$stateParams', '$state', '$log',
  function($scope, $stateParams, $state, $log) {
    'use strict';

    $scope.log = function(msg) {
      $log.info(msg);
    };

    $scope.configuration = {
      rainbow: !$stateParams.norainbow || $stateParams.norainbow === 'false',
      text: $stateParams.text || 'THE MEANING',
      interval: $stateParams.interval || 200
    };

    $scope.goToPage = function() {
      $state.go('main', {
        norainbow: !$scope.configuration.rainbow,
        text: $scope.configuration.text,
        interval: $scope.configuration.interval
      });
    };
  }
]);