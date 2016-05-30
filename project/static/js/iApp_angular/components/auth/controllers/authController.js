angular
    .module('AuthPageApp')
    .controller('AuthCtrl', ['$scope', function($scope) {
        'use strict';

        $scope.user = {
            data: {
                name: '',
                email: '',
                password: '',
                password1: ''
            }
        };

        $scope.showUsername = function() {
            alert($scope.user.data.name + ' - ' + $scope.user.data.password);
        };

    }]);
