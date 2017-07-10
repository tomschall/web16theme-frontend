'use strict';

/**
 * Ussage: `gulp js:lint`
 */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const cached = require('gulp-cached');

var taskName = 'js:test',
	taskConfig = {
		watch: [
			'./source/assets/js/**/*.data.js',
			'./source/widgets/**/*.data.js',
			'./source/pages/**/*.data.js',
			'./source/demo/widgets/**/*.data.js',
			'./source/demo/pages/**/*.data.js'
		]
	};


gulp.task('js:lint-data', function() {
	return gulp.src(taskConfig.watch)
		.pipe(cached('linting-data'))
		.pipe(eslint({
			envs: [
				'node'
			],
			rules: {
				'max-len': 0
				//camelcase: 0
			}
		}))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('js:lint', ['js:lint-data'], function() {

	return gulp.src([
		'./source/assets/js/**/*.js',
		'./source/widgets/**/*.js',
		'./source/pages/**/*.js',
		'./source/demo/widgets/**/*.js',
		'./source/demo/pages/**/*.js',
		'!**/*.data.js'
	])
		.pipe(cached('linting'))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

module.exports = {
	taskName: 'js:lint',
	taskConfig: taskConfig
};
