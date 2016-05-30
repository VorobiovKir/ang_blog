(function () {
    'use strict';

    angular
        .module('PythonPageApp')
        .controller('PythonListCtrl',
            ['$scope', 'PythonStorageFactory', function ($scope, PythonStorageFactory) {

                $scope.articles = [];

                PythonStorageFactory
                    .then(
                        function (response) {
                            $scope.articles = response.data;
                        },
                        function (response) {
                            console.log('ERROR get list of Python\'s articles');
                        }
                    );


                // Code Mirror settings
                $scope.cmModel = "from datetime import datetime";

                $scope.cmOption = {
                    lineNumbers: true,
                    indentWithTabs: true,
                    mode: 'text/x-python',
                    readOnly: true
                };


                // TinyMce settings
                $scope.tinymceModel = 'Initial content';

                $scope.getContent = function() {
                    console.log('Editor content:', $scope.tinymceModel);
                };

                $scope.setContent = function() {
                    $scope.tinymceModel = 'Time: ' + (new Date());
                };

                $scope.tinymceOptions = {
                    plugins: 'link image code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                };

        }]);
})();
