// npm install --save-dev gulp gulp-autoprefixer gulp-sass gulp-rename gulp-uglify gulp-concat gulp-cssnano es6-promise gulp-watch

var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass         = require('gulp-sass'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    cssnano      = require('gulp-cssnano'),
    Promise      = require('es6-promise').polyfill(),
    watch        = require('gulp-watch');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('assets/scss/app.scss')
    .pipe(sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(cssnano({ zindex: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('scripts', function(){
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/what-input/what-input.js',
    'bower_components/foundation-sites/dist/foundation.js',
    'bower_components/foundation-sites/dist/plugins/foundation.core.js',
    'bower_components/foundation-sites/dist/plugins/foundation.util.mediaQuery.js',
    'assets/js/custom/foundation.js',
    'assets/js/custom/main.js'
  ])
  .pipe(concat('main.js'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglify())
  .pipe(gulp.dest('assets/js/'));
});

gulp.task('default', ['sass', 'scripts']);

gulp.task('watch', ['sass', 'scripts'], function(){
  gulp.watch('assets/scss/**/*.scss', ['sass']);
  gulp.watch('assets/js/custom/*.js', ['scripts']);
});
