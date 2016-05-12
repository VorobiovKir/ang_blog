(function() {
    'use strict';

    angular
        .module('MainApp', ['PythonPageApp', 'ui.router']);
        // .config(['$locationProvider', function ($locationProvider) {
        //     // $locationProvider.html5Mode(true);
        //     // $locationProvider.hashPrefix('!');
        //     $locationProvider.html5Mode({
        //         enabled: true,
        //         requireBase: false
        //     });
        // }]);

})();

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

(function () {
    'use strict';

    angular
        .module('PythonPageApp', ['ui.codemirror']);

})();

(function () {
    'use strict';

    angular
        .module('PythonPageApp')
        .factory('PythonStorageFactory', ['$http', function ($http) {
            return $http.get('static/store/python.json');
        }])
})();

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

                $scope.test = function() {
                    alert(1);
                    console.log($scope.cmModel);
                }

        }]);
})();
