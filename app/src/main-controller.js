angular.module('themeaning').controller('mainCtrl', ['$scope', '$stateParams', '$log',
  function($scope, $stateParams, $log) {
    'use strict';

    $scope.log = function(msg) {
      $log.info(msg);
    };

    $scope.rainbow = !$stateParams.norainbow;
    $scope.text = $stateParams.text || 'THE MEANING';
    $scope.interval = 200;
  }
]);