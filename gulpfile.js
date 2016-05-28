var gulp = require('gulp');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var rollup = require('rollup').rollup;


var devOutDir = 'debug_dist';

gulp.task('lint', function () {
  return gulp.src('js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('scripts-dev', function () {
  return rollup({
    entry: 'js/main.js',
    plugins: [
    ]
  }).then(function (bundle) {
    return bundle.write({
      format: 'iife',
      dest: devOutDir + '/all.js'
    });
  });
});

gulp.task('html', function () {
  return gulp.src('html/*.html')
    .pipe(gulp.dest(devOutDir));
});

gulp.task('sass', function () {
  return gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(devOutDir))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('browser-sync', ['build', 'watch'], function() {
  browserSync.init({
    server: {
      baseDir: devOutDir,
      online: false
    }
  });
});

gulp.task('build', ['lint', 'scripts-dev', 'sass', 'html'])

gulp.task('watch', function () {
  gulp.watch('js/*.js', ['lint', 'scripts-dev']);
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch("html/*.html", ['html']);
});

gulp.task('default', ['browser-sync']);
