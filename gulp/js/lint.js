'use strict';

/**
 * Ussage: `gulp js:lint`
 */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const cached = require('gulp-cached');
const util = require('gulp-util');

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
			}
		}))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('js:lint', ['js:lint-data'], function() {
	var conf = {};

	if (util.env.local) {
		conf = {
			rules: {
				'no-debugger': 1,
				"semi": [1, 'always']
			}
		}
	}

	return gulp.src([
		'./source/assets/js/**/*.js',
		'./source/widgets/**/*.js',
		'./source/pages/**/*.js',
		'./source/demo/widgets/**/*.js',
		'./source/demo/pages/**/*.js',
		'!**/*.data.js'
	])
		.pipe(cached('linting'))
		.pipe(eslint(conf))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

module.exports = {
	taskName: taskName,
	taskConfig: taskConfig
};
