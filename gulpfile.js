var gulp = require('gulp'),
    connect    = require('gulp-connect'),
    watch      = require('gulp-watch'),
    minifyCss  = require('gulp-cssnano'),
    minifyJs   = require('gulp-uglify'),
    concat     = require('gulp-concat'),
    rename     = require('gulp-rename'),
    minifyHTML = require('gulp-htmlmin');
    wiredep    = require('wiredep').stream;
    inject     = require('gulp-inject');
    browSync   = require('browser-sync');

var files = {
    angularMain: 'src/js/*.js',
    angularDirectives: 'src/js/directives/*.js',
    angularControllers: 'src/js/controllers/*.js',
    angularServices: 'src/js/services/*.js',
    styles: 'src/css/*.css',
    images: 'src/img/**',
    templates: 'src/templates/*.html',
    index: 'src/index.html',
    bowerFonts: 'src/components/font-awesome/**/*.*',
    bowerComponents: 'src/components/**/*.*'
};

gulp.task('inject-libs', function() {
  gulp.src(files.index)
    .pipe(inject(gulp.src([files.angularMain, files.angularServices, files.angularDirectives, files.angularControllers, files.styles, files.bowerFonts], { read: false }), { relative: true }))
    .pipe(wiredep())
    .pipe(gulp.dest('src'));
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
