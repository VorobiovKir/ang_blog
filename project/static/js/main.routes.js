(function () {
    'use strict';

    angular.module('MainApp')
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('pythonList', {
                    url: '/python',
                    templateUrl: 'static/js/components/python/templates/pythonListView.html',
                    controller: 'PythonListCtrl'
                })
                .state('pythonDetail', {
                    url: '/python/{id:[1-9]+}',
                    templateUrl: 'static/js/components/python/templates/pythonDetailView.html',
                    controller: 'PythonDetailCtrl'
                });
        }]);

})();
