var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint']);
});

gulp.task('default', ['lint', 'watch']);
