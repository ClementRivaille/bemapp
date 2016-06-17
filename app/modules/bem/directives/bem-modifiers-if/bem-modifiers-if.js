/**
 * Dynamically apply BEM modifier on a block or element, if conditions are fulfilled.
 * Take an object associating modifiers with expressions.
 */
angular.module('bem.directives').directive('bemModifiersIf', [
  function() {
    return {
      restric: 'A',
      require: ['^bemBlock', '?bemElement'],
      scope: {
        bemModifiersIf: '='
      },
      link: function(scope, element, attrs, ctrls) {
        var blockCtrl = ctrls[0];
        var elementCtrl = ctrls[1] ? ctrls[1] : undefined;

        scope.$watch('bemModifiersIf', function() {
          // Write classes according to conditions
          _.each(_.keys(scope.bemModifiersIf), function(modifier) {
            // generate class
            var modClass = blockCtrl.getBlockName();
            if (elementCtrl) {
              modClass += '__' + elementCtrl.getElementName();
            }
            modClass += '--' + modifier;

            // Add or remove it
            if (scope.bemModifiersIf[modifier]) {
              element.addClass(modClass);
            }
            else {
              element.removeClass(modClass);
            }
          });
        }, true);
      }
    };
  }
]);