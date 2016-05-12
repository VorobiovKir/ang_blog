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
            i_js_files: [
                'project/static/js/main.module.js',
                'project/static/js/main.routes.js',
                'project/static/js/main.controller.js',

                'project/static/js/components/python/python.page.module.js',
                'project/static/js/components/python/services/pythonStorageFactory.js',
                'project/static/js/components/python/controllers/*.js',
            ]
        }

    gulp.task('lib.js',function() {
        return gulp.src(mainBowerFiles({
            filter:'**/*.js', //css
            paths: {
                bowerDirectory: 'components',
                bowerJson: 'bower.json'
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
        return gulp.src([].concat(paths.i_js_files))
        .pipe(concat('iAngular.js'))
        .pipe(gulp.dest('project/static/lib/'));
    });

    gulp.task('default', ['ang.js']);

})()
