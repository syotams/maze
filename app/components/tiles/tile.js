'use strict';

angular.module('myApp.tiles.tile', [])

.component('tile', {
    templateUrl: 'components/tiles/tile.html',
    require: {
        parent: '^tiles'
    },
    bindings: {
        index: '<',
        value: '='
    },
    controller: function() {
        this.tileTitle = '';

        this.onClick = function() {
            this.parent.onTileClicked(this.index);
            this.tileTitle = this.parent.state;
        }
    }
});
