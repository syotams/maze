'use strict';

angular.module('myApp.directives.back', [])

    .directive('back', ['$window', function($window) {
        return function(scope, element, attrs) {
            element.on('click', function() {
                $window.history.back();
            });
        };
    }]);
