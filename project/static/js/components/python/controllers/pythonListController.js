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

                // $scope.code = '/*this is javascript example*/\n' +
                //   'function foo() {\n' +
                //   '  return bar;\n' +
                //   '} \n' +
                //   '/**\n' +
                //   ' * @ngdoc directive\n' +
                //   ' * @param String\n' +
                //   ' * @return ..\n' +
                //   ' * @example\n' +
                //   ' * <code-mirror lang="js" model="code"></code-mirror>\n' +
                //   ' */\n\n' +
                //   '/*lets write some Java code..*/\n' +
                //   'Class Bar extends Baz \n' +
                //   '{\n' +
                //   '  private int _x;\n' +
                //   '\n' +
                //   '  public Bar(int x)\n' +
                //   '  { \n' +
                //   '    ...\n' +
                //   '  }\n' +
                //   '}\n' +
                //   ''

                $scope.cmModel = "from datetime import datetime";

                $scope.cmOption = {
                    lineNumbers: true,
                    indentWithTabs: true,
                    mode: 'text/x-python'
                };

        }]);
})();
