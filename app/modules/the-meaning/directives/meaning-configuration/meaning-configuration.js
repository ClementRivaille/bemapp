angular.module('themeaning.directives').directive('meaningConfiguration', [
  function() {
    return {
      restric: 'EA',
      replace: 'true',
      transclude: false,
      templateUrl: 'modules/the-meaning/directives/meaning-configuration/meaning-configuration.html',
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