'use strict';

var gulp = require('gulp'),
	replace = require('gulp-replace');

/**
 * Makes resource paths in build folder relative
 */
gulp.task('relative-paths', function() {
	gulp.src('build/**/*.html').pipe(replace(/(href|src)="\/assets\//gm, function(_, attr) {
		var relativePath = this.file.path.replace(/^.*build\//, '').split('/').map(function(f) { return ''}).join('../');
		return [attr, '="', relativePath + 'assets/'].join('');
	})).pipe(gulp.dest('build/'));
});
