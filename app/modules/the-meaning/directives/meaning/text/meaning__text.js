angular.module('themeaning.directives').directive('meaningText', [
  function() {
    return {
      restric: 'EA',
      replace: 'true',
      transclude: false,
      templateUrl: 'modules/the-meaning/directives/meaning/text/meaning__text.html',
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