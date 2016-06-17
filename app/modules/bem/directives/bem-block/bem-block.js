/**
 * Block directive. Write block class, and give name to child elements and modifiers.
 */
angular.module('bem.directives').directive('bemBlock', [
  function() {
    return {
      restric: 'A',
      link: function(scope, element, attrs) {
        var blockName = attrs.bemBlock;
        element.addClass(blockName);
      },
      controller: ['$attrs', function($attrs) {
        this.getBlockName = function() {
          return $attrs.bemBlock;
        };
      }]
    };
  }
]);