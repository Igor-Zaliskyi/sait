let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let sass = require('gulp-sass');
let concat = require('gulp-concat'); //js
let includer = require('gulp-htmlincluder');
let connect = require('gulp-connect');
let livereload = require('gulp-livereload');





// TASK

// CLEAN
gulp.task('minify-css', () => {
    return gulp.src('css/*.css') // берем 
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('css/main/index.css')); //вставляєм
  });

//   SASS
gulp.task('sass', function () {
    return gulp.src('sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('css/style.css'));
  });



//CONCAT  JS
gulp.task('scripts', function() {
    return gulp.src('src/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('dist/*.js'));
  });

// htmlincluder
gulp.task('html', function() {
    gulp.src('build/**/*.html')
    .pipe(includer())
    .pipe(gulp.dest('build/*.html'));
});

// CONNEKT
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

// livereload
gulp.task('sass', function() {
  gulp.src('sass/_header.scss')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});



//WATCH
  gulp.task('watch', function () {
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('src/*.js', ['scripts']);
  });