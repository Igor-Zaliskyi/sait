'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const gulpsync = require('gulp-sync')(gulp)
const inject = require('gulp-inject')
const rimraf = require('gulp-rimraf')
const connect = require('gulp-connect')
const babel = require('gulp-babel')
const sourcemaps  = require ( ' gulp-sourcemaps ' ) 

const baseSource = './src/'
const baseDistination = './dist/'
const source = {
    sass:    `${baseSource}sass/**/*.scss`,
    scripts: `${baseSource}scripts/**/*.js`,
    images:  `${baseSource}images/**/*.*`,
    html:    `${baseSource}index.html`,
    views:   `${baseSource}views/**/*.html`,
    public:  `${baseSource}/public/**/*.*`
}
const distination = {
    css:     `${baseDistination}/styles`,
    scripts: `${baseDistination}/scripts`,
    images:  `${baseDistination}/images`,
    public:  `${baseDistination}/public`
}

// SASS
gulp.task('sass', () => {
    return gulp.src(source.sass)
    // add sourcemap
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distination.css))
        .pipe(connect.reload())
})

// JS
gulp.task('scripts', () => {
    return gulp.src(source.scripts)
        // add sourcemap
        .pipe(sourcemaps.init())
        // .pipe(babel({presets: ['env']}))
        .pipe(gulp.dest(distination.scripts))
        .pipe(sourcemaps.write())
        .pipe(connect.reload())
})

// IMAGES
gulp.task('images', () => {
    return gulp.src(source.images)
        .pipe(gulp.dest(distination.images))
        .pipe(connect.reload())
})

// PUBLIC
gulp.task('public', () => {
    return gulp.src(source.public)
        .pipe(gulp.dest(distination.public))
        .pipe(connect.reload())
})

// HTML
gulp.task('html', () => {
    const injectAssets = gulp.src([distination.css + '/*.*', distination.scripts + '/*.*'], { read: false })
    const injectViews = gulp.src([source.views])
    return gulp.src(source.html)
        .pipe(inject(injectAssets, {
            // baseDistination === './dist/'
            // baseDistination.replace(/\.(.*)/, '$1') === '/dist/'
            ignorePath: baseDistination.replace(/\.(.*)/, '$1')
        }))
        .pipe(inject(injectViews, {
            starttag:  '<!-- inject:{{path}} -->',
            relative:  true,
            transform: (filePath, file) => file.contents.toString('utf8')
        }))
        .pipe(gulp.dest(baseDistination))
        .pipe(connect.reload())
})

// CLEAN
gulp.task('clean', () => {
    return gulp.src(baseDistination, { read: false })
        .pipe(rimraf())
})

// ASSETS
gulp.task('assets', [
    'sass',
    'scripts',
    'images',
    'public'
])

// WATCH
gulp.task('watch', () => {
    gulp.watch(source.sass, ['sass'])
    gulp.watch(source.scripts, ['scripts'])
    gulp.watch(source.images, ['images'])
    gulp.watch(source.public, ['public'])
    gulp.watch([source.views, source.html], ['html'])
})

// CONNECT
gulp.task('connect', () => {
    connect.server({
        root:       baseDistination,
        livereload: true
    })
})

// DEFAULT
gulp.task('default', gulpsync.sync([
    'clean',
    'assets',
    'html',
    [
        'watch',
        'connect'
    ]
]))
