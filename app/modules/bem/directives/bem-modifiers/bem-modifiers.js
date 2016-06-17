/**
 * Dynamically apply BEM modifier on a block or element.
 * Take a list of modifiers.
 */
angular.module('bem.directives').directive('bemModifiers', [
  function() {
    return {
      restric: 'A',
      require: ['^bemBlock', '?bemElement'],
      scope: {
        bemModifiers: '='
      },
      link: function(scope, element, attrs, ctrls) {
        var blockCtrl = ctrls[0];
        var elementCtrl = ctrls[1] ? ctrls[1] : undefined;

        // Store applied modifiers
        var appliedClasses = [];

        scope.$watch('bemModifiers', function() {
          // Remove every modifiers first
          _.each(appliedClasses, function(modClass) {
            element.removeClass(modClass);
          });
          appliedClasses.splice(0, appliedClasses.length);
          
          // Write classes
          _.each(scope.bemModifiers, function(modifier) {
            var modClass = blockCtrl.getBlockName();
            if (elementCtrl) {
              modClass += '__' + elementCtrl.getElementName();
            }
            modClass += '--' + modifier;

            element.addClass(modClass);
            appliedClasses.push(modClass);
          });
        }, true);
      }
    };
  }
]);