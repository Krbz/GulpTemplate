var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    fileinclude = require('gulp-file-include'),
    prettify = require('gulp-prettify'),
    $ = require('gulp-load-plugins')(),
    csscomb = require('gulp-csscomb'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    sass = require('gulp-sass');
    babel = require('gulp-babel');


function handleError(err) {
    console.log(err)
}
gulp.task('fileinclude', function () {
	return gulp.src(['src/index.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('./public'))
		.pipe(connect.reload());
});
gulp.task('prettify', ['fileinclude'], function () {
	return gulp.src('public/*.html')
		.pipe(prettify({indent_size: 2}))
		.pipe(gulp.dest('public'))
		.pipe(connect.reload());
});


gulp.task('styles', function () {
    gulp.src('src/styles/*.scss')
        .pipe(sass({includePaths: [require('node-normalize-scss').includePaths, './src/styles/base']}).on('error', sass.logError))
        .pipe($.autoprefixer([
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6']))
        .pipe($.csscomb())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))
        .on('error', handleError)
        .pipe(connect.reload());
});

gulp.task('minify:styles', function() {
    gulp.src('public/css/*.css')
        .pipe(concat('style.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('public/css'))
        .on('error', handleError);
});

gulp.task('scripts', function () {
    gulp.src('src/js/*.js')
        .pipe(plumber(handleError))
        .on('error', handleError)
        .pipe(sourcemaps.write())
        .pipe(babel({loose: 'all'}))
        .pipe(gulp.dest('public/js'))
        .pipe(connect.reload());
});


gulp.task('minify:scripts', function() {
    gulp.src('public/js/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .on('error', handleError);
});

gulp.task('html', function () {
    return gulp.src([
            'src/index.html'
        ])
        .pipe(gulp.dest('public/'))
        .pipe(connect.reload());

});

gulp.task('watch', ['build', 'connect'], function () {

    gulp.watch('src/styles/*.scss', ['styles']);
    gulp.watch(['src/js/*.js'], ['scripts']);
	gulp.watch('src/views/*.html', ['prettify']);

});

gulp.task('connect', function () {
    connect.server({
        root: ['public'],
        port: 4242,
        livereload: true
    })
});
gulp.task('build', function () {
    gulp.run([ 'styles', 'minify:styles', 'scripts', 'minify:scripts', 'prettify'])
});
gulp.task('default', function () {
    gulp.run('build');
    gulp.run('watch');
});