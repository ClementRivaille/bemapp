/**
 * Dynamically apply BEM modifier on a block or element.
 * Take a list of modifiers.
 */
angular.module('bem.directives').directive('bemModifiers', [
  function() {
    return {
      restric: 'A',
      require: ['bemModifiers', '^bemBlock', '?bemElement'],
      link: function(scope, element, attrs, ctrls) {
        // Share block and element controllers with self controller
        var selfCtrl = ctrls[0];
        selfCtrl.blockCtrl = ctrls[1];
        selfCtrl.elementCtrl = ctrls[2] ? ctrls[2] : undefined;
      },
      controller: ['$scope', '$attrs', '$element',
        function($scope, $attrs, $element) {
          var modController = this;

          // Store applied modifiers
          var appliedClasses = [];
          // Add a watcher on modifers bound to this controller
          $scope.$watch(angular.bind(modController, function() {
            return $scope.$eval($attrs.bemModifiers);
          }), function(modifiers) {
            // Remove every modifiers first
            _.each(appliedClasses, function(modClass) {
              $element.removeClass(modClass);
            });
            appliedClasses.splice(0, appliedClasses.length);
            
            // Write classes
            _.each(modifiers, function(modifier) {
              var modClass = modController.blockCtrl.getBlockName();
              if (modController.elementCtrl) {
                modClass += '__' + modController.elementCtrl.getElementName();
              }
              modClass += '--' + modifier;

              $element.addClass(modClass);
              appliedClasses.push(modClass);
            });
          }, true);
        }
      ]
    };
  }
]);