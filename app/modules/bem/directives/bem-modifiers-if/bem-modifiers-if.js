/**
 * Dynamically apply BEM modifier on a block or element, if conditions are fulfilled.
 * Take an object associating modifiers with expressions.
 */
angular.module('bem.directives').directive('bemModifiersIf', [
  function() {
    return {
      restrict: 'A',
      require: ['bemModifiersIf', '^bemBlock', '?bemElement'],
      link: function(scope, element, attrs, ctrls) {
        // Share block and element controllers with self controller
        var selfCtrl = ctrls[0];
        selfCtrl.blockCtrl = ctrls[1];
        selfCtrl.elementCtrl = ctrls[2] ? ctrls[2] : undefined;
      },
      controller: ['$scope', '$attrs', '$element',
        function($scope, $attrs, $element) {
          var modController = this;

          // Add a watcher on modifers binded to this controller
          $scope.$watch(angular.bind(modController, function() {
            return $scope.$eval($attrs.bemModifiersIf);
          }), function(modifiers) {
            // Write classes according to conditions
            _.each(_.keys(modifiers), function(modifier) {
              // generate class
              var modClass = modController.blockCtrl.getBlockName();
              if (modController.elementCtrl) {
                modClass += '__' + modController.elementCtrl.getElementName();
              }
              modClass += '--' + modifier;

              // Add or remove it
              if (modifiers[modifier]) {
                $element.addClass(modClass);
              }
              else {
                $element.removeClass(modClass);
              }
            });
          }, true);
        }
      ]
    };
  }
]);