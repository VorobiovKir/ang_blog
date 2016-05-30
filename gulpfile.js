(function() {

    'use strict';

    const
        gulp = require('gulp'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        filter = require('gulp-filter'),
        concatCss = require('gulp-concat-css'),
        mainBowerFiles = require('main-bower-files');

    const
        paths = {
            i_js_files: {
                sources: [
                    'project/static/js/iApp_angular/main.module.js',
                    'project/static/js/iApp_angular/main.constants.js',
                    'project/static/js/iApp_angular/main.routes.js',
                    'project/static/js/iApp_angular/main.controller.js',

                    'project/static/js/iApp_angular/components/python/python.page.module.js',
                    'project/static/js/iApp_angular/components/python/services/pythonStorageFactory.js',
                    'project/static/js/iApp_angular/components/python/controllers/*.js',

                    'project/static/js/iApp_angular/components/auth/auth.page.module.js',
                    'project/static/js/iApp_angular/components/auth/controllers/*.js',
                    'project/static/js/iApp_angular/components/auth/directives/*.js'
                ],
                destination: 'project/static/js/'
            }
        }

    gulp.task('lib.js',function() {
        return gulp.src(
            mainBowerFiles({
                filter:'**/*.js',
                paths: {
                    bowerDirectory: 'components',
                    bowerJson: 'bower.json'
                },
                overrides: {
                    codemirror: {
                        'main': ['lib/codemirror.js', 'lib/codemirror.css', 'mode/python/python.js']
                    },
                }
            }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('project/static/lib/'))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('project/static/lib/'));
    });

    gulp.task('lib.css', function () {
        return gulp.src('components/**/*.css')
            .pipe(concatCss('app.css'))
            .pipe(gulp.dest('project/static/lib'))
    });

    gulp.task('lib', ['lib.js', 'lib.css']);


    gulp.task('ang.js',function() {
        return gulp.src([]
            .concat(paths.i_js_files.sources))
            .pipe(concat('iAngular.js'))
            .pipe(gulp.dest(paths.i_js_files.destination));
    });

    gulp.task('default', ['ang.js']);

})()
