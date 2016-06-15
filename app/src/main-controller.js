angular.module('terriblelogos').controller('mainCtrl', ['$scope', '$stateParams', '$state', '$log',
  function($scope, $stateParams, $state, $log) {
    'use strict';

    $scope.log = function(msg) {
      $log.info(msg);
    };

    $scope.configuration = {
      rainbow: !$stateParams.norainbow || $stateParams.norainbow === 'false',
      text: $stateParams.text || 'TERRIBLE LOGOS',
      interval: $stateParams.interval || 200
    };
    $scope.editableConfig = angular.copy($scope.configuration);

    $scope.goToPage = function() {
      $state.go('main', {
        norainbow: !$scope.editableConfig.rainbow,
        text: $scope.editableConfig.text,
        interval: $scope.editableConfig.interval
      });
    };
  }
]);