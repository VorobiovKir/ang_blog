(function () {
    'use strict';

    angular
        .module('PythonPageApp')
        .controller('PythonDetailCtrl',
            ['$scope', '$stateParams', 'PythonStorageFactory', function ($scope,  $stateParams, PythonStorageFactory) {

                $scope.article = []

                PythonStorageFactory
                    .then(
                        function (response) {
                            for (let i = 0; i < response.data.length; i++) {
                                if (response.data[i].id === parseInt($stateParams.id)) {
                                    $scope.article = response.data[i];
                                    $scope.article.keywords = $scope.splitAndTrim(response.data[i].keywords, ',')
                                    break;
                                }
                            }
                        },
                        function (response) {
                            console.log('ERROR get Python article');
                        }
                    );

            }])
})();
