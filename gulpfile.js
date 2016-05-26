var gulp = require('gulp'),
    watch      = require('gulp-watch'),
    minifyCss  = require('gulp-cssnano'),
    minifyJs   = require('gulp-uglify'),
    minifyImgs = require('gulp-imagemin'),
    rename     = require('gulp-rename'),
    lib        = require('bower-files')(),
    concat     = require('gulp-concat'),
    minifyHTML = require('gulp-htmlmin'),
    wiredep    = require('wiredep').stream,
    inject     = require('gulp-inject'),
    browSync   = require('browser-sync');

var timestamp = (new Date()).getTime();

var files = {
    angularMain: 'src/js/*.js',
    angularDirectives: 'src/js/directives/*.js',
    angularControllers: 'src/js/controllers/*.js',
    angularServices: 'src/js/services/*.js',
    styles: 'src/css/*.css',
    images: 'src/img/*.*',
    fonts: 'src/fonts/*.*',
    templates: 'src/templates/*.html',
    index: 'src/index.html',
    home:  'src/home.html',
    fontAwesomeStyles: 'src/components/font-awesome/**/*.css',
    fontAwesome: 'src/components/font-awesome/fonts/*.{ttf,woff,eof,svg}',
    bowerComponents: 'src/components/**/*.*'
};

var minifiedFiles = {
  custom: '*/all.*.min.*',
  lib: '*/lib.*.min.*'
};

gulp.task('inject-libs', function() {
  return gulp.src(files.home)
    .pipe(inject(gulp.src([files.angularMain, files.angularServices, files.angularDirectives, files.angularControllers, files.styles, files.fontAwesomeStyles], { read: false }), { relative: true }))
    .pipe(wiredep())
    .pipe(rename('index.html'))
    .pipe(gulp.dest('src'));
});

gulp.task('minify-templates', function() {
  return gulp.src(files.templates)
    .pipe(minifyHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/templates'));
});

gulp.task('css-custom', function() {
  return gulp.src([files.styles, files.fontAwesomeStyles])
    .pipe(concat('all.' + timestamp + '.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js-custom', function() {
  return gulp.src([files.angularMain, files.angularServices, files.angularDirectives, files.angularControllers])
    .pipe(concat('all.' + timestamp + '.min.js'))
    .pipe(minifyJs())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('js-libs', function() {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('lib.' + timestamp  + '.min.js'))
    .pipe(minifyJs())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css-libs', function() {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('lib.' + timestamp  + '.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts-custom', function() {
  return gulp.src(files.fonts)
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('font-awesome', function() {
  return gulp.src(files.fontAwesome)
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function() {
  return gulp.src(files.images)
    .pipe(minifyImgs())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('browser-sync', ['inject-libs'], function() {
  browSync.init([
    files.angularMain, 
    files.angularDirectives, 
    files.angularControllers, 
    files.angularServices,
    files.styles,
    files.templates,
    files.index
  ], {
    server: {
      baseDir: 'src'
    }
  }, function() {
    console.log('up');
  });

});

gulp.task('start', ['browser-sync']);
gulp.task('prepare-libs', ['js-libs', 'css-libs', 'css-custom', 'js-custom', 'fonts-custom', 'font-awesome', 'images', 'minify-templates']);

gulp.task('build', ['prepare-libs'], function() {
  return gulp.src(files.home)
    .pipe(inject(gulp.src([minifiedFiles.lib, minifiedFiles.custom], { read: false, cwd: __dirname + '/dist' }), { addRootSlash: false }))
    .pipe(rename('index.html'))
    .pipe(minifyHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});
