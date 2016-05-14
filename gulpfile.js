var gulp = require('gulp');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

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
    .pipe(gulp.dest('debug_dist'));
});

gulp.task('html', function () {
  return gulp.src('html/*.html')
    .pipe(gulp.dest('debug_dist'));
});

gulp.task('sass', function () {
  return gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('debug_dist'));
});

gulp.task('watch', function () {
  gulp.watch('js/*.js', ['lint', 'scripts-dev', 'sass', 'html']);
});

gulp.task('default', ['lint', 'scripts-dev', 'html', 'sass', 'watch']);