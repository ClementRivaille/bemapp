var app = angular.module('terriblelogos', ['ui.router', 'terriblelogos.directives', 'terriblelogos.services', 'terriblelogos.templates', 'bem']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  'use strict';

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/?norainbow?text?interval',
    templateUrl: 'src/main.html',
    controller: 'mainCtrl'
  });
}]);

angular.module('terriblelogos').controller('appController', [function() {
}]);

angular.module('terriblelogos').controller('mainCtrl', ['$scope', '$stateParams', '$state', '$log', 'fontsService',
  function($scope, $stateParams, $state, $log, fontsService) {
    'use strict';

    $scope.log = function(msg) {
      $log.info(msg);
    };

    $scope.configuration = {
      rainbow: !$stateParams.norainbow || $stateParams.norainbow === 'false',
      text: $stateParams.text || 'TERRIBLE LOGOS',
      interval: $stateParams.interval || 200
    };
    $scope.editableConfig = angular.copy($scope.configuration);

    $scope.goToPage = function() {
      $state.go('main', {
        norainbow: !$scope.editableConfig.rainbow,
        text: $scope.editableConfig.text,
        interval: $scope.editableConfig.interval
      });
    };
  }
]);
/**
 * @ngdoc module
 * @module bem
 * @name brm
 * @description
 *
 *   Directives to declare and write BEM components
 *
 */
angular.module('bem', [
  'bem.directives']);

angular.module('bem.directives', []);
angular.module('terriblelogos.directives', ['bem']);
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

          // Add a watcher on modifers bound to this controller
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
angular.module('terriblelogos.directives').directive('logosConfiguration', [
  function() {
    return {
      restric: 'EA',
      replace: 'true',
      transclude: false,
      templateUrl: 'modules/terrible-logos/directives/logos-configuration/logos-configuration.html',
      scope: {
        configuration: '=',
        validate: '&',
      },
      link: function(scope, element) {
        scope.opened = false;
      }
    };
  }
]);
angular.module('terriblelogos.directives').directive('logosDisplay', ['fontsService',
  function(fontsService) {
    return {
      restric: 'EA',
      replace: 'true',
      transclude: false,
      templateUrl: 'modules/terrible-logos/directives/logos-display/logos-display.html',
      scope: {
        text: '=',
        interval: '=?',
        rainbow: '=?'
      },
      link: function(scope, element) {
        // default value
        scope.interval = scope.interval || 300;
        scope.text = scope.text || 'Terrible logos';

        // Retrieve fonts from service
        scope.fonts = fontsService.listFonts();
      }
    };
  }
]);
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
angular.module('terriblelogos.directives').directive('logosDisplayText', [
  function() {
    return {
      restric: 'EA',
      replace: 'true',
      transclude: false,
      templateUrl: 'modules/terrible-logos/directives/logos-display/text/logos-display__text.html',
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
angular.module('terriblelogos.services', []);
angular.module('terriblelogos.services').factory('fontsService', [

  function() {
    var listFonts = [
      'league-gothic',
      'amaticsc',
      'caviar-dreams',
      'fff-tusj',
      'ostrich',
      'bebas',
      'chunkfive',
      'good-dog',
      'pacifico',
      'walkway',
      'capture-it',
      'exo',
      'sansation',
      'ataristocrat',
      'ldcblackround',
      'sticker'
    ];

    return {
      listFonts: function() { return listFonts; }
    };
  }
]);
