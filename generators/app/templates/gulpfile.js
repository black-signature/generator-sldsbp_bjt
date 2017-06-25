/**
 * Gulp file to make the page distributable under dist folder
 * 
 * Author   : Balu John Thomas
 * Version  : 1.4
 * Support  : balujohnthomas@gmail.com
 */ 

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var replace = require('gulp-replace');

/*** Copy SLDS assets */
gulp.task("copy:bower_lightning", function(){
	return gulp.src([
        'bower_components/salesforce-lightning-design-system/assets/**'
    ])
    .pipe(gulp.dest('dist/SLDS'));
});

/*** Copy jQuery */
gulp.task("copy:jquery", function(){
	return gulp.src([
        'bower_components/jquery/dist/jquery.min.js'
    ])
    .pipe(gulp.dest('dist/lib'));
});

/*** Copy All other bower components except SLDS and jQuery */
gulp.task('copy:other_components', function() {
  return gulp.src([
      'bower_components/**',
      '!bower_components/{salesforce-lightning-design-system,salesforce-lightning-design-system/**}',
      '!bower_components/{jquery,jquery/**}',
    ])
    .pipe(gulp.dest('dist/plugins'));
});

/*** Copy and Minify Custom Scripts */
gulp.task("copy:scripts", function(){
	return gulp.src([
		'js/**'
    ])
	.pipe(uglify())
    .pipe(gulp.dest('dist/custom/js'));
});

/*** Copy CSS */
gulp.task("copy:css", function(){
	return gulp.src([
        'css/**'
    ])
    .pipe(gulp.dest('dist/custom/css'));
});

/*** Copy Images */
gulp.task("copy:images", function(){
	return gulp.src([
        'img/**'
    ])
    .pipe(gulp.dest('dist/custom/img'));
});

/*** Copy Static HTML pages */
gulp.task("copy:static_htmls", function(){
	return gulp.src([
        '*.html'
    ])
    .pipe(gulp.dest('dist'));
});

/*** Replace all references within dist */
gulp.task("replace:path_references", function(){
  gulp.src(['dist/*.html'])
    .pipe(replace('bower_components/salesforce-lightning-design-system/assets/', 'SLDS/'))
    .pipe(replace('bower_components/jquery/dist/', 'lib/'))
    .pipe(replace('bower_components/', 'plugins/'))
    .pipe(replace('js/', 'custom/js/'))
    .pipe(replace('css/', 'custom/css/'))
    .pipe(replace('img/', 'custom/img/'))
    .pipe(gulp.dest('dist/'));
});

/*** Run tasks sequentially -- alternative till Gulp 4 */
function runSequential( tasks ) {
    if( !tasks || tasks.length <= 0 ) return;

    const task = tasks[0];
    gulp.start( task, () => {
        console.log( `${task} finished` );
        runSequential( tasks.slice(1) );
    });
}

gulp.task("default", function(){
    runSequential(["copy:bower_lightning", "copy:jquery", "copy:scripts", "copy:css", "copy:images", "copy:other_components", "copy:static_htmls", "replace:path_references"]);
});
