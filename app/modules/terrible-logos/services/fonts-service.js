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
