angular.module('terriblelogos.directives').directive('logosConfiguration', [
  function() {
    return {
      restric: 'EA',
      replace: 'true',
      transclude: false,
      templateUrl: 'modules/terrible-logos/directives/logos-configuration/logos-configuration.html',
      scope: {
        configuration: '=',
        validate: '&',
      },
      link: function(scope, element) {
        scope.opened = false;
      }
    };
  }
]);