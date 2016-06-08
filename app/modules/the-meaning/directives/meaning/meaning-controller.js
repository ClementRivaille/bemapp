angular.module('themeaning.directives').directive('meaning', [
  function() {
    return {
      restric: 'EA',
      replace: 'true',
      transclude: false,
      templateUrl: 'modules/the-meaning/directives/meaning/meaning.html',
      scope: {
        text: '=',
        interval: '=?',
        rainbow: '='
      },
      link: function(scope, element) {
        // default value
        scope.interval = scope.interval || 300;
        scope.text = scope.text || 'The Meaning';

        // Retrieve fonts from service
        scope.fonts = ['league-gothic', 'amaticsc', 'caviar-dreams', 'fff-tusj', 'ostrich'];
      }
    };
  }
]);