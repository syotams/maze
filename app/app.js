'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.tiles.tiles',
    'myApp.tiles.tile',
    'myApp.tiles.routeService',
    'myApp.tiles.tilesDataStore',
    'myApp.tiles.results',
    'myApp.directives.back',
    'angularMoment'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/tiles'});
}]);
