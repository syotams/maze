'use strict';

function TilesCtrl(routeService, $location, $interval, tilesDataStore) {
    // Define board states
    const STATES = {
        START: "Start",
        END: "End",
        DEFAULT: ''
    };

    this.columns = 12;

    // Init a new board
    tilesDataStore.init(this.columns);

    // get the board from store
    this.tiles = tilesDataStore.getTiles();
    this.state = STATES.DEFAULT;

    // set the start and end points to index -1 (out of tiles data structure)
    this.points = {
      start: -1,
      end: -1
    };

    this.colors = {
        colorA: '#ededed',
        colorB: 'rebeccapurple',
        colorC: 'yellowgreen'
    };

    this.onTileClicked = function(index) {
      this.tiles[index] = !this.tiles[index];

      let item = '';

      switch (this.state) {
          case STATES.START:
            item = 'start';
            break;

          case STATES.END:
              item = 'end';
              break;
      }

      if(item) {
          if(this.points[item]>-1) {
              this.tiles[this.points[item]] = false;
          }

          this.points[item] = this.points[item] === index ? -1 : index;
      }
    };

    this.setPath = function(index) {
        this.tiles[index] = 'p';
    };

    this.clearPath = function() {
        for(let i=0; i<this.tiles.length; i++) {
            if(this.tiles[i] === 'p') {
                this.tiles[i] = false;
            }
        }
    };

    this.reset = function() {
        for(let i=0; i<this.tiles.length; i++) {
            this.tiles[i] = false;
        }
        this.points.start = -1;
        this.points.end = -1;
    };

    this.findPath = function () {
        this.clearPath();

        let path = routeService.findRoute(this.points.start, this.points.end, this.tiles);
        if(null == path) return;

        let ctrl = this;
        let i = 0;

        // set interval that stop automatically after path.length iterations
        $interval(function() {
            ctrl.setPath(path[i++]);

            if(i>=path.length) {
                //$location.path('/results');
            }

        }, 100, path.length);
    };

    this.saveTiles = function() {
        // TODO
        console.log(this.tiles.join());
    };

    this.toggleStartState = function() {
        this.state = this.state === STATES.START ? STATES.DEFAULT : STATES.START;
    };

    this.toggleEndState = function() {
        this.state = this.state === STATES.END ? STATES.DEFAULT : STATES.END;
    };
}

angular.module('myApp.tiles.tiles', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tiles', {
    template: '<tiles></tiles>'
  })
  .otherwise({
      template: '<tiles></tiles>'
  });
}])

.component('tiles', {
  templateUrl: 'components/tiles/tiles.html',
  controller: ['routeService', '$location', '$interval', 'tilesDataStore', TilesCtrl],
  controllerAs: 'tilesCtrl'
});