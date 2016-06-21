angular.module('terriblelogos.services').factory('fontsService', [

  function() {
    var listFonts = [
      'league',
      'amaticsc',
      'caviar',
      'fff',
      'ostrich',
      'season',
      'bebas',
      'chunkfive',
      'good',
      'pacifico',
      'walkway',
      'capture',
      'exo',
      'sensation'
    ];

    return {
      listFonts: function() { return listFonts; }
    };
  }
]);
