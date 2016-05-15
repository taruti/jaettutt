var gulp = require('gulp');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var devOutDir = 'debug_dist';

gulp.task('lint', function () {
  return gulp.src('js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('scripts-dev', function () {
  return gulp.src('js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(devOutDir));
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
      baseDir: devOutDir
    }
  });
});

gulp.task('build', ['lint', 'scripts-dev', 'sass', 'html'])

gulp.task('watch', function () {
  gulp.watch('js/*.js', ['scripts-dev']);
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch("html/*.html", ['html']);
});

gulp.task('default', ['browser-sync']);
