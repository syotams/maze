'use strict';


angular.module('myApp.tiles.tilesDataStore', []).factory('tilesDataStore', function() {

    let tiles = null;


    function TilesDataStore() {
        this.routeResult = null;
    }

    TilesDataStore.prototype.setRouteResult = function(result) {
        this.routeResult = result;
    };

    TilesDataStore.prototype.getRouteResult = function() {
        return this.routeResult;
    };

    TilesDataStore.prototype.getTiles = function() {
        return tiles;
    };

    TilesDataStore.prototype.init = function(columns) {
        this.createNewTiles(columns);
        this.routeResult = {};
    };

    TilesDataStore.prototype.createNewTiles = function(columns) {
        tiles = [];

        let vertexes = columns * columns;

        for(let i=0; i<vertexes; i++) {
            tiles.push(false);
        }

        return tiles;
    };

    return new TilesDataStore();

});