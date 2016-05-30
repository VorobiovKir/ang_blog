(function () {
    'use strict';

    angular
        .module('MainApp')
        .controller('MainCtrl',
            ['$scope', function ($scope) {

                $scope.splitAndTrim = function (str, delim) {
                    let delimetr = delim || '';
                    return str.split(delimetr).map(function (el) {
                        return el.trim();
                    })
                }

            }]);

})();
