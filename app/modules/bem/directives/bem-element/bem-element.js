/**
 * Element directive. Write block__element class, and give name to modifiers.
 */
angular.module('bem.directives').directive('bemElement', [
  function() {
    return {
      restric: 'A',
      require: '^^bemBlock',
      link: function(scope, element, attrs, blockCtrl) {
        var elementName = attrs.bemElement;
        var elementClass = blockCtrl.getBlockName() + '__' + elementName;
        element.addClass(elementClass);
      },
      controller: ['$attrs', function($attrs) {
        this.getElementName = function() {
          return $attrs.bemElement;
        };
      }]
    };
  }
]);