'use strict';


angular.module('myApp.tiles.results', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/results', {
            template: '<results></results>'
        });
    }])

    .component('results', {
        templateUrl: 'components/tiles/results.html',
        controller: ['tilesDataStore', function(tilesDataStore) {
            let result = tilesDataStore.getRouteResult();

            this.elapsedTime = 0;
            this.steps = 0;
            this.totalVisited = 0;

            // TODO: fix time elapsed to show elapsed time rather then just weired time
            if(result) {
                this.steps = result.steps;
                this.totalVisited = result.totalVisited;
                this.elapsedTime = result.start.local().diff(result.end.local(), 'milliseconds');
            }
        }
    ]});
