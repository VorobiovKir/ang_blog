(function() {
    'use strict';

    angular
        .module('MainApp', ['PythonPageApp', 'AuthPageApp', 'ui.router',]);
        // .config(['$locationProvider', function ($locationProvider) {
        //     // $locationProvider.html5Mode(true);
        //     // $locationProvider.hashPrefix('!');
        //     $locationProvider.html5Mode({
        //         enabled: true,
        //         requireBase: false
        //     });
        // }]);

})();
