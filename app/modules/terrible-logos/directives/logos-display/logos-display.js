angular.module('terriblelogos.directives').directive('logosDisplay', [
  function() {
    return {
      restric: 'EA',
      replace: 'true',
      transclude: false,
      templateUrl: 'modules/terrible-logos/directives/logos-display/logos-display.html',
      scope: {
        text: '=',
        interval: '=?',
        rainbow: '=?'
      },
      link: function(scope, element) {
        // default value
        scope.interval = scope.interval || 300;
        scope.text = scope.text || 'Terrible logos';

        // Retrieve fonts from service
        scope.fonts = ['league-gothic', 'amaticsc', 'caviar-dreams', 'fff-tusj', 'ostrich'];
      }
    };
  }
]);