(function () {
    'use strict';

    angular.module('MainApp')
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            'PATHS',

            function($stateProvider, $urlRouterProvider, PATHS) {

                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('pythonList', {
                        url: '/python',
                        templateUrl: PATHS.makePathToTemplate('python', 'pythonListView.html'),
                        controller: 'PythonListCtrl'
                    })
                    .state('pythonDetail', {
                        url: '/python/{id:[1-9]+}',
                        templateUrl: PATHS.makePathToTemplate('python', 'pythonDetailView.html'),
                        controller: 'PythonDetailCtrl'
                    })
                    .state('authLogin', {
                        url: '/auth/login',
                        templateUrl: PATHS.makePathToTemplate('auth', 'login.html'),
                        controller: 'AuthCtrl'
                    })
                    .state('authRegister', {
                        url: '/auth/register',
                        templateUrl: PATHS.makePathToTemplate('auth', 'register.html'),
                        controller: 'AuthCtrl'
                    });
            }]);

    })();
