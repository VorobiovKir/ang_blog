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
