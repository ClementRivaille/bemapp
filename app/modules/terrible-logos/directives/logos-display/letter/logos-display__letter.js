angular.module('terriblelogos.directives').directive('logosDisplayLetter', ['$interval', '$sce',
  function($interval, $sce) {
    return {
      restric: 'EA',
      replace: 'true',
      transclude: false,
      templateUrl: 'modules/terrible-logos/directives/logos-display/letter/logos-display__letter.html',
      scope: {
        letter: '=',
        fonts: '=',
        interval: '=?'
      },
      link: function(scope, element) {
        // Ensure spaces are displayed
        if (scope.letter === ' ') {
          scope.letter = '&nbsp;';
        }
        scope.letter = $sce.trustAsHtml(scope.letter);

        var fontSwitch;
        if (scope.fonts && scope.fonts.length > 0) {
          fontSwitch = $interval(function() {
            var fontIndex = Math.floor(Math.random() * scope.fonts.length);
            scope.font = scope.fonts[fontIndex];
          }, scope.interval);
        }

        // End loop
        scope.$on('$destroy', function() {
          if (angular.isDefined(fontSwitch)) {
            $interval.cancel(fontSwitch);
          }
        });
      }
    };
  }
]);