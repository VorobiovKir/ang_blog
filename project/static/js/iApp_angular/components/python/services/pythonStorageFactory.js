(function () {
    'use strict';

    angular
        .module('PythonPageApp')
        .factory('PythonStorageFactory', ['$http', function ($http) {
            return $http.get('static/store/python.json');
        }])
})();
