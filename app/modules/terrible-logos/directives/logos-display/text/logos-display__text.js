angular.module('terriblelogos.directives').directive('logosDisplayText', [
  function() {
    return {
      restric: 'EA',
      replace: 'true',
      transclude: false,
      templateUrl: 'modules/terrible-logos/directives/logos-display/text/logos-display__text.html',
      scope: {
        text: '=',
        fonts: '=',
        interval: '=?'
      },
      link: function(scope, element) {
        // Make an array contening each letter
        scope.textArray = scope.text.split('');

        // default value
        scope.interval = scope.interval || 3000;
      }
    };
  }
]);