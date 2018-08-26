'use strict';


angular.module('myApp.tiles.routeService', []).factory('routeService', ['tilesDataStore', 'moment',
    function(tilesDataStore, moment) {

    /*
     0   1  2  3  4  5
     6   7  8  9 10 11
     12 13 14 15 16 17
     18 19 20 21 22 23
     24 25 26 27 28 29
     30 31 32 33 34 35
     */

    function RouteService() {
        this.visited = [];
        this.tilesDataStore = tilesDataStore;
    }

    // The find method actually builds some kind of graph data structure,
    // using Adjacent while walking through the vertexes
    // the algorithm uses the Depth First Search
    RouteService.prototype.findRoute = function(from, to, tiles) {
        this.visited = [];

        let start = moment();
        let path = this.findPath(from, to, tiles, Math.sqrt(tiles.length));
        let end = moment();

        if(null == path) {
            return null;
        }

        this.tilesDataStore.setRouteResult({
            'steps': path.length,
            'start': start,
            'end': end,
            'totalVisited': this.visited.length
        });

        return path;
    };

    // Recursively build the adjacent for each vertex and find path
    RouteService.prototype.findPath = function(from, to, tiles, cols) {
        this.visited[from] = true;

        // get adjacent max of 4 per vertex
        let adjacent = this.findAdjacent(from, to, tiles, cols);
        // prefer the shortest way to traverse between current point to end point,
        // IT DOES NOT TRY TO FIND THE SHORTEST WAY BETWEEN START POINT TO END POINT!
        // If we want to find the shortest way we should make some changes in the traversal algorithm
        adjacent = RouteService.sort(adjacent, to, cols);

        let path = [];

        for(let i=0; i<adjacent.length; i++) {
            // preconditions
            if(adjacent[i] === to) {
                return path;
            }

            if(true === this.visited[adjacent[i]]) {
                continue;
            }
            // end of preconditions

            // keep traversing
            let result = this.findPath(adjacent[i], to, tiles, cols);

            if(null !== result) {
                path.push(adjacent[i]);
                path = path.concat(result);

                return path;
            }
        }

        return null;
    };

    RouteService.prototype.findAdjacent = function(index, to, tiles, cols) {
        let adjacent = [];

        let col = index % cols;

        // add adjacent from left
        if(col > 0) {
            if((to === index-1) || (false === tiles[index-1])) {
                adjacent.push(index-1);
            }
        }
        // add adjacent from right
        if(col < cols - 1) {
            if((to === index+1) || (false === tiles[index+1])) {
                adjacent.push(index+1);
            }
        }

        // add adjacent from top
        if(index > cols) {
            if((to === index-cols) || (false === tiles[index-cols])) {
                adjacent.push(index-cols);
            }
        }
        // add adjacent from bottom
        if(index < tiles.length - cols) {
            if((to === index+cols) || (false === tiles[index+cols])) {
                adjacent.push(index+cols);
            }
        }

        return adjacent;
    };

    RouteService.sort = function(adjacent, to, cols) {
        // PREFER the shortest way, it doesn't try to find the shortest way
        return adjacent.sort(function(a,b) {
            let row = to/cols;

            let diffX1 = a%cols - to%cols;
            let diffX2 = b%cols - to%cols;
            let diffY1 = a/cols - row;
            let diffY2 = b/cols - row;

            let c2 = Math.sqrt(diffX1*diffX1 + diffY1*diffY1) - Math.sqrt(diffX2*diffX2 + diffY2*diffY2);

            if(c2 > 0) {
                return 1;
            }

            if(c2 < 0) {
                return -1;
            }

            return 0;
        });
    };

    return new RouteService();

}]);