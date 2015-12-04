var gulp = require('gulp');
var compass = require('gulp-compass');
var browserSync = require('browser-sync').create();
var minifyCss = require('gulp-minify-css');
var jade = require('gulp-jade');

gulp.task('serve', function() {
    browserSync.init({
        server: "./public"
    });

    gulp.src('icons/*').pipe(gulp.dest('public/icons'));
    gulp.src('fonts/*').pipe(gulp.dest('public/fonts'));
    gulp.src('img/*').pipe(gulp.dest('public/images'));
    gulp.watch("sass/**/*.scss", ['compass']);
    gulp.watch("templates/*.jade", ['templates']);
});
gulp.task('compass', function() {
    return gulp.src('sass/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: 'compiled/css',
            sass: 'sass/'
        }))
        .on('error', function(error) {
            console.log(error.message);
            this.emit('end');
        })
        .pipe(gulp.dest('compiled/css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream())
    ;
});

gulp.task('templates', function() {
    return gulp.src('templates/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.reload({stream: true}))
    ;
});

gulp.task('default', ['templates', 'compass', 'serve']);
