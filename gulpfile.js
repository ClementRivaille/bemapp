/* jshint node: true, strict: false */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var openBrowser = require('gulp-open');
var del = require('del');
var _ = require('lodash');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var livereload = require('gulp-livereload');
var path = require('path');
var plumber = require('gulp-plumber');
var less = require('gulp-less');

/* -------------------
 JS sources Paths
 ------------------ */
var directivesPaths = ['app/modules/**/directives.js', 'app/modules/**/directives/**/*.js'];
var servicesPaths = ['app/modules/**/services.js', 'app/modules/**/services/**/*.js'];
var modulesPaths= ['app/modules/bem/bem.js'];
// var filtersPaths = ['app/modules/common/filters.js', 'app/modules/common/filters/**/*.js'];
var appPaths = _.union(['app/app.js', 'app/src/**/*.js'], modulesPaths, directivesPaths, servicesPaths);

/* -------------------
CLEAN AND LINT
------------*/

gulp.task('clean', function() {
  return del(['build']);
});

// Check JS files code quality
gulp.task('lint', function() {
  return gulp.src(appPaths)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

/* ---------------------
TEMPLATES
------------------------ */

// Concatenate all angular templates into a JS file that append them into angular template cache
gulp.task('templates-app', function() {
  'use strict';
  return gulp.src(['app/**/*.html'])
    .pipe(templateCache('templates.js', {
      root: '',
      module: 'terriblelogos.templates',
      standalone: true
    }))
    .pipe(gulp.dest('./build'))
    .pipe(livereload());
});

// Concatenate all angular templates into a JS file that append them into angular template cache
gulp.task('templates-ui-bootstrap', function() {
  'use strict';
  return gulp.src(['template/typeahead/**/*.html'], {
      cwd: './app/bower_components/ui-bootstrap/',
      base: path.normalize(__dirname + '/../../app/bower_components/ui-bootstrap/')
    })
    .pipe(templateCache('ui-bootstrap-templates.js', {
      module: 'ui.bootstrap.tpls',
      standalone: true
    }))
    .pipe(gulp.dest('./app/scripts'))
    .pipe(livereload());
});
gulp.task('templates', gulp.series(['templates-app', 'templates-ui-bootstrap']));

/* ----------------------------
JAVASCRIPT SOURCES
-------------------------- */

// Concat sources
gulp.task('js-app', function() {
  'use strict';
  return gulp.src(appPaths, {
      base: '.',
      allowEmpty: true
    })
    .pipe(plumber())
    .pipe(concat('terrible-logos.js'))
    .pipe(gulp.dest('./build'))
    .pipe(livereload());
});
gulp.task('js-vendor', function() {
  'use-strict';
  return gulp.src(bowerFiles({
    filter: /.*\.js$/
  }))
  .pipe(plumber())
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('./build'));
});
gulp.task('js', gulp.parallel('js-app', 'js-vendor'));


// Inject JS scripts tags in HTML pages
gulp.task('inject', function() {
  var sources = gulp.src(['build/vendor.js', 'build/terrible-logos.js', 'build/templates.js'], {
    read: false
  });
  return gulp.src('app/index.html')
    .pipe(inject(sources, {
      relative: true,
      ignorePath: '../build'
    }))
    .pipe(gulp.dest('build'));
});

/* -----------------------
STYLES
-------------- */

// Build less styles of the portal
gulp.task('less', function() {
  'use strict';
  return gulp.src('app/resources/styles/less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, './app/resources/styles')]
    }))
    .pipe(concat('terrible-logos.css'))
    .pipe(gulp.dest('./build/resources/styles'))
    .pipe(livereload());
});

gulp.task('fonts', function() {
  'use-strict';
  return gulp.src(['bower_components/**/fonts/*', 'app/resources/fonts/*'])
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./build/resources/fonts'));
});

gulp.task('css-vendor', function() {
  'use-strict';
  return gulp.src(bowerFiles({
    filter: /.*\.less$/
  }))
  .pipe(plumber())
  .pipe(less())
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('./build/resources/styles'));
});
gulp.task('style', gulp.parallel([
  'less',
  'fonts',
  'css-vendor'
]));

/* ----------------------
SERVER
------------------------ */

// Run the development server
gulp.task('connect', function() {
  return connect.server({
    root: ['build'],
    port: 4056,
    livereload: {
      port: 35740
    }
  });
});

gulp.task('open', function() {
  return gulp.src('build/index.html').pipe(openBrowser('', {
    url: 'http://localhost:4056/index.html#/'
  }));
});

/*-----------------------------------
WATCH
----------------------- */

// Watch all file modifications then trigger tasks dedicated to file types
gulp.task('reload', function() {
  return gulp.src(['app/modules/**/*.js', 'app/src/**/*.js']).pipe(connect.reload());
});
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('app/**/*.html', gulp.parallel(['templates', 'reload']));
  gulp.watch('app/**/*.js', gulp.parallel(['js', 'reload']));
  gulp.watch('app/**/*.less', gulp.parallel(['less', 'reload']));
  gulp.watch('app/index.html', gulp.parallel(['inject', 'reload']));
});


/*----------------------------------
TASKS
-------------------------- */

// Open the app
gulp.task('default', gulp.series([
  'lint',
  'clean',
  'templates',
  'js',
  'style',
  'inject',
  gulp.parallel([
    'connect',
    'open',
    'watch'
  ])
]));

// Copy the built files that contain the core of app
gulp.task('dist-copy', function() {
  return gulp.src(['build/**/*']).pipe(gulp.dest('dist'));
});
gulp.task('dist', gulp.series([
  'lint',
  'clean',
  'templates',
  'js',
  'style',
  'inject',
  'dist-copy']));
// Copy the built files that contain the core of the form module
gulp.task('fast-dist', gulp.series(['templates', 'js', 'style', 'inject', 'dist']));
