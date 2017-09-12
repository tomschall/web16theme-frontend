'use strict';

var gulp = require('gulp'),
	replace = require('gulp-replace');

/**
 * Makes resource paths in build folder relative
 */
gulp.task('relative-paths', function() {
	gulp.src('build/**/*.html').pipe(replace(/(href|src)="\/(assets|preview)\//gm, function(_, attr, dir) {
		var relativePath = this.file.path.replace(/^.*build\//, '').split('/').map(function(f) { return ''}).join('../');
		return [attr, '="', relativePath, dir, '/'].join('');
	})).pipe(gulp.dest('build/'));
});
