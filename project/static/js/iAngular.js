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

(function () {
    'use strict';

    angular.module('MainApp')
        .constant('PATHS', {
            sourceApp: 'static/js/iApp_angular',
            componentsFolderName: 'components',
            templatesFolderName: 'templates',

            makePathToTemplate: function (componentName, templateName) {
                return [
                    this.sourceApp,
                    this.componentsFolderName,
                    componentName,
                    this.templatesFolderName,
                    templateName
                    ].join('/');
            }
        });

})();

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
        .module('PythonPageApp', ['ui.codemirror', 'ui.tinymce']);

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


                $scope.cmModel = "from datetime import datetime";

                $scope.cmOption = {
                    lineNumbers: true,
                    indentWithTabs: true,
                    mode: 'text/x-python',
                    readOnly: true
                };


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

(function () {
    'use strict';

    angular
        .module('AuthPageApp', []);

})();

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

angular
    .module('AuthPageApp')
    .directive('namevalidation', function() {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (name) {
                    if (/^[A-z]\w{2,10}$/.test(name)) {
                        ctrl.$setValidity('username', true);
                        return name;
                    } else {
                        ctrl.$setValidity('username', false);
                        return undefined;
                    }
                });
            }
        };
    })
    .directive('emailvalidation', function() {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (email) {
                    var emailRegExp =
                        /^[a-z][-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
                    if (emailRegExp.test(email)) {
                        ctrl.$setValidity('email', true);
                        return email;
                    } else {
                        ctrl.$setValidity('email', false);
                        return undefined;
                    }
                });
            }
        };
    });
