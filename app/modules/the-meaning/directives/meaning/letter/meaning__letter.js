angular.module('themeaning.directives').directive('meaningLetter', ['$timeout',
  function($interval) {
    return {
      restric: 'EA',
      replace: 'true',
      transclude: false,
      templateUrl: 'modules/the-meaning/directives/meaning/letter/meaning__letter.html',
      scope: {
        letter: '=',
        fonts: '=',
        interval: '=?'
      },
      link: function(scope, element) {
        if (scope.fonts && scope.fonts.length > 0) {
          var fontSwitch = $interval(function() {
            scope.$apply(function() {
              var fontIndex = Math.floor(Math.random() * scope.fonts.length);
              scope.font = scope.fonts[fontIndex];
            });
          }, 500);
        }
      }
    };
  }
]);